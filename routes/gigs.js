const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// get gig list
router.get('/', (req, res) => 
    Gig.findAll({raw: true})
    .then(gigs =>  {
        res.render('gigs', {
            gigs
        });
    })
    .catch(err => console.log(err)));

//display add gig 
router.get('/add', (req, res) => res.render('add'))

// add a gig
router.post('/add', (req, res)=> {
    let { title, technologies, budget, description, contact_email } = req.body;
    let errors = [];
    
    if (!title) {
        errors.push({ text: 'Please add a title'});
    }
    if (!technologies) {
        errors.push({ text: 'Please add technologies'}); 
    }
    if (!description) {
        errors.push({ text: 'Please add a description'});
    }
    if (!contact_email) {
        errors.push({ text: 'Please add an email'});
    }
    if(errors.length>0) {
        res.render('add', {
            errors,
            title, 
            technologies, 
            budget, 
            description, 
            contact_email
        });
    } else {
        if (!budget) {
            budget = 'Unknown';
        } else {
            budget = `$${budget}`;
        }

        // go to lowercase + deleting '.'
        technologies = technologies.toLowerCase().replace(/, /g, ',')
        // inserting
        Gig.create({
            title,
            technologies,
            budget,
            description,
            contact_email
        })
        .then(gig => res.redirect('/gigs'))
        .catch(err => console.log(err));
    }
});

// searching 
router.get('/search', (req, res) => {
    let { term } = req.query;
    term = term.toLowerCase();

    Gig.findAll({ raw: true, where: {technologies: { [Op.like]: '%'+term+'%'}}})
        .then(gigs => res.render('gigs', {gigs}))
        .catch(err => console.log(err));
});

module.exports = router;