function gameplay(e){
	//The following variables must be global within the function gameplay() since more than 1 sub-function will make use of these variables.
	var $eventTarget=$(e.target);
	var $eventTargetID=Number($eventTarget.attr('id'));
	var $wagerValue;
	var $jeopardyClueStatus=JSON.parse(localStorage['jeopardyClueStatus']);
	console.log($eventTargetID);
	var $startTime;
					
	/*
	Tiles in different categories will trigger different code to be executed, but there are still several tasks that are the same across the board.
	Code repetition is avoided through the use of function declarations and simply making the applicable function calls in each necessary situation.
	*/
	function dailyDouble(){
		$eventTarget.html('<p>DAILY DOUBLE!!!</p>').css({'color': 'rgb(255,215,0)', 'font-size': '75%'});
		//The above is for the tile on the display screen.
		
		//The below is for the enlarged pop-up box.
		$('body').append('<div id="dailyDouble"><span>X</span><p>DAILY DOUBLE!!!</p></div>');
		$('#dailyDouble').addClass('fadeIntoView');

		function showRules(){
			$('#dailyDouble').removeClass('fadeIntoView').addClass('fadeFromView');
			function removeDailyDouble(){
				$('#dailyDouble').remove();
			}
			setTimeout(removeDailyDouble,1000);
		
			function delayAppearance(){
				var $wagerRules='<div id="wagerRules"><span>X</span><h1>WAGER RULES</h1><ul><li>THE WAGER CANNOT EXCEED YOUR CURRENT TOTAL PRIZE.</li>';
				$wagerRules+='<li>HOWEVER, AN EXCEPTION IS MADE WHEN YOUR CURRENT TOTAL PRIZE IS LESS THAN THE MAXIMUM CLUE VALUE IN THE CURRENT ROUND';
				$wagerRules+=' ($1,000); IN THIS CASE, IT IS PERMISSIBLE TO BID UP TO $1000.</li></ul></div>';
				
				$('body').append($wagerRules);
				$('#wagerRules').addClass('fadeIntoView');
				
				$('#wagerRules').find('span').on('click',proceedToBid);
			}
			setTimeout(delayAppearance,2000);
		}
		$('#dailyDouble').find('span').on('click',showRules);

		function proceedToBid(){
			$('#wagerRules').removeClass('fadeIntoView').addClass('fadeFromView').remove();
			$htmlMarkup='<div id="wagerBox"><span>X</span><p>PLACE DAILY DOUBLE WAGER:</p><span>$</span><input type="text">';
			$htmlMarkup+='<button>SUBMIT</button></div>';
			$('body').append($htmlMarkup);
			$('#wagerBox').addClass('fadeIntoView');
			
			function addFocus(){
				$('#wagerBox').find('input').focus();
			}
			
			function saveWager(){
				console.info('Enter saveWager()');
				$wagerValue=Number($('#wagerBox').find('input').val());
				console.info('DAILY DOUBLE BID:'+$wagerValue);
				var $jeopardyTotalPrize=Number(localStorage.getItem('jeopardyTotalPrize'));
				var $notice;
				
				if ($wagerValue===''){
					$notice='<p>PLEASE ENTER A VALID NUMERICAL VALUE.</p>';
					$('#wagerBox').append($notice);
				} else if ($wagerValue<5){
					$notice='<p>THE MINIMUM DAILY DOUBLE WAGER MUST BE AT LEAST $5; PLEASE CHANGE YOUR WAGER.</p>';
					$('#wagerBox').append($notice);					
				} else if ($jeopardyTotalPrize<1000 && $wagerValue>1000){
					$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE IS BELOW THE MAXIMUM CLUE VALUE ($1000) IN THIS ROUND, YOU CAN WAGER A MAXIMUM OF ';
					$notice+='$1000.</p>';
					$('#wagerBox').append($notice);
				} else if ($jeopardyTotalPrize>=1000 && $wagerValue>$jeopardyTotalPrize){
					$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS IS AT LEAST $1000, YOUR WAGER CANNOT EXCEED THIS TOTAL.</p>';
					$('#wagerBox').append($notice);
				} else {
					$notice='<p class="fadeIntoView">WAGER ACCEPTED!</p>';
					$('#wagerBox').append($notice);

					function proceedWithGame(){
						$('#wagerBox').removeClass('fadeIntoView').addClass('fadeFromView');
						
						function removeElement(){
							$('#wagerBox').remove();
						}
						setTimeout(removeElement,2000);
						setTimeout(showClue,5000);
						setTimeout(startCountingTime,5000);
						setTimeout(disappear,10000);
						setTimeout(answerAndScore,5000);
					}
					$('#wagerBox').find('span').eq(0).on('click',proceedWithGame);
				}
			}
			
			$('#wagerBox').find('input').on('click',addFocus);
			$('#wagerBox').find('button').on('click',saveWager);
		}
	}
	
	function showClue(){
		var $determineClass;
		if ($eventTargetID>=0 && $eventTargetID<5){
			$eventTarget.css('font-size','75%');
			$determineClass='category';
		} else {
			$eventTarget.css('font-size','55%');
			$determineClass='clue';
		}
			
		var $category0='ANTEBELLUM ERA';
		var $category1='DECLARATION OF INDEPENDENCE';
		var $category2='US CONSTITUTION';
		var $category3='COLONIAL AMERICA';
		var $category4='GILDED AGE';
	
		var $200antebellumClue='DURING HIS PRESIDENCY, THIS PRESIDENT OVERSAW THE ANNEXATION OF TEXAS, DEFEATED MEXICO IN THE MEXICAN WAR';
			$200antebellumClue+=' AND WAS THUS ABLE TO FULFILL THE IDEAL OF \'MANIFEST DESTINY\'.';
		var $400antebellumClue='THIS ECONOMIC PHILOSOPHY WAS CHAMPIONED BY THE WHIG PARTY. THE KEY POINTS WERE STRONG PROTECTIVE TARIFFS TO HELP DEVELOP';
			$400antebellumClue+=' INFANT INDUSTRY, HAVING A NATIONAL BANK TO STIMULATE COMMERCE, ACTIVE FEDERAL SUPPORT FOR NATIONAL TRANSPORTATION INFRASTRUCTURE,';
			$400antebellumClue+=' & STOOD IN CONTRAST TO LAISSEZ-FAIRE PHILOSOPHY.';
		var $600antebellumClue='THIS PHENOMENON WAS CHARACTERIZED BY IDENTIFICATION WITH ONE\'S BELONGING TO A PARTICULAR REGION AND REGIONAL INTERESTS';
			$600antebellumClue+=' AS OPPOSED TO BEING AN AMERICAN. MORE IMPORTANTLY, IT CAN BE INTERPRETED AS A MAJOR UNDERLYING CAUSE OF THE AMERICAN CIVIL WAR.';
		var $800antebellumClue='THIS US SENATOR WAS KNOWN AS THE GREAT COMPROMISER FOR HIS KEY ROLE IN CREATING LEGISLATION TO ARBITRATE BETWEEN THE REGIONAL INTERESTS'; 
			$800antebellumClue+='. IN ADDITION, HE WAS A STRONG ADVOCATE OF THE AMERICAN SYSTEM AND OPPOSED TEXAS ANNEXATION AND THE MEXICAN WAR.';
		var $1000antebellumClue='THIS MAJOR POLITICAL OUTLOOK ADVOCATED FOR THE COMMON MAN BY PROMOTING UNIVERSAL MALE SUFFRAGE (THOUGH LIMITED TO';
		    $1000antebellumClue+=' THOSE OF EUROPEAN DESCENT), BROADER PUBLIC PARTICIPATION, A STRONG PRESIDENCY, OPPOSED ARISTOCRACY AND';
		    $1000antebellumClue+=' GOVERNMENT DOMINATION BY BANKERS & ELITES, & FAVOURED LAISSEZ-FAIRE ECONOMICS';
	
		var $200declarationOfIndependenceClue='THIS WAR WOULD LATER SERVE AS AN INDIRECT CATALYST FOR THE AMERICAN REVOLUTION.';
		var $400declarationOfIndependenceClue='THESE ACTS BY THE BRITISH PARLIAMENT WERE ENACTED AS A PUNITIVE MEASURE IN RESPONSE TO THE BOSTON TEA PARTY.';
			$400declarationOfIndependenceClue+=' THE PROVISIONS INCLUDED CLOSING THE PORT OF BOSTON, ELIMINATING SELF-RULE FOR COLONIAL MASSACHUSETTS,';
			$400declarationOfIndependenceClue+=' APPOINTING A ROYAL GOVERNOR, & IMPLEMENTING ROYAL APPOINTMENTS FOR COLONIAL GOVERNMENT POSITIONS.';
		var $600declarationOfIndependenceClue='THIS PETITION WAS ADOPTED BY THE SECOND CONTINENTAL CONGRESS AS A LAST-DITCH ATTEMPT TO AVOID ALL-OUT';		
		    $600declarationOfIndependenceClue+=' ARMED CONFLICT WITH GREAT BRITAIN AND PRECEDED THE \'DECLARATION OF CAUSES AND NECESSITY OF TAKING UP ARMS';		
		    $600declarationOfIndependenceClue+=' \'.';		
		var $800declarationOfIndependenceClue='THIS SLOGAN WAS USED TO SUM UP THE AMERICAN COLONISTS\' OPPOSITION TO A SERIES OF VARIOUS REVENUE-RAISING ';
			$800declarationOfIndependenceClue+='ACTS ENACTED BY THE BRITISH PARLIAMENT AFTER THE END OF THE FRENCH AND INDIAN WAR.';
		var $1000declarationOfIndependenceClue='THIS 1776 POLITICAL ESSAY AUTHORED BY THOMAS PAYNE AT THE OUTBREAK OF THE AMERICAN REVOLUTION BECAME VERY WIDELY READ';
			$1000declarationOfIndependenceClue+=' THROUGHOUT THE AMERICAN COLONIES & HAD THE EFFECT OF RALLYING POPULAR OPINION IN FAVOUR OF INDEPENDENCE OF GREAT BRITAIN.';

		var $200usConstitutionClue='THIS CLAUSE IN THE FIRST AMENDMENT BANS THE ESTABLISHMENT OF A STATE RELIGION & IMPLEMENTS THE PRINCIPLE OF \'SEPARATION';
		    $200usConstitutionClue+=' OF CHURCH OF STATE\'.';
		var $400usConstitutionClue='THIS IS THE FORMAL NAME OF THE CLAUSE IN THE US CONSTITUTION GRANTING THE US FEDERAL GOVERNMENT THE RIGHT TO PASS LAWS';
			$400usConstitutionClue+=' ENABLING IT TO EXERCISE ITS ENUMERATED POWERS EFFECTIVELY.';
		var $600usConstitutionClue='THIS TERM REFERS TO A COURT\'S POWER TO BE ABLE TO HEAR A COURT CASE FOR THE FIRST TIME.'; 
		var $800usConstitutionClue='THIS FOUNDING FATHER IS ALSO KNOWN FOR BEING THE FATHER OF THE U.S. CONSTITUTION.';
		var $1000usConstitutionClue='THIS COMPROMISE DURING THE 1787 CONSTITUTIONAL CONVENTION  WAS DIRECTLY RESPONSIBLE FOR THE FINAL AND CURRENT STRUCTURE';
		    $1000usConstitutionClue+=' U.S. CONGRESS.';

		var $200colonialAmericaClue='THIS TERM REFERS TO CROPS PRODUCE FOR SALE & PROFIT AS OPPOSED TO SUBSISTENCE.';
		var $400colonialAmericaClue='THIS TERM REFERS TO AN INDIVIDUAL WHO AGREED TO HAVE HIS/HER PASSAGE TO THE AMERICAN COLONIES PAID BY AN EMPLOYER IN';
			$400colonialAmericaClue+='EXCHANGE FOR FULFILLING A FIXED-TERM LABOUR CONTRACT. ';
		var $600colonialAmericaClue='HE IS KNOWN AS THE FOUNDER OF COLONIAL RHODE ISLAND AFTER HAVING ESCAPED MASSACHUSETTS BAY COLONY DUE TO HIS DIFFERING';
			$600colonialAmericaClue+=' RELIGIOUS BELIEFS. AS A RESULT OF THIS, HE BUILT RHODE ISLAND ON THE CORE PRINCIPLES OF FREEDOM OF RELIGION,';		
			$600colonialAmericaClue+=' RELIGIOUS TOLERANCE, & THE SEPARATION OF CHURCH & STATE.';		
		var $800colonialAmericaClue='THIS ELECTED LEGISLATIVE ASSEMBLY IN COLONIAL VIRGINIA WAS ONE OF THE EARLIEST EXAMPLES OF REPRESENTATIVE GOVERNMENT';
		    $800colonialAmericaClue+=' DURING COLONIAL TIMES.';
		var $1000colonialAmericaClue='THIS ECONOMIC PHILOSOPHY EMPHASIZED BUILDING NATIONAL WEALTH THAT WAS ACHIEVED THROUGH ACTIVE INTERVENTIONIST POLICIES,';
			$1000colonialAmericaClue+='INCLUDING REGULATION OF COLONIAL TRADE TO ENSURE FAVOURABLE TERMS FOR THE MOTHERLAND.';

		var $200gildedAgeClue='THIS TERM REFERS TO THE CLASS OF OLIGARCHS WHO HAD EXTENSIVE INFLUENCE IN BOTH POLITICAL AND ECONOMIC SPHERES IN THE UNITED.';
			$200gildedAgeClue+=' STATES DURING THIS ERA.';
		var $400gildedAgeClue='THIS TYCOON MADE HIS FORTUNE IN THE STEEL INDUSTRY BY INTRODUCING & IMPLEMENTING BUSINESS PRACTICES SUCH AS VERTICAL INTEGRATION';
			$400gildedAgeClue+=' AND BELIEVED THAT CAPITALISM WAS ABOUT THE \'SURVIVAL OF THE FITTEST.';
		var $600gildedAgeClue='THE PERCEIVED EXCESSES & ILLS THAT FLOURISHED THE GILDED AGE BECAME THE TARGET OF ACTIVISTS & REFORMERS IN THIS ERA.';
		var $800gildedAgeClue='THIS ARTICLE AUTHORED BY CARNEGIE EMPHASIZED THAT THE WEALTHY ALSO HAD A DUTY TO SOCIETY BY ADMINISTERING THEIR WEALTH TO ENSURE';
			$800gildedAgeClue+=' SURPLUS WEALTH WAS USED FOR PHILANTROPIC PURPOSES FOR THE GREATER BENEFIT OF SOCIETY.';
		var $1000gildedAgeClue='THIS BUSINESS PRACTICE INVOLVED OWNERSHIP AND CONTROL OF THE ENTIRE SUPPLY CHAIN IN ORDER TO MAXIMIZE BUSINESS EFFICIENCY AND.';
			$1000gildedAgeClue+=' THUS PROFITS. IN THIS CASE, A STEEL COMPANY WOULD ALSO OWN & CONTROL THE IRON ORE MINES AND THE RAILWAYS NEEDED TO TRANSPORT';
			$1000gildedAgeClue+=' BOTH THE IRON ORE FROM MINES AND THE FINISHED STEEL TO ITS INTENDED MARKETS.';			
		
		var $clues=[$category0,$category1,$category2,$category3,$category4,
					$200antebellumClue, $200declarationOfIndependenceClue, $200usConstitutionClue, $200colonialAmericaClue, $200gildedAgeClue,
					$400antebellumClue, $400declarationOfIndependenceClue, $400usConstitutionClue, $400colonialAmericaClue, $400gildedAgeClue,
					$600antebellumClue, $600declarationOfIndependenceClue, $600usConstitutionClue, $600colonialAmericaClue, $600gildedAgeClue,
					$800antebellumClue, $800declarationOfIndependenceClue, $800usConstitutionClue, $800colonialAmericaClue, $800gildedAgeClue,
					$1000antebellumClue, $1000declarationOfIndependenceClue, $1000usConstitutionClue, $1000colonialAmericaClue, $1000gildedAgeClue
		];
		
		$eventTarget.html('<p>'+$clues[$eventTargetID]+'</p>');			
		var $htmlMarkup='<div class="magnified"><p class='+'"'+$determineClass+'">'+$clues[$eventTargetID]+'</p></div>';
		$('body').append($htmlMarkup);
		$('.magnified').addClass('fadeIntoView');
		
		function fadeAndRemove(){
			$('.magnified').removeClass('fadeIntoView').addClass('fadeFromView');
			
			function removeElement(){
				$('.magnified').remove();
			}
			setTimeout(removeElement,2000);
		}
		$('.magnified').find('span').eq(0).on('click',fadeAndRemove);
	}
	
	function startCountingTime(){
		$startTime=new Date(); //Initialize a date object and start counting from the moment the clue is displayed.
		console.info('START TIME: '+$startTime);
	}

	function disappear(){
		//Only the text is to be faded out, so the <p> element must be specified; otherwise its parent <td> element is also removed.
		$eventTarget.find('p').addClass('fadeFromView');
		
		function fadeAndRemove(){
			$eventTarget.find('p').removeClass('fadeFromView').remove();
		}
		setTimeout(fadeAndRemove,2000);
	}
	
	//Create a magnified box containing a text input field and a 'FINALIZE ANSWER' button for all game tiles.
	function answerAndScore(){
		$('body').append('<div id="answer"><span>X</span><p>WHAT IS</p><input type="text"><span>?</span><button>FINALIZE ANSWER</button></div>');
		$('#answer').addClass('fadeIntoView');
	
		function addFocus(){
			$('#answer').find('input').focus(); 
		}

		$('#answer').find('input').on('click',addFocus);
		
		function markAnswer(){
			var $inputValue=$('#answer').find('input').val().toUpperCase();
			console.log($inputValue);
			
			var $endTime=new Date();
			var $elapsedTime=Number(($endTime-$startTime))/1000;
			console.info('ELAPSED TIME: '+$elapsedTime+' SECONDS');
			var $cluePrize; //Used for holding the clue's corresponding prize winnings; not to be confused with $jeopardyTotalPrize.
			
			/*The first 5 array elements need to be set to empty strings; obviously, prize money is not applicable to tiles 
			representing the clue categories;*/	
			var $answers=['','','','','', 
						  'POLK','FRENCH AND INDIAN WAR','ESTABLISHMENT CLAUSE','CASH CROPS','ROBBER BARONS',
						  'AMERICAN SYSTEM','INTOLERABLE ACTS','NECESSARY AND PROPER CLAUSE','INDENTURED SERVANTS','CARNEGIE',
						  'REGIONALISM','OLIVE BRANCH PETITION','ORIGINAL JURISDICTION','WILLIAMS','PROGRESSIVE ERA',
						  'CLAY','TAXATION WITHOUT REPRESENTATION','MADISON','HOUSE OF BURGESSES','GOSPEL OF WEALTH',
				          'JACKSONIAN DEMOCRACY','COMMON SENSE','CONNECTICUT COMPROMISE','MERCANTILISM','VERTICAL INTEGRATION'
			]; 
			
			//Determine prize money amounts based on the event target, answer provided and the time elapsed. 
			if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){ 
				$cluePrize=200;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=400;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=600;
			} else if ($eventTargetID>=20 && $eventTargetID<25 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=800;
			} else if ($eventTargetID>=25 && $eventTargetID<29 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=1000; 
			} else if ($eventTargetID===29 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=$wagerValue;  
			}  else if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-200;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-400;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-600;
			} else if ($eventTargetID>=20 && $eventTargetID<25 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-800;
			} else if ($eventTargetID>=25 && $eventTargetID<29 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-1000; 
			} else if ($eventTargetID===29 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-$wagerValue;  
			} else if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-200;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-400;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-600;
			} else if ($eventTargetID>=20 && $eventTargetID<25 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-800;
			} else if ($eventTargetID>=25 && $eventTargetID<29 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-1000;
			} else if ($eventTargetID===29 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=-$wagerValue;  
			} else if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-200;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-400;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-600;
			} else if ($eventTargetID>=20 && $eventTargetID<25 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-800;
			} else if ($eventTargetID>=25 && $eventTargetID<29 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-1000;
			} else { //$eventTargetID===29 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10
				$cluePrize=-$wagerValue;
			}
			
			console.info('CLUE PRIZE: $'+$cluePrize);
			
			var $result;
			if ($inputValue===$answers[$eventTargetID]){
				$result='<p class="fadeIntoView positive">CORRECT!</p>';
				
				var $updateCorrectCount=Number(localStorage.getItem('jeopardyCorrect'));
				$updateCorrectCount++;
				localStorage.setItem('jeopardyCorrect',$updateCorrectCount);
				console.info('TOTAL CORRECT:'+$updateCorrectCount);
			} else {
				$result='<p class="fadeIntoView negative">INCORRECT!</p><p class="fadeIntoView">THE CORRECT ANSWER IS</p>';
				$result+='<p class="fadeIntoView negative">'+'\''+$answers[$eventTargetID]+'\'.</p>';
			}
			
			$('#answer').append($result);

			var $jeopardyTotalPrize=Number(localStorage.getItem('jeopardyTotalPrize')); 	//Player's first round total prize winnings 
			var $totalPrize=Number(localStorage.getItem('totalPrize'));						//Player's overall prize winnings 

			$totalPrize+=$cluePrize;
			$jeopardyTotalPrize+=$cluePrize;
			localStorage.setItem('totalPrize',$totalPrize); 								//Save the player's new overall prize winnings.
			localStorage.setItem('jeopardyTotalPrize',$jeopardyTotalPrize); 				//Save the player's new overall prize winnings.
			console.info('UPDATED OVERALL PRIZE WINNINGS: $ '+$totalPrize);
			console.info('UPDATED JEOPARDY! PRIZE WINNINGS: $ '+$jeopardyTotalPrize);
			
			var $updatedAnsweredCount=localStorage.getItem('jeopardyAnswered');
			$updatedAnsweredCount++;										//Update total number of questions answered.
			localStorage.setItem('jeopardyAnswered',$updatedAnsweredCount);
			var $remainingUnanswered=25-$updatedAnsweredCount;
			
			$jeopardyClueStatus[$eventTargetID]='TRUE'; 					//Update array data after a clue has been attempted.
			console.log($jeopardyClueStatus);
			localStorage['jeopardyClueStatus']=JSON.stringify($jeopardyClueStatus); //Convert back into a string and save the changes back into localStorage.
			/*
			I wanted  the negative sign to be before the '$' sign, so negative numbers are multiplied by one. When there is a negative number,
			I then use the initialize and set the variable $sign to '-'; other wise, it exists as an empty string.
			*/
			var $displayScore=$totalPrize;
			var $sign='';
			if ($totalPrize<0){
				$displayScore=$totalPrize*-1;
				$sign='-';
			} 
			console.log($sign);
			
			var $update='<p class="fadeIntoView" >CURRENT GAME STATS:</p><ul class="fadeIntoView"><li>TOTAL PRIZE WINNINGS:<span>'+$sign+'$'+$displayScore+'</span></li>';
			    $update+='<li>TOTAL ANSWERED THIS ROUND: '+'<span>'+$updatedAnsweredCount+'</span>'+'</li>';
				$update+='<li>REMAINING UNANSWERED: '+'<span>'+$remainingUnanswered+'</span>'+'</li>';
			
			$('.magnified').removeClass('fadeIntoView').addClass('fadeFromView');
			
			function removeElement(){
				$('.magnified').remove();
			}
			setTimeout(removeElement,2000);
			
			console.log($totalPrize);
			console.log($updatedAnsweredCount);
			console.log($remainingUnanswered);
			
			$('#answer').append($update);
			
			if ($totalPrize<0){
				$('#answer').find('span').eq(2).addClass('negative'); //Winnings below $0 are coloured red.
			} else {
				$('#answer').find('span').eq(2).addClass('positive'); //Winnings over $0 are coloured dollar-bill green.				
			}
						
			function fadeAndRemoveAndCheckGameProgress(){
				$('#answer').removeClass('fadeIntoView').addClass('fadeFromView');
				
				function removeElement(){
					$('#answer').remove();
				}
				setTimeout(removeElement,2000);
				
				setTimeout(checkJeopardyGameProgress,2000);
			}
			$('#answer').find('span').eq(0).on('click',fadeAndRemoveAndCheckGameProgress); 
			//The above line of code is placed at the bottom to ensure that the jQuery cannot close #answer before the clue has been answered.
		}
	
		$('#answer').find('button').one('click',markAnswer); //.one() is used to prevent the player from re-attempting the clue.
	}
	
	function checkJeopardyGameProgress(){
		console.log('Reached progress function.');
		var $i=5;
		var $count=0;
		console.log($jeopardyClueStatus.length);
		
		while ($i<$jeopardyClueStatus.length){
			if ($jeopardyClueStatus[$i]==='TRUE'){
				$count++;
			}
			$i++;
		}
		console.info('COUNT VARIABLE VALUE: '+$count);
		if ($count===1){
			//The end of the first round means there is no more need for the array $jeopardyClueStatus, which means it will be deleted from localStorage.
			localStorage.removeItem('jeopardyClueStatus');
			
			//Jeopardy! (first round) stats
			var $jeopardyTotalPrize=Number(localStorage.getItem('jeopardyTotalPrize')); 
			var $jeopardyCorrect=Number(localStorage.getItem('jeopardyCorrect')); 
			var $jeopardyWinningPercentage=Number(parseFloat(($jeopardyCorrect/25)*100).toFixed()); //Convert into percentage rounded to the nearest whole number.
			localStorage.setItem('jeopardyWinningPercentage',$jeopardyWinningPercentage);
	
			//For the first round, overall prize winnings=Jeopardy! (first round) prize winnings; the same logic applies to the winning percentage & number correct.
			localStorage.setItem('totalPrize',$jeopardyTotalPrize); 
			localStorage.setItem('totalCorrect',$jeopardyCorrect);
			localStorage.setItem('totalWinningPercentage',$jeopardyWinningPercentage);
			
			//For display purposes
			var $displayJeopardyTotalPrize=$jeopardyTotalPrize;
			var $sign='';
			var $determineClass='positive';
			if ($jeopardyTotalPrize<0){
				$displayJeopardyTotalPrize=-$jeopardyTotalPrize;
				$sign='-';
				$determineClass='negative';
			}
			
			var $htmlMarkup='<div id="completedMessage"><h1>CONGRATULATIONS!</h1><p>YOU HAVE FINISHED JEOPARDY!</p><section><h1>OVERALL STATS</h1><ul>';
			    $htmlMarkup+='<li>PRIZE WINNINGS:<span class='+'"'+$determineClass+'">'+$sign+'$'+$displayJeopardyTotalPrize+'</span></li><li>CORRECT: '+$jeopardyCorrect+'</li><li>WINNING PERCENTAGE: '+$jeopardyWinningPercentage+'%</li></ul>';
				$htmlMarkup+='</section><section><h1>JEOPARDY! STATS</h1><ul><li>PRIZE WINNINGS:<span class='+'"'+$determineClass+'">'+$sign+'$'+$displayJeopardyTotalPrize+'</span></li><li>CORRECT: '+$jeopardyCorrect+'</li>';
				$htmlMarkup+='<li>WINNING PERCENTAGE: '+$jeopardyWinningPercentage+'%</li></ul></section>';
				$htmlMarkup+='<button>PROCEED TO DOUBLE JEOPARDY!</button>';
			
			/*Note: Since overall game stats will have the same values as those of Jeopardy! stats, there is no need to call variables representing overall
			game stats. Instead, just use each of the Jeopardy! variables twice when providing the stat summary.*/
			
			$('body').append($htmlMarkup);
			$('#completedMessage').addClass('fadeIntoView');
			
			function proceedToDoubleJeopardy(){
				location.href='doublejeopardy.html';
			}
			$('#completedMessage').find('button').on('click',proceedToDoubleJeopardy);
		}
		
		var completionStamp=new Date();
		console.info('completed game progress checking function; date & time stamp: '+completionStamp);
	}
	
	function alreadySelectedWarning(){
		$('body').append('<div id="alreadySelectedWarning"><span>X</span><p>YOU HAVE ALREADY ANSWERED THIS CLUE; CHOOSE ANOTHER ONE.</p></div>');
		$('#alreadySelectedWarning').addClass('fadeIntoView');
		
		function fadeAndRemove(){
			$('#alreadySelectedWarning').removeClass('fadeFromView').remove();
		}
		$('#alreadySelectedWarning').find('span').on('click',fadeAndRemove);
	}
	
	if ($eventTargetID>=0 && $eventTargetID<5){ //Category tiles
		showClue();
	} else if ($eventTargetID>=5 && $eventTargetID<29){ //Tiles awarding face value amounts
		if ($jeopardyClueStatus[$eventTargetID]==='TRUE'){
			alreadySelectedWarning();
		} else {
			showClue();
			startCountingTime();
			setTimeout(disappear,10000);
			/* Time limit of 10 seconds; the specific tile in the menu screen will be cleared after 10 seconds 
			starting from the time the clue is displayed.
			*/
			answerAndScore();
		}
	} else { //Daily double tiles
		if ($jeopardyClueStatus[$eventTargetID]==='TRUE'){
			alreadySelectedWarning();
		} else {
			dailyDouble();
		}
	}
}

