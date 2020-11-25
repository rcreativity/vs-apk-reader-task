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
    // post APK file data

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }

    // reading APK file
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
          let ApkFileSize = getFilesizeInBytes(`${__dirname}/public/${myFile.name}`)
          let manifestFileVersionCode = util.inspect(manifest.versionCode, { depth: null });

          let ApkFileSizeToString = ApkFileSize ? `${ApkFileSize.toString()}MB` : '0MB';
          let manifestFileVersionCodeToString = manifestFileVersionCode? manifestFileVersionCode.toString() : '1'
          console.log(req.query);
          console.log("versionCode", typeof manifestFileVersionCodeToString)
          console.log("ApkFileSize", typeof ApkFileSizeToString)

          const params = {
            name: req.query.name,
            description: req.query.description,
            version: manifestFileVersionCodeToString,
            size: ApkFileSizeToString
          }

          try {
            const apk = new Apk(params);
            const result = apk.save();
            res.send(result);
          } catch (err) {
            console.log(error.message);
            if (error.name === 'ValidationError') {
              next(createError(422, error.message));
              return;
            }
            next(error);
          }
          
        })

        return res.send({name: myFile.name, path: `/${myFile.name}`});
    });

      


    
     
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