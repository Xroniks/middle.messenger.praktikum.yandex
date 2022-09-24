const fallback = require('express-history-api-fallback');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 3000;

const root = './dist';
app.use(express.static(root));
app.use(fallback('index.html', { root }));

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on port ${PORT}!`);
});
