// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const seedMusician = require("./seedData");


describe('./musicians endpoint', () => {
    // Write your tests here
    test('GET request is successful', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
    })
    test('endpoint returns accurate data', async () => {
        const response = await request(app).get('/musicians');
        const responseData = JSON.parse(response.text);

        expect(responseData[1].name).toBe('Drake');
    })
    test('endpoint returns specified musician', async () => {
        const response = await request(app).get('/musicians/1');
        const responseData = JSON.parse(response.text);

        expect(responseData.name).toBe('Mick Jagger');
    });
    test('endpoint adds new musician', async () => {
        const response = await request(app).post('/musicians').send({name: 'Westside Gunn', instrument: 'Voice'});
        const responseData = JSON.parse(response.text);

        expect(responseData.name).toBe('Westside Gunn');
    });
    test('endpoint updates specified musician', async () => {
        const response = await request(app).put('/musicians/3').send({name: 'Erykah Badu'});
        const responseData = JSON.parse(response.text);

        expect(responseData.name).toBe('Erykah Badu');
    });
    test('endpoint deletes specified musician', async () => {
        const response = await request(app).delete('/musicians/3');
        const responseData = JSON.parse(response.text);

        expect(responseData.name).toBe(undefined);
    })
});