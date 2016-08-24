// Middleware ued to make sure the user is logged out before allowing request
function checkLoggedOut(req, res, next) {
    //if logged in, take to home page
    if (req.session && req.session.user) {
        if (req.session.user.role === 'admin') {
          res.redirect('/admin/panel');
        }
        else {
          res.redirect('/home');
        }
    }
    else {
        // if logged in then allow request
        next();
    }
}

module.exports = checkLoggedOut;
