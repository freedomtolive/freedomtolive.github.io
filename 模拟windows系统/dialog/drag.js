function Drag(opt){
		//判断如果没有传入值(即类型为undefined)或者传入的不是一个对象(即构造函数不为Object时)
		if(opt.dragEle === "undefined" || opt.constructor !== Object ){
			throw new Error('输入的类型有误，请输入对象');
			return
		}
		
		//将传入的对象复制一份，避免修改原来的数据
		this.obj = {};
		for(var attr in opt){
			this.obj[attr] = opt[attr]
		}
		
		if(this.obj.moveEle){
			this.element = this.obj.moveEle;
		}else{
			this.element =  this.obj.dragEle;
		}
		
		//初始化
		this.init();
	}
	Drag.prototype = {
		//手动将Drag的原型的指向指回到Drag函数上
		constructor:Drag,
		init(){
			this.obj.dragEle.onmousedown = this.fnDown.bind(this);
		},
		fnDown(ev){
			ev.preventDefault()
			var ev = ev || event;
			this.disX = ev.clientX - this.element.offsetLeft;
			this.disY = ev.clientY - this.element.offsetTop;
			this.obj.onoff = true;
			
			document.onmousemove = this.fnMove.bind(this)
			document.onmouseup = this.fnUp
		},
		fnMove(ev){
			var ev = ev || event;
			
			if(this.obj.onoff){
				//如果有max_span这个class表示是最大化状态
				if($(this.obj.moveEle).find(".max span").hasClass("max_span")){
					return;
				}
			}
			this.x = ev.clientX - this.disX;
			this.y = ev.clientY - this.disY;
//			限制范围
//			if(this.x<0){
//				this.x = 0;
//			}else if(this.x > document.documentElement.clientWidth - this.element.offsetWidth){
//				this.x = document.documentElement.clientWidth - this.element.offsetWidth;
//			}
//			if(this.y <0){
//				this.y = 0;
//			}else if(this.y > document.documentElement.clientHeight - this.element.offsetHeight){
//				this.y = document.documentElement.clientHeight - this.element.offsetHeight
//			}
			this.element.style.left = this.x + 'px';
			this.element.style.top = this.y + 'px';
			lastLeft = this.element.offsetLeft;
			lastTop = this.element.offsetTop;
		},
		fnUp(){
			this.onmousemove = this.onmouseup = null;
		}
	}