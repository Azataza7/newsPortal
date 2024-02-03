import { Router } from 'express';
import mysqlDb from '../mysqlDb';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Comment, Post } from '../types';

const comment = Router();

comment.get('/', async (req, res) => {
  try {
    const postId = req.query.post_id;
    let sqlReq = 'SELECT * FROM news_db.comments';

    if (postId) {
      sqlReq += ' WHERE post_id = ?';
    }

    const [results] = await mysqlDb.getConnection().query(sqlReq, [postId]);

    res.status(200).send(results);
  } catch (e) {
    res.send(e);
  }
});

comment.post('/', async (req, res) => {
  const comment: Comment = {
    id: req.body.id,
    post_id: req.body.post_id,
    author: req.body.author,
    text: req.body.text,
  };

  try {
    const [result] = await mysqlDb.getConnection().query(
      'INSERT INTO news_db.comments (post_id, author, text) VALUES (?, ?, ?)',
      [comment.post_id, comment.author, comment.text],
    ) as ResultSetHeader[];

    res.status(201).send(result);
  } catch (e) {
    res.send(e);
  }
});

comment.delete('/:id', async (req, res) => {
  try {
    const [result] = await mysqlDb.getConnection().query(
      'DELETE FROM news_db.comments WHERE id = ?', [req.params.id]
    ) as RowDataPacket[];

    res.send({message: 'Success'});
  } catch (e) {
    res.send(e);
  }
});

export default comment;