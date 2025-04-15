const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server'); // Import your server instance
const should = chai.should();

chai.use(chaiHttp);

describe('Auth Routes', () => {
    // Since DB logic is pending, we test the placeholder responses

    describe('POST /api/v1/auth/signup', () => {
        it('it should return 201 and signup message for valid input', (done) => {
            const user = {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            };
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Signup successful (DB logic pending)');
                    res.body.should.have.property('username').eql(user.username);
                    res.body.should.have.property('email').eql(user.email);
                    done();
                });
        });

        it('it should return 400 if required fields are missing', (done) => {
            const user = { email: 'test@example.com' }; // Missing username and password
            chai.request(server)
                .post('/api/v1/auth/signup')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Please provide username, email, and password');
                    done();
                });
        });
    });

    describe('POST /api/v1/auth/login', () => {
        it('it should return 200 and login message for valid input', (done) => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123'
            };
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Login successful (DB/JWT logic pending)');
                    res.body.should.have.property('accessToken').eql('dummy_token');
                    done();
                });
        });

        it('it should return 400 if required fields are missing', (done) => {
            const credentials = { email: 'test@example.com' }; // Missing password
            chai.request(server)
                .post('/api/v1/auth/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Please provide email and password');
                    done();
                });
        });
    });
});
