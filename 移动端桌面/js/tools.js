handle = {
	toTwo(n){
		if(n<10){
			return "0" + n;
		}else{
			return "" + n;
		}
	},
	time(){
		t = new Date();
		$(".time_font").text(handle.toTwo(t.getHours()) + ":" + handle.toTwo(t.getMinutes())) 
		
		$(".month").text((t.getMonth()+1));
		$(".dates").text((t.getDate()))
		if(t.getDay() === 1){
			strWeek = "星期一"
		}else if( t.getDay() === 2){
			strWeek = "星期二"
		}else if( t.getDay() === 3){
			strWeek = "星期三"
		}else if( t.getDay() === 4){
			strWeek = "星期四"
		}else if( t.getDay() === 5){
			strWeek = "星期五"
		}else if( t.getDay() === 6){
			strWeek = "星期六"
		}else if( t.getDay() === 0){
			strWeek = "星期日"
		}
		$(".week").text(strWeek);
	}
}
