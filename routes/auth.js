const express = require('express');
const router = express.Router();
const passport  = require('passport');

//@desc Auth with google
//@route GET /auth/google
router.get('/google', passport.authenticate('google', {scope:['profile', 'https://storybooks-app-ak.herokuapp.com/auth/google/callback']}));

//@desc Google auth callback
//@route GET /auth/google/callback
router.get('auth/google/callback', passport.authenticate(
    'google', {
        failureRedirect: '/'
    }, 
    {
        callbackURL: 'https://storybooks-app-ak.herokuapp.com/auth/google/callback'
    }), 
    (req, res) => {
        res.redirect('/dashboard');
})

//@desc Logout user
//@route /auth/logout
router.get('/logout', (req,res) => {
    req.logout();
    res.redirect('/');
})


module.exports = router;