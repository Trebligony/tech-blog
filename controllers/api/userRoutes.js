const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Find if email address is already in database
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        // If email doesn't exist in database, send message saying the email or password is incorrect
        if (!userData) {
            res.status(400).json({ message: "Incorrect email or password. Please try again" });
            return;
        }

        // Check if the password matches what's in the database
        const validPassword = await userData.checkPassword(req.body.password);

        // If password doesn't match what's in the database, send message saying the email or password is incorrect
        if (!validPassword) {
            res.status(400).json({ message: "Incorrect email or password. Please try again" });
            return;
        }

        // If all userData is correct and matches what's in the database, save the session and log the user in
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({
                user: userData,
                message: "You are now logged in!" 
            });
        })
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;