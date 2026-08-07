const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

const MONGO_URI = "mongodb://127.0.0.1:27017/NamasteStay";

main().then(() => {
    console.log('Connected to DB');
   }).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner: '6a5b6b4c49df286df15911c0',
    }));
    await Listing.insertMany(initData.data);
    console.log('Data was initialized');
};

initDB();