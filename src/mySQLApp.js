const express = require('express');
const { mySQLConn } = require('./mySQLConfig');
const http = require('http');
const BULK_SIZE = 10000;
const COLLECT_INTERVAL_MILISECOND = 5000;
const LIMIT = 1000;
//const app = express();
var Client = require('node-rest-client').Client;

var client = new Client();

mySQLConn.connect((error) => {
    if (!!error) { console.log('error', error) }
    else console.log('connected to mysql..');
});

var currentOffset = 0;
var iCollect = 0;
var noRows = 0;

var collectInterval = setInterval(collectDataByOffset, COLLECT_INTERVAL_MILISECOND);

function collectDataByOffset() {
    var offset = currentOffset;
    var sql = `select * from denormal_transaction_cross_2017_2018 order by updated_at limit ${offset},${LIMIT}`;

    //console.log(sql);
    mySQLConn.query(sql, function (error, rows, fields) {
        if (error) throw error;

        if (rows.length) {
            var loop = Math.ceil(rows.length / BULK_SIZE);
            for (var i = 0; i < loop; i++) {
                start = i * BULK_SIZE;
                stop = start + BULK_SIZE;
                //console.log('loop:',i,' offset: ',start,stop);
                var bulkRows = rows.slice(start, stop);
                //connsole.log(bulkRows);
                sendRequest(bulkRows);
            }
        } else {
            noRows++;
            if (noRows === 10) {
                console.log('No rows threshold limit exceeded. exiting job.... ');
                clearInterval(collectInterval);
            }
        }
    });
    currentOffset = iCollect * LIMIT;
    iCollect++;
    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`MySQL Collect Memory usage : ${Math.round(used * 100) / 100} MB`);

}


//var collectInterval = setInterval(cobaCollect,COLLECT_INTERVAL_MILISECOND);
function cobaCollect() {
    var now = new Date();
    var anHourAgo = new Date(now.getTime() - (1 * 1000 * 60 * 60));
    var from = anHourAgo.getFullYear() + '-' + (anHourAgo.getMonth() + 1) + '-' + anHourAgo.getDate();
    from += ' ' + anHourAgo.getHours() + ':' + anHourAgo.getMinutes() + ':' + anHourAgo.getSeconds();
    var to = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    to += ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
    console.log('1 hour ago :', from, to);
    collectDataByDate(from, to);
}

function collectDataByDate(from, to) {
    var sql = 'select * from denormal_transaction_cross_2017_2018 order by updated_at';

    mySQLConn.query(sql, function (error, rows, fields) {
        if (error) throw error;

        if (rows.length) {
            var loop = Math.ceil(rows.length / BULK_SIZE);
            for (var i = 0; i < loop; i++) {
                start = i * BULK_SIZE;
                stop = start + BULK_SIZE;
                console.log('loop:', i, ' offset: ', start, stop);
                var bulkRows = rows.slice(start, stop);
                //connsole.log(bulkRows);
                sendRequest(bulkRows);
            }
        }

    });

    const used = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Memory usage : ${Math.round(used * 100) / 100} MB`);
}

function onInsert(err, docs) {
    if (err) {
        // TODO: handle error
    } else {
        console.info('%d docs were successfully stored.', docs.length);
    }
}

function sendRequest(row) {
    var args = {
        data: row,
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://localhost:9433/denormal", args, function (data, response) {
        // parsed response body as js object
        //console.log(data);
        // raw response
        console.log(response.statusMessage);
    });
}

//app.listen(1333);