function welcomeTheContestant(){
	$('table').addClass('hidden');
	localStorage.setItem('contestant',''); //Clear localStorage's 'contestant' item right before prompting the contestant to enter his/her name.
	
	$('body').append('<div id="nameBox"><p>WHAT IS YOUR NAME?</p><input type="text"><button>SAVE & THEN PROCEED TO GAME NOTES & RULES</button></div>');
    $('#nameBox').addClass('fadeIntoView');
	
	function addFocus(){
		$('#nameBox').find('input').focus();
	}

	function saveContestantName(){
		$('#nameBox').find('input').blur();
		var $contestantName=$('#nameBox').find('input').val().toUpperCase();
		localStorage.setItem('contestant',$contestantName);
		console.log('CONTESTANT NAME: '+$contestantName); //debugging purposes to ensure the code functions properly.

		if ($contestantName===''){				
			//Increase box size by 10% (Make it 110% of the current size)as a new <p> element will be added in this case.
			var $newHeight=($('#nameBox').height())*1.10; 
			$('#nameBox').css('height',$newHeight).append('<p>ENTER A CONTESTANT NAME AND SAVE IT.</p>');
		} else {
			function proceedToRules(){
				$('#nameBox').removeClass('fadeIntoView').addClass('fadeFromView').remove(); 
				//Remove the name box to make way for the rule box
				
				var $ruleBox='<div id="ruleBox"><span>X</span><h1>ONE-PLAYER DOUBLE JEOPARDY RULES AND NOTES</h1><p>PLEASE READ CAREFULLY; INCORRECT ANSWER ';
					$ruleBox+='FORMAT WILL AUTOMATICALLY RESULT IN INCORRECT ANSWERS.</p><ul><li>THERE IS A 10-SECOND TIME LIMIT TO PROVIDE ANSWERS TO CLUES.</li>';
					$ruleBox+='<li>FOR ANSWERS REQUIRING A PERSON\'S NAME, ONLY ENTER THE LAST NAME, NOT THE FULL NAME.</li><li>DO NOT CLEAR BROWSER WHILE'; 
					$ruleBox+=' PLAYING AS THE WEB APPLICATION WILL DELETE <span>ALL</span> IN-GAME DATA AND, AS A RESULT, THE PLAYER WILL HAVE TO START';
					$ruleBox+=' FROM SCRATCH.</li><li>ENSURE NO SPACES BETWEEN COMMAS AND NO DASHES BETWEEN WORDS.</li><li>IN COURT CASES, ENSURE THAT ONLY';
					$ruleBox+=' \'V.\' IS USED; DO NOT USE \'VERSUS\' OR \'VS.\'</li><li>ANSWERS INVOLVING THE WORD \'AND\' MUST BE SPELLED OUT USING THE';
				    $ruleBox+=' ENTIRE WORD; OTHERWISE, THE ANSWER WILL BE MARKED AS INCORRECT.</li></ul></div>';
					
				$('body').append($ruleBox);
				$('#ruleBox').addClass('fadeIntoView');
					
				function removeRuleBox(){
					$('#ruleBox').removeClass('fadeIntoView').addClass('fadeFromView').remove();
					$('table').removeClass('hidden').addClass('fadeIntoView');
					var date=new Date();
					var currentYear=date.getFullYear();
					$('footer').html('&copy;'+currentYear+'2016. WESTON HILL. ALL RIGHTS RESERVED.');
				}
				$('#ruleBox').first().on('click',removeRuleBox);	
			}
			$('#nameBox').last().on('click',proceedToRules);
		}
	} 
		
	$('#nameBox').find('input').on('click',addFocus);
	$('#nameBox').find('button').on('click',saveContestantName);
									  
	//Initialize variables for the player's stats with initial value of 0 & then save them into localStorage.
	//Already existing variables will be set to 0.
	var $statsList=['totalPrize','totalCorrect','totalWinningPercentage',
					'jeopardyTotalPrize','jeopardyCorrect','jeopardyWinningPercentage','jeopardyAnswered',
					'doubleJeopardyTotalPrize','doubleJeopardyCorrect','doubleJeopardyWinningPercentage','doubleJeopardyAnswered',
					'finalJeopardyTotalPrize'
	];
		
	for (var $i=0;$i<$statsList.length;$i++){
		localStorage.setItem($statsList[$i],0);
		console.log(localStorage.getItem($statsList[$i]));
	}
	
	console.info('JEOPARDY! TOTAL PRIZE: '+localStorage.getItem('jeopardyTotalPrize'));
	
	/*Initialize an array that will hold Boolean values indicating current status (TRUE or FALSE) for all clues; 'TRUE' indicates 'answered', while
	'FALSE' indicates unanswered.*/
	var $jeopardyClueStatus=[]; 
	var $i=0;
	  
	while($i<5){
		$jeopardyClueStatus.push(''); //The first 5 array elements are assigned blanks as the corresponding tiles represent the Jeopardy! categories.
		$i++;
	}
		
	while($i>4 && $i<30){
		$jeopardyClueStatus.push('FALSE'); //Array elements with index position corresponding to the clue tiles (5-29) are assigned a value of 'FALSE'.
		$i++;
	}
	
	//Do the same for Double Jeopardy!
	var $doubleJeopardyClueStatus=[];
	var $j=0;
	
	while($j<5){
		$doubleJeopardyClueStatus.push(''); 
		$j++;
	}
		
	while($j>4 && $j<30){
		$doubleJeopardyClueStatus.push('FALSE'); 
		$j++;
	}
	
	console.info($jeopardyClueStatus); //Check to see the result of the while-loop.
	console.info($doubleJeopardyClueStatus); //Check to see the result of the while-loop.
	
	console.info('CONTESTANT NAME (STARTUP): '+localStorage.getItem('contestant')); 
	/*Check to see if localStorage's contestant variable value is always cleared before the contestant is asked to provide his/her name; not be confused with
	the code on line 437; the code is identical, but differences in timing means each serves different purposes.
	*/
	
	//HTML5 localStorage can only store strings, so $jeopardyClueStatus must be formatted into a string.
	localStorage['jeopardyClueStatus']=JSON.stringify($jeopardyClueStatus); 
	localStorage['doubleJeopardyClueStatus']=JSON.stringify($doubleJeopardyClueStatus); 	
}

(function(){
	$(document).ready(welcomeTheContestant);
	$('table').on('click',gameplay);
})();