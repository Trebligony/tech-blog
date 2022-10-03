const router = require('express').Router();
const { Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name'],
                }
            ],
        });

        const comments = commentData.map((comment) => comment.get({ plain: true }));

        res.render('post', {
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id
            },
        });

        if (!commentData) {
            res.status(404).json({ message: "No comment with this id! "});
        }

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;