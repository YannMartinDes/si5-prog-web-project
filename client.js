let MongoClient = require('mongodb').MongoClient;
const xml2js = require('xml2js')
fs = require('fs');
const convert = require('xml-js');
const axios = require("axios");
const AdmZip = require('adm-zip');
let assert = require('assert');


function createDatabase(dataBaseName){
    let url = "mongodb://localhost:27017/"+dataBaseName;

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
    });
}

function createCollection(dataBaseName,collectionName){
    let url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db(dataBaseName);
    dbo.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
        });
    });
}
function insertJson(dataBaseName,collectionName,myObj){
    let url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db(dataBaseName);
    dbo.collection(collectionName).insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    });
}

function insertListJson(dataBaseName,collectionName,myObj){
    let url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db(dataBaseName);
    dbo.collection(collectionName).insertMany(myObj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    });
}




function deleteAllDatabase(dataBaseName,collectionName){
    let url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dataBaseName);
        dbo.collection(collectionName).drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted");
          db.close();
        });
      });
}




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


async function show(url){
    xml=await getAndUnZip(url)
    let result1 = convert.xml2json(xml, {compact: true});
    fs.writeFileSync("compact.json", result1);
    let result2 = convert.xml2json(xml, {compact: false});
    fs.writeFileSync("notcompact.json", result2);
    dict=JSON.parse(result1)
    arrayLocal=[]
    for (const element of dict["pdv_liste"]["pdv"]){
        arrayLocal.push({"latitude":element["_attributes"]["latitude"],"longitude":element["_attributes"]["longitude"],"body":element})
        }
    insertListJson(dataBaseName,collectionName,arrayLocal)
}

const dataBaseName="ProgServer"
const collectionName="prixEssence"
let url = "mongodb://localhost:27017/"
const urlINSTANTANE='https://donnees.roulez-eco.fr/opendata/instantane'

function findAll(dataBaseName,collectionName){
    let url = "mongodb://localhost:27017/";
    let back
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db(dataBaseName);
        dbo.collection(collectionName).find({}).toArray(function(err, val) {
          if (err) throw err;
          fs.writeFileSync("data.json", "["+val.map((elm)=>{return JSON.stringify(elm)}).toString()+"]")
          db.close();
        })
      })
}
//deleteAllDatabase(dataBaseName,collectionName)
//createDatabase(dataBaseName)
//createCollection(dataBaseName,collectionName)
//show(urlINSTANTANE)
//findAll(dataBaseName,collectionName)



const client = new MongoClient(url);



async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dataBaseName);
  const collection = db.collection(collectionName);

  const findResult = await collection.find({}).toArray();
  return findResult;
}

main()
  .then((res)=> {return res})
  .catch(console.error)
  .finally(() => {client.close()}).then(res => console.log(res))