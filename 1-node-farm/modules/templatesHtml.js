const fs = require('fs');

// const templateOverview = fs.readFileSync(
//   `${__dirname}/../templates/overview.html`,
//   'utf-8'
// );
// const templateProduct = fs.readFileSync(
//   `${__dirname}/../templates/product.html`,
//   'utf-8'
// );
// const templateCard = fs.readFileSync(
//   `${__dirname}/../templates/card.html`,
//   'utf-8'
// );

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
