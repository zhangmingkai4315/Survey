var mongoose=require('mongoose');
var CommentSchema=mongoose.Schema({
    FinishedTime:{type:Date,default:Date.now()},
    beloneTo:String,
    email:{type:String,default:"匿名用户"},
    comment:String
});
console.info("加载Comments成功");
var Comment=mongoose.model('Comment',CommentSchema);
module.exports=Comment;

//测试实例
if (require.main == module){
    console.log("CommentModel Test");
    mongoose.connect('mongodb://localhost/test');
    var q1=Comment({
        beloneTo:"NNN",
        email:"test@qq.com",
        comment:"this is a comment"

    });
    q1.save(function (err) {
        if(err){
            console.log(err);
        }else{
            console.log("Save ok");
        }
    })
}