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



})