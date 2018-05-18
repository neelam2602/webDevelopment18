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
	$(".brand").click(function(Bobj){
		// alert("brand")
		// console.log(Bobj)
		Bobj.preventDefault();
		var for_ans = $(this).attr("for")
		// alert(for_ans)
		$.post('/brand_filter',"id="+for_ans,function(res){
			console.log(res)
		})
	})
	$(".category").click(function(Bobj){
		// alert("category");
		Bobj.preventDefault();
		var for_ans = $(this).attr("for")
		// alert(for_ans);
		$.post('/category_filter',"id="+for_ans,function(res){
			// console.log(res);
			if(res.length > 0){
				htr = "";
				for(i in res){
					console.log(res[i])
					htr+="<div class='col-sm-4'><div class='product-image-wrapper'><div class='single-products'><div class='productinfo text-center'><img src='/public/uploads/"+res[i].path+"' alt='' /><h2>"+res[i].price+"</h2><p>"+res[i].description+"</p><a href='#' class='btn btn-default add-to-cart'><i class='fa fa-shopping-cart'></i>Add to cart</a></div><div class='product-overlay'><div class='overlay-content'><h2>$"+res[i].price+"</h2><p>"+res[i].description+"</p><a href='#' class='btn btn-default add-to-cart'><i class='fa fa-shopping-cart'></i>Add to cart</a></div></div></div><div class='choose'><ul class='nav nav-pills nav-justified'><li><a href='#'><i class='fa fa-plus-square'></i>Add to wishlist</a></li><li><a href='#'><i class='fa fa-plus-square'></i>Add to compare</a></li></ul></div></div></div>"
				}
				$(".padding-right").html(htr)

			}
			else{
				$(".padding-right").html("")
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
	$(".btn_product").click(function(){
		ans = $("#product_action").serialize();
		// alert(ans)
		$.post('/product_action',ans,function(res){
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