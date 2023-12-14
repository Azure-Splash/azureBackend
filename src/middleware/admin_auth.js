const {Worker}  = require('../models/WorkersModel.js');


// Middleware to check if the user is an admin
const authAdmin = async (request, response, next) => {
    const userId = request.worker.isaAdmin; // Assuming you have middleware to set req.user with the authenticated user
  
    try {
      const worker = await User.findById(worker.isAdmin);
      
      if (!worker || !Worker.authAdmin) {
        return response.status(403).json({ message: 'Permission denied. Admins only.' });
      }
  
      // User is an admin, proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error checking admin status:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  module.exports= { authAdmin}