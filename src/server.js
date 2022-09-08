const fallback = require('express-history-api-fallback');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

const root = './dist';
app.use(express.static(root));
app.use(fallback('index.html', { root }));

// app.post('/api/form/save', function () {
//   console.log('Запрос принят но не обработан :(');
// })

// app.post("/api/form/save", function (req, res) {
//   if (!request.data) return response.sendStatus(400);
//   response.json({ name: request.data.name, age: request.body.age });
// });

app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`Example app listening on port ${PORT}!`);
});
