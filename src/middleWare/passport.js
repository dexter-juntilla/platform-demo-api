export const adminPassport = (admin: Object) => (
  req: Object,
  res: Object,
  next: Function,
) => {
  try {
    const { headers } = req;
    if (headers.authorization) {
      admin
        .auth()
        .verifyIdToken(headers.authorization)
        .then(claims => {
          if (claims && claims.admin === true) {
            next();
          } else {
            res.status(403).json({ message: 'admin only' });
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'server error' });
        });
    } else {
      res.status(401).json({ message: 'unathorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'server error' });
  }
};
