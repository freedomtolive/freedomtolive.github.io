//交互的js
var commonObj = {
	max:300,
	commonCurrentId:0,
	isDoc:null
}
$(function(){
	var datas = data.files;
	var vues = new Vue({
		el:"#content",//介入点
		data:{
			list:datas,
			todo:"",
			editingId:"",  //存一下要编辑数据的id
			beforeTitle:"" //记录一下正在编辑的title
		},
		methods:{
			click_title(todo,index,ev){
				//记录一下正编辑的信息的title
				//当鼠标down下去的时候就已经有选中效果了;所以这个时候就不能用class去判断;结果肯定为true；
				if($(this.$refs["editInput"+index][0]).parent().hasClass("active")){
					this.beforeTitle = todo.title;
					this.editingId = todo.id;  //数据改变了
					this.$nextTick(function (){
						console.log("数据改变后，更新视图，DOM全部更新完成");
						$(this.$refs["editInput"+index][0]).show();
						$(this.$refs["editInput"+index][0]).prev().hide();
						this.$refs["editInput"+index][0].select();
					})
					ev.stopPropagation();
				}
			},
			editDone(todo,index){
				//失去焦点，判断一下当前编辑的数据是否为空
				if(todo.title.trim() === ""){
					//取消编辑
					this.cancelEdit(todo,index)
				}
				var arr = data.files.filter((item)=>item.title === todo.title)
				if(arr.length === 2){
					//如果有重命名，取消编辑
					this.cancelEdit(todo,index)
					alert("不能有重命名")
				}
				this.editingId = "";
				$(this.$refs["editInput"+index][0]).hide();
				$(this.$refs["editInput"+index][0]).prev().show();
			},
			cancelEdit(todo,index){  //取消编辑
				todo.title = this.beforeTitle;
				this.beforeTitle = "";
				this.editingId = "";
				$(this.$refs["editInput"+index][0]).hide();
				$(this.$refs["editInput"+index][0]).prev().show();
			},
			delet(todo){
				//点击回收站时的弹窗
				if(todo.Name === "trashName" ){
					var dialog_sort_contentBottom3 = document.getElementsByClassName("dialog_sort_contentBottom3")[0];
					if(dialog_sort_contentBottom3) return;
					new Dialog({
						title:"回收站",
						data2:data.delet,
						img:"myDelet",
						content:`
							<ul class="dialog_sort_contentBottom3 clearfix">
			//					<li>
			//						<span class="dialog_C"></span>
			//						<div class="contentBottom3_right">
			//							<div>本地磁盘(C;)</div>
			//							<div>本地磁盘(C;)</div>
			//						</div>
			//					</li>
							</ul>
						`
					})
					$(".min_computed").show();
				}else if(todo.Name === "computerName" ){
					//点击此电脑时的弹窗
					new Dialog({
						title:"此电脑",
						data2:data.myComputed,
						img:"myComputed",
						content:`
							<header class="dialog_sort_contentHead">
								<span></span>
								<h3 class="file_title">文件夹</h3>
								<div class="line"></div>
							</header>
							<ul class="dialog_sort_contentTop clearfix">
								<!--<li>
									<h3>
										<span class="dialog_shipin"></span>
										视频
									</h3>
								</li>-->
							</ul>
							<div class="dialog_sort_contentBottom">
								<span></span>
								<h3 class="file_title">设备和驱动器</h3>
								<div class="line2"></div>
							</div>
							<ul class="dialog_sort_contentBottom2 clearfix">
								<!--<li>
									<span class="dialog_C"></span>
									<div class="contentBottom2_right">
										<div>本地磁盘(C;)</div>
										<div>
											<div class="jindu"></div>
										</div>
										<div>
											<span>90.5</span>GB可用，共<span>118</span>GB
										</div>
									</div>
								</li>-->
							</ul>
						`
					})
					$(".min_computed").show();
					$(".min_tankuang").hide();
				}
				var oMin_tankuang = document.getElementsByClassName("min_tankuang")[0]
				
				//再次比较了弹框的总数和下面小弹框的总数,如果前者大,说明新生成了,否则没有新生成,则不重新创建下面的弹框;
				//此做法感觉欠妥,以后回看时思考应该怎么每一次是否生成新的tankuang_div
				var numLength = $(".dialog_wrap").length+$(".dialog2_wrap").length
				if($(".tankuang_div").length<numLength){
					var oDiv = document.createElement("div");
					var xiaojianjian = document.getElementsByClassName("xiaojianjian")[0];
					var xiaojianjian2 = document.getElementsByClassName("xiaojianjian2")[0];
					oDiv.className="tankuang_div";
					oDiv.innerHTML = `
						<header class="tankuang_head">
							<span></span>
							<h3 class="tankuang_title">2016-08-22</h3>
							<div class="close">X</div>
						</header>
						<img src="img/img2.jpg" alt="1" />
					`
					//给生成的弹框添加点击事件
					$(oDiv).click(function(){
						var index = $(this).index(".tankuang_div");
						$(".dialog_wrap").eq(index).show();
						$(".dialog_wrap").eq(index)[0].style.zIndex = ++commonObj.max;
						$(".min_tankuang").hide();
						commonObj.commonCurrentId = $(".dialog_wrap").eq(index)[0].currentId
						//怎么让他在最小化的时候不要再生成新的content
					})
					//点击close时让底下的div消失
					$(oDiv).find(".close").click(function(ev){
						var index = $(oDiv).index(".tankuang_div")
						$(oDiv).remove();
						$(".dialog_wrap").eq(index).remove();
						if(!$(".tankuang_div").length){
							$(".min_computed").hide();
						}
						$("#delet2").off("click");
						//重新定位
						oMin_tankuang.style.width = 260*aDialog_wrap.length+"px";
						oMin_tankuang.style.left = -(260*aDialog_wrap.length-74)/2+"px";
						xiaojianjian2.style.left = (260*aDialog_wrap.length-19)/2+"px";
						xiaojianjian.style.left = (260*aDialog_wrap.length-19)/2+"px";
					})
					
					var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
					oMin_tankuang.style.width = 260*aDialog_wrap.length+"px";
					oMin_tankuang.style.left = -(260*aDialog_wrap.length-74)/2+"px";
					oMin_tankuang.appendChild(oDiv);
					xiaojianjian2.style.left = (260*aDialog_wrap.length-19)/2+"px";
					xiaojianjian.style.left = (260*aDialog_wrap.length-19)/2+"px";
				}
			},
			selectLi(todo,ev){
				$("#li_menu").hide();
				//让li的右键菜单消失
				if($(ev.target).hasClass("content_li")){
					if(!$(ev.target).hasClass("active")){
						$("#content li").removeClass("active")
						$(ev.target).addClass("active")
					}
				}else{
					//如果点击的li身上没有class，则说明是点击未框选的li，则进行点击事件
					if(!$(ev.target).parents().hasClass("active")){
						//		给选中加选中的状态
						$("#content li").removeClass("active")
						$(ev.target).parent().addClass("active")
					}
				}
			},
			drag(todo,index,ev){
				if(!$(".content_li").eq(index).hasClass("active")){
					if($(ev.target).hasClass("content_li")){
						$("#content li").removeClass("active")
						$(ev.target).addClass("active")
					}else{
						//如果点击的li身上没有class，则说明是点击未框选的li，则进行点击事件
						//		给选中加选中的状态
						$("#content li").removeClass("active")
						$(ev.target).parent().addClass("active")
					}
				}
				if(ev.button == 2) return;
				ev.preventDefault();
				//让右键菜单消失
				oMenu.hide();
				$("#menu li").find($(".sort_menu")).hide();
				
				if($(ev.target).hasClass("content_li")){
					if(!$(ev.target).hasClass("active")){
						$("#content li").removeClass("active")
						$(ev.target).addClass("active")
					}
				}else{
					//如果点击的li身上没有class，则说明是点击未框选的li，则进行点击事件
					if(!$(ev.target).parents().hasClass("active")){
						//		给选中加选中的状态
						$("#content li").removeClass("active")
						$(ev.target).parent().addClass("active")
					}
				}
				//让li呈现选中的状态
				var disX = ev.clientX;
				var disY = ev.clientY;
				//计算鼠标和图标的位置
				var arr = [];//保存可移动元素
				var arr2 = [];
//				var onoff = true;
				var arr_index = [];
				for(var i=0;i<aLi.get().length;i++){
					if($("#content li").eq(i).hasClass("active")){
						arr_index.push(i);
						arr.push($("#content li")[i]);
		//				//将可移动元素距离鼠标的left值和top值存入数组中；
						$("#content li")[i].disX = $("#content li")[i].offsetLeft - ev.clientX;
						$("#content li")[i].disY = $("#content li")[i].offsetTop - ev.clientY;
						$("#content input").blur();
						var copy = $("#content li")[i].cloneNode( true );
						copy.style.opacity = 0.5;
						arr2.push(copy)
					}
				}
				
				$(window).mousemove(function(ev){
					if(Math.abs(ev.clientX - disX)<5 && Math.abs(ev.clientY - disY<5)) return;
					for(var i=0;i<arr2.length;i++){
						document.getElementById("content").appendChild( arr2[i] );
					}
					for(var i=0;i<arr.length;i++){
						arr2[i].style.left = ev.clientX + arr[i].disX + "px";
						arr2[i].style.top = ev.clientY + arr[i].disY + "px"; 
					}
				})
				
				$(window).mouseup(function(ev){
					if(Math.abs(ev.clientX - disX)>5 || Math.abs(ev.clientY - disY)>5){
						for(var i=0;i<arr.length;i++){
							if((ev.clientX + arr[i].disX-25)%114<57){
								arr[i].style.left = ev.clientX + arr[i].disX - (ev.clientX + arr[i].disX-25)%114 + "px";
							}else{
								arr[i].style.left = ev.clientX + arr[i].disX - (ev.clientX + arr[i].disX-25)%114+114 + "px";
							}
							
							if((ev.clientY + arr[i].disY-35)%124<62){
								arr[i].style.top = ev.clientY + arr[i].disY - (ev.clientY + arr[i].disY-35)%124 + "px";
							}else{
								arr[i].style.top = ev.clientY + arr[i].disY - (ev.clientY + arr[i].disY-35)%124+124 + "px";
							}
							
							//判断拖动时的位置(星期六操作)
							var obj = datas.find((item)=>item.left === arr[i].offsetLeft && item.top === arr[i].offsetTop)
							if(obj !== undefined){
								for(var j=0;j<data.files.length;j++){
									if(arr[i].dataset.id == data.files[j].id){
										//如果移过去的是删除吗则从页面上删除元素
										if(obj.id===4){
											//当移入删除的时候应该删除对应元素
											if(!arr3.length){
												var _index = $(".active").index()
												//如果删除的是此电脑和回收站return;
												if(aLi.eq(_index).hasClass("computerName") || aLi.eq(_index).hasClass("trashName")){
													console.log("不能删除此电脑或回收站!")
													//清空push出来的元素
													setTimeout(function(){
														document.getElementById("content").removeChild( arr2[0] );
													},0)
													var aLiDom = document.getElementsByClassName("content_li");
													for(var m=0;m<data.files.length;m++){
														aLiDom[m].style.left = data.files[m].left + "px";
														aLiDom[m].style.top = data.files[m].top + "px";
													}
													$(window).off("mousemove");
													$(window).off("mouseup");
													return;
												}
												//点击删除后将所有的选中li的class都清空;
												aLi.removeClass("active")
												var obj2 = data.files.splice(_index,1);
												obj2 = obj2[0];
												data.delet.push(obj2);		
													
												var aLiDom = document.getElementsByClassName("content_li")
												
												for(var i=0;i<data.files.length;i++){
													aLiDom[i].style.left = data.files[i].left + "px";
													aLiDom[i].style.top = data.files[i].top + "px";
												}
												if(arr[i]){
													for(var i=0;i<arr.length;i++){
														data.files[arr_index[i]].left = arr[i].offsetLeft;
														data.files[arr_index[i]].top = arr[i].offsetTop;
													}
												}
												setTimeout(function(k){
													document.getElementById("content").removeChild( arr2[0] );
												},0)
											}else{
												var n=0;
												for(var m=0;m<arr3.length;m++){
													var _index = $(arr3[m]).index();
													if(aLi.eq(_index).hasClass("computerName") || aLi.eq(_index).hasClass("trashName")){
														console.log("不能删除此电脑或回收站!")
														n++;
														continue;
													}
													var obj2 = data.files.splice(_index-m+n,1);
													obj2 = obj2[0];
													data.delet.push(obj2);
												}
												
												for(var k=0;k<arr2.length;k++){
													(function(k){
														document.getElementById("content").removeChild( arr2[k] );
													})(k)
												}
												var aLiDom = document.getElementsByClassName("content_li");
												for(var i=0;i<data.files.length;i++){
													aLiDom[i].style.left = data.files[i].left + "px";
													aLiDom[i].style.top = data.files[i].top + "px";
												}
											}
											$(window).off("mousemove");
											$(window).off("mouseup");
											arr3 = [];
											return;
										}
										var index = data.files.findIndex((item)=>item.id == obj.id)
										data.files[index].left = data.files[j].left;
										data.files[index].top = data.files[j].top;
									}
								}
							}
							for(var j=0;j<data.files.length;j++){
								if(arr[i].dataset.id == data.files[j].id){
									data.files[j].left = arr[i].offsetLeft
									data.files[j].top = arr[i].offsetTop
								}
							}
							document.getElementById("content").removeChild( arr2[i] );
						}
						//重新给所有的dom定位置(星期六操作)
						var aLiDom = document.getElementsByClassName("content_li")
						for(var i=0;i<aLiDom.length;i++){
							aLiDom[i].style.left = data.files[i].left + "px";
							aLiDom[i].style.top = data.files[i].top + "px";
						}
						for(var i=0;i<arr.length;i++){
							datas[arr_index[i]].left = arr[i].offsetLeft;
							datas[arr_index[i]].top = arr[i].offsetTop;
						}
					}else{
						if(ev.target.nodeName.toLowerCase==="li"){
							$("#content li").removeClass("active")
							$(ev.target).addClass("active")
						}else{
							$("#content li").removeClass("active")
							$(ev.target).parent().addClass("active")
						}
					}
					$(window).off("mousemove");
					$(window).off("mouseup");
				})
				
				ev.stopPropagation();
			}
		}
	})
	
	var oContent = $("#content");
	var oMenu = $("#menu")
	//生成页面结构
//	oContent.html(html.createHtml(data))
	var aLi = $("#content li")
	//生成menu的结构
	oMenu.html(html.createMenuHtml(data)+oMenu.html())
	//右键菜单
	var oMenu = $("#menu");
	var oLi_menu = $("#li_menu");
	var arr3 = [];
	var num = datas.length
	var arrPos = [];
	var strTime = "";
	
	
	//取消默认行为
	$(window).mousedown(function(ev){
		ev.preventDefault();
	})
	
	
	position();
	//为所有的li改变位置
	function position(){
		var h = $(window).innerHeight()-40;
		var li_h =  $("#content li").eq(0).innerHeight();
		var m=0;
		var n=0;
		for(var i=0;i< $("#content li").get().length;i++){
			//如果页面高度小于第一个第一个li的高度，直接return
			if(h<(li_h+35)){
				return;
			}
			//如果(页面高度-最后一个li的长度)小于最后一个li的高度，则放放不下最后一个li，就让li换行重顶部开始显示
			if((35+n*124)>(h-li_h)){
				m++;
				n=0;
			}
			$("#content li").eq(i).css({left:25+m*114,top:(35+n*124)})
			//给数据中的每一组添加一个left值和top值;
				datas[i].left = 25+m*114;
				datas[i].top = 35+n*124;
			n++;
		}
	}
	
	//页面大小发生变化时重新设置li的位置
	window.onresize = function(){
		clearTimeout(aLi.timer)
		aLi.addClass("trans")
		position();
		aLi.timer = setTimeout(function(){
			aLi.removeClass("trans")
		},1000)
	}
	//拼壁浏览器的自定义菜单事件
	document.oncontextmenu = function(){  
    	return false;  
	}  
	//右键自定义菜单
	$(document).mousedown(function(ev){ 
	    var key = ev.which; //获取鼠标键位  
    	commonObj.isDoc = true;
	    if(key == 3){//右键菜单事件
			var h = $(window).innerHeight();
			var w = $(window).innerWidth();
			var X = ev.pageX;
			var Y = ev.pageY;
			if(Y > (h-oMenu.outerHeight())){
				Y = h-oMenu.outerHeight()
			};
			if(X>(w-oMenu.outerWidth())){
				X = w-oMenu.outerWidth()
			};
			//让li的右键菜单消失
			oLi_menu.hide();
			
			oMenu.css({left:X,top:Y})
			oMenu.show();
			$(aLi).removeClass("active")
		}
	})
	
	//修改时间
	time()
	function time(){
		var t = new Date();
		var day = t.getFullYear() + "/" + (t.getMonth()+1+"") + "/" +(t.getDate()+"")
		var minute = toTwo(t.getHours()) + ":" + toTwo(t.getMinutes()) 
		$(".timer_year").text(day);
		$(".timer_minute").text(minute);
		
		setInterval(function(){
			t = new Date();
			minute = toTwo(t.getHours()) + ":" + toTwo(t.getMinutes()) 
			str = t.getFullYear() + "/" + (t.getMonth()+1+"") + "/" +(t.getDate()+"")
			strTime = t.getFullYear() + "-" + (t.getMonth()+1+"") + "-" +(t.getDate()+"")
			$(".timer_minute").text(minute)
			$(".timer_year").text(day)
		},1000)
	}
	//时间加0的函数
	function toTwo(n){
		if(n<10){
			return "0" + n;
		}else{
			return "" + n;
		}
	}
	
	//鼠标移入sort时让其子元素显示出来
	$("#menu li").mouseover(function(){
		$("#menu li").find($(".sort_menu")).hide();
		$(this).find($(".sort_menu")).show();
	})
	//鼠标在li上时的函数
	aLi.hover(function(){
		$(this).addClass("hover")
	},function(){
		$(this).removeClass("hover")	
	})
	
	//---------------------画框-------------------------
	$("#content").mousedown(function(ev){
		if(ev.button == 2) return;
		if(ev.target.nodeName.toLowerCase() === 'div'||(ev.target.className === 'li_font')) return;
		//鼠标按下时生成div
		var newDiv = $("<div></div>");
		//让右键菜单消失
		oMenu.hide();
		//让li的右键菜单消失
		oLi_menu.hide();
		$("#menu li").find($(".sort_menu")).hide();
		newDiv.addClass("check")
		var disX = ev.pageX;
		var disY = ev.pageY;
		$("body").append(newDiv)
		$(".content_li").removeClass("active")
		
		$(window).mousemove(function(ev){
			if((Math.abs(ev.pageX-disX )<5 )|| (Math.abs(ev.pageY-disY)<5)) return;
			newDiv.css({
				width:Math.abs(ev.pageX-disX),
				height:Math.abs(ev.pageY-disY),
				left:Math.min(ev.pageX,disX),
				top:Math.min(ev.pageY,disY)})
			
			arr3 = $(".content_li").get().filter((item)=>{
				if(handle.peng(item,newDiv[0])){
					$(item).addClass("active")
				}else{
					$(item).removeClass("active")
				}
				
				return handle.peng(item,newDiv[0])
			})
		})
		
		$(window).mouseup(function(ev){
			newDiv.remove();
			$(window).off("mousemove");
			$(window).off("mouseup");
			
		})
	})
	
	//-----------------------新建文件夹--------------------------
	$(".menu_ul").mousedown(function(ev){
		ev.stopPropagation();
	})
	$(".menu_ul:nth-of-type(4) .sort_menu div:first").click(function(){
		if(!commonObj.isDoc) return;
		var h = $(window).innerHeight()-40;
		var li_h =  $("#content li").eq(0).innerHeight();
		var m=0;
		var n=0;
		
		leftNum = 25+m*114;
		topNum = 35+n*124;
		for(var i=0;i<datas.length;i++){
			var num = datas.findIndex((item)=>item.left === leftNum && item.top === topNum)
			if(num!==-1){
				n++;
				if((35+n*124)>(h-li_h)){
					m++;
					n=0;
				}
				leftNum = 25+m*114;
				topNum = 35+n*124;
			}else{
				break;
			}
		}	
		
		var n = n===0 ? "" : n
		var str = "新建文件夹" + n
		for(var i=0 ;i < datas.length;i++){
			var n = i===0 ? "" : i
			var str = "新建文件夹" + n
			var num = datas.findIndex((item)=>item.title === str);
			//如果num === -1,说明没有重名,可以用
			if(num === -1){
				break;
			}
		}
	
		datas.push({
			id:Math.random(),
			pid:-2,
			title:str,
			type:"file",
			top:topNum,
			left:leftNum,
			size:71,
			dates:strTime
		})
		num = datas.length
		
		//让右键菜单消失
		oMenu.hide();
		$("#menu li").find($(".sort_menu")).hide();
	
		//数据改变后，更新视图，DOM全部更新完成
		var content = document.getElementById("content")
		var aLi2 = content.getElementsByTagName("li")
		vues.$nextTick(function (){
			//重新绑定的事件
			aLi = $("#content li")
			console.log(aLi)
			//给生成的重新定位
			for(var i=0;i< $("#content li").length;i++){
				$("#content li").eq(i).css({left:datas[i].left,top:datas[i].top})
				if(i === ($("#content li").length-1)){
					var aInput = aLi2[i].getElementsByTagName("input")[0]
					setTimeout(function(){
						aInput.select();
					},0)
					$("#content li").eq(i).addClass("active");
					$("#content li").eq(i).find("input").show();
					$("#content li").eq(i).find("input").prev().hide();
				}
			}
			
			//给li重新绑定移上函数
			aLi.hover(function(){
				$(this).addClass("hover")
			},function(){
				$(this).removeClass("hover")	
			})
		})
	})
	
	
	//鼠标点击window时触发输入框的失去焦点事件
	$(window).click(function(){
		var oContent = document.getElementById("content")
		var aInput = oContent.getElementsByTagName("input");
		for(var i=0;i<aInput.length;i++){
			aInput[i].blur();
		}
		arr3 = [];
	})
	
	//---------------------content_li的右键自定义菜单事件----------------------------------
	var bl = false;
	$("#content").delegate(".content_li","mousedown",function(ev){ 
		if(ev.button == 0) return;
		//如果点击的li不在arr3中,则说明点击的是其他的li,则返回true;
//		否则返回false
		bl = arr3.every((item)=> item !== this)//判断arr3里面是否都和当前点击的this不相等,此时返回true
		if(bl){
			$(".content_li").removeClass("active")
			$(this).addClass("active")
			arr3 = [];
		}	
	    var key = ev.which; //获取鼠标键位  
	    if(key == 3){//右键菜单事件
			var X = ev.pageX;
			var Y = ev.pageY;
			
			oLi_menu.css({left:X,top:Y})
			
			oLi_menu.show();
			//让右键菜单消失
			oMenu.hide();
			$("#menu li").find($(".sort_menu")).hide();
			ev.stopPropagation();
		}
	})
	//---------------------------删除元素-----------------------------------
	$("#delet").click(function(ev){
		aLi = $(".content_li")
		//如果bl为true,点击删除一个元素
		if(bl){
			var index = $(".active").index()
			//如果删除的是此电脑和回收站return;
			if(aLi.eq(index).hasClass("computerName") || aLi.eq(index).hasClass("trashName")){
				console.log("不能删除此电脑或回收站!")
				oLi_menu.hide();
				return;
			}
			//点击删除后将所有的选中li的class都清空;
			aLi.removeClass("active")
			var obj2 = datas.splice(index,1);
			obj2 = obj2[0];
			data.delet.push(obj2);
			oLi_menu.hide();
			ev.stopPropagation();
		}else{
			var n=0;
			for(var i=0;i<arr3.length;i++){
				var index = $(arr3[i]).index();
				if(aLi.eq(index).hasClass("computerName") || aLi.eq(index).hasClass("trashName")){
					console.log("不能删除此电脑或回收站!")
					n++;
					continue;
				}
				var obj2 = datas.splice(index-i+n,1);
				obj2 = obj2[0];
				data.delet.push(obj2);
				oLi_menu.hide();
			}
			aLi.removeClass("active")
		}
		//删除后为什么后面的会顶上去啊~~~~~??????
		//解决方法~~~手动把位置再拉回来~~~~~
		for(var i=0;i<datas.length;i++){
			$("#content li").eq(i).css({left:datas[i].left,top:datas[i].top})
		}
		//渲染回收站的内容
		handle.removeDeletHtml();
	})


//-------------------------------新建文件夹2-----------------------------------------
	$(".menu_ul:nth-of-type(4) .sort_menu div:first").click(function(){
		if(commonObj.isDoc) return;
		$("#menu").hide();
		var arr = handle.getChildsById(data.myComputed,commonObj.commonCurrentId)
		console.log(!arr.length)
		if(!arr.length){
			var str = "新建文件夹"
		}else{
			for(var i=0 ;i < (arr.length+1);i++){
				var n = i===0 ? "" : i
				var str = "新建文件夹" + n
				var num = arr.findIndex((item)=>item.title === str);
				console.log(num)
				//如果num === -1,说明没有重名,可以用
				if(num === -1){
					break;
				}
			}
		}
		var aDialog_wrap = document.getElementsByClassName("dialog_wrap");
		for(var i=0;i<aDialog_wrap.length;i++){
			if(aDialog_wrap[i].currentId == commonObj.commonCurrentId){
				var oDiv = aDialog_wrap[i]
			}
		}
		var oChildsUl = oDiv.getElementsByClassName("childs_ul")[0]
		var oLi = document.createElement("li");
		oLi.className="childs_li";
		oLi.innerHTML = '<div class="file"></div><input style="display:block" type="text" class="text" value = "'+str+'"></li>';
		var oText = oLi.getElementsByClassName("text")[0]
		setTimeout(function(){
			oText.select();
		},0)
		oChildsUl.appendChild(oLi);
		
		
		oText.onblur = function(){
			var beforeTitle = str;
			str = oText.value;
			var arr = handle.getChildsById(data.myComputed,commonObj.commonCurrentId)
			var num2 = arr.findIndex((item)=>item.title === str);
			if(num2 != -1){
				//num2!=-1,说明有重复的
				str = beforeTitle;
			}
			data.myComputed.push({
				id:Math.random(),
				title:str,
				type:"file",
				pid:commonObj.commonCurrentId,
				isTop:true
			})	
			
			handle.removeHtml();
		}
	})
	
	
	//-------------------------排序--------------------------------
	$(".menu_ul:nth-of-type(1) li:nth-of-type(2) .sort_menu div:first").click(function(){
		if(commonObj.isDoc){
			//说明是桌面的东西
			datas.sort(function(a,b){
				return a.id - b.id
			})
		}else{
			var arr1 = data.myComputed.filter((item) => item.pid == commonObj.commonCurrentId)
			data.myComputed = data.myComputed.filter((item)=>item.pid != commonObj.commonCurrentId)
			arr1.sort(function(a,b){
				return b.id - a.id
			})
			data.myComputed = data.myComputed.concat(arr1)
			
			handle.removeHtml();
		}
		
		$("#menu li").find($(".sort_menu")).hide();
		$("#menu").hide();
	})
	
	$(".menu_ul:nth-of-type(1) li:nth-of-type(2) .sort_menu div:nth-of-type(2)").click(function(){
		if(commonObj.isDoc){
			//说明是桌面的东西
			datas.sort(function(a,b){
				//此处需要手动转化为unicode编码
				return a.size - b.size
			})
		}else{
			var arr1 = data.myComputed.filter((item) => item.pid == commonObj.commonCurrentId)
			data.myComputed = data.myComputed.filter((item)=>item.pid != commonObj.commonCurrentId)
			arr1.sort(function(a,b){
				return b.size - a.size
			})
			data.myComputed = data.myComputed.concat(arr1)
			
			handle.removeHtml();
		}
		
		$("#menu li").find($(".sort_menu")).hide();
		$("#menu").hide();
	})
	
	$(".menu_ul:nth-of-type(1) li:nth-of-type(2) .sort_menu div:nth-of-type(3)").click(function(){
		if(commonObj.isDoc){
			//说明是桌面的东西
			datas.sort(function(a,b){
				for(var i=0;i<a.type.length;i++){
					var num = a.type.charCodeAt(i) - b.type.charCodeAt(i)
					if(i==b.type.length){
						num = 1;
						break;
					}
					if(num != 0){
						break;
					}
					if(i==a.type.length-1 && i!=b.type.length-1){
						console.log(3)
						num = -1;
					}
				}
				return num
			})
		}else{
			var arr1 = data.myComputed.filter((item) => item.pid == commonObj.commonCurrentId)
			data.myComputed = data.myComputed.filter((item)=>item.pid != commonObj.commonCurrentId)
			arr1.sort(function(a,b){
				for(var i=0;i<a.type.length;i++){
					var num = a.type.charCodeAt(i) - b.type.charCodeAt(i)
					if(i==b.type.length){
						num = 1;
						break;
					}
					if(num != 0){
						break;
					}
					if(i==a.type.length-1 && i!=b.type.length-1){
						num = -1;
					}
				}
				return num
			})
			data.myComputed = data.myComputed.concat(arr1);
			handle.removeHtml();
		}
		$("#menu li").find($(".sort_menu")).hide();
		$("#menu").hide();
	})
	
	$(".menu_ul:nth-of-type(1) li:nth-of-type(2) .sort_menu div:nth-of-type(4)").click(function(){
		if(commonObj.isDoc){
			//说明是桌面的东西
			datas.sort(function(a,b){
				console.log(a.dates,b.dates)
				for(var i=0;i<a.dates.length;i++){
					var num = a.dates.charCodeAt(i) - b.dates.charCodeAt(i)
					if(i==b.dates.length){
						num = 1;
						return num
					}
					if(num != 0){
						return num
					}
				}
				return num;
			})
		}else{
			var arr1 = data.myComputed.filter((item) => item.pid == commonObj.commonCurrentId)
			data.myComputed = data.myComputed.filter((item)=>item.pid != commonObj.commonCurrentId)
			arr1.sort(function(a,b){
				for(var i=0;i<a.dates.length;i++){
					var num = a.dates.charCodeAt(i) - b.dates.charCodeAt(i)
					if(i==a.dates.length){
						num = -1;
						return num
					}
					if(num != 0){
						return num
					}
				}
			})
			data.myComputed = data.myComputed.concat(arr1);
			handle.removeHtml();
		}
		
		$("#menu li").find($(".sort_menu")).hide();
		$("#menu").hide();
	})
})