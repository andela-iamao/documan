/* eslint-disable */
import supertest from 'supertest';
import chai from 'chai';
import sinon from 'sinon';
import events from 'events';
import jwt from 'jsonwebtoken';

import app from '../../server';
import db from '../models/index';
import faker from './faker-data';
/* eslint-enable */

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.db = db;
global.faker = faker;
global.jwt = jwt;
global.tokenize = (id) => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60),
  data: { id }
}, process.env.JWT_SECRET);
global.events = events;
global.sinon = sinon;
