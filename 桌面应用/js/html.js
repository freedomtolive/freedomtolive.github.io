//生成结构
html = {
	createHtml(data){
		var infoHtml = template("info",data); 
		return infoHtml;
	},
	createMenuHtml(data){
		var menuHtml = template("menus",data); 
		return menuHtml;
	},
	createMyComputedHtml(data,id){
		var str = '';
		var ul = handle.getSelfById(data,id);
		var arr = handle.getChildsById(data,id);
		if(!arr.length){
			return '';
		}
		str += '<ul class="dialog_computed">'
		arr.forEach(function (value){
			//根据数据的id找到所有的父级(用来看他有几个父级，判断他是第几级菜单，从而加padding-left)
			var arrLength = handle.getFatherById(data,value.id).length;
			var re = /img/;
			if(!re.test(value.type) ){
				str += '<li class="'
				if(value.isOpen == 'true'){
					str += 'open';
				}else{
					str += 'close';
				}
				str += '"><h3 data-id="'+ value.id +'" style = "padding-left :'+ ((arrLength-1)*40+20) +'px"><span class="'+value.type  +'"></span>'+ value.title + '</h3>';
				str += html.createMyComputedHtml(data,value.id);
				str += '</li>';	
			}
		})
		str += '</ul>';
		return str;
	},
	createSortHtml(data){
		var arr = handle.getChildsById(data,0)
		arr = arr.filter((item)=>item.isTop)
		var str = '';
		arr.forEach(function (value){
			//根据数据的id找到所有的父级(用来看他有几个父级，判断他是第几级菜单，从而加padding-left)
			str += '<li data-id='+ value.id +'><h3 data-id="'+ value.id +'"><span class="'+ value.type +'"></span>'+ value.title + '</h3></li>';	
		})
		return str;
	},
	createComputHtml(data){
		var arr = data.filter((item)=> item.isTop == false)
		var str = '';
		arr.forEach(function (value){
			//根据数据的id找到所有的父级(用来看他有几个父级，判断他是第几级菜单，从而加padding-left)
			str+=`<li data-id="${value.id}">
				<span class="${value.type}"></span>
				<div class="contentBottom2_right">
					<div>${value.title}</div>
					<div>
						<div class="jindu"></div>
					</div>
					<div>
						<span>${value.now}</span>GB可用，共<span>${value.common}</span>GB
					</div>
				</div>
			</li>`
		})
		return str;
	},
	createNav(data,id){
		var str = '';
		var arr = handle.getFatherById(data,id).reverse();
		arr.forEach(function(value,index){
			str += `
				<span class="jiantou"></span><div class="dialog_nav_font" data-id="${value.id}">${value.title}</div>
			`;
			//此处写成字符串格式为什么会报错~~~?
//			str+="<span class="jiantou"></span><div class="dialog_nav_font">此电脑</div>"
		})
		return str;
	},
	createDelet(data){
		var str = '';
		data.forEach(function (value){
			str += '<li class="deletLi"><span class="dialog_shipin"></span><div class="contentBottom3_right"><div>'+ value.title +'</div><div>'+value.type+'</div></div></li>';
		})
		return str;
	},
	createChilds(data){
		var str = '<ul class="childs_ul clearfix">';
		data.forEach(function(value){
			str += '<li class="childs_li"  data-id="'+ value.id +'"><div class="'+ value.type +'"></div><span class="childs_font">';
			str += value.title
			str += '</span><input type="text" class="text"></li>';
		})
		str += '</ul>'
		return str;
	}
}


