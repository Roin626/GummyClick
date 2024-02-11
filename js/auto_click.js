(function (window, document) {
    //自动点击的建造检测
    let check_build_click=function (){
        var tools=parseFloat(attribute_dic["Tools"]);
        var clicker =  parseFloat(attribute_dic["Clicker"]);

        var cost=clicker*2+1; //消耗零件数量

        if (tools>=cost){
            $build_click();
            tools=tools-cost;
            attribute_dic["Tools"]=tools;
            $Display();
        }

    }
    //建造自动点击
    let build_auto_click=function (){
        var clicker =  parseFloat(attribute_dic["Clicker"]);
        clicker+=1;
        attribute_dic["Clicker"] = clicker;
        clickset ();
    }

    //快速点击的建造检测
    let check_build_feelingclick=function (){
        var lv=parseFloat(attribute_dic["Lv"]);
        var feeling =  parseFloat(attribute_dic["Feeling"]);

        var cost=1; //消耗玩具数量

        if (lv>=cost){
            lv=lv-cost;
            feeling=feeling+30;//一点玩具加30秒快速点击
            attribute_dic["Lv"]=lv;
            attribute_dic["Feeling"]=feeling;
            feelingclickset();
            $Display();
        }

    }



    window.$build_click=build_auto_click;
    window.$checkbuild_click=check_build_click;
    window.$checkbuild_feeling=check_build_feelingclick;

})(window, document);


//自动点击功能
function autoclick(){
    document.getElementById("Gelbutton").click();
}
//自动点击的事件设置
var theClicker;//计时器
function clickset (){
    var clicker =  parseFloat(attribute_dic["Clicker"]);
    if(clicker<1){
        theClicker=setInterval(autoclick, 10000) //10秒点一次
    }else {
       clearInterval(theClicker);
        var timeout = 10000;//10秒
        if(timeout>=100){
            timeout=timeout-100*clicker;
        }
        theClicker=setInterval(autoclick, timeout) //10-100*clicker秒点一次
    }
}

//高速点击的事件设置
var feelingClicker;//计时器
var Timer;//计时器
function timer(){
    var feeling =  parseFloat(attribute_dic["Feeling"]);
    feeling-=1;//feeling减1秒
    attribute_dic["Feeling"]=feeling;

    if(feeling==0){//倒计时结束后，停止高速点击和倒计时
        clearInterval(feelingClicker);
        clearInterval(Timer);
    }
    $Display();
}
function feelingclickset (){//高速点击事件设置
    $Writelog("猫猫心情大好开始拍拍","#ebff47");
    var feeling =  parseFloat(attribute_dic["Feeling"]);
    if(feeling<1){
        feelingClicker=setInterval(autoclick, 500)//0.5秒点一次
        Timer=setInterval(timer, 1000)//每秒倒计时
    }else {//重置高速点击事件
        clearInterval(feelingClicker);
        clearInterval(Timer);
        feelingClicker=setInterval(autoclick, 500)//0.5秒点一次
        Timer=setInterval(timer, 1000)//每秒倒计时
    }



}



