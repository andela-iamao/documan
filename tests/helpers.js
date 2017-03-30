import supertest from 'supertest';
import chai from 'chai';

import app from '../server';
import db from '../server/models/index';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.db = db;
