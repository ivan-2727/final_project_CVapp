const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const generateCartId = () => uuidv4();
require('dotenv').config({ path: './mongodb.env' });

const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cvbuildercluster.mv3ep.mongodb.net/`

const db = 'cvBuilder_database';

const getUser = async (username, password) => {
  const clcnName = 'cvBuilder_login';
    let user;
    const client = new MongoClient(url, { useUnifiedTopology: true }); 
    try {
      await client.connect();
      user = await client.db(db).collection(clcnName).findOne({ username: username, password: password });
      if(!user) throw new Error('Undefined user');
    } 
    finally {
      await client.close();
    } 
    return user;
  }; 

const getImages = async () => {
  const clcnName = 'cvBuilder_templates';
  let images;
  const client = new MongoClient(url, { useUnifiedTopology: true }); 
  try {
    await client.connect();
    images = await client.db(db).collection(clcnName).find().toArray();
    if(!images) throw new Error('Problem with images');
  } 
  finally {
    await client.close();
  } 
  return images;
}; 

module.exports.getUser = getUser;
module.exports.getImages = getImages;

