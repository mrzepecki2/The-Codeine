(function( $ ) {

	$(document).ready(function(){
		var maxValue = 3;
		var number = randomInt(1,maxValue);
		currentBox = 0;
		gameActive = true;
		arrowControl(maxValue,number);
		popUpClose();
	});

	function arrowControl(maxValue,number){
		
		$(document).keydown(function(e) {
			if(gameActive){
				switch(e.which) {
					case 37: //left
						if(!isMobile()){
							currentBoxCheck(maxValue, -1);
						}
					break;
					case 38: // up
						if(isMobile()){
							currentBoxCheck(maxValue, -1);
						}
					break;
					case 39: // right
						if(!isMobile()){
							currentBoxCheck(maxValue, 1);
						}
					break;
					case 40: // down
						if(isMobile()){
							currentBoxCheck(maxValue, 1);
						}
					break;
					case 13: //enter
						selectBox(number);
					break;

					default: return; 
				}
			}
			e.preventDefault(); 
		});
	}

	function randomInt(min,max)
	{
		return Math.floor(Math.random()*(max-min+1)+min);
	}

	function currentBoxCheck(maxValue, arrowValue){
		currentBox = currentBox + arrowValue;
		if(currentBox <= 0){
			currentBox = maxValue;
		}else if(currentBox > maxValue){
			currentBox = 1;
		}

		var boxes = $(".boxes .box .box-inner");
		boxes.each(function(){
			$(this).removeClass("active");
		})
		var single_box = boxes.eq(currentBox-1).addClass("active");
	}

	function isMobile(){
		return $(window).width()<992; 
	}

	function selectBox(number){
		if (currentBox != 0)
		{
			var boxes = $(".boxes .box .box-inner");
			var single_box = boxes.eq(currentBox-1).addClass("rotate");
			gameActive = false;

			setTimeout(function() 
			{

					if(currentBox == number){
						text = "Wygrałeś";
						single_box.find(".box-inner-back-content").addClass("visible");
					}
					else{
						text = "Przegrałeś";

					}
					$("#pop-up .alert").html(text); 
					$("#pop-up").removeClass("hidden-pop-up");
			}, 2000);
		}
	}

	function popUpClose(){
		$("#pop-up .close-button").click(function(){
			$("#pop-up").addClass("hidden-pop-up");
		});
	}
})( jQuery );