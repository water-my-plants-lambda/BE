const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users= require('../data/userModel');
router.post('/', async (req, res) => {
    try{
        let user = req.body;
        const hash = bcrypt.hashSync(user.password, 3);
        if(user.username && user.password && user.phone && user.email){
            user.password = hash;
            const user = await Users.add(user);
            if(user){
              res.status(201).json({message: "Registration Successful", user})
            }
        } else {
            res.status(402).json({error: 'Please provide a Username, Password, Email and Phone number'})
        }
    } catch(error) {
        res.status(500).json({ error: "Unable to Register, try again"});
    }
});

module.exports = router;
