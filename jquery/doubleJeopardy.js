function gameplay(e){
	//The following variables must be global within the function gameplay() since more than 1 sub-function will make use of these variables.
	var $eventTarget=$(e.target);
	var $eventTargetID=Number($eventTarget.attr('id'));
	console.log($eventTargetID);
	var $doubleJeopardyClueStatus=JSON.parse(localStorage['doubleJeopardyClueStatus']);
	var $wagerValue;
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
				$wagerRules+=' ($2,000); IN THIS CASE, IT IS PERMISSIBLE TO BID UP TO $2000.</li></ul></div>';
				
				$('body').append($wagerRules);
				$('#wagerRules').addClass('fadeIntoView');
				
				$('#wagerRules').find('span').one('click',proceedToBid);
			}
			setTimeout(delayAppearance,2000);
		}
		$('#dailyDouble').find('span').one('click',showRules);

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
				} else if ($jeopardyTotalPrize<2000 && $wagerValue>2000){
					$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE IS BELOW THE MAXIMUM CLUE VALUE ($2000) IN THIS ROUND, YOU CAN WAGER A MAXIMUM OF ';
					$notice+='$2000.</p>';
					$('#wagerBox').append($notice);
				} else if ($jeopardyTotalPrize>=2000 && $wagerValue>$jeopardyTotalPrize){
					$notice='<p>SINCE YOUR CURRENT TOTAL PRIZE WINNINGS IS AT LEAST $2000, YOUR WAGER CANNOT EXCEED THIS TOTAL.</p>';
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
					$('#wagerBox').find('span').eq(0).one('click',proceedWithGame);
					
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
			
		var $category0='RECONSTRUCTION';
		var $category1='SUPREME COURT CASES';
		var $category2='PROGRESSIVE ERA';
		var $category3='COLD WAR';
		var $category4='GREAT DEPRESSION/NEW DEAL';
	
		var $400reconstructionClue='THIS FACTION IN THE REPUBLICAN PARTY ADVOCATED A TOUGH STANCE ON REBUILDING THE UNION AFTER THE ';
			$400reconstructionClue+='CIVIL WAR AND ADVOCATED PROPOSALS SUCH AS A DEMAND THAT 50% OF VOTERS IN A STATE SWEAR ALLEGIANCE ';
			$400reconstructionClue+='TO THE UNION';
		var $800reconstructionClue='NAME THE THREE RECONSTRUCTION AMENDMENTS.';
		var $1200reconstructionClue='RECONSTRUCTION-ERA SOUTHERN LEGISLATURES DEFIED THE RADICAL REPUBLICANS BY ENACTING THESE LAWS ';
			$1200reconstructionClue+='INTENDED TO LIMIT THE RIGHTS OF FREEDMEN.';
		var $1600reconstructionClue='DURING RECONSTRUCTION, THE EMERGENCE OF THIS ECONOMIC PHENOMENON REPLICATED AND REINFORCED THE '; 
			$1600reconstructionClue+='ANTEBELLUM, SLAVE ERA RELATIONSHIP BETWEEN THE PLANTATION OWNERS AND THEIR FORMER SLAVES.';
		var $2000reconstructionClue='THIS TERM REFERS TO SOUTHERN WHITE SUPPORTERS OF THE REPUBLICAN PARTY DURING THIS PERIOD.';

		var $400supremeCourtClue='THIS CASE RESULTED IN THE U.S. SUPREME COURT\'S ASSERTING ITS POWER OF JUDICIAL REVIEW.';
		var $800supremeCourtClue='THIS LANDMARK RULING DECLARED THE SEPARATE BUT EQUAL TO BE UNCONSTITUTIONAL AS IT VIOLATED THE 14TH AMENDMENT';
			$800supremeCourtClue+='\'S EUQAL PROTECTION CLAUSE.';
		var $1200supremeCourtClue='THIS CASE INVOLVED A SLAVE WHO SUED FOR HIS FREEDOM AS HE WAS BROUGHT INTO A FREE TERRITORY. THE SUPREME COURT ';
			$1200supremeCourtClue+='ASSERTED THE FEDERAL GOVERNMENT CANNOT REGULATE SLAVERY IN THE FEDERAL TERRITORIES AND THUS OVERTURNED THE MISSOURI ';
			$1200supremeCourtClue+='COMPROMISE AND EXACERBATED TENSIONS BETWEEN THE ABOLITIONIST AND THE SLAVEHOLDER CAMP.';
		var $1600supremeCourtClue='THIS RULING INVOLVED A BIRACIAL MAN LEGALLY CONSIDERED AFRICAN AMERICAN WHO REFUSED TO MOVE TO A RAILCAR FOR AFRICAN ';
			$1600supremeCourtClue+='AMERICANS. HE CLAIMED THAT HIS 14TH AMENDMENT RIGHTS TO EQUAL PROTECTION UNDER THE LAW WERE VIOLATED. THE SURPEME COURT ';
			$1600supremeCourtClue+='RULED THAT SEGREGATION DID NOT VIOLATE THIS CLAUSE AS LONG AS THE SEPARATE BUT EUQAL FACILITIES WERE PROVIDED.';
		var $2000supremeCourtClue='THIS CHIEF JUSTICE SOLIDIFIED THE AMERICAN JUDICIAL SYSTEEM AS AN INDEPENDENT BRANCH AND ESTABLISHED ITS POWER OF ';
			$2000supremeCourtClue+='JUDICIAL REVIEW THROUGH LEGAL PRECEDENT AND REPEATEDLY MADE IN RULINGS CONFIRMING THE SUPREMACY OF THE FEDERAL GOVERNMENT ';
			$2000supremeCourtClue+='OVER STATE GOVERNMENTS, IN ACCORDANCE WITH HIS FEDERALLIST PARTY ROOTS.';

		var $400progressiveEraClue='THIS MOVEMENT SUCCESSFULLY RALLIED TO PROHIBIT ALCOHOLIC BEVERAGES NATIONWIDE BY CONSTITUTIONAL AMENDMENT.';
		var $800progressiveEraClue='THESE WERE JOURNALISTS WHO WROTE ABOUT THE VARIOUS SOCIAL INJUSTICES IN AMERICAN SOCIETY AND BECAME A DRIVING FORCE';
			$800progressiveEraClue+='FOR REFORM THROUHGOUT THIS PERIOD.';
		var $1200progressiveEraClue='THIS BOOK BY UPTON SINCLAIR PROMPTED MASSIVE PUBLIC OUTCRY REGARDING THE COMMERCIAL FOOD SAFETY PRACTICES '; 
			$1200progressiveEraClue+='AND DREW THE ATTENTION OF PRESIDENT TEDDY ROOSEVELT AND LED TO THE PASSAGE OF THE PURE FOOD AND DRUG ACT OF 1906.';
		var $1600progressiveEraClue='THIS CONSTITUTIONAL AMENDMENT SANCTIONED THE U.S. CONGRESS TO LEVY AND COLLECT INCOME TAXES \"WITHOUT APPPORTIONMENT ';
		    $1600progressiveEraClue+='AMONG THE SEVERAL STATES AND WITHOUT REGARD TO ANY CENSUS OR ENUMERATION\"(U.S. Const. amend. XIX).';
		var $2000progressiveEraClue='THIS FEDERAL GOVERNMENT AGENCY WAS CREATED IN PART DUE TO A WIDESPREAD CONSERVATION MOVEMENT THROUGHOUT THIS PERIOD.';

		var $400coldWarClue='THIS SERVED AS THE COUNTERWEIGHT TO THE MILITARY BLOC FORMED BY WESTERN CAPITALIST COUNTRIES.';
		var $800coldWarClue='THIS U.S. SENATOR, IN A BID TO BOLSTER HIS POLITICAL CAREER, TOOK ADVANTAGE OF THE WIDESPREAD FEAR OF ';
			$800coldWarClue+='COMMUNISM TO CONDUCT CONGRESSIONAL HEARINGS, WHICH HAVE COME TO BE KNOWN AS WITCH HUNTS INVOLVING ';
			$800coldWarClue+='UNSUBSTANTIATED ALLEGIATIONS.';
		var $1200coldWarClue='THIS FOREIGN POLICY STRATEGY AIMED TO LIMIT THE SOVIET UNION\'S SPHERE OF INFLUENCE BY LIMITING THE SPREAD ';
			$1200coldWarClue+='OF COMMUNISM ABROAD. IT OFTEN MANIFESTED ITSELF IN THE FORM OF INSTALLING PRO-AMERICAN ANTI-COMMUNIST ';		
			$1200coldWarClue+='GOVERNMENTS, REGARDLESS OF WHETHER THEY WERE DEMOCRATIC OR AUTOCRATIC, THROUGHOUT THE WORLD';
		var $1600coldWarClue='THE COLD WAR NOT ONLY INVOLVED COMPETITION FOR POLITICAL AND ECONOMIC INFLUENCE BETWEEN THE U.S. AND THE ';
			$1600coldWarClue+='U.S.S.R., BUT ALSO HAD AN ELEMENT OF SOFT POWER, AS SEEN IN THIS COMPETITION FOR PRIMACY IN AEROSPACE ';
			$1600coldWarClue+='SCIENCE.';
		var $2000coldWarClue='THIS WAS A POLITICAL GROUPING OF COUNTRIES THAT DID NOT IDENTIFY WITH EITHER THE WESTERN CAPITALIST BLOC OR ';
			$2000coldWarClue+='THE SOVIET-LED BLOC.';

		var $400greatDepressionClue='THIS 1935 ACT WAS INTRODUCED TO PROVIDE PENSIONS FOR THE AGED AND THE UNEMPLOYED.';
		var $800greatDepressionClue='THIS \'R\' IN THE 3Rs COMMONLY REFERS TO THE NEW DEAL\'S PRINCIPAL AIMS FOCUSED ON LONG-TERM REFORM ';
			$800greatDepressionClue+='OF THE FINANCIAL SECTOR TO ENSURE ITS STABILITY.';
		var $1200greatDepressionClue='THIS BRITISH ECONOMIST THEORIZED THAT GOVERNMENTS COULD BRING THEIR COUNTRIES OUT OF RECESSIONS AND ';
			$1200greatDepressionClue+='DEPRESSIONS BY INCREASING PUBLIC EXPENDITURES, WHICH WOULD VASTLY INCREASE THE AGGREGARTE DEMAND ';
			$1200greatDepressionClue+='FOR THE COUNTRY\'S GOODS AND SERVICES AND IN TURN PROMOTE PRODUCTION.';
		var $1600greatDepressionClue='THIS ACT BANNED OWNERSHIP IN INVESTMENT BANKS BY COMMERCIAL BANKS AND VICE VERSA WITH THE GOAL OF ';
			$1600greatDepressionClue+='ENSURING THAT SAVINGS ACCOUNTS WOULD NOT BE SUBJECT TO SPECULATION ON VARIOUS FINANCIAL INSTRUMENTS ';
			$1600greatDepressionClue+='AND THUS PREVENT BANK FAILURES SEEN DURING THE ONSET OF THE GREAT DEPRESSION.';
		var $2000greatDepressionClue='THIS IS OFTEN SEEN AS THE CATALYST THAT TRULY PULLED THE U.S. OUT OF THE GREAT DEPGRESSION, AS OPPOSED ';
			$2000greatDepressionClue+=' TO THE NEW DEAL.';
		
		var $clues=[$category0,$category1,$category2,$category3,$category4,
					$400reconstructionClue, $400supremeCourtClue, $400progressiveEraClue, $400coldWarClue, $400greatDepressionClue,
					$800reconstructionClue, $800supremeCourtClue, $800progressiveEraClue, $800coldWarClue, $800greatDepressionClue,
					$1200reconstructionClue, $1200supremeCourtClue, $1200progressiveEraClue, $1200coldWarClue, $1200greatDepressionClue,
					$1600reconstructionClue, $1600supremeCourtClue, $1600progressiveEraClue, $1600coldWarClue, $1600greatDepressionClue,
					$2000reconstructionClue, $2000supremeCourtClue, $2000progressiveEraClue, $2000coldWarClue, $2000greatDepressionClue
		];
		
		$eventTarget.html('<p>'+$clues[$eventTargetID]+'</p>');			
		var $htmlMarkup='<div class="magnified"><span>X</span><p class='+'"'+$determineClass+'">'+$clues[$eventTargetID]+'</p></div>';
		$('body').append($htmlMarkup);
		$('.magnified').addClass('fadeIntoView');
		
		function fadeAndRemove(){
			$('.magnified').removeClass('fadeIntoView').addClass('fadeFromView');
			
			function removeElement(){
				$('.magnified').remove();
			}
			setTimeout(removeElement,2000);
		}
		$('.magnified').find('span').eq(0).one('click',fadeAndRemove);
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
			console.log($elapsedTime);
			
			var $newScore;
			var $cluePrize; //Used for holding the clue's corresponding prize winnings; not to be confused with $doubleJeopardyTotalPrize.
			
			/*The first 5 array elements need to be set to empty strings; obviously, prize money is not applicable to tiles 
			representing the clue categories;*/	
			var $answers=['','','','','', 
						  'RADICAL REPUBLICANS','MARBURY V. MADISON','TEMPERANCE','WARSAW PACT','SOCIAL SECURITY ACT',
						  '13TH,14TH,15TH','BROWN V. BOARD OF EDUCATION','MUCKRAKERS','MCCARTHY','REFORM',
						  'BLACK CODES','DRED SCOTT V. SANFORD','THE JUNGLE','CONTAINMENT','KEYNES',
						  'SHARECROPPING','PLESSY V. FERGUSON','16TH','SPACE RACE','GLASS STEAGALL ACT',
				          'SCALAWAGS','MARSHALL','BUREAU OF FORESTRY','NON-ALIGNED MOVEMENT','WORLD WAR II'
			]; 
			
			//Determine prize money amounts based on the event target, answer provided and the time elapsed. 
			if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){ 
				$cluePrize=400;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=800;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=1200;
			} else if ($eventTargetID>=20 && $eventTargetID<24 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=1600;
			} else if ($eventTargetID>=25 && $eventTargetID<28 && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=2000;
			} else if (($eventTargetID===24 || $eventTargetID===28) && $inputValue===$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=$wagerValue;
			} else if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-400;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-800;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-1200;
			} else if ($eventTargetID>=20 && $eventTargetID<24 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-1600;
			} else if ($eventTargetID>=25 && $eventTargetID<28 && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-2000;
			} else if (($eventTargetID===24 || $eventTargetID===28) && $inputValue===$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-$wagerValue;
			} else if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-400;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-800;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-1200;
			} else if ($eventTargetID>=20 && $eventTargetID<24 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-1600;
			} else if ($eventTargetID>=25 && $eventTargetID<28 && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10) {
				$cluePrize=-2000;
			} else if (($eventTargetID===24 || $eventTargetID===28) && $inputValue!=$answers[$eventTargetID] && $elapsedTime<=10){
				$cluePrize=-$wagerValue;
			} else if ($eventTargetID>=5 && $eventTargetID<10 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-400;
			} else if ($eventTargetID>=10 && $eventTargetID<15 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-800;
			} else if ($eventTargetID>=15 && $eventTargetID<20 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-1200;
			} else if ($eventTargetID>=20 && $eventTargetID<24 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10) {
				$cluePrize=-1600;
			} else if ($eventTargetID>=25 && $eventTargetID<28 && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10){
				$cluePrize=-2000;
			} else { //($eventTargetID===24 || $eventTargetID===28) && $inputValue!=$answers[$eventTargetID] && $elapsedTime>10
				$cluePrize=-$wagerValue;
			}
			console.log($elapsedTime);
			console.log($cluePrize);
			
			var $result;
			if ($inputValue===$answers[$eventTargetID]){
				$result='<p class="fadeIntoView">CORRECT!</p>';
				$('#answer').append($result).find('p').eq(1).css('color','rgb(31,72,7)');
				
				var $updateCorrectCount=Number(localStorage.getItem('doubleJeopardyCorrect'));
				$updateCorrectCount++;
				localStorage.setItem('doubleJeopardyCorrect',$updateCorrectCount);
				console.info('TOTAL CORRECT: '+$updateCorrectCount);
			} else {
				$result='<p class="fadeIntoView">INCORRECT!</p><p class="fadeIntoView">THE CORRECT ANSWER IS</p>';
				$result+='<p class="fadeIntoView">'+'\''+$answers[$eventTargetID]+'\'.</p>';
				$('#answer').append($result).find('p').eq(1).css('color','rgb(255,0,0)');
			}
			
			var $doubleJeopardyTotalPrize=Number(localStorage.getItem('doubleJeopardyTotalPrize')); 	//Player's double Jeopardy! winnings
			var $totalPrize=Number(localStorage.getItem('totalPrize'));									//Player's overall prize winnings 
			
			$totalPrize+=$cluePrize;
			$doubleJeopardyTotalPrize+=$cluePrize;
			localStorage.setItem('totalPrize',$totalPrize); 								//Save the player's new overall prize winnings.
			localStorage.setItem('doubleJeopardyTotalPrize',$doubleJeopardyTotalPrize); 	//Save the player's new overall prize winnings.
			console.info('UPDATED OVERALL PRIZE WINNINGS: $ '+$totalPrize);
			console.info('UPDATED DOUBLE JEOPARDY! PRIZE WINNINGS: $ '+$doubleJeopardyTotalPrize);
						
			var $updatedAnsweredCount=localStorage.getItem('doubleJeopardyAnswered');
			$updatedAnsweredCount++;										//Update total number of questions answered.
			localStorage.setItem('doubleJeopardyAnswered',$updatedAnsweredCount);
			var $remainingUnanswered=25-$updatedAnsweredCount;
	        
			$doubleJeopardyClueStatus[$eventTargetID]='TRUE'; 					//Update array data after a clue has been attempted.
			console.log($doubleJeopardyClueStatus);
			localStorage['doubleJeopardyClueStatus']=JSON.stringify($doubleJeopardyClueStatus); //Convert back into a string and save the changes back into localStorage.
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
			
			var $update='<p class="fadeIntoView">CURRENT GAME STATS:</p><ul class="fadeIntoView"><li>TOTAL PRIZE WINNINGS:<span>'+$sign+'$'+$displayScore+'</span></li>';
			    $update+='<li>TOTAL ANSWERED THIS ROUND: '+'<span>'+$updatedAnsweredCount+'</span>'+'</li>';
				$update+='<li>REMAINING UNANSWERED: '+'<span>'+$remainingUnanswered+'</span>'+'</li>';
			
			$('.magnified').removeClass('fadeIntoView').addClass('fadeFromView').remove();
			console.log($totalPrize);
			console.log($updatedAnsweredCount);
			console.log($remainingUnanswered);
			
			$('#answer').append($update);
			
			if ($totalPrize<0){
				$('#answer').find('span').eq(2).css('color','rgb(255,0,0)'); //Winnings below $0 are coloured red.
			} else {
				$('#answer').find('span').eq(2).css('color','rgb(31,72,7)'); //Winnings over $0 are coloured dollar-bill green.				
			}

			function fadeAndRemoveAndCheckGameProgress(){
				$('#answer').removeClass('fadeIntoView').addClass('fadeFromView');
				
				function removeElement(){
					$('#answer').remove();
				}
				setTimeout(removeElement,2000);
				
				checkDoubleJeopardyGameProgress();
			}
			$('#answer').find('span').eq(0).one('click',fadeAndRemoveAndCheckGameProgress);
		}
	
		$('#answer').find('button').one('click',markAnswer);
	}
	
	function checkDoubleJeopardyGameProgress(){
		console.log('Reached progress function.');
		var $i=5;
		var $count=0;
		console.log($doubleJeopardyClueStatus.length);
		
		while ($i<$doubleJeopardyClueStatus.length){
			if ($doubleJeopardyClueStatus[$i]==='TRUE'){
				$count++;
			}
			$i++;
		}
		console.info('COUNT VARIABLE VALUE: '+$count);
		
		if ($count===1){
			//Overall game stats
			var $totalPrize=Number(localStorage.getItem('totalPrize'));
			var $totalCorrect=Number(localStorage.getItem('totalCorrect'));
			
			var $jeopardyWinningPercentage=Number(localStorage.getItem('jeopardyWinningPercentage'));
			
			var $doubleJeopardyTotalPrize=Number(localStorage.getItem('doubleJeopardyTotalPrize'));
			var $doubleJeopardyCorrect=Number(localStorage.getItem('doubleJeopardyCorrect'));
			var $doubleJeopardyWinningPercentage=Number(parseFloat(($doubleJeopardyCorrect/25)*100).toFixed()); 
			localStorage.setItem('doubleJeopardyWinningPercentage',$doubleJeopardyWinningPercentage);
			//Convert into percentage rounded to the nearest whole number & save it to HTML5 localStorage.

			$totalCorrect+=$doubleJeopardyCorrect;
			
			var $totalWinningPercentage=($jeopardyWinningPercentage+$doubleJeopardyWinningPercentage)/2;
			localStorage.setItem('totalWinningPercentage',$totalWinningPercentage);
			
			var $displayTotalPrize=$totalPrize;
			var $displayDoubleJeopardyTotalPrize=$doubleJeopardyTotalPrize;
			var $sign1; //The first is for the total prize winnings; the second is for the round prize winnings.
			var $sign2; 
			
			var $determineClass1; //The first is for the total prize winnings; the second is for the round prize winnings.
			var $determineClass2;
			
			if ($totalPrize<0 && $doubleJeopardyTotalPrize>0){
				$displayTotalPrize=-$totalPrize;
				$sign1='-';
				$sign2=''; 
				$determineClass1='negative';
				$determineClass2='positive';
			} else if ($totalPrize>0 && $doubleJeopardyTotalPrize<0){ 
				$displaydoubleJeopardyTotalPrize=-$doubleJeopardyTotalPrize;
				$sign1='';
				$sign2='-';
				$determineClass1='positive';
				$determineClass2='negative';
			} else if ($totalPrize<0 && $doubleJeopardyTotalPrize<0){ 
				$displayTotalPrize=-$totalPrize;
				$displayDoubleJeopardyTotalPrize=-$doubleJeopardyTotalPrize;				
				$sign1='-';
				$sign2='-';
				$determineClass1='negative';
				$determineClass2='negative';
			} else { //$totalPrize>0 && $doubleJeopardyTotalPrize>0
				$sign1='';
				$sign2='';
				$determineClass1='positive';
				$determineClass2='positive';
			}

			var $htmlMarkup='<div id="completedMessage"><h1>CONGRATULATIONS!</h1><p>YOU HAVE FINISHED DOUBLE JEOPARDY!</p><section><h1>OVERALL STATS</h1><ul id="exception">';
			    $htmlMarkup+='<li>PRIZE WINNINGS:<span class='+'"'+$determineClass1+'">'+$sign1+'$'+$displayTotalPrize+'</li><li> NUMBER CORRECT: '+$totalCorrect+'</li>';
				$htmlMarkup+='<li>WINNING PERCENTAGE: '+$totalWinningPercentage+'%</li></ul></section><section><h1>DOUBLE JEOPARDY! STATS</h1><ul >'; 
				$htmlMarkup+='<li>PRIZE WINNINGS:<span class='+'"'+$determineClass2+'">'+$sign2+'$'+$displayDoubleJeopardyTotalPrize+'</li>';
				$htmlMarkup+='<li>NUMBER CORRECT: '+$doubleJeopardyCorrect+'</li><li>WINNING PERCENTAGE: '+$doubleJeopardyWinningPercentage+'%</li></ul>';
				$htmlMarkup+='</section><div><img src="multimedia/pointingFingerIcon.png" alt="IMAGE FORMAT NOT SUPPORTED"><a href="finaljeopardy.html">PROCEED TO FINAL JEOPARDY!</a></div></div>';
			//NOTE: In the first round, first round winning percentage=overall winning percentage;
			
			$('body').append($htmlMarkup);
			$('#completedMessage').addClass('fadeIntoView');
		}
		var completionStamp=new Date();
		console.info('completed game progress checking function; date & time stamp: '+completionStamp);
	}
	
	function alreadySelectedWarning(){
		$('body').append('<div id="alreadySelectedWarning"><span>X</span><p>YOU HAVE ALREADY ANSWERED THIS CLUE; CHOOSE ANOTHER ONE.</p></div>');
		$('#alreadySelectedWarning').addClass('fadeIntoView');
		
		function fadeAndRemove(){
			$('#alreadySelectedWarning').removeClass('fadeFromView');
			
			function removeElement(){
				$('#alreadySelectedWarning').remove();
			}
			setTimeout(removeElement,2000);
		}
		$('#alreadySelectedWarning').find('span').one('click',fadeAndRemove);
	}
	
	if ($eventTargetID>=0 && $eventTargetID<5){ //Category tiles
		showClue();
	} else if (($eventTargetID>=5 && $eventTargetID<=23) || ($eventTargetID>=25 && $eventTargetID<=27) || ($eventTargetID>28)){ //Tiles awarding face value amounts
		if ($doubleJeopardyClueStatus[$eventTargetID]==='TRUE'){
			alreadySelectedWarning();
		} else {
			showClue();
			startCountingTime();
			setTimeout(disappear,10000);
			/*Time limit of 10 seconds; the specific tile in the menu screen will be cleared after 10 seconds 
			  starting from the time the clue is displayed.
			*/
			answerAndScore();
		}
	} else { //Daily double tiles
		if ($doubleJeopardyClueStatus[$eventTargetID]==='TRUE'){
			alreadySelectedWarning();
		} else{
			dailyDouble();
		}
	} 
}

(function(){
	$('table').addClass('fadeIntoView').on('click',gameplay);
})();