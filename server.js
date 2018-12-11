const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const modelDevices = require('./model/devicesModel');
var Particle = require('particle-api-js');
var particle = new Particle();
var token;

mongoose.connect('mongodb://localhost/DevicesList');

//connexion a la DB si il se connecte envoi un message ainsi losrqu'il ne se connecte pas egalement
var db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open',function() {
console.log('DB Connected ! '); 

});


// je configure mon body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



particle.login({username: 'goimo@hotmail.fr', password: '0007Cb1e6b82'}).then(
    function(data){
        console.log('API call completed on promise resolve: ', data.body.access_token);
        
        var devicesPr = particle.listDevices({ auth: data.body.access_token });
        
        devicesPr.then(
            function(devices){
                devices.body.forEach(function(value) {
                    
       
                    var nouveauDevices = new modelDevices(value);
                    nouveauDevices.save(function(err, res2) {
            
                        if(err)
                        {
                            console.log(err);
                
                        } else {
                            
                            console.log(res2);
                        }
                    });
            
                });
                
              console.log('Devices: ', devices);
            },
            function(err) {
              console.log('List devices call failed: ', err);
            }
          );
    },
    function(err) {
      console.log('API call completed on promise fail: ', err);
    }
  );
  
  
  

/*declaré un repertoire static*/
app.use('/static', express.static('client'));

app.get('/', function(req, res) {

    /* Envoi une réponse au client*/
    res.sendFile(__dirname + '/client/index.html');

});

app.get('/api/devices/',function(req,res){
    modelDevices.find({},function(err,resDevices){
        if(err)
        return console.log('error');
        res.send(resDevices);
        console.log(resDevices);
    })
});

/* écoute sur le port 8080*/
app.listen(8080,function(){
    console.log('Server lancé ! ')
});