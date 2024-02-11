var canvas = document.createElement("canvas")
var ctx = canvas.getContext("2d")
window.document.body.appendChild(canvas)
canvas.width = window.innerWidth
canvas.height = window.innerHeight
canvas.setAttribute('style', 'z-index: 1000;position:fixed;left:0;top:0;pointer-events:none;filter:blur(2px);')
var clicks = []
var points = [] //定义粒子数组
var live = 50 //存活50个周期
var colors = [  //备选粒子颜色数组
    "250,197,197",
    "250, 197,245",
    "253,211,172",
    "255,255,207",
    "187,255,255",
    "237,255,214"
]
window.addEventListener("mousemove", function (evt) { //监听鼠标移动事件
    for (var i = 0; i < 1; i++) { //添加3个粒子
        points.push({
            sx: evt.x, //鼠标当前坐标作为粒子坐标
            sy: evt.y,
            //星星参数
            r:Math.random()*0.5+1.5,
            td:Math.random()*4-2,
            dx:Math.random()*2-1,
            dy:Math.random()*1+1,
            rot: Math.random()*90+90,
            vx: 0.5 - Math.random(), //x轴及y轴的移动向量，取值范围为-0.5 ~ 0.5
            vy: 0.5 - Math.random(),
            life: live, //存活周期
            color: colors[Math.floor(Math.random()*colors.length)], //随机选择颜色
            size: Math.random() * 3 //随机粒子尺寸，取值范围为0~5
        })
    }
})
window.addEventListener("click", function (evt) { //监听点击事件
    for (var i = 0; i < 100; i++) {
        clicks.push({
            //星星参数
            r:Math.random()*0.5+1.5,
            td:Math.random()*4-2,
            dx:Math.random()*2-1,
            dy:Math.random()*1+1,
            rot: Math.random()*90+90,
            //起始坐标
            sx: evt.x,
            sy: evt.y,
            color: colors[Math.floor(Math.random()*colors.length)],
            life: live,
            vx: 0.5 - Math.random(), //x轴及y轴的移动向量，取值范围为-0.5 ~ 0.5
            vy: 0.5 - Math.random(),
            size: Math.random() * 5 + 1 //随机粒子尺寸，取值范围为1~6
        })
    }
})
//
    function star(x,y,r,l,rot){
       ctx.beginPath();
        for(let i=0;i<5;i++){
           ctx.lineTo(Math.cos((18 + i*72 -rot)*Math.PI/180)*r+x,
           -Math.sin((18 + i*72 - rot)*Math.PI/180)*r+y);
           ctx.lineTo(Math.cos((54+i*72-rot)*Math.PI/180)*l+x
               ,-Math.sin((54+i*72 -rot)*Math.PI/180)*l+y);
        }
        ctx.closePath();
    }
function drawpoints() { //绘制粒子
    ctx.clearRect(0, 0, canvas.width, canvas.height) //清屏
    for (var i = 0; i < points.length; i++) { //遍历粒子
        point = points[i] //定义单个粒子
        ctx.beginPath()

        star(point.sx, point.sy, point.r,point.r*5, point.rot)//画星星
        // ctx.arc(point.sx, point.sy, point.size, Math.PI * 2, false) //根据粒子属性画圆
        ctx.fillStyle = "rgba(" + point.color + "," + point.life / live + ")" //根据粒子属性设置填充颜色及透明度
        ctx.fill() //填充颜色
        point.life-- //生命值减1
        if (point.life <= 0) { //生命值为0则从粒子数组中删除
            points.splice(i, 1)
        }
        point.sx += point.vx * 3  //根据向量值改变粒子位置
        point.sy += point.vy * 3
        point.vy += 0.03
    }
    for (var i = 0; i < clicks.length; i++) { //绘制点击效果
        click = clicks[i]
        ctx.fillStyle = "rgba(" + click.color + "," + click.life / live + ")"
        ctx.fillRect(click.sx, click.sy, 3, 3)
        click.sx += click.vx * 10
        click.sy += click.vy * 10
        click.vy += 0.02
        click.life--
        if (click.life <= 0) {
            clicks.splice(i, 1)
        }
    }
    update();
}

function update(){
        for(let i=0;i<points.length;i++){
            points[i].sx += points[i].dx;
            points[i].sy += points[i].dy;
            points[i].rot += points[i].td;
            points[i].r -= 0.015;
            if(points[i].r<0){
                points.splice(i,1);
            }
        }
    }


setInterval(drawpoints, 20) //20毫秒绘制一次
