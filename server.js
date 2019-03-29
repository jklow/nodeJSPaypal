require('dotenv').config();

var express = require('express');
var bodyParser = require('body-parser');

var serveStatic = require('serve-static');

var transact=require('./paypal_lib/transact')

var app = express();
var port=process.env.OPENSHIFT_NODEJS_PORT || 3000;
var hostname=process.env.OPENSHIFT_NODEJS_IP || "localhost";

app.use(bodyParser.json());

var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);//attach body-parser middleware


//console.log(process.env.PAYPAL_CLIENT_ID);
app.post('/api/create-paypal-transaction', function (req, res) {
  console.log("API create paypal transaction called!");
  console.log(req.body);  

  transact(req,res);

});
app.post('/api/paypal-transaction-complete', function (req, res) {
  console.log("API paypal transaction complete!");
  console.log(req.body);//print orderID
  return res.sendStatus(200);


});

app.use(serveStatic(__dirname + '/public'));


app.listen(port, hostname, () => {
    console.log(`Server started and accessible via http://${hostname}:${port}/`);
  });