const fs = require('fs');

const data = fs.readFileSync(`${__dirname}/../dev-data/data.json`, 'utf-8');

module.exports = {
  data: data,
  dataProducts: JSON.parse(data),
};
