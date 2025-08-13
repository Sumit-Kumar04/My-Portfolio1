require('dotenv').config();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
var cors = require('cors')
const express=require('express');
const app=express();
const {isValidDetail}=require('./middleware.js');
app.use(cors())
const path=require('path');
app.use(express.urlencoded({ extended: true }));
app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs'); 
app.use(express.static('public'));
app.use(express.json());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

app.post('/send-email',isValidDetail, (req, res) => {
  const { name, email, message } = req.body;
     
  const mailOptions = {
    from: email, // sender address 
    to: process.env.GMAIL_USER, 
    subject: `New message from ${name} via contact form`,
    text: `You have a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ status: 'fail', message: 'Error sending email' });
    }
    return res.status(200).json({ status: 'success', message: 'Email sent' });
  });

});
  


app.listen(8080,()=>{
    console.log("App is listening");
})
app.get("/",(req,res)=>{
    res.render("index.ejs")
})
app.get("/aboutMe",(req,res)=>{
    res.render("aboutMe.ejs");
})