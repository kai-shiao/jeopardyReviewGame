(function(){
	var $finalJeopardyPrize;
	var $correctAnswer='SALUTARY NEGLLECT';
	var $startTime=new Date();
	var $totalPrize=;
	var $wagerValue;
	
	$('body').append('<div id="wagerBox"><p>PLACE YOUR FINAL JEOPARDY! WAGER:</p><input type="text"><button>SUBMIT</button></div>');
	$('#wagerBox').addClass('fadeIntoView');
	
	function addFocus(){
		$('input').focus();
	}
	
	function saveBid(){
		$wagerValue=Number($('#wagerBox').find('input').val());
		
		if ($totalPrize<0 && ($wagerValue<0 || $wagerValue>(-$totalPrize))){
			var $notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE BELOW $0, PLEASE ENTER A VALUE EQUAL TO OR GREATER';
			    $notice+=' THAN 0 BUT NOT MORE THAN THE POSITIVE EQUIVALENT OF YOUR CURRENT TOTAL PRIZE WINNINGS.</p>';
			$('#wageBox').append($notice);
		} else if ($totalPrize>0 && $wagerValue>$totalPrize){
			var $notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE ENTER A VALUE THAT IS AT MOST EQUAL TO';
			    $notice+=' BUT NOT MORE THAN THIS AMOUNT.</p>';
			$('#wageBox').append($notice);	
		} else if ($totalPrize>0 && $wagerValue<0){
			var $notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE ENTER A VALUE THAT IS AT MOST EQUAL TO';
			    $notice+=' BUT NOT MORE THAN THIS AMOUNT.</p>';
			$('#wageBox').append($notice);	
		} else {
			var $notice='<p>FINAL JEOPARDY! WAGER ACCEPTED!</p>';
			$('#wagerBox').append($notice);
		}
		
		$('body').find('p').eq(0).removeClass('hidden').addClass('fadeIntoView'); //Fade the Final Jeopardy! question into view.
	}
	
	function markAndScore(){
		var $endTime=new Date();
		
		var $inputValue=$('input').val().toUpperCase();
		var $elapsedTime=Number(($endTime-$startTime))/1000;

		if ($inputValue===$correctAnswer && $elapsedTime<=30){
			$finalJeopardyPrize=$wagerValue;
		} else if ($inputValue===$correctAnswer && $elapsedTime>30){
			$finalJeopardyPrize=-$wagerValue;	
		} else if ($inputValue!=$correctAnswer && $elapsedTime<=30){
			$finalJeopardyPrize=-$wagerValue;
		} else { //$inputValue!=$correctAnswer && $elapsedTime<=30
			$finalJeopardyPrize=-$wagerValue;
		}
	}
	
	$('input').on('click',addFocus);
	$('button').on('click',markAndScore);
})();