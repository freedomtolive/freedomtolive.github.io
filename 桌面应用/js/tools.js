var handle = {
	//通过id找到对应的数据
	getSelfById(data,id){
		return data.find(function (value){
			return value.id == id;
		})
	},
	//通过id寻找所有的子数据
	getChildsById(data,id){
		return data.filter(function(value){
			return value.pid == id
		});
	},
	//通过id寻找所有的父数据
	getFatherById(data,id){
		var arr = [];
		var self = handle.getSelfById(data,id);
		if(self){
			arr.push(self);
			arr = arr.concat(handle.getFatherById(data,self.pid))
		}
		return arr;
	},
	//碰撞检测
	peng(obj1,obj2){
		//如果返回为true，说明没有碰撞，
		//如果返回值为false，说明碰撞了
		var pos1 = obj1.getBoundingClientRect();
		var pos2 = obj2.getBoundingClientRect();
		return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && 		pos1.top < pos2.bottom;
	},
	zIndexFn(ele){
		ele.addEventListener("mouseup",function(){
			ele.style.zIndex = ++commonObj.max;
		},false)
	},
	scroll(obj){
		//自定义滚动条
		var scroll_wrap = $(obj).find(".dialog_scroll_wrap");
		var scroll_inner = $(obj).find(".scroll_inner");
		var box = $(obj).find(".dialog_content_left");
		var inner = $(obj).find(".tree");
		//计算滚动条的高度
		//如果内容高度小于ul的高度，隐藏滚动条
		if($(".dialog_content").innerHeight()>= inner.innerHeight()){
			scroll_inner.hide()
		}else{
			scroll_inner.show()
		}
		var innerMaxTop = inner.innerHeight()- $(obj).find(".dialog_content").innerHeight();
		var maxTop = scroll_wrap[0].clientHeight - scroll_inner[0].offsetHeight //可滚动的最大top值
		var y = 0;

		scroll_inner.mousedown(function(ev){
			ev.preventDefault();
			var disY = ev.pageY - scroll_inner[0].offsetTop;
			$(window).mousemove(function(e){
				y = e.clientY - disY;
				y = y<0?0:y;
				y = y>maxTop?maxTop:y;
//					计算当前top值占总可移动距离的top的百分比
				var s = y/maxTop;
				
				inner[0].style.top = -s * innerMaxTop +"px";
				scroll_inner[0].style.top = y + "px";
				
			})
			$(window).mouseup(function(e){
				$(window).off("mousemove");
				$(window).off("mouseup")
			})
		})
		addScroll (scroll_wrap[0],goUp,goDown)
		addScroll (inner[0],goUp,goDown)
		
		function goUp(){//滚动条向上走，页面主体内容往下移动
//				限制y
			y-=50;
			y = y<0?0:y;
//				计算比例
			var s = y/maxTop;
			inner[0].style.top = -s * innerMaxTop +"px";
			scroll_inner[0].style.top = y + "px";
		}
		function goDown(){//滚动条向下走，页面主体内容往上移动
			if($(".dialog_content").innerHeight()>= inner.innerHeight()){
				return;
			}
			y+=50;
			y = y>maxTop?maxTop:y;
			var s = y/maxTop;
			inner[0].style.top = -s * innerMaxTop +"px";
			scroll_inner[0].style.top = y + "px";
		}
		
		function addScroll (obj,fnUp,fnDown) {
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
		//-----------------自定义滚动条2-----------------------------
		var scroll_wrap2 = $(obj).find(".dialog_scroll_wrap2");
		var scroll_inner2 = $(obj).find(".scroll_inner2");
		var box2 = $(obj).find(".dialog_content_right");
		var inner2 = $(obj).find(".dialog_right");
		var y2 = 0;
		
		var inner2MaxTop = inner2.innerHeight()- box2.innerHeight();
		var maxTop2 = scroll_wrap2[0].clientHeight - scroll_inner2[0].offsetHeight //可滚动的最大top值
		
		if(box2.innerHeight()>= inner2.innerHeight()){
			scroll_inner2.hide()
		}else{
			scroll_inner2.show()
		}
		
		scroll_inner2.mousedown(function(ev){
			ev.preventDefault();
			var disY = ev.pageY - scroll_inner2[0].offsetTop;
			$(window).mousemove(function(e){
				y2 = e.pageY - disY;
				y2 = y2<0?0:y2;
				y2 = y2>maxTop2?maxTop2:y2;
//					计算当前top值占总可移动距离的top的百分比
				var s = y2/maxTop;
				
				inner2[0].style.top = -s * inner2MaxTop +"px";
				scroll_inner2[0].style.top = y2 + "px";
			})
			$(window).mouseup(function(e){
				$(window).off("mousemove");
				$(window).off("mouseup")
			})
		})
		addScroll(scroll_wrap2[0],goUp2,goDown2)
		addScroll(inner2[0],goUp2,goDown2)
		
		function goUp2(){//滚动条向上走，页面主体内容往下移动
//				限制y2
			y2-=50;
			y2 = y2<0?0:y2;
//				计算比例
			var s = y2/maxTop2;
			inner2[0].style.top = -s * inner2MaxTop+"px";
			scroll_inner2[0].style.top = y2 + "px";
		}
		function goDown2(){//滚动条向下走，页面主体内容往上移动
			y2+=50;
			y2 = y2>maxTop2?maxTop2:y2;
			var s = y2/maxTop2;
			inner2[0].style.top = -s * inner2MaxTop +"px";
			scroll_inner2[0].style.top = y2 + "px";
		}
	},
	removeHtml(){
		//重新选渲染弹框里面的页面
		var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
		for(var i=0;i<aDialog_wrap.length;i++){
			if($(aDialog_wrap[i]).hasClass("dialog2_wrap")) continue;
			var oDialog_sort_contentBottom3 = aDialog_wrap[i].getElementsByClassName("dialog_sort_contentBottom3")[0];
			if(oDialog_sort_contentBottom3) continue;
			//重新渲染树形菜单的结构
			var aDialog = document.getElementsByClassName("dialog_conmput");
			for(var j=0;j<aDialog.length;j++){
				aDialog[j].innerHTML = '<h3 class="the_computed" data-id="0"><span class="dialog_mycomputer"></span>此电脑</h3>'
				aDialog[j].innerHTML += html.createMyComputedHtml(data.myComputed,0);
			}
			
			//重新渲染contentright里面的值
			var arrThis = handle.getChildsById(data.myComputed,aDialog_wrap[i].currentId);
			var strThis = html.createChilds(arrThis);
			$(aDialog_wrap[i]).find(".dialog_right").html(strThis + '<div class="dialog_scroll_wrap2"><div class="scroll_inner2"></div></div>');
			handle.scroll(aDialog_wrap[i])
		}
		var aLi = document.getElementsByClassName('childs_li');
		for(var i=0;i<aLi.length;i++){
			if(aLi[i].children[0].className === "img"){
				var numId = aLi[i].dataset.id;
				var obj = data.myComputed.find((item)=>item.id == numId);
				aLi[i].children[0].style.background = "url("+ obj.pos +") no-repeat 0 0";
				aLi[i].children[0].style.backgroundSize = "100% 100%";
				
			}
		}
	},
	addScroll(obj,fnUp,fnDown){
		//为obj添加鼠标滚轮事件处理函数
		obj.onmousewheel = fn;
		obj.addEventListener("DOMMouseScroll",fn);
		
		function fn (e) {//只要滚动滚轮了，就会触发fn
			if(e.wheelDelta){//chrome
				e.wheelDelta<0? fnDown(): fnUp();
				return false;
			}
			if(e.detail){//firefox
				e.detail>0? fnDown(): fnUp();
				e.preventDefault();
			}
		}
	},
	removeDeletHtml(){
		var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
		for(var i=0;i<aDialog_wrap.length;i++){
			var oDialog_sort_contentBottom3 = aDialog_wrap[i].getElementsByClassName("dialog_sort_contentBottom3")[0];
			if(oDialog_sort_contentBottom3){
				var deletStr = html.createDelet(data.delet);
				oDialog_sort_contentBottom3.innerHTML = deletStr;
			}
		}
	}
}