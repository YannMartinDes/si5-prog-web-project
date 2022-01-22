const dataBaseName="ProgServer"
const collectionName="prixEssence"
const urlINSTANTANE='https://donnees.roulez-eco.fr/opendata/instantane'
const connectionString = "mongodb://localhost:27017/"

const express = require('express');
fs = require('fs');
const convert = require('xml-js');
const axios = require("axios");
const AdmZip = require('adm-zip');
let assert = require('assert');

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require('../db/conn');


recordRoutes.route('/createcollection').get(async function (req, res) {
  const dbConnect = dbo.getDb();
  console.log(req.query.collectionName)
  dbConnect.
    createCollection(req.query.collectionName, function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
        console.log(result)
      }
    });
});

// This section will help you get a list of all the records.
recordRoutes.route('/findall').get(async function (req, res) {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection(req.query.collectionName)
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send('Error fetching listings!');
      } else {
        res.json(result);
      }
    });
});

// This section will help you create a new record.
recordRoutes.route('/insertone').get(function (req, res) {
  const dbConnect = dbo.getDb();


  dbConnect
    .collection(req.query.collectionName)
    .insertOne(req.query.body, function (err, result) {
      console.log(err)
      if (err) {
        res.status(400).send('Error inserting obj!');
      } else {
        console.log(`Added a new obj with id ${result}`);
        res.status(204).send();
      }
    });
});

// // This section will help you update a record by id.
// recordRoutes.route('/listings/updateLike').post(function (req, res) {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { _id: req.body.id };
//   const updates = {
//     $inc: {
//       likes: 1,
//     },
//   };

//   dbConnect
//     .collection(req.query.collectionName)
//     .updateOne(listingQuery, updates, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error updating likes on listing with id ${listingQuery.id}!`);
//       } else {
//         console.log('1 document updated');
//       }
//     });
// });

// // This section will help you delete a record.
// recordRoutes.route('/listings/delete/:id').delete((req, res) => {
//   const dbConnect = dbo.getDb();
//   const listingQuery = { listing_id: req.body.id };

//   dbConnect
//     .collection(req.query.collectionName)
//     .deleteOne(listingQuery, function (err, _result) {
//       if (err) {
//         res
//           .status(400)
//           .send(`Error deleting listing with id ${listingQuery.listing_id}!`);
//       } else {
//         console.log('1 document deleted');
//       }
//     });
// });


async function get(url) {
  const options =  { 
      method: 'GET',
      url: url,
      responseType: "arraybuffer"
  };
  const { data } = await axios(options);
  return data;
}

async function getAndUnZip(url) {
  const zipFileBuffer = await get(url);
  const zip = new AdmZip(zipFileBuffer);
  const entries = zip.getEntries();
  for(let entry of entries) {
      const buffer = entry.getData();
      return buffer.toString("latin1");
  }
}
async function getJsonFromUrl(url){
  xml=await getAndUnZip(url)
  return convert.xml2json(xml, {compact: true});
}

recordRoutes.route('/insertdata').get(function (req, res) {
  const dbConnect = dbo.getDb();
  console.log(req.query)
  getJsonFromUrl(req.query.url).then((resultJson)=>{
    console.log(resultJson)
    dict=JSON.parse(resultJson)
    arrayLocal=[]
    for (const element of dict["pdv_liste"]["pdv"]){
        arrayLocal.push({"latitude":element["_attributes"]["latitude"],"longitude":element["_attributes"]["longitude"],"body":element})
        }
    dbConnect
      .collection(req.query.collectionName)
      .insertMany(arrayLocal, function (err, result) {
        if (err) {
          res.status(400).send('Error inserting obj!');
        } else {
          console.log(`Added a new obj with id ${result}`);
          res.status(204).send();
        }
      });
  })

});

module.exports = recordRoutes;
