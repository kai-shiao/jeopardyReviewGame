(function(){
	var $finalJeopardyPrize;
	var $correctAnswer='SALUTARY NEGLLECT';
	var $startTime=new Date();
	var $totalPrize=Number(localStorage.getItem('totalPrize'));
	var $wagerValue;
	
	$('section').eq(0).addClass('hidden'); //Hide the section element containing the clue, answer field, & the 'Submit' button for now.

	$('body').append('<div id="wagerBox"><p>PLACE YOUR FINAL JEOPARDY! WAGER:</p><input type="text"><button>SUBMIT</button></div>');
	$('#wagerBox').addClass('fadeIntoView');
	
	function addFocus(){
		$('input').focus();
	}
	
	function saveBid(){
		$wagerValue=Number($('#wagerBox').find('input').val());
		var $notice;
		
		if ($totalPrize<0 && ($wagerValue<0 || $wagerValue>(-$totalPrize))){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE BELOW $0, PLEASE ENTER A VALUE EQUAL TO OR GREATER';
			$notice+=' THAN 0 BUT NOT MORE THAN THE POSITIVE EQUIVALENT OF YOUR CURRENT TOTAL PRIZE WINNINGS.</p>';
			$('#wagerBox').append($notice);
		} else if ($totalPrize>0 && $wagerValue>$totalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE ENTER A VALUE THAT IS AT MOST EQUAL TO';
			$notice+=' BUT NOT MORE THAN THIS AMOUNT.</p>';
			$('#wagerBox').append($notice);
		} else if ($totalPrize>0 && $wagerValue<0){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE WAGER ONLY POSITIVE AMOUNTS.';
			$('#wagerBox').append($notice);
		} else if ($wagerValue>$totalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE WAGER ONLY POSITIVE AMOUNTS.';
			$('#wagerBox').append($notice);
		} else {
			$notice='<p>FINAL JEOPARDY! WAGER ACCEPTED!</p>';
			$('#wagerBox').append($notice);

			function fadeAndRemove(){
				$('#wagerBox').addClass('fadeFromView').remove(); //Fade the wager box & remove it from the DOM. 	
			}
			setTimeout(fadeAndRemove,2000);
			$('section').eq(0).removeClass('hidden').addClass('fadeIntoView'); //Bring the clue, answer input field, and submit button into view.
		}
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