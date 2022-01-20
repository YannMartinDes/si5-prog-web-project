var MongoClient = require('mongodb').MongoClient;
const xml2js = require('xml2js')
fs = require('fs');
const convert = require('xml-js');
const axios = require("axios");
const AdmZip = require('adm-zip');

function createDatabase(dataBaseName){
    var url = "mongodb://localhost:27017/"+dataBaseName;

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
    });
}

function createCollection(dataBaseName,collectionName){
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dataBaseName);
    dbo.createCollection(collectionName, function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
        db.close();
        });
    });
}
function insertJson(dataBaseName,collectionName,myObj){
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db(dataBaseName);
    dbo.collection(collectionName).insertOne(myObj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
    });
    });
}

function findAll(dataBaseName,collectionName){
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dataBaseName);
        dbo.collection(collectionName).find({}).toArray(function(err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
        });
      });
}

function deleteAllDatabase(dataBaseName,collectionName){
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dataBaseName);
        dbo.collection(collectionName).drop(function(err, delOK) {
          if (err) throw err;
          if (delOK) console.log("Collection deleted");
          db.close();
        });
      });
}


url2022='https://donnees.roulez-eco.fr/opendata/instantane'

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


async function show(){
    xml=await getAndUnZip(url2022)
    var result1 = convert.xml2json(xml, {compact: true});
    fs.writeFileSync("compact.json", result1);
    var result2 = convert.xml2json(xml, {compact: false});
    fs.writeFileSync("notcompact.json", result2);
    dict=JSON.parse(result1)
    for (const element of dict["pdv_liste"]["pdv"]){
        insertJson(dataBaseName,collectionName,{"_id":element["_attributes"]["id"],"body":element})
        await new Promise(r => setTimeout(r, 2000));}
}

dataBaseName="ProgServer"
collectionName="prixEssence"
createDatabase(dataBaseName)
createCollection(dataBaseName,collectionName)


show()