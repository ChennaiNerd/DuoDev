/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
    // if (req.user) {
    //     res.render('chat', {
    //         title: 'Operator chats',
    //         operatorName: req.user.profile.name
    //     });
    //     return;
    // }

    res.render('index', {
        title: 'DuoDev'
    });
};

exports.post = function (req, res) {
    var name = req.params.name;
    var email = req.params.email;
    if (name && email) {
      res.cookie('name', name, {
        expires: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000)
      });
      res.cookie('email', email, {
        expires: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000)
      });
    }

    return res.redirect('/app');
}
