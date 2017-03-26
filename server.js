import express from 'express';
// import consign from 'consign';
import config from './server/config/config';


let app = express();

// consign({ verbose: false })
//   .include('server/config/config.js');
app = config(app);

app.set('port', 5000);

app.listen(app.get('port'), () => {
  console.log(`server started on port ${app.get('port')}`);
});

module.exports = app;
