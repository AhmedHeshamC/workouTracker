const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

chai.use(chaiHttp);

// Note: These tests assume the 'protect' middleware is working.
// We primarily test the unauthorized case due to pending DB/JWT logic.

describe('Workout Routes', () => {
    const workoutId = 'abc123'; // Dummy ID
    const workoutData = {
        name: "Morning Routine",
        description: "A quick morning workout",
        scheduledAt: "2023-10-25T07:00:00Z",
        exercises: [{ exerciseId: "ex123", sets: 3, reps: 12 }]
    };

    describe('POST /api/v1/workouts', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .post('/api/v1/workouts')
                .send(workoutData)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });
        // TODO: Add test for successful POST with valid token and data (once auth/DB implemented)
        // TODO: Add test for 400 Bad Request on invalid data (e.g., missing name/exercises)
    });

    describe('GET /api/v1/workouts', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .get('/api/v1/workouts')
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });
        // TODO: Add test for successful GET all with valid token
    });

    describe('GET /api/v1/workouts/:workoutId', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .get(`/api/v1/workouts/${workoutId}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });
        // TODO: Add test for successful GET by ID with valid token
    });

    describe('PUT /api/v1/workouts/:workoutId', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .put(`/api/v1/workouts/${workoutId}`)
                .send({ name: "Updated Routine" })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });
        // TODO: Add test for successful PUT with valid token and data
    });

    describe('DELETE /api/v1/workouts/:workoutId', () => {
        it('it should return 401 Unauthorized if no token is provided', (done) => {
            chai.request(server)
                .delete(`/api/v1/workouts/${workoutId}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.have.property('message').eql('Not authorized, no token');
                    done();
                });
        });
        // TODO: Add test for successful DELETE with valid token (expect 204)
    });
});
