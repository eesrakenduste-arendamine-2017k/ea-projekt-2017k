$("form.ajaxSubmit").on("submit", function() {
	
	var that = $(this),
		url = that.attr("action"),
		type = that.attr("method"),
		data = {};
		
	that.find("[name]").each(function(index, value) {
		var that = $(this),
			name = that.attr("name"),
			value = that.val();
			
		data[name] = value;
	});
	
	//console.log(data);
	
	$.ajax({
		url: url,
		type : type,
		data : data,
		success : function(response) {
			//console.log-ib data.php print_r 
			console.log(response);
		}
	});
	
	return false;
});