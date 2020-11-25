var fs = require("fs");
const createError = require('http-errors');
const mongoose = require('mongoose');
const util = require('util')
const ApkReader = require('adbkit-apkreader')

const Apk = require('../Models/Apk.model');

// function to return APK file size
function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  var fileSizeInMegabytes = fileSizeInBytes / (1024*1024);
  console.log("fileSizeInMegabytes", fileSizeInMegabytes)
  return fileSizeInMegabytes;
}

module.exports = {

  getAllApks: async (req, res, next) => {
    // code to read APK file

    // ApkReader.open('/Users/ravikumar/Documents/task/vs-apk-reader/server/src/demo/test.apk')
    // .then(reader => reader.readManifest())
    // .then(manifest => {
    //   getFilesizeInBytes('/Users/ravikumar/Documents/task/vs-apk-reader/server/src/demo/test.apk')
    //   console.log(util.inspect(manifest, { depth: null }))
    // })

    // gett all APK the data
    try {
      const results = await Apk.find({}, { __v: 0 });
      res.send(results);
    } catch (error) {
      console.log(error.message);
    }
  },

  createNewApk: async (req, res, next) => {
    // console.log(req.body, req.files);
    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    const myFile = req.files.file;
    myFile.mv(`${__dirname}/public/${myFile.name}`, function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        // returing the response with file path and name
        ApkReader.open(`${__dirname}/public/${myFile.name}`)
        .then(reader => reader.readManifest())
        .then(manifest => {
          getFilesizeInBytes(`${__dirname}/public/${myFile.name}`)
          console.log(util.inspect(manifest, { depth: null }))
        })

        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });

      


    
     // post APK file data
    // try {
    //   const apk = new Apk(req.query);
    //   const result = await apk.save();
    //   res.send(result);
    // } catch (err) {
    //   console.log(error.message);
    //   if (error.name === 'ValidationError') {
    //     next(createError(422, error.message));
    //     return;
    //   }
    //   next(error);
    // }
  },

}