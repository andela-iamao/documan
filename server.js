/* eslint-disable */
import express from 'express';
import bodyParser from 'body-parser';
import config from './server/config';
import db from './server/models/index';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';
/* eslint-enable */

require('dotenv').config();

let app = express();

app = config(app);

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(path.join(__dirname, 'client/dist')));

app.get('/app/*', (req, res) => {
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().done(() => {
    app.listen(process.env.PORT, () => {
      /* eslint-disable */
      console.log(`server started on port ${process.env.PORT}`);
      /* eslint-enable */
    });
  });
}

module.exports = app;
