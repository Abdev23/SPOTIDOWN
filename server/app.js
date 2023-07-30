
import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import express from 'express';
import helmet  from 'helmet';
import cors from 'cors';
import xss from 'xss-clean';
import rateLimiter from 'express-rate-limit';


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100,
  })
);
app.use( express.static('./public') );
app.use( express.json() );
app.use( helmet() );
app.use( cors() );
app.use( xss() );


app.get('/api', (req, res) => {
  res.json({ message: "Hello from 🚀 express server!" });
});

app.post('/api/tap', (req, res) => {
  const { TAP } = req.body;
  console.log('Received TAP from frontend:', TAP);

  const FEEDBACK = { "dur": 4000 };
  res.json(FEEDBACK);
});

app.post('/api/art', (req, res) => {
  const { ART_COVER } = req.body;
  console.log('Received ART_COVER from frontend:', ART_COVER);

  const FEEDBACK = { "dur": 3000 };
  res.json(FEEDBACK);
});

app.all('*', (req, res) => {
  res.status(404).send('resource not found');
});


const port = process.env.PORT || 5010;

const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`🚀 Server ready at http://0.0.0.0:${port}`)
    );
  }
  catch (error) {
    console.log(error);
  }
}

start();