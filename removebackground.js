const request = require('request');
const fs = require('fs');
const path = require('path');
const glob = require('glob')

const folder = 'src/assets';
glob(folder + '*/*.png', {}, (err, files) => {
  console.log(files);
})

