import path from 'path';

export default (req, res) => {
  res.status(200)
    .sendFile(path.join(__dirname, '../public/docs', 'index.html'));
};
