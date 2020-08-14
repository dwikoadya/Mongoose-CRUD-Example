var express = require('express');
var router = express.Router();
var Phonebook = require('../models/phonebook');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Phonebook.find({}).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({err})
  })
});

router.post('/', function(req, res, next) {
  Phonebook.create({
    name: req.body.name,
    phone: req.body.phone
  }).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({err})
  })
});

router.put('/:id', function(req, res, next) {
  Phonebook.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    phone: req.body.phone
  }, { 
    new: true 
  }).then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({err})
  })
});

router.delete('/:id', function(req, res, next) {
  Phonebook.findByIdAndRemove(req.params.id)
  .then((data) => {
    res.json(data)
  }).catch((err) => {
    res.json({err})
  })
});

module.exports = router;
