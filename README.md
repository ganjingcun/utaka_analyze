
## Build Setup

流程
* 利用javascript定时去抓取页面相关内容
* 数据整理后存入influxdb
* grafana 从influxdb 中取出数据进行展示

``` bash
# install dependencies
npm install

# start server
npm start

## 启动influxdb + grafna
docker-compose up -d 

打开浏览器： 
http://localhost:13000 
帐号 admin 密码 abcd1234


## 用到的库及文档
node-schedule: 定时器
superagent: http://visionmedia.github.io/superagent/
cheerio: https://github.com/cheeriojs/cheerio  可以理解成一个 Node.js 版的 jquery
influxdb: https://docs.influxdata.com/influxdb/v0.8/api/query_language/
grafana: http://docs.grafana.org/features/datasources/influxdb/

```

