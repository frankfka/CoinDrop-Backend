
const request = require('supertest');
const { app, routes } = require('./app');
const db = require('./service/databaseService');

// Test health check
describe('app integration test -> Health Check', () => {
  it('should return 200 for successful health check', async () => {
    expect.assertions(2);
    // We don't need DB but try connecting and disconnecting
    db.connect();
    const healthCheckResponse = await request(app).get(routes.root);
    db.disconnect();
    expect(healthCheckResponse.statusCode).toBe(200);
    expect(healthCheckResponse.res.text).toBe('Connection Established!');
  });
});
