
const request = require('supertest');
const {app, routes} = require('./app');
const db = require('./service/databaseService');

// Runs once for the entire test file
beforeAll(() => {
    console.debug('Beginning App Integration Test. Initializing DB');
    return db.connect();
});
afterAll(() => {
    console.debug('Ending App Integration Test. Disconnecting DB');
    return db.disconnect();
});

// Test health check
describe('Health Check', () => {
    test('GET health check is successful', () => {
        return request(app).get(routes.root).expect(200);
    });
});