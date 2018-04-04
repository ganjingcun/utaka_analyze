/**
 * 钉钉机器人
 * @机制：通过配置文件来配置，并且可以有分组
 */
var https = require('https');
var url  = require('url');

exports = module.exports = function (app) {
  return new DTRobot(app);
};

function DTRobot (app) {
  // this.dtrobot_webhook = app.get('mmc');
  this.dtrobot_groups = {
    "ops": {
      "webhook": "https://oapi.dingtalk.com/robot/send?access_token=9af0ce951f9b374a779d206ae5c2d3265edf08dfc76f84020478298ccf3b7f74",
      "members": [
        "18695636303"
      ]
    }
  };
  this.dtrobot_webhook = 'https://oapi.dingtalk.com/robot/send?access_token=9af0ce951f9b374a779d206ae5c2d3265edf08dfc76f84020478298ccf3b7f74';
  
};

DTRobot.prototype.send = function (msgObj, group) {
  var urlObj = url.parse(this.dtrobot_webhook);
  var respJson = '';
  var reqObj = {
    protocol: urlObj.protocol,
    hostname: urlObj.hostname,
    port:     443,
    path:     urlObj.path,
    method:   'POST',
    headers:  {
      'Content-Type': 'application/json'
    }
  };
  if (urlObj.port) {
    reqObj.port = urlObj.port;
  }
  var req = https.request(reqObj, function(res){
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      respJson += chunk;
    });
    res.on('end', function () {
      console.log(respJson);
    });
  });
  req.on('error', function () {
    console.log(`problem with request: ${e.message}`);
  });
  req.write(JSON.stringify(msgObj));
  req.end();
};

/**
 * @param text text message for robot to send
 * @param groupAt group to at, group name or all
 */
DTRobot.prototype.sendText = function (text, groupAt) {
  this.send({
    msgtype: "text",
    text: {
      content: text
    },
    at: {
      atMobiles: [
        // "13003958518"
      ],
      isAtAll: false
    }
  });
};

DTRobot.prototype.sendLink = function (title, text, msgUrl, picUrl, groupAt) {
  var msgObj = {
    msgtype: 'link',
    link: {
      text: text,
      title: title,
      messageUrl: msgUrl
    }
  };

  if (picUrl) {
    msgObj.link.picUrl = picUrl;
  }

  this.send(msgObj);
};

DTRobot.prototype.sendMarkdown = function (title, text, groupAt) {
  this.send({
    msgtype: "markdown",
    "markdown": {
      title: title,
      text: text
    }
  });
};
