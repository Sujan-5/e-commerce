import express from 'express';
import items from './Items.js';

const app = express();

app.get('/api/products', (req, res) => {
  res.send(items.products);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});
