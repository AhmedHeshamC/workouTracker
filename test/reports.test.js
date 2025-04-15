const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

// Note: These tests assume the 'protect' middleware is working.
// We primarily test the unauthorized case due to pending DB/JWT logic.

describe('Report Routes', () => {

    describe('GET /api/v1/reports/progress', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .get('/api/v1/reports/progress')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });

        // TODO: Add test case for successful GET with a valid token once login provides real tokens
        // it('it should GET the progress report with a valid token', (done) => { ... });
    });
});
