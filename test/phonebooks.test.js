'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app')
const Phonebook = require('../models/phonebook')

chai.should();
chai.use(chaiHTTP);

describe('phonebooks', () => {
    Phonebook.collection.drop();
    beforeEach((done) => {
        let phonebook = new Phonebook({
            name: 'Zack',
            phone: '081122334488'
        })
        phonebook.save((err) => {
            done();
        })
    })

    afterEach((done) => {
        Phonebook.collection.drop();
        done()
    })

    it('Should list ALL phonebooks on /api/phonebooks GET', (done) => {
        chai.request(server)
        .get('/api/phonebooks')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('_id');
            res.body[0].should.have.property('name');
            res.body[0].should.have.property('phone');
            res.body[0].name.should.equal('Zack');
            res.body[0].phone.should.equal('081122334488');
            done();
        })
    })

    // it('should list a single phonebook on /phonebooks/<id> GET', (done) => {
    //     let phonebook = new Phonebook({
    //         name: 'Novri',
    //         phone: '081122334422'
    //     });
    //     phonebook.save((err,data) => {
    //         chai.request(server)
    //         .get(`/phonebooks/${data.id}`)
    //         .end((err,res) => {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('object');
    //             res.body.should.have.property('_id');
    //             res.body.should.have.property('name');
    //             res.body.should.have.property('phone');
    //             res.body.name.should.equal('Novri');
    //             res.body.phone.should.equal('081122334422');
    //             res.body._id.should.equal(data.id)
    //         })
    //     })
    // })

    it('shoud add a single phonebook on /phonebooks POST', (done) => {
        chai.request(server)
        .post('/phonebooks')
        .send({'name': 'Novri', 'phone': '081122334422'})
        .end((err, res) => {
            res.should.have.status(200);
            
        })
    })
});