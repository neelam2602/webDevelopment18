$(document).ready(function(){
	// alert(1)

	var height = Math.round($(".product_box").height());
	// console.log(height);
	var width = Math.round($(".product_box").width());
	// console.log(width);

	$(".slide_box").height(height);
	$(".slide_box").width(width);
	$(".slide_box").css("top",-height);

	$(".product_box").mouseenter(function(){
		$(this).children(".slide_box").animate({
			"top":0
		},300);
	})
	$(".product_box").mouseleave(function(){
		$(this).children(".slide_box").animate({
			"top":-height
		},300);
	})
	
	// modal box
	$(".blackbox").hide();

	$(".open_box").click(function(){
		$(".blackbox").fadeIn(1000);
		$(".modalbox").animate({
			"top":"50%"
		},500)
	})
	$(".blackbox").click(function(){
		$(".blackbox").fadeOut(1000);
		$(".modalbox").animate({
			"top":"-410px"
		},500)
	})
	// modal box

	$(document).keyup(function(keyObj){
		// console.log(keyObj)
		// console.log(keyObj.keyCode)
		res_black= $(".blackbox").css("display")
		// console.log(res_black);

		if(res_black == "block" && keyObj.keyCode == 27){
			$(".blackbox").fadeOut(1000);
			$(".modalbox").animate({
				"top":"-410px"
			},500)
		}
	})

	// tab examples
	$(".tab_class_contents").hide();
	$(".tab_class_contents:first").show();

	$(".tab_class li").click(function(){
		position = $(this).index();
		// alert(position);
		$(".tab_class_contents").hide();
		$(".tab_class_contents").eq(position).fadeIn(500);
	})
	// tab examples

	// slider examples
	slide_wi = $(".slider").width();
	// alert(slide_wi);
	slide_hi = Math.round($(".slider").height());
	// alert(slide_hi);

	$(".slider").css("float","left");
	$(".mainslide").width(slide_wi * $(".slider").length);
	$(".mainslide, .gallery").height(slide_hi);
	$(".gallery").width(slide_wi);
	// $(".gallery").css("border","3px solid");
	$(".gallery").css("overflow","hidden");
	// $(".mainslide").css("border","3px solid red")

	slider_arr = [];
	$(".slider").each(function(position){
		// console.log(position);
		// console.log($(this).width())
		// console.log($(this).width() *position)

		slider_arr[position] = $(this).width() * position;

	})
	// console.log(slider_arr)
	curpos = 0;
	minpos = 0;
	maxpos = $(".slider").length - 1;
	$(".circles span").click(function(){
		var pos = $(this).index();
		curpos = pos;
		// alert(pos)
		// console.log(pos)
		// console.log(slider_arr[pos])
		$(".mainslide").animate({
			"margin-left": -slider_arr[pos]+"px"
		},1000);
		$(".circles span").css("background","#f1f1f1")
		$(this).css("background","#c1c1c1");

		if(curpos > 0){
			$(".left_arrow").fadeIn();
		}
		else{
			$(".left_arrow").fadeOut();

		}
		if(curpos<maxpos){
			$(".right_arrow").fadeIn()
		}
		else{
			$(".right_arrow").fadeOut()

		}

	})
	$(".left_arrow").hide();
	
	$(".left_arrow").click(function(){
		curpos--;
		$(".mainslide").animate({
			"margin-left": -slider_arr[curpos]+"px"
		},1000);
		if(curpos > 0){
			$(".left_arrow").fadeIn();
		}
		else{
			$(".left_arrow").fadeOut();

		}
		if(curpos<maxpos){
			$(".right_arrow").fadeIn()
		}
		else{
			$(".right_arrow").fadeOut()

		}
		$(".circles span").css("background","#f1f1f1")
		$(".circles span:eq("+curpos+")").css("background","#c1c1c1");
	})

	$(".right_arrow").click(function(){
		curpos++;
		$(".mainslide").animate({
			"margin-left": -slider_arr[curpos]+"px"
		},1000);
		if(curpos > 0){
			$(".left_arrow").fadeIn();
		}
		else{
			$(".left_arrow").fadeOut();

		}
		if(curpos<maxpos){
			$(".right_arrow").fadeIn()
		}
		else{
			$(".right_arrow").fadeOut()

		}
		$(".circles span").css("background","#f1f1f1")
		$(".circles span:eq("+curpos+")").css("background","#c1c1c1");
	})
	
	// slider examples
	// tooltip
	$(".searchbox").mousemove(function(mouseobj){
		// console.log(mouseobj);
		// console.log(mouseobj.pageX)
		xpos = mouseobj.pageX;
		ypos = mouseobj.pageY;
		$(".tooltip").show();
		$(".tooltip").css("left",xpos+20)
		$(".tooltip").css("top",ypos+20)


	})
	$(".searchbox").mouseout(function(){
		$(".tooltip").hide();

	})
	// tooltip

	// flipEffect
	fcover = Math.round($(".front_cover").width());
	// alert(fcover);

	$(".flip_box , .flip_box_parent").width($(".front_cover").width());
	$(".flip_box , .flip_box_parent").height($(".front_cover").height());

	$(".flip_box_parent").mouseenter(function(){
		$(".flip_box").css({
			"transform":"rotateY(0) perspective("+fcover+"px)",
			"transition":"transform 2s"
		})
		$(".front_cover").css({
			"transform":"rotateY(180deg) perspective("+fcover+"px)",
			"transition":"transform 2s"
		})
	})
	// flipEffect




})