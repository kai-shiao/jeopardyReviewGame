(function(){
	var $finalJeopardyPrize;
	var $correctAnswer='SALUTARY NEGLLECT';
	var $startTime;
	var $totalPrize=Number(localStorage.getItem('totalPrize'));
	console.log($totalPrize);
	var $wagerValue;
	
	$('section').eq(0).addClass('hidden'); //Hide the section element containing the clue, answer field, & the 'Submit' button for now.
	$('footer').addClass('hidden');
	
	$('body').append('<div id="wagerBox"><span>X</span><p>PLACE FINAL JEOPARDY! WAGER:</p><span>$</span><input type="text"><button>SUBMIT</button><p></p></div>');
	$('#wagerBox').addClass('fadeIntoView');
	
	function addFocus(){
		$('input').focus();
	}
	
	function saveWager(){
		$wagerValue=Number($('#wagerBox').find('input').val());
		var $notice;
		
		if ($totalPrize<0 && ($wagerValue<0 || $wagerValue>(-$totalPrize))){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE BELOW $0, PLEASE ENTER A VALUE EQUAL TO OR GREATER';
			$notice+=' THAN 0 BUT NOT MORE THAN THE POSITIVE EQUIVALENT OF YOUR CURRENT TOTAL PRIZE WINNINGS.</p>';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else if ($totalPrize>0 && $wagerValue>$totalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE ENTER A VALUE THAT IS AT MOST EQUAL TO';
			$notice+=' BUT NOT MORE THAN THIS AMOUNT.</p>';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else if ($totalPrize>0 && $wagerValue<0){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE WAGER ONLY POSITIVE AMOUNTS.';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else if ($totalPrize>0 && $wagerValue>$totalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE MAKE SURE THE WAGER DOES NOT EXCEED YOUR TOTAL PRIZE WINNINGS.';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else {
			$notice='<p>FINAL JEOPARDY! WAGER ACCEPTED!</p>';
			$('#wagerBox').find('p').eq(1).html($notice);

			function fadeAndRemove(){
				$('#wagerBox').removeClass('fadeIntoView').addClass('fadeFromView');
				
				function removeElement(){
					$('#wagerBox').remove(); //Fade the wager box & remove it from the DOM. 	
				}
				setTimeout(removeElement,2000);
				setTimeout(bringIntoView,4000);
			}
			
			$('#wagerBox').find('span').eq(0).on('click',fadeAndRemove);

			function bringIntoView(){
				$('section').eq(0).removeClass('hidden').addClass('fadeIntoView'); //Bring the clue, answer input field, and submit button into view.
				$('footer').removeClass('hidden').addClass('fadeIntoView');
			}
			
			$startTime=new Date(); //Start counting time as the clue is already displayed.

			$('section').find('button').on('click',markAndScore);
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
	
	$('#wagerBox').find('input').on('click',addFocus);
	$('#wagerBox').find('button').on('click',saveWager);
})();