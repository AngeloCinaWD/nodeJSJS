const fs = require('fs');

module.exports = {
  templateOverview: fs.readFileSync(
    `${__dirname}/../templates/overview.html`,
    'utf-8'
  ),
  templateCard: fs.readFileSync(`${__dirname}/../templates/card.html`, 'utf-8'),
  templateProduct: fs.readFileSync(
    `${__dirname}/../templates/product.html`,
    'utf-8'
  ),
};
