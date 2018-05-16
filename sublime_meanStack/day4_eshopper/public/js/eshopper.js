$(document).ready(function(){
	// alert("test")
	$(".btn_signup").click(function(){
		// alert("succsess")
		// alert($("#register_action").serialize())
		$.post("/register_action",$("#register_action").serialize(),function(res){
			// alert(res)
			$(".err_signup").html(res);

		})
	})
	$(".btn_login_action").click(function(){
		// alert("success")
		$.post("/login_action",$("#login_action").serialize(),function(res){
			// alert(res)
			if(res == "ok"){
				window.location.href = window.location.origin
			}
			else{
				$(".err_div").html(res);
			}

		})
	})
	$(".btn_category").click(function(){
		ans = $("#category_action").serialize();
		// alert(ans)
		$.post('/category_action',ans,function(res){
			// alert(res);
			$(".err_div").html(res)
		})
	})
	$(".btn_brand").click(function(){
		ans = $("#brand_action").serialize();
		// alert(ans)
		$.post('/brand_action',ans,function(res){
			// alert(res);
			$(".err_div").html(res)
		})
	})
	$(".btn_update_action").click(function(){
		$.post("/password_action",$("#password_action").serialize(),function(res){
			// alert(res)
		})
	})
})