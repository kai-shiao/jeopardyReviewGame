(function(){
	var $correctAnswer='SALUTARY NEGLLECT';
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
		
		if ($beforeFinalJeopardyTotalPrize<0 && ($wagerValue<0 || $wagerValue>(-$beforeFinalJeopardyTotalPrize))){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE BELOW $0, PLEASE ENTER A VALUE EQUAL TO OR GREATER';
			$notice+=' THAN 0 BUT NOT MORE THAN THE POSITIVE EQUIVALENT OF YOUR CURRENT TOTAL PRIZE WINNINGS.</p>';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else if ($beforeFinalJeopardyTotalPrize>0 && $wagerValue>$beforeFinalJeopardyTotalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE ENTER A VALUE THAT IS AT MOST EQUAL TO';
			$notice+=' BUT NOT MORE THAN THIS AMOUNT.</p>';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else if ($beforeFinalJeopardyTotalPrize>0 && $wagerValue<0){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE WAGER ONLY POSITIVE AMOUNTS.';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else if ($beforeFinalJeopardyTotalPrize>0 && $wagerValue>$beforeFinalJeopardyTotalPrize){
			$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS ARE ABOVE $0, PLEASE MAKE SURE THE WAGER DOES NOT EXCEED YOUR TOTAL PRIZE WINNINGS.';
			$('#wagerBox').find('p').eq(1).html($notice);
		} else {
			$notice='<p>FINAL JEOPARDY! WAGER ACCEPTED!</p>';
			$('#wagerBox').find('p').eq(1).html($notice);

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
					
					var $displayBeforeFinalJeopardyPrize=$beforeFinalJeopardyTotalPrize;
					var $sign='';
					var $determineClass='positive';
					
					if ($beforeFinalJeopardyTotalPrize<0){
						$displayBeforeFinalJeopardyPrize=-$beforeFinalJeopardyTotalPrize;
						$sign='-';
						$determineClass='negative';
					}
					
					if ($inputValue===$correctAnswer){
						$rightOrWrong='<p class="positive">CORRECT!</p>';
					} else {
						$rightOrWrong='<p class="negative">INCORRECT!</p><p> THE CORRECT ANSWER IS \'SALUTARY NEGLECT\'.</p>';
					}
					
					$finalResults='<p>YOUR TOTAL PRIZE WINNINGS PRIOR TO FINAL JEOPARDY! WAS <span class='; 
					$finalResults+='"'+$determineClass+'">'+$sign+'$'+$displayBeforeFinalJeopardyPrize+'</span>AND YOU WAGERED<span>$'+$wagerValue+'</span>';
					$finalResults+='YOUR FINAL PRIZE WINNINGS ARE '+$sign+'$'+$finalPrize+'</p>';
					
					$finalJeopardyInfo='<div id="finalJeopardyInfo"><span>X</span>'+$rightOrWrong+$finalResults+'</div>';
					$('body').append($finalJeopardyInfo);
					$('#finalJeopardyInfo').addClass('fadeIntoView');
					
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
							
							$showGameStatsHTML='<div id="showGameStats"><h1>GAME STATS</h1><section><h2>JEOPARDY! STATS</h2><ul><li>PRIZE WINNINGS: $'+$jeopardyTotalPrize+'</li>';
							$showGameStatsHTML+='<li> NUMBER CORRECT: '+$jeopardyCorrect+'</li><li>WINNING PERCENTAGE: '+$jeopardyWinningPercentage+'%</li></ul>';
							$showGameStatsHTML+='</section><section><h2>DOUBLE JEOPARDY! STATS</h2><li>PRIZE WINNINGS: $'+$doubleJeopardyTotalPrize+'</li>';
							$showGameStatsHTML+='<li>NUMBER CORRECT: '+$doubleJeopardyCorrect+'</li><li>WINNING PERCENTAGE: '+$doubleJeopardyWinningPercentage+'%</li></section></div>';
							$('body').append($showGameStatsHTML);
							$('#showGameStats').addClass('fadeIntoView');
						}
						
						setTimeout(removeElement,2000);
						setTimeout(showGameStats,3000);
					}
					$('#finalJeopardyInfo').find('span').eq(0).on('click',conclude);
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