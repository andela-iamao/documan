/* eslint-disable */
import supertest from 'supertest';
import chai from 'chai';

import app from '../../server';
import db from '../models/index';
/* eslint-enable */

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.db = db;
