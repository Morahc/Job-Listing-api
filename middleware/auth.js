import jwt from 'jsonwebtoken';
import Employer from '../models/User.js';

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await Employer.findById(decoded.id);
      next();
    } catch (error) {
      res.status(400).json({ msg: 'Not Authorized' });
      console.error(error);
    }
  }

  if (!token) {
    res.status(401).json({ msg: 'No Token, Not Authorized' });
  }
};

export { protect };
