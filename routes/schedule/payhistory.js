/**
 * Created by Joe on 18/03/12.
 */
var express = require('express');
var router = express.Router();
var os = require('os')
var moment = require('moment');
moment.locale("zh-CN");
var _ = require('lodash');
var async = require('async');
var addresses = require('./config');

var moment = require('moment');
var cheerio = require('cheerio');
var superagent = require('superagent');

var mysql = require('mysql');  //调用MySQL模块

//创建mysql连接池
var pool = mysql.createPool({
    host: 'mysql',
    port: '3306',
    database: 'pools',
    user: 'root',
    password: 'root'
});

/**
	*    *    *    *    *    *
	┬    ┬    ┬    ┬    ┬    ┬
	│    │    │    │    │    |
	│    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
	│    │    │    │    └───── month (1 - 12)
	│    │    │    └────────── day of month (1 - 31)
	│    │    └─────────────── hour (0 - 23)
	│    └──────────────────── minute (0 - 59)
	└───────────────────────── second (0 - 59, OPTIONAL)
 */
var schedule = require('node-schedule');

//b网支付记录
schedule.scheduleJob('1 1 * * * *', function () {
    console.log('The bw pay histoty scheduleJob run', moment().format('YYYY-MM-DD HH:mm:ss'));
    fetchBWHistory();
});

//星火支付记录
schedule.scheduleJob('1 3 * * * *', function () {
    console.log('The ethfans pay histoty scheduleJob run', moment().format('YYYY-MM-DD HH:mm:ss'));
    fetchETHFANSHistory();
});

//btc.com支付历史
schedule.scheduleJob('1 5 * * * *', function () {
    console.log('The btc.com pay histoty scheduleJob run', moment().format('YYYY-MM-DD HH:mm:ss'));
    fetchBTCHistory();
});

//鱼池支付历史
schedule.scheduleJob('1 7 * * * *', function () {
    console.log('The fish pay histoty scheduleJob run', moment().format('YYYY-MM-DD HH:mm:ss'));
    fetchFishHistory();
});


function fetchBWHistory() {

    _.each(addresses.bw, function (address) {
        var fetchUrl = `https://eth.bw.com/pool/incomeDetails/ajax?coint=eth&addr=${address}`
        superagent.get(fetchUrl).end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                console.error(err)
                return;
            }

            var result = [];

            var $ = cheerio.load(sres.text);
            var trs = $('tbody tr');
            $(trs).each(function (idx, element) {
                var $element = $(element);
                var tds = $element.find("td");

                var time = $(tds[0]).text().trim();
                var num = $(tds[2]).text()
                var lastCommit = moment(time).format('YYYY-MM-DD HH:mm');
                result.push({
                    time: lastCommit,
                    total: num,
                    tag: 'bw',
                    address: address
                })
            });

            writeMysql(result)
        });
    })
}

function fetchETHFANSHistory() {

    _.each(addresses.ethfans, function (address) {
        var account = address.slice(2);
        var fetchUrl = `https://eth.ethfans.org/api/miner/${account}/bill`

        superagent.get(fetchUrl).end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                console.error(err)
                return;
            }

            var result = [];
            var rows = sres.body.data
            _.each(rows, function (row) {
                var num = (row.paid / 1000000000000000000).toFixed(5)
                var lastCommit = moment(row.time).format('YYYY-MM-DD HH:mm');
                result.push({
                    time: lastCommit,
                    total: num,
                    tag: 'ethfans',
                    address: address
                })
            })

            writeMysql(result)
        });

    })
}

function fetchBTCHistory() {
    
    _.each(addresses.btc, function (address) {
        var fetchUrl = `https://cn-pool.api.btc.com/v1/account/earn-history?page=1&page_size=50&reason=1&access_key=${address}&puid=71095&lang=zh-cn`

        superagent.get(fetchUrl).end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                console.error(err)
                return;
            }

            var pageCount = sres.body.data.page_count;
            var payHistorys = [];

            async.timesLimit(pageCount, 5, function (n, next) {
                var helpUrl = `https://cn-pool.api.btc.com/v1/account/earn-history?page=${n + 1}&page_size=50&reason=1&access_key=${address}&puid=71095&lang=zh-cn`
                superagent.get(helpUrl).end(function (err, sres) {
                    if (err) {
                        return next(err);
                    }
                    if (sres.body && sres.body.data && sres.body.data.list) {
                        payHistorys = _.concat(payHistorys, sres.body.data.list);
                    }

                    next(err);
                })

            }, function (err) {
                var result = [];
                _.each(payHistorys, function (history) {
                    var num = (history.earnings / 100000000).toFixed(8);
                    var lastCommit = moment(history.date, "YYYYMMDD").format('YYYY-MM-DD HH:mm');
                    result.push({
                        time: lastCommit,
                        total: num,
                        tag: 'btc.com',
                        address: address
                    })
                })
                writeMysql(result)

            });
        });

    })
}

function fetchFishHistory() {

    _.each(addresses.fish, function (address) {
        var fetchUrl = `http://api.f2pool.com/eth/${address}`

        superagent.get(fetchUrl).end(function (err, sres) {
            // 常规的错误处理
            if (err) {
                return;
            }

            var payout_history = sres.body.payout_history
            var result = [];
            _.each(payout_history, function (history) {
                var num = history[2]
                var lastCommit = moment(history[0]).format('YYYY-MM-DD HH:mm');

                result.push({
                    time: lastCommit,
                    total: num,
                    tag: 'fish',
                    address: address
                })
            })
            writeMysql(result)
        });

    })
}

function writeMysql(history) {
    pool.getConnection(function (err, connection) {
        async.each(history, function (row, callback) {
            var sql = `insert into pay_history values(null, '${row.time}', '${row.tag + '_' + row.address}','${row.tag}', '${row.address}', '${row.total}')`;
            connection.query(sql, function (err, result) { });
        }, function (err) {
            connection.release();
        });
    });
}

fetchBTCHistory();
fetchBWHistory();
fetchETHFANSHistory();
fetchFishHistory();

module.exports = router;