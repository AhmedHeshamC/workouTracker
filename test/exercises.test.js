const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

// Note: These tests assume the 'protect' middleware is working.
// Since DB/JWT logic is pending, we'll primarily test the unauthorized case.
// A dummy token won't work without the actual verification logic.

describe('Exercise Routes', () => {

    describe('GET /api/v1/exercises', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .get('/api/v1/exercises')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });

        // TODO: Add test case for successful GET with a valid token once login provides real tokens
        // it('it should GET all the exercises with a valid token', (done) => { ... });
    });

    describe('GET /api/v1/exercises/:exerciseId', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            const exerciseId = '12345'; // Dummy ID
            chai.request(server)
                .get(`/api/v1/exercises/${exerciseId}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });

        // TODO: Add test case for successful GET by ID with a valid token
        // it('it should GET an exercise by the given id with a valid token', (done) => { ... });
    });
});
