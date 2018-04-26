$(document).ready(function(){
	// alert("hello");
	$(".btn").click(function(){
		// alert("success")
		record = $("#form_data").serialize()
		// alert(record);
		$.post("/form_action",record).then(function(){
			console.log("success")
		})
	})
	$(".mail").click(function(){
		// alert("successfull")
		record = $("#email_data").serialize()
		// alert(record)
		$.post("/mail_action",record).then(function(response){
			// console.log(response)
			$(".message").html(response)
		})
	})
})