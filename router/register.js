const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users= require('../data/userModel');

router.post('/', async (req, res) => {
    try{
        let user = req.body;
        console.log(user);
        const hash = bcrypt.hashSync(user.password, 3);
        console.log(hash);
        if(user.username && user.password && user.phone && user.email){
            console.log(user);
            user.password = hash;
            const user = await Users.add(user);
            if(user){
              console.log(user);
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
