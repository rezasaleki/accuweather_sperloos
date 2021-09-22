const request = require('request-promise');
const axios = require('axios');
const fs = require('fs');

/*
    Method to Fetch dynamic List of URLs by crawl website
*/
const fetchDataList = async (data) => {
    console.log("url", data.url);
    const response = await axios.get(data.url);
    if (response && response['data']) {
        return {
            data: response['data'],
            status: (!data.status) ? "monthly" : "daily"
        }
    }
}

const getAllData = async (URLs) => {
    return Promise.all(URLs.map(fetchDataList));
}

/*
    Method to convert Object format data into JSON format
*/
const saveNewJSON = (dataJson, fileName) => {
    fs.writeFile(`assets/${fileName}.json`, JSON.stringify(dataJson), (err) => {
        if (err) {
            return console.log(err);
        }
        console.log(`The file ‌(${fileName}) was saved!`);
    });
}

exports.fetchDataList = fetchDataList;
exports.getAllData = getAllData;
exports.saveNewJSON = saveNewJSON;
