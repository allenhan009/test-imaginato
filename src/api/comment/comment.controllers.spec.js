const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../../server');
const should = chai.should();

chai.use(chaiHttp);

describe('Comments', ()  => {
    describe('/GET /api/comments/:articleId', () => {
        it('it should get all comments of given article', (done) => {
            chai.request(app)
            .get('/api/comments/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf.above(1);

                done();
            });
        });

        it('it should get 0 comments of given article', (done) => {
            chai.request(app)
            .get('/api/comments/4')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                expect(res.body).to.have.lengthOf.below(1);

                done();
            });
        });

        it('it should leave the comment for given article', (done) => {
            chai.request(app)
            .post('/api/comments/10')
            .send({
                "comment_id": 1,
                "nickname": "anonymous",
                "content": "BBBBBBBBBBBBB BBBBBB CCCCC"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('message');
                expect(res.body.message).to.eql('Insert success!');

                done();
            });
        });

        

        it('it should get error message when the comment of comment not match article', (done) => {
            chai.request(app)
            .post('/api/comments/30/comment/1')
            .send({
                "comment_id": 1,
                "nickname": "anonymous",
                "content": "BBBBBBBBBBBBB BBBBBB CCCCC"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('errorCode', 'errorMessage');
                expect(res.body.errorCode).to.eq(404);
                expect(res.body.errorMessage).to.eql(`Don't match article with the comment!`);

                done();
            });
        });
    });

    describe('/POST /api/comments/:articleId', () => {
        it('it should leave a comment for the article', (done) => {
            chai.request(app)
            .post('/api/comments/10')
            .send({
                "nickname": "anonymous",
                "content": "BBBBBBBBBBBBB BBBBBB CCCCC"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('message');
                expect(res.body.message).to.eql('Insert success!');

                done();
            });
        });

        it('it should get error message when the comment of comment not match article', (done) => {
            chai.request(app)
            .post('/api/comments/300')
            .send({
                "nickname": "anonymous",
                "content": "BBBBBBBBBBBBB BBBBBB CCCCC"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('errorCode', 'errorMessage');
                expect(res.body.errorCode).to.eq(404);
                expect(res.body.errorMessage).to.eql(`Not found article`);

                done();
            });
        });
    });

    describe('/POST /api/comments/:articleId/comment/:commentId', () => {
        it('it should leave a comment for the comment', (done) => {
            chai.request(app)
            .post('/api/comments/3/comment/42')
            .send({
                "nickname": "anonymous",
                "content": "BBBBBBBBBBBBB BBBBBB CCCCC"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('message');
                expect(res.body.message).to.eql('Insert success!');

                done();
            });
        });

        it('it should get error message when the comment of comment not match article', (done) => {
            chai.request(app)
            .post('/api/comments/30/comment/1')
            .send({
                "comment_id": 1,
                "nickname": "anonymous",
                "content": "BBBBBBBBBBBBB BBBBBB CCCCC"
            })
            .end((err, res) => {
                res.should.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.keys('errorCode', 'errorMessage');
                expect(res.body.errorCode).to.eq(404);
                expect(res.body.errorMessage).to.eql(`Don't match article with the comment!`);

                done();
            });
        });
    });
});