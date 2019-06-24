const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const gameRouter = require('./components/game/gameRouter');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.use('/api/game', gameRouter);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Server running on port ${port}`));
