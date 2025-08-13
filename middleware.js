const e = require("express");

module.exports.isValidDetail=(req,res,next)=>{
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
    return res.status(400).json({ status: 'fail', message: 'All fields required' });
  }
    next();
  
}