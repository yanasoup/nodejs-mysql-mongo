let DenormalModel = require('../models/denormal.model');
let express = require('express');
let router = express.Router();

process.setMaxListeners(5);

router.post('/denormal', (req, res) => {
    if (!req.body) {
        return res.status(400).send('the body request is missing');
    }

    //var obj = req.body;
    //console.log('request ',obj);
    //var request = req.body;

    DenormalModel.collection.insertMany(req.body, { ordered: false }, (err, docs) => {

        if (err) {
            var resp = {
                success: false,
                msg: `Error insert ${err}`
            }
            console.log(`Error insert ${err}`);
            return res.status(500).send(resp);
        }
        var resp = {
            success: true,
            msg: `saved`
        }
        console.log('inserted ', req.body.length);
        //request = [];
        return res.status(200).send(resp);
    })

    DenormalModel.on('index', function (err) {
        console.log('index error ', err);
    });

    /*var query = {'t_id':req.params.t_id};    
    DenormalModel.findOneAndUpdate(query, req, {upsert:true}, function(err, doc){
        if (err) return res.send(500, { error: err });        
        else {
            console.log(`${req.params.t_id} succesfully saved`);
            return res.send("succesfully saved");
        }
    });*/

    /*let model = new DenormalModel(req.body);
    model.save()
    .then(doc => {
        if(!doc || doc.length === 0) {
            return res.status(500).send(doc);
        }

        var resp = {
            success: true,
            msg: `${doc.t_id} saved`
        }
        res.status(200).send(JSON.stringify(resp));
    })
    .catch(err => {
        res.status(500).json(err);
    })*/


    var used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`mongo Memory usage : ${Math.round(used * 100) / 100} MB`);

});



module.exports = router;