import express from 'express';
import cors from 'cors';

import mysqlDb from './mysqlDb';
import post from './routers/posts';
import comment from './routers/comments';

const app = express();
const port = 8000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use('/posts', post)
app.use('/comments', comment)

const run = async () => {
  await mysqlDb.init();

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
