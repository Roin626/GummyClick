(function (window, document) {

    var Money_display=document.getElementById("Money_display");
    var Lv_display=document.getElementById("Lv_display");
    var Tools_display=document.getElementById("Tools_display");
    var Clicker_display=document.getElementById("clicker_display");
    var Feeling_display=document.getElementById("feeling_display");

    let display=function (){ //显示数值
        Money_display.innerHTML=attribute_dic["Money"];
        Lv_display.innerHTML=attribute_dic["Lv"];
        Tools_display.innerHTML=attribute_dic["Tools"];
        Clicker_display.innerHTML=attribute_dic["Clicker"];
        Feeling_display.innerHTML=attribute_dic["Feeling"];
        progress_bar();
        $save_game();
    }

    let progress_bar=function (){
        var timemax=3600;
        var feeling=parseFloat(attribute_dic["Feeling"]);
        var width=(feeling/timemax)*100;
        if(width<=100){
            width=width+"%"
        }else {
            width="100%"
        }

        document.getElementById("feeling_bar").style.width=width;
    }


    var li_num=0;
    let writeLogOl=function (arguments,color){//文本档案记录
        var logStr = '·';
        for (var i = 0; i < arguments.length; i++) {
				logStr += arguments[i];
        }

        var logOl=document.getElementById("logol");
        var li=document.createElement("li");
        if (color!=null){
				li.style.color=color
        }else {
				li.style.color= "#000000"
        }

        li.innerHTML=logStr;
        li.className="hideSlow"

        li_num++;
        li.id="logol1"+li_num;
        if (li_num>20){
            li_id=li_num-20;
            var kill1_id = "logol1" + li_id;
            var obj=document.getElementById(kill1_id);
            obj.remove();
        }
        logOl.appendChild(li);
        //获取log栏id，滚动条始终在最下
        var div = document.getElementById('logol');
        div.scrollTop = div.scrollHeight;
    }

    window.$Display=display;
    window.$Writelog=writeLogOl;
})(window, document);

