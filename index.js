const express = require('express');

const mongoose = require("mongoose");
const app = express()
const port = process.env.PORT || 5000;

function setup(username, password,cluster,dbname) {
  mongoose.connect(
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
  );
}

app.get('/:cluster/:dbname/:username/:password/:type/:letter', async (req, res) => {
  let{type, letter, username, password, cluster, dbname} =  req.params;

   try {
    
setup(username, password, cluster, dbname)
const db = mongoose.connection;
const Schema = new mongoose.Schema(

  {
    letter: String,
    datta:[{
      word: String,
      meaning: String,
      color: String
    }]
  }

);
  const prefix = mongoose.model(type, Schema);
  let r= await prefix.find({letter: letter})
  res.json(r)
   } catch (error) {
    res.json(error)
   } 
 
});
app.get('/:cluster/:dbname/:username/:password/:type', async (req, res) => {
  let{type, username, password, cluster, dbname} =  req.params;

   try {
    
setup(username, password, cluster, dbname)
const db = mongoose.connection;
const Schema = new mongoose.Schema(

  {
    letter: String,
    datta:[{
      word: String,
      meaning: String,
      color: String
    }]
  }

);
  const prefix = mongoose.model(type, Schema);
  let r= await prefix.find({})
  res.json(r)
   } catch (error) {
    res.json(error)
   } 
 
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})