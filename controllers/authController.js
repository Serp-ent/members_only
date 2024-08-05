const checkAuthentication = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).redirect('/log-in');
    return;
  }

  next();
}

module.exports = {
  checkAuthentication,
}