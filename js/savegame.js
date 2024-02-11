(function (window, document) {
    let save_game=function (){
        var getKey = [];
        var getVal = [];
        //存储装备信息
        // console.log(equip_dic)
        var equip_list=[]
        for (var key in equip_dic) {
            // 获取key 索引从0开始
            getKey.push(key);
            // 获取key对应的值
            getVal.push(equip_dic[key]);
        }
        var len = getKey.length;  // 获取长度
        for(var i = 0; i < len; i++){
            equip_list[i] = {
                'key': getKey[i],
                'value': getVal[i],
            }
        }
        // console.log(equip_list);
        var equip_list_str = JSON.stringify(equip_list);
        // console.log(equip_list_str);
        localStorage.equipments_data=equip_list_str;

        //存储个人属性
        var attribute_list=[];
        var getKey = [];
        var getVal = [];
        for (var key in attribute_dic) {
            // 获取key 索引从0开始
            getKey.push(key);
            // 获取key对应的值
            getVal.push(attribute_dic[key]);
        }
        var len = getKey.length;  // 获取长度
        for(var i = 0; i < len; i++){
            attribute_list[i] = {
                'key': getKey[i],
                'value': getVal[i],
            }
        }
        // console.log(equip_list);
        var attribute_list_str = JSON.stringify(attribute_list);
        // console.log(equip_list_str);
        localStorage.attribute_data=attribute_list_str;
        // console.log(localStorage);
    }
    let export_game=function (){
        $save_game();
        //属性
        var attribute_list_str=localStorage.attribute_data;
        //装备
        var equip_list_str=localStorage.equipments_data;

        var arr=[];
        arr[0]={
            'key': "attribute",
            'value': attribute_list_str,
        }
        arr[1]={
            'key': "equip",
            'value': equip_list_str,
        }

        // JSON格式
        arr = JSON.stringify(arr);
        // console.log(arr);

        // 编码
        var en_arr = encodeURIComponent(arr);

        // 加密
        en_arr = window.btoa(arr);
        console.log(en_arr);
        new $Msg({title:"保存",
            input_content: en_arr,
            content:"导出存档",
            showInput: true,
            btnName:["复制", "取消"],
            confirm:(function () {
                $Copyoneline(en_arr);
                new $Msg({title:"导出成功",content:"当前存档已复制到剪贴板"});
            })
        })

    }

    let load_game=function (){
        //装载装备
        var equip_list_str=localStorage.equipments_data;
        // console.log(equip_list_str);
        var arr = JSON.parse(equip_list_str);
        // console.log(arr);
        //重置equip_dic

        for(var i = 0; i < arr.length; i++){
            // console.log(arr[i]);
            equip_dic[arr[i].key]=arr[i].value
        }
        console.log(equip_dic)

        //装载属性
        var attribute_list_str=localStorage.attribute_data;
        // console.log(equip_list_str);
        var arr = JSON.parse(attribute_list_str);
        // console.log(arr);
        //重置equip_dic

        for(var i = 0; i < arr.length; i++){
            // console.log(arr[i]);
            attribute_dic[arr[i].key]=arr[i].value
        }
        console.log(attribute_dic)

        //根据存档重构装备显示
        $rebuile_equip();
        $Display();
    }

    //根据存档重构装备显示
    let rebuild_equip=function (){

        for (var key in equip_dic){
            //装备序号

            var equipseed=equip_dic[key];
            //获得装备随机属性
            var Randams= $SeedRandom(equipseed,100,0,1);
            var equip=$equipevents(Randams,0);
            //赋值并创建装备
            var equip_id=key;
            var name = equip.name;
            var equip_event=equip.event;

            //创建装备显示
            new  $buildequip({content:name,
                equip_content:equip_event,
                equipName:equip_id})
        }

    }

    let import_game=function (){
        new $Msg({title:"导入存档",
            content:"请复制存档代码到输入框中",
            showInput: true,
            btnName:["导入", "取消"],
            confirm:(function () {
                var arr =document.getElementById("InputHTML").value;
                // console.log(arr)
                //解码存档
                var de_arr =window.atob(arr);
                de_arr = decodeURIComponent(de_arr);
                arr = JSON.parse(de_arr);

                localStorage.attribute_data=arr[0].value;
                localStorage.equipments_data=arr[1].value;

                $load_game();

                new $Msg({title:"导入存档",content:"存档已导入"});
                csh_();
            })
        })

    }


    /**
 * 复制单行内容到粘贴板
 * content : 需要复制的内容
 * message : 复制完后的提示，不传则默认提示"复制成功"
 */
    let copyOnelineToClip = function(content, message) {
        var aux = document.createElement("input");
        aux.setAttribute("value", content);
        document.body.appendChild(aux);
        aux.select();
        document.execCommand("copy");
        document.body.removeChild(aux);
        if (message != null) {
            alert(message);
        }
        // if (message == null) {
        //     alert("复制成功");
        // } else{
        //     alert(message);
        // }
    }

    window.$save_game=save_game;
    window.$export_game=export_game;
    window.$load_game=load_game;
    window.$import_game=import_game;
    window.$rebuile_equip=rebuild_equip;
    window.$Copyoneline = copyOnelineToClip;

})(window, document);