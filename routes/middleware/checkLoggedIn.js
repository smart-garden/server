// Middleware ued to make sure the user is logged in before allowing request
function checkLoggedIn(req, res, next) {
    //if not logged in, take to login page
    if (!req.session || !req.session.User) {
        res.redirect('/');
    }
    else {
        // if logged in then allow request
        next();
    }
}

module.exports = checkLoggedIn;