import { expect } from 'chai'
import { agent as request } from 'supertest'
import app from '../app'
import User from '../models/user'
import UserPlan from '../models/userplan';

describe('Index Test', () => {
    it('should always pass', (done) => {
        expect(true).to.equal(true);
        done();
    });
    it('should connect to the server', async () => {
        const res = await request(app).get('/');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
    it('should ping the auth server', async () => {
        const res = await request(app).get('/api/v1/auth/ping');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
    it('should ping the user server', async () => {
        const res = await request(app).get('/api/v1/users/ping');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
    it('should ping the userplan server', async () => {
        const res = await request(app).get('/api/v1/userplans/ping');
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.key('message');
    });
});

describe('Get all route tests', () => {
    it('should get all users', async () => {
        const res = await request(app).get('/api/v1/users/all');
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.a.property('count').is.a('number');
        expect(res.body).to.have.a.property('message').equal('Users successfully fetched');
    });
    it('should get all userplans', async () => {
        const res = await request(app).get('/api/v1/userplans/all').send({ userplan: 'first userplan' });
        expect(res.status).to.equal(200);
        expect(res.body).not.to.be.empty;
        expect(res.body.status).to.equal('success');
        expect(res.body.data).to.be.an('object');
        expect(res.body.data).to.have.a.property('count').is.a('number');
        expect(res.body).to.have.a.property('message').equal('User plans successfully fetched');
    });
});

describe('Register route tests', () => {
    before((done) => {
        User.deleteMany({}, (err) => {
    done();
        });
    });
    it('should register user', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(201);
        expect(res.body).not.to.be.empty;
        expect(res.body).to.have.a.property('message').equal('User successfully created');
        expect(res.body.user).to.be.an('object');
    });
    it('should not register user if firstname is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if lastname is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if email is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if phone is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if password is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if phone number is less than 10', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if email format is wrong', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abdeaoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if firstname is less than 3 characters', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'za',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if lastname is less than 3 characters', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'er',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not contain at least a capital letter', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3swe@44re#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not contain at least a small letter', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3$RH8C@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not containat least a symbol', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sChg67gR'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not contain at least a number', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '%&GHGjsC@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password is less than 8 characters ', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
});

describe('Login route tests before email verification', () => {
    it('should not log user in before email verification', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'abde@aoil.com',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(406);
        expect(res.body).to.be.empty;
        // expect(res.body).to.have.a.property('message').equal('User successfully created');
        // expect(res.body.user).to.be.an('object');
    });
    it('should not log user in before email verification if email is missing', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
        // expect(res.body).to.have.a.property('message').equal('User successfully created');
        // expect(res.body.user).to.be.an('object');
    });
    it('should not log user in before email verification if password is missing', async () => {
        const res = await request(app).post('/api/v1/auth/login').send({
            email: 'abde@aoil.com'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
        // expect(res.body).to.have.a.property('message').equal('User successfully created');
        // expect(res.body.user).to.be.an('object');
    });
});

describe('Email verification', () => {
    // it('should not log user in before email verification', async () => {
    //     const res = await request(app).post('/api/v1/auth/login').send({
    //         email: 'abde@aoil.com',
    //         password: '3sC4p@R#'
    //     });
    //     expect(res.status).to.be.equal(406);
    //     expect(res.body).to.be.empty;
    //     // expect(res.body).to.have.a.property('message').equal('User successfully created');
    //     // expect(res.body.user).to.be.an('object');
    // });
    // it('should not log user in before email verification if email is missing', async () => {
    //     const res = await request(app).post('/api/v1/auth/login').send({
    //         password: '3sC4p@R#'
    //     });
    //     expect(res.status).to.be.equal(400);
    //     expect(res.body).to.be.empty;
    //     // expect(res.body).to.have.a.property('message').equal('User successfully created');
    //     // expect(res.body.user).to.be.an('object');
    // });
    // it('should not log user in before email verification if password is missing', async () => {
    //     const res = await request(app).post('/api/v1/auth/login').send({
    //         email: 'abde@aoil.com'
    //     });
    //     expect(res.status).to.be.equal(400);
    //     expect(res.body).to.be.empty;
    //     // expect(res.body).to.have.a.property('message').equal('User successfully created');
    //     // expect(res.body.user).to.be.an('object');
    // });
});

describe('Post route tests', () => {
    before((done) => {
        UserPlan.deleteMany({}, (err) => {
            done();
        });
    });
    it('should add new userplan data', async () => {
        const res = await request(app)
            .post('/api/v1/userplans/add')
            .send({
                name: 'Barka',
                features: ['has a nice feature', 'has another nice feature', 'has one other nice feature'],
                price: 5000
            });
        expect(res.status).to.be.equal(201);
        expect(res.body).not.to.be.empty;
    });
    it('should not add new userplan data if name is missing', async () => {
        const res = await request(app)
            .post('/api/v1/userplans/add')
            .send({
                features: ['has a nice feature', 'has another nice feature', 'has one other nice feature'],
                price: 5000
            });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not add new userplan data if features is missing', async () => {
        const res = await request(app).post('/api/v1/userplans/add').send({
            name: 'Barka',
            price: 5000
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not add new userplan data if price is missing', async () => {
        const res = await request(app)
            .post('/api/v1/userplans/add')
            .send({
                name: 'Barka',
                features: ['has a nice feature', 'has another nice feature', 'has one other nice feature']
            });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not add data to the userplan data if name is less than 4 characters', async () => {
        const res = await request(app)
            .post('/api/v1/userplans/add')
            .send({
                name: 'Te',
                features: ['has a nice feature', 'has another nice feature', 'has one other nice feature'],
                price: 5000
            });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
});

describe('Duplicate register route tests', () => {    
    it('should not register duplicate user', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(422);
        expect(res.body).to.be.empty;
    });
    it('should not register user if firstname is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if lastname is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if email is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if phone is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if password is missing', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if phone number is less than 10', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if email format is wrong', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abdeaoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if firstname is less than 3 characters', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'za',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user if lastname is less than 3 characters', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'er',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC4p@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not contain at least a capital letter', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3swe@44re#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not contain at least a small letter', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3$RH8C@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not containat least a symbol', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sChg67gR'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password does not contain at least a number', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '%&GHGjsC@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
    it('should not register user is password is less than 8 characters ', async () => {
        const res = await request(app).post('/api/v1/auth/register').send({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '3sC@R#'
        });
        expect(res.status).to.be.equal(400);
        expect(res.body).to.be.empty;
    });
});

describe('Get single by id route tests', () => {
    before((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });
    before((done) => {
        UserPlan.deleteMany({}, (err) => {
            done();
        });
    });
    it('should a user get by id', (done) => {
        let user = new User({
            firstname: 'Eliza',
            lastname: 'Banner',
            email: 'abde@aoil.com',
            phone: '08023458293',
            password: '%34GjsC@R#'
        });
        user.save((err, user) => {
            if (err) {
                done(err);
            }
            
            request(app)
                .get(`/api/v1/users/${user._id}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('status').equal('success');
                    expect(res.body).to.have.a.property('message').equal('User successfully fetched');
                    expect(res.body.data.user).to.be.an('object');
                    done();
                });
        });
    });
    it('should get by id userplans', (done) => {
        let userplan = new UserPlan({
            name: 'Barka',
            features: ['has a nice feature', 'has another nice feature', 'has one other nice feature'],
            price: 5000
        });
        userplan.save((err, userplan) => {
            if (err) {
                done(err);
            }
            request(app)
                .get(`/api/v1/userplans/${userplan._id}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('status').equal('success');
                    expect(res.body).to.have.a.property('message').equal('User plan successfully fetched');
                    expect(res.body.data.userplan).to.be.an('object');
                    done();
                });
        });
    });
});

describe('Edit route tests', () => {
    // beforeEach((done) => {
    //     User.deleteMany({}, (err) => {
    //         done();
    //     });
    // });
    // before((done) => {
    //     UserPlan.deleteMany({}, (err) => {
    //         done();
    //     });
    // });
    it('should edit a user by the given id', (done) => {
        let user = new User({
            name: 'Test1',
            email: 'test1@tist.test',
            phone: '13649152557',
            userplan: ['6146ff749250f63f63671622']
        });
        user.save((err, user) => {
            if (err) {
                done(err);
            }

            request(app)
                .put(`/api/v1/users/edit/${user._id}`)
                .send({
                    name: 'Test2',
                    phone: '132397525537',
                    userplan: [{ _id: '614e5aa5e3b97402ad30ed0c', name: 'Credit' }]
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body.updatedUser).to.be.an('object');
                    expect(res.body).to.have.a.property('message').equal('User successfully updated');
                    done();
                });
        });
    });
    it('should not edit a user if userplan is missing', (done) => {
        let user = new User({
            name: 'Test1',
            email: 'test1@tist.test',
            phone: '13649152557',
            userplan: ['6146ff749250f63f63671622']
        });
        user.save((err, user) => {
            if (err) {
                done(err);
            }

            request(app)
                .put(`/api/v1/users/edit/${user._id}`)
                .send({
                    name: 'Test2',
                    phone: '132397525537'
                })
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });
    it('should edit a userplan by the given id', (done) => {
        let userplan = new UserPlan({
            name: 'Test1'
        });
        userplan.save((err, userplan) => {
            if (err) {
                done(err);
            }
            request(app)
                .put(`/api/v1/userplans/edit/${userplan._id}`)
                .send({ name: 'Test2' })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body.updatedUserPlan).to.be.an('object');
                    expect(res.body).to.have.a.property('message').equal('UserPlan successfully updated');
                    done();
                });
        });
    });
    it('should not edit a userplan if name is empty', (done) => {
        let userplan = new UserPlan({
            name: 'Test3'
        });
        userplan.save((err, userplan) => {
            if (err) {
                done(err);
            }
            request(app)
                .put(`/api/v1/userplans/edit/${userplan._id}`)
                .send({ name: '' })
                .end((err, res) => {
                    expect(res.status).to.be.equal(400);
                    expect(res.body).to.be.empty;
                    done();
                });
        });
    });
});

describe('Delete route tests', () => {
    // before((done) => {
    //     User.deleteMany({}, (err) => {
    //         done();
    //     });
    // });
    // before((done) => {
    //     UserPlan.deleteMany({}, (err) => {
    //         done();
    //     });
    // });
    it('should delete a user by the given id', (done) => {
        let user = new User({
            name: 'Test1',
            email: 'test1@tist.test',
            phone: '13649152557',
            userplan: ['6146ff749250f63f63671622']
        });
        user.save((err, user) => {
            if (err) {
                done(err);
            }

            request(app)
                .delete(`/api/v1/users/delete/${user._id}`)
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('message').equal('User successfully deleted');
                    done();
                });
        });
    });
    it('should delete a userplan by the given id', (done) => {
        let userplan = new UserPlan({
            name: 'Test1'
        });
        userplan.save((err, userplan) => {
            if (err) {
                done(err);
            }
            request(app)
                .delete(`/api/v1/userplans/delete/${userplan._id}`)
                .send({ name: 'Test2' })
                .end((err, res) => {
                    expect(res.status).to.be.equal(200);
                    expect(res.body).not.to.be.empty;
                    expect(res.body).to.have.a.property('message').equal('UserPlan successfully deleted');
                    done();
                });
        });
    });
});