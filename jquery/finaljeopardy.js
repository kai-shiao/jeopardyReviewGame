(function(){
	var $correctAnswer='SALUTARY NEGLECT';
	var $startTime;
	var $jeopardyTotalPrize=Number(localStorage.getItem('jeopardyTotalPrize'));
	var $doubleJeopardyTotalPrize=Number(localStorage.getItem('doubleJeopardyTotalPrize'));
	var $beforeFinalJeopardyTotalPrize=$jeopardyTotalPrize+$doubleJeopardyTotalPrize;
	var $wagerValue;

	console.info('BEFORE FINAL JEOPARDY TOTAL PRIZE: $'+$beforeFinalJeopardyTotalPrize);
	
	$('section').eq(0).addClass('hidden'); //Hide the footer & the section element containing the clue, answer field, & the 'Submit' button for now.
	$('footer').addClass('hidden');
	
	$('body').append('<div id="wagerBox"><span>X</span><p>PLACE FINAL JEOPARDY! WAGER:</p><span>$</span><input type="text"><button>SUBMIT</button><p></p></div>');
	$('#wagerBox').addClass('fadeIntoView');
	
	function addFocus(){
		$('input').focus();
	}
	
	function saveWager(){
		$wagerValue=Number($('#wagerBox').find('input').val());
		var $notice;
		
		if ($beforeFinalJeopardyTotalPrize<0 && ($wagerValue<0 || $wagerValue>((-$beforeFinalJeopardyTotalPrize)+10000))){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE BELOW $0, PLEASE ENTER A VALUE EQUAL TO OR GREATER';
			$notice+=' THAN 0 BUT NOT MORE THAN $10,000.</p>';
			$('#wagerBox').find('p').eq(1).html($notice).addClass('fadeIntoView');
		} else if ($beforeFinalJeopardyTotalPrize>0 && $wagerValue>$beforeFinalJeopardyTotalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE ENTER A VALUE THAT IS AT MOST EQUAL TO';
			$notice+=' BUT NOT MORE THAN THIS AMOUNT.</p>';
			$('#wagerBox').find('p').eq(1).html($notice).addClass('fadeIntoView');
		} else if ($beforeFinalJeopardyTotalPrize>0 && $wagerValue<0){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE WAGER ONLY POSITIVE AMOUNTS.';
			$('#wagerBox').find('p').eq(1).html($notice).addClass('fadeIntoView');
		} else if ($beforeFinalJeopardyTotalPrize>0 && $wagerValue>$beforeFinalJeopardyTotalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE MAKE SURE THE WAGER DOES NOT EXCEED YOUR TOTAL PRIZE WINNINGS.';
			$('#wagerBox').find('p').eq(1).html($notice).addClass('fadeIntoView');
		} else if ($beforeFinalJeopardyTotalPrize===0 && $wagerValue>10000){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE $0, PLEASE MAKE SURE THE WAGER DOES NOT EXCEED $10,000.';
			$('#wagerBox').find('p').eq(1).html($notice).addClass('fadeIntoView');
		} else {
			$notice='<p>FINAL JEOPARDY! WAGER ACCEPTED!</p>';
			$('#wagerBox').find('p').eq(1).html($notice).addClass('fadeIntoView');

			function fadeAndRemove(){
				$('#wagerBox').removeClass('fadeIntoView').addClass('fadeFromView');
				
				function removeElement(){
					$('#wagerBox').remove(); //Fade the wager box from view & remove it from the DOM. 	
				}
				
				function fadeIntoView(){
					$('section').eq(0).removeClass('hidden').addClass('fadeIntoView'); //Bring the clue, answer input field, & submit button into view.
					$('footer').removeClass('hidden').addClass('fadeIntoView');
				}
				
				function setUpGame(){
					$('section').find('input').on('click',addFocus);
					$('section').find('button').on('click',markAndScore);
					$startTime=new Date(); //Start counting time as the clue is already displayed.
				}
				
				function markAndScore(){
					$('section').removeClass('fadeIntoView').addClass('fadeFromView');
					
					function removeElement(){
						$('section').remove();
					}
					setTimeout(removeElement,2000);
					
					var $endTime=new Date();
					var $inputValue=$('input').val().toUpperCase();
					console.log($inputValue);
					var $elapsedTime=Number(($endTime-$startTime))/1000;
					var $finalJeopardyPrize;
					var $rightOrWrong;
					var $finalResults;
					
					if ($inputValue===$correctAnswer && $elapsedTime<=30){
						$finalJeopardyPrize=$wagerValue;
					} else if ($inputValue===$correctAnswer && $elapsedTime>30){
						$finalJeopardyPrize=-$wagerValue;	
					} else if ($inputValue!=$correctAnswer && $elapsedTime<=30){
						$finalJeopardyPrize=-$wagerValue;
					} else { //$inputValue!=$correctAnswer && $elapsedTime<=30
						$finalJeopardyPrize=-$wagerValue;
					}
					
					$finalPrize=$jeopardyTotalPrize+$doubleJeopardyTotalPrize+$finalJeopardyPrize; //Compute total prize 
					localStorage.setItem('totalPrize',$finalPrize);
					
					var $displayBeforeFinalJeopardyPrize;
					var $sign1;
					var $determineClass1;
					
					var $displayFinalPrize;
					var $sign2;
					var $determineClass2;
	
					if ($beforeFinalJeopardyTotalPrize<0 && $finalPrize<0){ //The player enters the maximum allowable wager (positive equivalent +$10,000) & answers incorrectly.
						$displayBeforeFinalJeopardyPrize=-$beforeFinalJeopardyTotalPrize;
						$sign1='-';
						$determineClass1='negative';
						
						$displayFinalPrize=-$finalPrize;
						$sign2='-';
						$determineClass2='negative';
					} else if ($beforeFinalJeopardyTotalPrize<0 && $finalPrize>0){ //The player enters the maximum allowable wager & answers correctly. 
						$displayBeforeFinalJeopardyPrize=-$beforeFinalJeopardyTotalPrize;
						$sign1='-';
						$determineClass1='negative';
						
						$displayFinalPrize=$finalPrize;
						$sign2='';
						$determineClass2='positive';						
					} else if ($beforeFinalJeopardyTotalPrize===0 && $finalPrize<0){
						$sign2='-';
						$determineClass2='negative';						
					} else {
						/*
						For the following cases:
						$beforeFinalJeopardyTotalPrize>0 && ($finalPrize===0 || $finalPrize>0) 
						$beforeFinalJeopardyTotalPrize===0 && $finalPrize>0
						1. the player bets 0 & answers correctly OR the player bets all & answers incorrectly.
						2. the player bets the maximum allowable wager and answers correctly.
						*/
						$displayBeforeFinalJeopardyPrize=$beforeFinalJeopardyTotalPrize;
						$sign1='';
						$determineClass1='positive';						

						$displayFinalPrize=$finalPrize;
						$sign2='';
						$determineClass2='positive';						
					} 
					
					if ($inputValue===$correctAnswer){
						$rightOrWrong='<p class="positive">CORRECT!</p>';
					} else {
						$rightOrWrong='<p class="negative">INCORRECT!</p><p> THE CORRECT ANSWER IS \'SALUTARY NEGLECT\'.</p>';
					}
					
					$finalResults='<ul><li>TOTAL PRIZE WINNINGS PRIOR TO FINAL JEOPARDY!:<span class='; 
					$finalResults+='"'+$determineClass1+'">'+$sign1+'$'+$displayBeforeFinalJeopardyPrize+'</span></li><li>YOUR WAGER:';
					$finalResults+='<span class="positive">$'+$wagerValue+'</span></li><li>FINAL PRIZE WINNINGS:<span class="'+$determineClass2+'">'+$sign2+'$'+$displayFinalPrize+'</span></li></ul>';
					
					$finalJeopardyInfo='<div id="finalJeopardyInfo"><span>X</span><h1>FINAL JEOPARDY! RESULTS</h1>'+$rightOrWrong+$finalResults+'</div>';
					
					function delayFade(){
						$('body').append($finalJeopardyInfo);
						$('#finalJeopardyInfo').addClass('fadeIntoView');
						$('#finalJeopardyInfo').find('span').eq(0).click(conclude);
						
						function conclude(){
							$('#finalJeopardyInfo').removeClass('fadeIntoView').addClass('fadeFromView');
						
							function removeElement(){
								$('#finalJeopardyInfo').remove();
							}
						
							function showGameStats(){
								var $jeopardyCorrect=localStorage.getItem('jeopardyCorrect');
								var $jeopardyWinningPercentage=localStorage.getItem('jeopardyWinningPercentage');
								var $doubleJeopardyCorrect=localStorage.getItem('doubleJeopardyCorrect');
								var $doubleJeopardyWinningPercentage=localStorage.getItem('doubleJeopardyWinningPercentage');
							
								$showGameStatsHTML='<div id="showGameStats"><h1>GAME STATS</h1><section><h1>JEOPARDY! STATS</h1><ul><li>PRIZE WINNINGS: $'+$jeopardyTotalPrize+'</li>';
								$showGameStatsHTML+='<li> NUMBER CORRECT: '+$jeopardyCorrect+'</li><li>WINNING PERCENTAGE: '+$jeopardyWinningPercentage+'%</li></ul>';
								$showGameStatsHTML+='</section><section><h1>DOUBLE JEOPARDY! STATS</h1><li>PRIZE WINNINGS: $'+$doubleJeopardyTotalPrize+'</li>';
								$showGameStatsHTML+='<li>NUMBER CORRECT: '+$doubleJeopardyCorrect+'</li><li>WINNING PERCENTAGE: '+$doubleJeopardyWinningPercentage+'%</li>';
								$showGameStatsHTML+='</section></div>';
								$('body').append($showGameStatsHTML);
								$('#showGameStats').addClass('fadeIntoView');
							}
						
							setTimeout(removeElement,2000);
							setTimeout(showGameStats,4000);
						}
					}
					
					setTimeout(delayFade,2000);
				}
				setTimeout(removeElement,2000);
				setTimeout(fadeIntoView,3000);
				setTimeout(setUpGame,5000);	
			}
			$('#wagerBox').find('span').eq(0).on('click',fadeAndRemove);
		}
	}
	
	$('#wagerBox').find('input').on('click',addFocus);
	$('#wagerBox').find('button').on('click',saveWager);
})();