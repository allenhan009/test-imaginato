const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Articles', ()  => {
    describe('/GET /api/articles', () => {
        it('it should limit 20 in 1st page', (done) => {
            chai.request(app)
            .get('/api/articles')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf.below(21);

                done();
            });
        });

        it('it should below 20 in 2nd page', (done) => {
            chai.request(app)
            .get('/api/articles?page=2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf.below(20);

                done();
            });
        });

        it('it should is 0 in 3rd page', (done) => {
            chai.request(app)
            .get('/api/articles?page=10')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf.below(1);

                done();
            });
        });
    });

    describe('/GET /api/articles/:id', () => {
        it('it should get content of article by id', (done) => {
            chai.request(app)
            .get('/api/articles/1')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('content');

                done();
            });
        });

        it('it should get error message not found with the article id', (done) => {
            chai.request(app)
            .get('/api/articles/3000')
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('errorCode', 'errorMessage');
                expect(res.body.errorCode).to.eq(404);
                expect(res.body.errorMessage).to.contain('Not found');

                done();
            });
        });
    });

    describe('/POST /api/articles', () => {
        it('it should add new article', (done) => {
            chai.request(app)
            .post('/api/articles')
            .send({
                "nickname": "Test_n",
                "title": "Article Test N",
                "content": "Test N Content",
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('message');
                expect(res.body.message).to.eql('Insert success!');

                done();
            });
        });
    });
});