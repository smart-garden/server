var express = require('express');
var router = express.Router();
var models = require("../model");
var dbs = require('../client/database.js');
var db = require("../model/index");

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

router.post('/signup/submit', function(req, res) {
  dbs.addUser(req.body.firstname, req.body.lastname, req.body.username, req.body.email, function (data, success) {
    if (success) {
      var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email
      }
      res.json(user);
    }
    else {
      console.log("no good");
    }
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

/* GET register page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    title: 'Register a New Garden | Add a Garden or Module',
    title_slug: "register",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Register"
    },
    user: fakeUser
  });
});

/* GET manage all gardens page. */
router.get('/manage', function(req, res, next) {
  res.render('manage', {
    title: 'Mange Gardens | Stay In Control',
    title_slug: "manage",
    view_ctx: {
      prev: [
        "Home"
      ],
      curr: "Manage Gardens"
    },
    user: fakeUser,
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
router.get('/manage/:gardenId', function(req, res, next) {
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
    user: fakeUser
  });
});

module.exports = router;
