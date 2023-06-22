const jwt = require('jsonwebtoken');
const JWT_SECRET = 'abc';

// Middleware function
 const authMiddleware = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).send({ error: 'Please authenticate using a valid token' });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data; // Attach the authenticated user to the request object
    console.log(req.user);
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate using a correct token' });
  }
};
module.exports= authMiddleware;