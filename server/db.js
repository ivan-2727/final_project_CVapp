const { MongoClient } = require('mongodb');
const { v4: uuidv4 } = require('uuid');
const generateCartId = () => uuidv4();
require('dotenv').config({ path: './mongodb.env' });

const url = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cvbuildercluster.mv3ep.mongodb.net/`
const db = 'cvBuilder_database';

const getUser = async (uid) => {
  const clcnName = 'cvBuilder_login';
    let user;
    const client = new MongoClient(url, { useUnifiedTopology: true }); 
    try {
      await client.connect();
      user = await client.db(db).collection(clcnName).findOne({ uid: uid });
      if(!user) throw new Error('Undefined user');
    } 
    finally {
      await client.close();
    } 
    return user;
}; 
const createUser = async (uid) => {
  const clcnName = 'cvBuilder_login';
    let user;
    const client = new MongoClient(url, { useUnifiedTopology: true }); 
    try {
      await client.connect();
      user = await client.db(db).collection(clcnName).insertOne({ uid: uid , favorites: [] });
      console.log('created from mongo/////', user)
    } 
    finally {
      await client.close();
    } 
    return user;
}; 
const setFavorites = async (userId, favorites ) => {
  let user; 
  let updatedUser;
  const clcnName = 'cvBuilder_login';
  const client = new MongoClient(url, { useUnifiedTopology: true }); 
  console.log('userid', userId)
  console.log('favorites', favorites)
  // const query = { uid : userId };
  // Set some fields in that document
  // const updateFavorites = {
  //   "$set": {
  //     "favorites": favorites
  //   },
  //   { new: true }
  // };  
  try {
    await client.connect();
    user = await client.db(db).collection(clcnName).findOneAndUpdate({ uid : userId }, { $set: { favorites: favorites }}, { returnNewDocument: true })
    updatedUser = await client.db(db).collection(clcnName).findOne({ uid : userId })
    // if(!user) throw new Error('Problem with images');
    console.log('updatedUser', updatedUser)
  } 
  finally {
    await client.close();
  } 
  return updatedUser;
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

const getTemp = async (id) => {
  const clcnName = 'cvBuilder_templates';
  let cvTemp;
  const client = new MongoClient(url, { useUnifiedTopology: true }); 
  try {
    await client.connect();
    console.log(id, 'BEFORE')
    cvTemp = await client.db(db).collection(clcnName).findOne({id:id})
    console.log(cvTemp, 'AFTER')
    if(!cvTemp) throw new Error('Problem with images');
  } catch (err) {
    console.log(err);
  }
  finally {
    await client.close();
  }
  return cvTemp;
};

module.exports.getUser = getUser;
module.exports.createUser = createUser
module.exports.getImages = getImages;
module.exports.getTemp = getTemp;
module.exports.setFavorites = setFavorites;

