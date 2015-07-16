var mongoose=require('mongoose');
var setting=require('../setting');
var url='mongodb://'+setting.host+':'+setting.port+'/'+setting.db;
var db=mongoose.createConnection(url);
db.on('error',console.error.bind(console, '连接数据库失败:'));
db.once('open',console.info.bind(console, '连接Mongo数据库成功:'));

module.exports=db;