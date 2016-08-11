var express = require('express');
var router = express.Router();
var db = require('../client/database.js');

var checkLoggedIn = require('./middleware/checkLoggedIn.js');
var checkLoggedOut = require('./middleware/checkLoggedout.js');

// NOTE: These are dummy objects of no real use set up for the purpose
//        of creating a realistic routing mockup
// TODO Remove this when we have a real user implementation
var fakeUser = {
  name: "Username1",
  pass: "fakePass",
  email: "myemail@me.com"
};
var gardens_exist = true;
var gardens = [
  {
    id: 'fakeId1',
    ph: '14',
    species: 'chard',
    days_remain: '48'
  },
  {
    id: 'fakeId2',
    ph: '7',
    species: 'arugula',
    days_remain: '17'
  }
];

// END REMOVE DUMMIES

/* GET login page. */
router.get('/', checkLoggedOut, function(req, res, next) {
  res.render('login', { title: 'SmartGarden | login to SmartGarden', title_slug: "login" });
});

/*POST login information*/
//ISSUE:passwords store as undefined in postgres right now through the form.
//so this doesn't authenticate by password yet.
router.post('/login/submit/', checkLoggedOut, function(req, res) {
  var email = req.body.email;
  var pass = req.body.pass;

  db.getUser(email, pass, function (user, success) {
      if (!success) {
          var msg = "incorrect login credentials";
          res.render('login', {
             title: 'SmartGarden | login to SmartGarden',
             title_slug: "login",
             msg: msg
           });
      }
      else {
          console.log(user);
          req.session.user = user;
          res.redirect('/home');
      }
  });
});

/* POST the signup form into database and returns
success or failure */
router.post('/signup/submit', function(req, res) {
  db.addUser(req.body.firstname, req.body.lastname, req.body.email, req.body.username, req.body.pass, function (data, success) {
    if (success) {
      var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        //TODO: password encryption
        pass: req.body.pass,
        email: req.body.email
      };
      var msg = "sign up successful";
      req.session.user = user;
      res.render('home', {
        title: 'SmartGarden SignUp | Innovating Gardening',
        title_slug: "signup",
        user: req.session.user.username,
        msg:msg
      });
    }
    else {
      var msg = "username or email already in use";
      res.render('signup', {
        title: 'SmartGarden SignUp | Innovating Gardening',
        title_slug: "signup",
        msg:msg
      });
    }
  });
});

/* GET SignUp Page. */
router.get('/signup', checkLoggedOut, function(req, res, next) {
  res.render('signup', {
    title: 'SmartGarden SignUp | Innovating Gardening',
    title_slug: "signup"
  });
});

/* GET home page. */
router.get('/home', checkLoggedIn, function(req, res, next) {
  res.render('home', {
    title: 'SmartGarden Home | Innovating Gardening',
    title_slug: "home",
    user: req.session.user.username
  });
});

/* GET settings page. */
router.get('/settings', checkLoggedIn, function(req, res, next) {
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
    user: req.session.user.username
  });
});

/* GET alerts page. */
router.get('/alerts', checkLoggedIn, function(req, res, next) {
  res.render('alerts', {
    title: 'User Alerts | Stay on top of your SmartGarden tasks',
    title_slug: "alerts",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Alerts"
    },
    user: req.session.user.username
  });
});

/* GET register page. */
router.get('/register', checkLoggedIn, function(req, res, next) {
  res.render('register', {
    title: 'Register a New Garden | Add a Garden or Module',
    title_slug: "register",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Register"
    },
    user: req.session.user.username
  });
});

/* GET manage all gardens page. */
router.get('/manage', checkLoggedIn, function(req, res, next) {
  res.render('manage', {
    title: 'Mange Gardens | Stay In Control',
    title_slug: "manage",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Manage Gardens"
    },
    user: req.session.user.username,
    gardens: gardens,
    gardens_exist: gardens_exist
  });
});

// Nice little function to look through gardens array for
// garden object with a matching id
function matchGarden(g) {
  return (g.id == this);
}

/* GET manage individual garden page. */
router.get('/manage/:gardenId', checkLoggedIn, function(req, res, next) {
  // get the garden id param from the http req
  var garden_id = req.params.gardenId;
  // match the garden from gardens[] w/ matching id
  var specific = gardens.find(matchGarden,garden_id);

  res.render('manager', {
    specific: specific,
    garden_id: garden_id,
    title: 'Manage Single Garden | Manage'+specific.species+' Garden '+garden_id+'',
    title_slug: "manage",
    view_ctx: {
      prev: [
        "Home",
        "Manage"
      ],
      curr: specific.species + " garden " + garden_id
    },
    user: req.session.user.username

  });
});

/*GET logout page. */
router.get('/logout/', checkLoggedIn, function(req, res, next){
  // Destroy the session.
  req.session.destroy(function(err){
    console.log(err);
  });
  // Redirect to the login page.
  res.redirect('/');
});

module.exports = router;
