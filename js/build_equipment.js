/*
 *自定义弹窗
 */
//自执行函数 形成封闭的作用域 避免全局污染
//传入windwo和document对象  相当于将window和document作为了作用域中的局部变量，
//就不需要内部函数沿着作用域链再查找到最顶层的window 提高运行效率。
(function (window, document) {

    let check_build = function (){
        var money=attribute_dic["Money"];
        var cost=10; //消耗金币数量
        var i=0;//初始一个序号

        if (money>=cost){

            //统计已经占用的i
            var i_list=[]
            for (var key in equip_dic){
                var list_i =parseFloat(key.split("p")[1]);
                i_list.push(list_i);
            }

            //装备序号
            var id=check_i(i,i_list);//序号和已经占用的序号组

            $build(id);
            money=money-cost;
            attribute_dic["Money"]=money;
            $Display();
        }
    }

    var check_i=function (i, i_list) {
            var i=i;
            i++;
            var i_list=i_list;
            //判断是否在序号组里
            if(i_list.includes(i)) return check_i(i, i_list);//递归判断
            else return i;//结束递归

    }
    let build = function(i){

        var i=i;
        var equipseed=Math.trunc(Math.random()*1000);
        //获得装备随机属性
        var Randams= $SeedRandom(equipseed,100,0,1);
        var equip=$equipevents(Randams,0);
        //赋值并创建装备
        var equip_id="equip"+i;
        var name = equip.name;
        var equip_event=equip.event;
        //存储装备信息
        equip_dic[equip_id]=equipseed;
        //创建装备显示
        new  $buildequip({content:name,
            equip_content:equip_event,
            equipName:equip_id})
    }

    let click_event=function (elem){
        var equip_id=elem
        //直接使用
        var equip=document.getElementById(equip_id)
        equip.parentNode.removeChild(equip);
        // console.log(localStorage);
        //执行该装备的事件
        var Randams= $SeedRandom(equip_dic[equip_id],100,0,1);
        $equipevents(Randams,1);
        delete equip_dic[equip_id];
        $Display();
        // console.log(localStorage);
        // 确认后使用
        // new $Msg({
        //     title:"使用装备",
        //     content:"是否要使用该装备",
        //     confirm:(function () {
        //         var equip=document.getElementById(equip_id)
        //         equip.parentNode.removeChild(equip);
        //         console.log(localStorage);
        //         //执行该装备的事件
        //         var Randams= $SeedRandom(equip_dic[equip_id],100,0,1);
        //         $equipevents(Randams,1);
        //
        //         delete equip_dic[equip_id];
        //     })
        // })
    }



    //定义一个构造函数 作为弹窗实例的构造函数。
    let buildequip = function (options) {
        //执行初始化操作
        this._init(options);
    }

    //定义初始化方法 并对方法传递的参数进行初始化
    buildequip.prototype = {
        _init({
            content = "", //装备名字 文本内容
            type = "info", //信息类型
            useHTML = false, //是否解析html字符串
            contentStyle = {}, //内容样式
            contentFontSize = "1.5em", //内容字体大小
            equipName = "equip1", //整个元素的id用于删改
            equip_content=""//装备详情


        }) {
            //将传入的值绑定到this上
            this.content = content;
            this.type = type;
            this.useHTML = useHTML;

            this.contentStyle = contentStyle;
            this.contentFontSize = contentFontSize;
            this.equipName = equipName;
            this.equip_content=equip_content;

            //执行创建元素方法
            this._creatElement();

        },

        //创建弹窗元素方法
        _creatElement() {
            var tabel=document.getElementById("equip_tabel");

            //创建最外层得包裹元素
            let wrap = document.createElement( "button");
            wrap.className = "button_equip";
            wrap.id=this.equipName;
            wrap.style.display="inline-block";
            wrap.style.position="inherit"
            wrap.onclick=function() {$clickevent(wrap.id)};

            //拼接完整html
            const innerHTML = `
            <div class="container">
                <!-- Item -->
                <!-- An item that triggers displaying the mega menu -->
                <div class="container__trigger">
                        <!-- The trigger item's content -->
                    ${this.content}
                    <!-- Mega menu -->
                    <div class="container__content" style="width: 70px; border-top: 1px solid rgba(0, 0, 0, 0.3); border-top-right-radius: 5px">
                        ${this.equip_content}
                    </div>
                </div>
            </div>
            `;//结束inner

            //将拼接的html赋值到wrap中
            wrap.innerHTML = innerHTML;
            //把新建元素添加进table DOM
            tabel.appendChild(wrap);
        },

    }

    //种子随机数
    let SeededRandom = function(seed,max,min,num) {
        var seed = seed
        max = max || 1;
        min = min || 0;
        var rndlist=[];

        for (var i= 0; i<num; i++) {
            seed = (seed * 9301 + 49297) % 233280;
            var rnd = seed / 233280.0;
              rndlist[i]=min + rnd * (max - min);
            }
        return rndlist
    }

    //装备的事件
    let equip_event=function (seed,type){
        //type==0;获取名字
        //type==1;执行函数
        var seed= Math.round(seed);

        if(seed<=40){
            var i=Math.round($SeedRandom(seed,3,0,1))//装备类别1
        }else if(seed<=70){
            var i=Math.round($SeedRandom(seed,6,4,1))//装备类别2
        }else if(seed<=90){//装备类别3
            var i=Math.round($SeedRandom(seed,8,7,1))
        }else if(seed<=100){//类别4
            var i=Math.round($SeedRandom(seed,11,9,1));
        }

        var event=""
        var name=""
        var money=parseFloat(attribute_dic["Money"]);
        var lv=parseFloat(attribute_dic["Lv"]);
        var tools=parseFloat(attribute_dic["Tools"]);
        switch (i) {
            case 1:
                name="玩具";
                event="玩具加1";
                if(type==1){lv+=1;
                attribute_dic["Lv"]=lv;
                $Writelog("玩具+1~","#80fff5");
                }

            break;
            case 2:
                name="金币";
                event="金币+1";
                if(type==1){money+=1;
                attribute_dic["Money"]=money;
                $Writelog("金币+1~","#ffde4a");
                }

            break

            case 3://猫粮
                name="猫粮";
                event="一个可以诱拐猫猫的猫粮";
                if(type==1){tools+=1;
                attribute_dic["Tools"]=tools;
                $Writelog("猫粮+1~","#53a6ff");
                }
            break

            case 4://箱子 金币
                name="盒子";
                event="不知道装了什么";
                if(type==1){money+=5;
                attribute_dic["Money"]=money;
                $Writelog("金币+5~","#ffde4a");
                }

            break

            case 5://箱子 玩具
                name="盒子";
                event="不知道装了什么";
                if(type==1){lv+=1;
                attribute_dic["Lv"]=lv;
                $Writelog("玩具+1~","#80fff5");
                }
            break

            case 6://箱子 猫粮
                name="盒子";
                event="不知道装了什么";
                if(type==1){tools+=2;
                attribute_dic["Tools"]=tools;
                $Writelog("猫粮+2~","#53a6ff");
                }
            break

            case 7://箱子 金币
                name="袋子";
                event="摇了摇会响~";
                if(type==1){money+=10;
                attribute_dic["Money"]=money;
                $Writelog("金币+10~","#ffde4a");
                }
            break

            case 8://袋子 猫粮
                name="袋子";
                event="摇了摇有点沉~";
                if(type==1){tools+=10;
                attribute_dic["Tools"]=tools;
                $Writelog("猫粮+10~","#53a6ff");
                }
            break

            case 9://礼包 猫粮
                name="礼包";
                event="包装华丽的大礼包";
                if(type==1){tools+=20;
                attribute_dic["Tools"]=tools;
                $Writelog("猫粮+20~","#53a6ff");
                }
            break

            case 10://礼包 猫粮
                name="礼包";
                event="包装华丽的大礼包";
                if(type==1){money+=50;
                attribute_dic["Money"]=money;
                $Writelog("金币+50~","#ffde4a");
                }
            break

            case 11://礼包 玩具
                name="逗猫棒";
                event="一袋逗猫棒";
                if(type==1){lv+=10;
                attribute_dic["Lv"]=lv;
                $Writelog("玩具+10~","#80fff5");
                }
            break

            default:
                name="箱子";
                event="不知道装了什么";
                if(type==1){
                    $Writelog("空箱子诶~","#c0c0d5");
                }

            break
        }

        $Display();

        if(type==0){
         return {name:name,event:event}
        }
    }

    //将构造函数暴露到window  可直接在全局作用域中访问构造函数
    window.$checkbuild=check_build;
    window.$buildequip = buildequip;
    window.$build=build;
    window.$clickevent=click_event;
    window.$equipevents=equip_event;
    window.$SeedRandom = SeededRandom;


})(window, document);