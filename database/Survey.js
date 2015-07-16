var mongoose=require('mongoose');
var SurveySchema=mongoose.Schema({
    FinishedTime:{type:Date,default:Date.now()},
    ifClosed:{type:Boolean,default:false},
    SurveyTitle:String,
    email:{type:String,default:"匿名用户"},
    comments:[{
        username:String,
        comment:String,
        date:Date
    }]
});
console.info("加载Survey成功");
var Survey=mongoose.model('Survey',SurveySchema);
module.exports=Survey;

//测试实例
if (require.main == module){
    console.log("SurveyModel Test");
    mongoose.connect('mongodb://localhost/test');
    var newSurvey=Survey({
        SurveyTitle:"关于调整两台监控机的操作系统的调查"

    });
    newSurvey.save(function(err){
        if(err){
            console.log(err);
        }else{
            console.log("save ok");
        }
    });
}