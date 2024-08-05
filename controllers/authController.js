const checkAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).redirect('/log-in');
    return;
  }

  next();
}

const checkIfAdmin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).redirect('/log-in');
    return;
  }

  console.log(req.user);
  if (!req.user.isadmin) {
    res.status(401).send('You have to be admin to perform this action');
    return;
  }

  next();
}

module.exports = {
  checkAuthentication,
  checkIfAdmin,
}