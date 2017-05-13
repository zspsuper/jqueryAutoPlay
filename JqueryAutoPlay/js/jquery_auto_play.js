/*2017-5-12*/
/*这个无缝轮播要引用1.9.0以上版本的jquery文件，关于clone()方法的使用*/
/*针对PC端的普通无缝轮播*/


//动态创建轮播图小圆点；
for(var j = 0; j < 4; j++) {
	$(".banner .num").append("<li></li>");
};
$(".banner .num li").first().addClass('on');

//调用
alls({
	overFlowBox:".banner",//用来溢出隐藏的外层盒子；
	imgList:".banner .img",//装图片进行运动偏移的盒子；
	perImgLi:".banner .img li",//每一张图片；
	points:".banner .num li",//下面对应的小圆点；
	nextBtn:".banner .btn_r",//下一张button；
	prevBtn:".banner .btn_l",//上一张图片button；
	activeClass:"on",//对应的点样式类名；
	perImgWidth:1000,//一张图片的宽度；
	autoPlayTime:2000//自动轮播的时间；
	//记住如果加减图片个数，要在css改运动盒子的宽度；
});


//总函数；
function alls(int){
	var i=0;
	var list=$(int.imgList);//装图片进行运动偏移的盒子；
	var overFlowBox=$(int.overFlowBox);//用来溢出隐藏的外层盒子；
	var points=$(int.points);//轮播图下面对应的小点；
	var on=int.activeClass;//轮播图下面对应的小点active类名；
	list.append($(int.perImgLi).first().clone());//克隆第一张图片放到图片盒子的最后；
	var length=$(int.perImgLi).size();//图片的个数；
	
	//自动轮播计时器；
	var timer=setInterval(function(){ i++; move(); },int.autoPlayTime);
	
	//移入盒子清除计时器，移出重启计时器；
	overFlowBox.hover(function() { clearInterval(timer);},function(){ timer=setInterval(function(){i++; move(); },int.autoPlayTime); });
	
	//鼠标点击圆点对应改变偏移量；
	points.click(function() {
		var index = $(this).index();
		i = index;
		move();
		$(this).addClass(on).siblings().removeClass(on);
	});
	
	/*向左按钮*/
	$(int.prevBtn).click( function() { i--; move(); });
	/*向右按钮*/
	$(int.nextBtn).click(function() { i++; move(); });
	
	//判断、运动函数；
	function move(){
		if(i==length){ list.css("left",0); i=1; };
		if(i==-1){ list.css("left",-(length-1)*(int.perImgWidth)); i=length-2; };
		
		list.stop().animate({"left":-i*(int.perImgWidth)});
		
		if(i==length-1){ $(points).eq(0).addClass(on).siblings().removeClass(on); }
		else { $(points).eq(i).addClass(on).siblings().removeClass(on); };
	};
};