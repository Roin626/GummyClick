var $button = document.querySelector('.Gel_button');
$button.addEventListener('click', function() {
  var duration = 0.3,
      delay = 0.08;

  var Y=Math.random()*0.6+1.2;
  var X=Math.random()*0.3+1;
  var Y1=1.2+((Y-1)/2);
  var X1=1+((X-1)/2);

  TweenMax.to($button, duration, {scaleY: Y, ease: Back.easeOut});
  TweenMax.to($button, duration, {scaleX: X, scaleY: 1, ease: Back.easeOut, easeParams: [6], delay: delay});
  TweenMax.to($button, duration, {scaleY: 1.2, ease: Back.easeOut,  delay: delay*3});
  TweenMax.to($button, duration, {scaleX: 1.1, scaleY: 1, ease: Back.easeOut, easeParams: [3], delay: delay*4});
  TweenMax.to($button, duration * 2, {scaleX: 1.1, scaleY: 1, ease: Elastic.easeOut.config(1, 0.3), easeParams: [3], delay: delay * 6 });

  if(Math.random()*10>5){
    var money=parseFloat(attribute_dic["Money"]);
    $Writelog("金币+1~","#ffde4a");
    money+=1;
    attribute_dic["Money"]=money;
    $Display();
  }

});
