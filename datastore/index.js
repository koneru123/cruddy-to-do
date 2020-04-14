const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

// Post call
exports.create = (text, callback) => {
  // var id = counter.getNextUniqueId(()=>{});
  counter.getNextUniqueId((err, id) => {
    if (err) {
      console.log('THERE WAS AN ERROR IN creating a unique id in CREATE: ', err);
    } else {
      //console.log('path', `${dataDir}${id}`);
      fs.writeFile(`${exports.dataDir}/${id}.txt`, text, (err) => {
        if (err) {
          //return 'The file has not been saved!', err;
          callback(err);
        } else {
          callback(null, { id, text });
          // { id:id, text:text } 
        }
      });
    }
  });
};

//GET call
exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

// get call based on id
exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

// PUT call
exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

// delete call
exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');
//might only work for macs, pcs have a different file system.

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
