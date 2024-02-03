import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { imagesUpload } from '../multer';
import { Post } from '../types';

const post = Router();

post.get('/', async (req, res) => {
  try {
    const [results] = await mysqlDb.getConnection().query(
      'SELECT id, title, description, image, createdAt FROM news_db.post'
    );

    res.status(200).send(results);
  } catch (e) {
    res.send(e);
  }
});

post.get('/:id', async (req, res) => {
  const [results] = await mysqlDb.getConnection().query(
    'SELECT * FROM news_db.post WHERE id = ?', [req.params.id]
  ) as RowDataPacket[];

  const post = results[0];

  if (!post) {
    return res.status(404).send({error: 'Not Found'});
  }

  return res.send(post);
});

post.post('/', imagesUpload.single('image'), async (req, res) => {
  const post: Post = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    image: req.file ? req.file.filename : null,
    createdAt: new Date().toISOString()
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO news_db.post (title, description, image, createdAt) VALUES (?, ?, ?, ?)',
      [post.title, post.description, post.image, post.createdAt],
    ) as ResultSetHeader[];

    res.status(201).send(result);
  } catch (e) {
    res.send(e);
  }
});

post.delete('/:id', async (req, res) => {
  try {
    const [result] = await mysqlDb.getConnection().query(
      'DELETE FROM news_db.post WHERE id = ?', [req.params.id]
    ) as RowDataPacket[];

    res.send({message: 'Success'});
  } catch (e) {
    res.send(e)
  }
});

export default post;