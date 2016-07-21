var express = require('express');
var router = express.Router();

var db = require("../model/index");

function slugify(text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'SmartGarden | login to SmartGarden', title_slug: "login" });
});

router.get('/login/submit/:name', function(req, res) {
  db.user.find({
    where: {
      name: req.params.id
    }
  }).then(function(user) {
    res.json(user);
  });
});

//Tim's addition
/* GET SignUp Page. */
router.get('/signup', function(req, res, next) {
  res.render('signup', { title: 'SmartGarden SignUp | Innovating Gardening', title_slug: "signup" });
});
//end of addition


/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('home', { title: 'SmartGarden Home | Innovating Gardening', title_slug: "home" });
});

// TODO Remove this when we have a real user implememtnation
var fakeUser = {
  name: "Username1",
  pass: "fakePass",
  email: "myemail@me.com"
};

/* GET settings page. */
router.get('/settings', function(req, res, next) {
  res.render('settings', {
    title: 'User Settings | Manage your SmartGarden Account',
    title_slug: "settings",
    // TODO: Implement an actual breadcrumb system
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Settings"
    },
    user: fakeUser
  });
});

/* GET alerts page. */
router.get('/alerts', function(req, res, next) {
  res.render('alerts', {
    title: 'User Alerts | Stay on top of your SmartGarden tasks',
    title_slug: "alerts",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Alerts"
    },
    user: fakeUser
  });
});

/* GET alerts page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register a New Garden | Add a Garden or Module',
    title_slug: "alerts",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Register"
    },
    user: fakeUser
  });
});

module.exports = router;
