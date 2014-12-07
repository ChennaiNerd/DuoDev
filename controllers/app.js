var crypto = require('crypto');

/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
    if (req.cookies.name && req.cookies.email) {
        return res.redirect('/app');
    }

    res.render('index', {
        title: 'DuoDev'
    });
};

/**
 * POST /
 * Signin or Start
 */

exports.post = function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    if (name && email) {
      res.cookie('name', name, {
        expires: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000)
      });
      res.cookie('email', email, {
        expires: new Date(Date.now() + 365 * 2 * 24 * 60 * 60 * 1000)
      });

      console.log(req.cookies.name);
        return res.redirect('/app');
    } else {
        req.flash('errors', { msg: 'Please enter name and email!' });
        return res.redirect('/');
    }
}

var getGravatar = function(email, size) {
  if (!size) size = 200;

  if (!this.email) {
    return 'https://gravatar.com/avatar/?s=' + size + '&d=retro';
  }

  var md5 = crypto.createHash('md5').update(email).digest('hex');
  return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

/**
 * GET /app
 * App page.
 */

exports.app = function(req, res) {
    var name = req.cookies.name;
    var email = req.cookies.email;
    if (name && email) {
        var gravatar = getGravatar(email);

        res.render('app', {
            title: 'DuoDev',
            name: name,
            email: email,
            gravatar: gravatar
        });
    } else {
        req.flash('errors', { msg: 'Please enter name and email!' });
        return res.redirect('/');
    }
};

/**
 * GET /logout
 * Logout
 */

exports.logout = function (req, res) {
    res.clearCookie('name');
    res.clearCookie('email');
    return res.redirect('/');
}