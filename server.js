var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');
var port = 8080;
var router = express.Router();

var Data_node = require('./app/models/data_node');

app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/data_node');

router.get('/',function (req,res) {
    res.json({
        message:"Welcome to REST API Sample"
    });
});

router.route('/semua_data_node')
    .post(function (req,res) {
        var data_node = new Data_node();
        data_node.nama_node = req.body.nama_node;
        data_node.posisi_x = req.body.posisi_x;
        data_node.posisi_y = req.body.posisi_y;
        data_node.konsentrasi_gas = req.body.konsentrasi_gas;
        data_node.save(function (err) {
            if(err) res.send(err);
            else res.json({
                message:'new user created'
            });
        });
    })
    .get(function (req,res) {
        Data_node.find(function (err,users) {
            if(err) res.send(err);
            else res.json(users);
        });
    });


    router.route('/data_node/:nama_node')
    .get(function (req,res) {
        Data_node.find({
            nama_node:req.params.nama_node
        },function (err,hasil) {
            if(err) res.send(err);
            else res.json(hasil);
        });
    })                                                
    .delete(function (req,res) {
        Data_node.remove({
            nama_node:req.params.nama_node
        }, function (err,hasil) {
            if(err) res.send(err);
            else res.json({
                message:'data deleted'
            })
        });
    });

app.use('/api',router); // prefix for 'router'
app.listen(port); // this service will listen on port defined at point 1
console.log('services started at port : '+port);