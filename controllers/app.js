/**
 * GET /app
 * App page.
 */

exports.index = function(req, res) {
    res.render('app', {
        title: 'DuoDev',
        name: res.cookie.name,
        email: res.cookie.email
    });
};

