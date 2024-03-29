const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json()); // parse the body of the request as json

app.use(cors({ origin: 'http://localhost:3000' }));

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/events', (req, res) => {
  console.log('Received Event', req.body.type);
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  } else if (type === 'CommentCreated') {
    const { id, content, postId } = data;
    const post = posts[postId];

    post.comments = post.comments || [];
    post.comments.push({ id, content });
  }

  console.log(posts);
  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
