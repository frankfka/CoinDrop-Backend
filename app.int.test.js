
const request = require('supertest');
const { app, routes } = require('./app');
const db = require('./service/databaseService');

// Runs once for the entire test file
beforeAll(() => {
  return db.connect();
});
afterAll(() => {
  return db.disconnect();
});

// Test health check
describe('health Check', () => {
  it('GET health check is successful', () => request(app).get(routes.root).expect(200));
});
