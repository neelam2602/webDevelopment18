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
})