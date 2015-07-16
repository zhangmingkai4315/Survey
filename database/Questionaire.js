var mongoose=require('mongoose');
var QuestionSchema=mongoose.Schema({
    FinishedTime:{type:Date,default:Date.now()},
    beloneTo:String,
    question:String,
    answer:[{
        id:String,
        content:String,
        voteNumber:{type:Number,default:0}
    }],
    message:[String],
    SerialNumber:{type:Number,default:1},
    infomation:{type:String,default:""},
    SingleOrMulti:{type:Boolean,default:false}
});

var Questions=mongoose.model('Question',QuestionSchema);
module.exports=Questions;
console.info("加载Questions成功");
//测试实例
if (require.main == module){
    console.log("Questionaire Mode Test");
    mongoose.connect('mongodb://localhost/test');
    var q1=[ {
        "beloneTo" : "关于调整两台监控机的操作系统的调查",
        "question" : "评价一下对于监控机的使用体验",
        "SingleOrMulti" : false,
        "SerialNumber" : 1,
        "answer" : [
        {
            "id" : "1",
            "content" : "体验很好，没什么问题",
            "voteNumber" : 0
        },
        {
            "id" : "2",
            "content" : "偶尔有问题",
            "voteNumber" : 0
        },
        {
            "id" : "3",
            "content" : "经常有各种使用上的问题",
            "voteNumber" : 0
        },
        {
            "id" : "4",
            "content" : "难以忍受,值班体验太差了",
            "voteNumber" : 0
        }]
    },
        {"beloneTo" : "关于调整两台监控机的操作系统的调查",
        "question" : "你希望继续使用windows操作系统吗",
        "SerialNumber" : 3,
        "message" : [],
        "answer" : [
            {
                "id" : "1",
                "content" : "希望继续使用",
                "voteNumber" : 0
            },
            {
                "id" : "2",
                "content" : "无所谓",
                "voteNumber" : 0
            },
            {
                "id" : "3",
                "content" : "希望换成Linux系统",
                "voteNumber" : 0
            }
        ]
    },
        {
            "beloneTo" : "关于调整两台监控机的操作系统的调查",
            "question" : "你觉得现在的Windows系统是否有以下问题",
            "SingleOrMulti" : false,
            "SerialNumber" : 2,
            "answer" : [
                {
                    "id" : "1",
                    "content" : "系统兼容性不好",
                    "voteNumber" : 0
                },
                {
                    "id" : "2",
                    "content" : "系统运行缓慢",
                    "voteNumber" : 0
                },
                {
                    "id" : "3",
                    "content" : "安全性能不好",
                    "voteNumber" : 0
                },
                {
                    "id" : "4",
                    "content" : "运维软件比较少",
                    "voteNumber" : 0
                },
                {
                    "id" : "5",
                    "content" : "没什么问题",
                    "voteNumber" : 0
                }
            ]
        },
        {
            "beloneTo" : "关于调整两台监控机的操作系统的调查",
            "question" : "如果更换操作系统,您更喜欢使用下列那个系统",
            "SingleOrMulti" : false,
            "SerialNumber" : 4,
            "answer" : [
                {
                    "id" : "1",
                    "content" : "CentOS",
                    "voteNumber" : 0
                },
                {
                    "id" : "2",
                    "content" : "Ubuntu",
                    "voteNumber" : 0
                },
                {
                    "id" : "3",
                    "content" : "Fedora",
                    "voteNumber" : 0
                },

                {
                    "id" : "4",
                    "content" : "FreeBSD",
                    "voteNumber" : 0
                },{
                    "id" : "5",
                    "content" : "ReaHat",
                    "voteNumber" : 0
                },{
                    "id" : "6",
                    "content" : "Debian",
                    "voteNumber" : 0
                }
            ]
        },
        {
            "beloneTo" : "关于调整两台监控机的操作系统的调查",
            "question" : "如果更换系统，您觉得是否能解决上述的问题",
            "SingleOrMulti" : false,
            "SerialNumber" : 5,
            "answer" : [
                {
                    "id" : "1",
                    "content" : "是",
                    "voteNumber" : 0
                },
                {
                    "id" : "2",
                    "content" : "否",
                    "voteNumber" : 0
                }
                ]
        }

    ];
    for(var i=0;i<q1.length;i++){
        Questions(q1[i]).save(function (err) {
            if(err){
                console.log(err);
            }else{
                console.log("Save ok");
            }
        });
    }

}