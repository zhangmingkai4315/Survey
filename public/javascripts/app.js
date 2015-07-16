var app=angular.module("SurveyApp",["chart.js"]);
app.config(function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
        responsive: true
    });
    // Configure all doughnut charts
    ChartJsProvider.setOptions('Doughnut', {
        animateScale: true
    });
});
app.controller('BodyController', ['$scope', '$http', function ($scope, $http) {
    $scope.voteData={};
    $scope.MainDisplay={
        alarmBar:false,
        alarmType:'alert-danger',
        alarmInfo:""
    };
    $http.get("/api/getLastVote").success(function(data){
        $scope.MainDisplay.alarmBar=false;
        $scope.voteData=data;
    }).error(function (err) {
        $scope.MainDisplay.alarmBar=true;
        $scope.MainDisplay.alarmInfo="无法获得服务器响应";
    });
}]);



app.controller('VoteController', function ($scope,$http,$window) {

    $scope.formData = {
        result:{},
        surveyTitle:""
    };
    $scope.UIDisplay={
        alarmBar:false,
        alarmType:'alert-danger',
        alarmInfo:""
    };
    $scope.confirmDialog= function () {
        $scope.UIDisplay.alarmBar=false;
        $(".confirmDialog").modal();
    }
    $scope.submitVoteForm= function (title,totalQuestions) {
        $scope.formData.surveyTitle=title;
        console.log(totalQuestions);
        console.log($scope.formData);
        if((_.keys($scope.formData.result["q_"]).length)!=totalQuestions){
            $scope.UIDisplay.alarmInfo="无法提交表单，请确认已完成所有问题!";
            $scope.UIDisplay.alarmBar=true;
        }else{
            $scope.UIDisplay.alarmBar=false;
            //alert("Submit");
            var url="/api/submitVote";
            $http.post(url,$scope.formData)
                .success(function (data) {
                   $scope.UIDisplay.alarmBar=true;
                   $scope.UIDisplay.alarmType="alert-success"
                   $scope.UIDisplay.alarmInfo="已成功提交表单";
                    $window.location.href="/show";
                }).error(function(err){
                   $scope.UIDisplay.alarmBar=true;
                   $scope.UIDisplay.alarmInfo=err;
                });
        }


    }
    $scope.showVoteResult= function () {
        $window.location.href="/show";
    }
});


app.controller('ShowController', function ($scope,$http) {

    var url="/api/getSurvey";
    $scope.UIDisplay={
        alarmBar:false,
        alarmType:'alert-danger',
        alarmInfo:""
    };
    $scope.$on("newComment", function (event,data) {
        var newComment={
            username:data.username,
            comment:data.newComment,
            date:data.dateTime
        };

        $scope.showData.allSurvey[0].comments.push(newComment);
        console.log($scope.showData.allSurvey[0]);
    })
    $scope.showData={

    };
    $http.get(url).success(function (data) {
        $scope.showData=data;
        for(var i=0;i<data.allQuestions.length;i++){
            var temp=[];
            temp[0]=(_.pluck(data.allQuestions[i].answer,"voteNumber"));
            $scope.showData.allQuestions[i].data=temp;
            $scope.showData.allQuestions[i].labels=_.pluck(data.allQuestions[i].answer,"id");
            $scope.$broadcast('toCommentController',$scope.showData);
            console.log($scope.showData);
        }
    }).error(function (err) {
        $scope.UIDisplay.alarmBar=true;
        $scope.UIDisplay.alarmInfo=err;
    });

});

app.controller('CommentController', function ($scope,$http) {
    $scope.comment={"username":"匿名用户",
        newComment:""
    };

    $scope.$on('toCommentController', function (event,data) {
        $scope.showData=data;
    });

    $scope.addNewComment=function(){
        if($scope.comment.newComment.length==0||$scope.comment.newComment.length>140){
            $scope.showMessage=true;
            $scope.showMessageClass="alert-danger";
            $scope.showMessageData="请填写评论,并确保长度合适后发送";
        }else{
            $scope.showMessage=false;
            var dateTime=Date.now();
            $scope.comment.dateTime=Date.now();
            $scope.comment.title=$scope.showData.allSurvey[0].SurveyTitle;
            $http.post("/api/newComment",$scope.comment).success(function (data) {
                $scope.showMessage=true;
                $scope.showMessageData=data;
                $scope.showMessageClass="alert-success";

                $scope.$emit("newComment",$scope.comment);
            }).error(function () {
                $scope.showMessage=true;
                $scope.showMessageClass="alert-danger";
                $scope.showMessageData="服务器暂时无法提供服务";
            });
        }
    }
});
