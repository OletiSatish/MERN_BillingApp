// roleMiddleware.js

const roleMiddleware = (role) => {
    return (req, res, next) => {
      const userRole = req.user?.role;  // Assuming req.user is set by the authMiddleware
      if (userRole !== role) {
        return res.status(403).json({ message: 'Access denied' });
      }
      next();
    };
  };
  
  module.exports = roleMiddleware;
  