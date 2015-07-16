var express = require('express');
var router = express.Router();
var Questions=require('../database/Questionaire.js');
var Survey=require('../database/Survey.js');
var underscore=require("underscore");
/* GET users listing. */
router.post('/submitVote', function(req, res, next) {
    console.log(req.body);
    var title=req.body.surveyTitle,result=req.body.result["q_"];
    var questionlist=underscore.keys(result);
    console.log(questionlist);
        Questions.find({"beloneTo":title},function(err,docs){
            if(docs){
                for(var i=0;i<questionlist.length;i++) {
                    var q_sn = questionlist[i];
                    var q_sn_string=q_sn.toString();
                    for (var x = 0; x < docs.length; x++) {
                        if (docs[x].SerialNumber == q_sn) {
                            var answers = docs[x].answer;
                            var a_list = result[q_sn_string];
                            var a_list_keys = underscore.keys(a_list);
                            console.log("a_list_keys:" + a_list_keys);
                            for (var j = 0; j < a_list_keys.length; j++) {
                                var a_num = parseInt(a_list_keys[j].replace(/[^0-9]/ig, ""));
                                for (var k = 0; k < answers.length; k++) {
                                    if (answers[k].id == a_num) {
                                        answers[k].voteNumber = answers[k].voteNumber + 1;
                                    }
                                }
                            }

                            docs[x].answer=answers;
                            docs[x].save();
                        }
                    }
                }
                res.send("服务器已获得数据");
            }else{
                console.log("Can't found any questions");
                res.status(500).send("服务器暂无响应数据");
            }
        });



});

router.get('/getSurvey', function (req,res,next) {
    console.log(req.body);
    Survey.find({"ifClosed":false}).sort({FinishedTime:-1}).exec(function (err,doc){
        if(doc){
            Questions.find({"beloneTo":doc[0].SurveyTitle}).sort({SerialNumber:1}).exec(function (err,questions) {
                if(questions){
                    res.status(200).send({ title: '调查问卷',
                        allSurvey:doc,
                        allQuestions:questions
                    });
                }else{
                    res.status(404).send({ title: '调查问卷',
                        allSurvey:doc,
                        allQuestions:""
                    });
                }
            });

        }else{
            res.status(404).send({ title: '调查问卷',
                question:"暂无调查问卷"
            });
        }
    });
});

router.post('/newComment', function (req,res,next) {
    console.log(req.body);

    Survey.findOne({"SurveyTitle":req.body.title}, function (err,doc) {
        if(doc){
        var newComment={
            username:req.body.username,
            comment:req.body.newComment,
            date:req.body.dateTime
        };
        doc.comments.push(newComment);
        doc.save(function (err) {
            if(err){
                res.status(500).send("服务器无法处理请求");
            }else{
                res.send("添加评论成功");
            }
        });
        }else{
            res.status(404).send("服务器未找到对应的话题");
        }
    });

});



router.get("/getLastVote", function (req,res,next) {
    Survey.find({"ifClosed":false}).sort({FinishedTime:-1}).exec(function (err,doc){
        if(doc){
            Questions.find({"beloneTo":doc[0].SurveyTitle}).sort({SerialNumber:1}).exec(function (err,questions) {
                if(questions){
                    res.status(200).send({ title: '调查问卷',
                        allSurvey:doc,
                        allQuestions:questions
                    });
                }else{
                    res.status(404).send({ title: '调查问卷',
                        allSurvey:doc,
                        allQuestions:""
                    });
                }
            });

        }else{
            res.status(404).send({ title: '调查问卷',
                question:"暂无调查问卷"
            });
        }
    });
})
module.exports = router;
