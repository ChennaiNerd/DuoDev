/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
    if (req.user) {
        res.render('chat', {
            title: 'Operator chats',
            operatorName: req.user.profile.name
        });
        return;
    }

    res.render('home', {
        title: 'Home'
    });
};

