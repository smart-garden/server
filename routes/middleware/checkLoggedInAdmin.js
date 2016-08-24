// Middleware ued to make sure the user is logged in before allowing request
function checkLoggedInAdmin(req, res, next) {
    //if not logged in, take to login page
    if (!req.session || !req.session.user) {
        res.redirect('/admin');
    }
    else {
        if (req.session.user.role === 'admin') {
          // if logged in then allow request
          next();
        } else {
          res.redirect('/admin');
        }
    }
}

module.exports = checkLoggedInAdmin;
