(function(){

	var oContent_move = document.querySelector(".content_move");
	var oContent_child = document.querySelectorAll(".content_child")
	var num = 0;
	var num2 = $(window).innerHeight()
	var clientWidth = $(window).innerWidth()
	var maxTrans = -num2 * (oContent_child.length-1);
	var onOff = true;
	$(".child2_div").on("mouseover",function(){
		var index = $(this).index();
		$(".child2_div").removeClass("in");

		$(this).addClass("in");
		$(".child_bg").removeClass("in");
		$(".child_bg").addClass("out");
		$(".child_bg").eq(index).removeClass("out");
		$(".child_bg").eq(index).addClass("in");
	})

	//-------------滚动条滚动时做得事情--------------------
	function addScroll(obj,fnUp,fnDown) {
		//为obj添加鼠标滚轮事件处理函数
		obj.onmousewheel = fn;
		obj.addEventListener("DOMMouseScroll",fn);
		function fn(e) {//只要滚动滚轮了，就会触发fn
			if(e.wheelDelta){//chrome
				e.wheelDelta<0? fnDown(): fnUp();
				return false;//阻止默认行为，防止页面滚动
			}
			if(e.detail){//firefox
				e.detail>0? fnDown(): fnUp();
				e.preventDefault();
			}
		}
	}

	addScroll(oContent_move,function(){
		if(onOff === true){
			onOff = false;
			if(num>=0){
				num = 0
			}else{
				num = num + num2
			}

			if(num === num2*-1){
				$(".content_child2").addClass("in");
			}else{
				$(".content_child2").removeClass("in");
			}

			if(num === 0){
				$(".content_child1").addClass("in");
			}else{
				$(".content_child1").removeClass("in");
			}

			if(num === num2*-2){
				$(".content_child3").addClass("in");
			}else{
				$(".content_child3").removeClass("in");
			}
			MTween({
				el:oContent_move,
				time:400,
				target: {
					translateY:num
				},
				type: "linear",
				callBack:function(){
					onOff = true
				}
			})
		}
	},function(){
		if(onOff === true){
			onOff = false;
			if(num <= maxTrans){
				num === maxTrans
			}else{
				num = num - num2
			}


			if(num === num2*-1){
				$(".content_child2").addClass("in");
			}else{
				$(".content_child2").removeClass("in");
			}

			if(num === 0){
				$(".content_child1").addClass("in");
			}else{
				$(".content_child1").removeClass("in");
			}

			if(num === num2*-2){
				$(".content_child3").addClass("in");
			}else{
				$(".content_child3").removeClass("in");
			}
			MTween({
				el:oContent_move,
				time:400,
				target: {
					translateY:num
				},
				type: "linear",
				callBack:function(){
					onOff = true
				}
			})
		}
	})

	//---------------------第三个页面的自动转换-----------------------
	var off1 = true;
	var off2 = false;
	var timer = setInterval(function(){
		if($(".child").eq(0).hasClass("in")){
			if(!off1){
				off1 = true
			}else{
				off1 = false
				$(".child").eq(0).removeClass("in");
				$(".child").eq(0).addClass("left-out");
				$(".info").eq(0).removeClass("in");
				$(".info").eq(0).addClass("left-out");
			}
		}else if($(".child").eq(0).hasClass("left-out")){
			$(".child").eq(0).removeClass("left-out");
			$(".child").eq(0).addClass("left-in");
			$(".info").eq(0).removeClass("left-out");
			$(".info").eq(0).addClass("left-in");
		}else if($(".child").eq(0).hasClass("left-in")){
			$(".child").eq(0).removeClass("left-in");
			$(".child").eq(0).addClass("in");
			$(".info").eq(0).removeClass("left-in");
			$(".info").eq(0).addClass("in");
		}	

		if($(".child").eq(1).hasClass("in")){
			if(!off2){
				off2 = true
			}else{
				$(".child").eq(1).removeClass("in");
				$(".child").eq(1).addClass("left-out");
				$(".info").eq(1).removeClass("in");
				$(".info").eq(1).addClass("left-out");
				off2 = false
			}
		}else if($(".child").eq(1).hasClass("left-out")){
			$(".child").eq(1).removeClass("left-out");
			$(".child").eq(1).addClass("left-in");
			$(".info").eq(1).removeClass("left-out");
			$(".info").eq(1).addClass("left-in");
		}else if($(".child").eq(1).hasClass("left-in")){
			$(".child").eq(1).removeClass("left-in");
			$(".child").eq(1).addClass("in");
			$(".info").eq(1).removeClass("left-in");
			$(".info").eq(1).addClass("in");
		}	
	},2000)


	//------------导航栏中的鼠标移入时间--------------------------
	$(".nav_li").hover(
	function(){
		$(".nav-bg").css({"left":this.offsetLeft})
	},function(){
		$(".nav-bg").css({"left":0})
	})

	//---------------第二部分第四张北京图的位置岁鼠标移动改变-------------
	$(".div4_ul").on("mousemove",function(ev){
		var disX = ev.pageX;
		var num = -(ev.pageX-clientWidth/2)/clientWidth * 34
		$(".div4_ul li")[0].style.transform = "translateX("+num+"px)";

	})

	//-----------------canvas绘制-------------------------
	//改变canas的大小
	var canvas = document.querySelector("canvas");
	canvas.width = clientWidth;
	canvas.height = 300;

	var c = canvas.getContext("2d");

	var parW =1;
	//生成多少个星星
	var starsNum = 50;
	//记录每个星星的位置
	var parPos = [];
	//记录每个星星的初始位置
	var ori = [];

	for(var i=0;i<starsNum;i++){
		c.fillStyle="#fff";
		var left =  Math.random()*clientWidth;
		var top = Math.random()*num2;
		c.fillRect(left,top,parW,parW );
		parPos.push( {
			x:left,
			y:top
		})
	}

	setInterval(function(){
		for(var i=0;i<starsNum;i++){
			if(i%4 === 0){
				parPos[i].x = parPos[i].x  + 3;
				parPos[i].y = parPos[i].y + 3;
			}else if(i%4 === 1){
				parPos[i].x = parPos[i].x  - 3;
				parPos[i].y = parPos[i].y + 3;
			}else if(i%4 === 2){
				parPos[i].x = parPos[i].x  + 3;
				parPos[i].y = parPos[i].y - 3;
			}else{
				parPos[i].x = parPos[i].x  + 3;
				parPos[i].y = parPos[i].y - 3;
			}

			if(parPos[i].x>clientWidth){
				parPos[i].x = 0;
			}else if(parPos[i].y>300){
				parPos[i].y = 0;
			}else if(parPos[i].x<0){
				parPos[i].x = clientWidth
			}else if(parPos[i].y<0){
				parPos[i].y = 300
			}
		}
		c.clearRect(0,0,clientWidth,300);

		for (var j = 0; j < starsNum; j++) {
			c.fillRect( parPos[j].x,parPos[j].y,parW,parW );
		}


	},50)


})();





