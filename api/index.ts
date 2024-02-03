import express from 'express';
import cors from 'cors';

import mysqlDb from './mysqlDb';
import post from './routers/posts';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/posts', post)

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
