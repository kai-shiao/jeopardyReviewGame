function gameplay(e){
	//The following variables must be global within the function gameplay() since more than 1 sub-function will make use of these variables.
	var $eventTarget=$(e.target);
	var $eventTargetID=Number($eventTarget.attr('id'));
	console.log($eventTargetID);
	var $doubleJeopardyClueStatusParsed=JSON.parse(localStorage.getItem('doubleJeopardyClueStatus'));
	var $bidValue;
	var $startTime;
					
	/*
	Tiles in different categories will trigger different code to be executed, but there are still several tasks that are the same across the board.
	Code repetition is avoided through the use of function declarations and simply making the applicable function calls in each necessary situation.
	*/
	function dailyDouble(){
		$eventTarget.html('<p>DAILY DOUBLE!!!</p>').css({'color': 'rgb(255,215,0)', 'font-size': '75%'});
		//The above is for the tile on the display screen.
		
		//The below is for the enlarged pop-up box.
		$('body').append('<div id="dailyDouble"><p class="clue">DAILY DOUBLE!!!</p></div>');
		$('#dailyDouble').addClass('fadeIntoView');

		function fadeAndRemove(){
			$('#dailyDouble').removeClass('fadeIntoView').addClass('fadeFromView').remove();
		}
		setTimeout(fadeAndRemove,5000); //5 second delay in implementation so that the daily double window doesn't immediately become invisible.

		var $biddingRules='<div id="biddingRules"><span>X</span><h1>BIDDING RULES</h1><ul><li>THE WAGER CANNOT EXCEED YOUR CURRENT TOTAL PRIZE</li>';
			$biddingRules+='<li>HOWEVER, AN EXCEPTION IS MADE WHEN YOUR CURRENT TOTAL PRIZE IS LESS THAN THE MAXIMUM CLUE VALUE IN THE CURRENT ROUND;';
			$biddingRules+=' IN THIS CASE, IT IS PERMISSIBLE TO BID UP TO $2000.</li></ul></div>';
		$('body').append($biddingRules);
		$('#biddingRules').addClass('fadeIntoView');

		function proceedToBid(){
			$('#biddingRules').removeClass('fadeIntoView').addClass('fadeFromView').remove();
			$('body').append('<div id="bidBox"><p>PLACE BID:</p><input type="text"><button>SUBMIT BID</button></div>');
			$('#bidBox').addClass('fadeIntoView');
			
			function addFocus(){
				$('#bidBox').find('input').focus();
			}
			
			function saveBidValue(){
				console.info('Enter registerBidValue()');
				$bidValue=Number($('#bidBox').find('input').val());
				console.info('DAILY DOUBLE BID:'+$bidValue);
				var $doubleJeopardyTotalPrize=localStorage.getItem('doubleJeopardyTotalPrize');
				
				if ($bidValue===''){
					$('#bidBox').append('<p>PLEASE ENTER A VALID VALUE.</p>');
				} else if ($doubleJeopardyTotalPrize<2000 && $bidValue>2000){
					var $bidRestriction='<p>SINCE YOUR CURRENT TOTAL PRIZE IS BELOW THE MAXIMUM CLUE VALUE ($2000) IN THIS ROUND, YOU CAN WAGER A MAXIMUM OF ';
						$bidRestriction+=' $2000.</p>';
					$('#bidBox').append($bidRestriction);
				} else {
					$('#bidBox').removeClass('fadeIntoView').addClass('fadeFromView').remove();
				}
			}
			$('#bidBox').find('input').on('click',addFocus);
			$('#bidBox').find('button').on('click',saveBidValue);
		}
	
		$('#biddingRules').find('span').on('click',proceedToBid);
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
		var $1600progressiveEraClue='THIS CONSTITUTIONAL AMENEDMENT SANCTIONED THE U.S. CONGRESS TO LEVY AND COLLECT INCOME TAXES \"WITHOUT APPPORTIONMENT ';
		var $1600progressiveEraClue='AMONG THE SEVERAL STATES AND WITHOUT REGARD TO ANY CENSUS OR ENUMERATION\"(U.S. Const. amend. XIX).';
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
			setTimeout(removeElement,3000);
		}
		$('.magnified').find('span').eq(0).on('click',fadeAndRemove);
	}
	
	function startCountingTime(){
		$startTime=new Date(); //Initialize a date object and start counting from the moment the clue is displayed.
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
				$cluePrize=$bidValue;
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
				$cluePrize=-$bidValue;
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
				$cluePrize=-$bidValue;
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
			} else {
				$cluePrize=-$bidValue;
			}
			console.log($elapsedTime);
			console.log($cluePrize);
			
			var $result;
			if ($inputValue===$answers[$eventTargetID]){
				$result='<p>CORRECT!</p>';
				var $updateCorrectCount=Number(localStorage.getItem('doubleJeopardyCorrect'));
				$updateCorrectCount++;
				localStorage.setItem('doubleJeopardyCorrect',$updateCorrectCount);
				console.info('TOTAL CORRECT:'+$updateCorrectCount);
			} else {
				$result='<p>INCORRECT!</p><p>THE CORRECT ANSWER IS</p><p>'+'\''+$answers[$eventTargetID]+'\'.</p>';
			}
			$('#answer').append($result).find('span').eq(2).css('color','rgb(0,0,0)');
			
			var $contestantName=localStorage.getItem('contestant');
			var $doubleJeopardyTotalPrize=Number(localStorage.getItem('doubleJeopardyTotalPrize')); 	//Player's total prize winnings so far
			console.log($doubleJeopardyTotalPrize);
			$newScore=$doubleJeopardyTotalPrize+$cluePrize;
			localStorage.setItem('doubleJeopardyTotalPrize',$newScore); 					//Save the player's new score.
			console.log($newScore);			
						
			var $updatedAnsweredCount=localStorage.getItem('doubleJeopardyAnswered');
			$updatedAnsweredCount++;										//Update total number of questions answered.
			localStorage.setItem('doubleJeopardyAnswered',$updatedAnsweredCount);
			var $remainingUnanswered=25-$updatedAnsweredCount;
	        
			$doubleJeopardyClueStatusParsed[$eventTargetID]='TRUE'; 					//Update array data after a clue has been attempted.
			console.log($doubleJeopardyClueStatusParsed);
			localStorage['doubleJeopardyClueStatus']=JSON.stringify($doubleJeopardyClueStatusParsed); //Convert back into a string and save the changes back into localStorage.
			/*
			I wanted  the negative sign to be before the '$' sign, so negative numbers are multiplied by one. When there is a negative number,
			I then use the initialize and set the variable $sign to '-'; other wise, it exists as an empty string.
			*/
			var $displayScore=$newScore;
			var $sign='';
			if ($newScore<0){
				$displayScore=$newScore*-1;
				$sign='-';
			} 
			
			var $update='<p>'+$contestantName+',</p><p>HERE ARE YOUR CURRENT GAME STATS:</p><ul><li>TOTAL PRIZE WINNINGS:<span>'+$sign+'$'+$displayScore+'</span></li>';
			    $update+='<li>TOTAL ANSWERED THIS ROUND: '+'<span>'+$updatedAnsweredCount+'</span>'+'</li>';
				$update+='<li>REMAINING UNANSWERED: '+'<span>'+$remainingUnanswered+'</span>'+'</li>';
			
			$('.magnified').removeClass('fadeIntoView').addClass('fadeFromView').remove();
			console.log($newScore);
			console.log($updatedAnsweredCount);
			console.log($remainingUnanswered);
			
			$('#answer').append($update);
			
			if ($newScore<0){
				$('#answer').find('span').eq(2).css('color','rgb(255,0,0)'); //Winnings below $0 are coloured red.
			} else {
				$('#answer').find('span').eq(2).css('color','rgb(31,72,7)'); //Winnings over $0 are coloured dollar-bill green.				
			}

			function fadeAndRemove(){
				$('#answer').removeClass('fadeIntoView').addClass('fadeFromView').remove();
			}
			$('#answer').find('span').eq(0).on('click',fadeAndRemove);
		}
	
		$('#answer').find('button').one('click',markAnswer);
	}
	
	function checkDoubleJeopardyGameProgress(){
		var $i=5;
		var $count=0;
		console.log($doubleJeopardyClueStatusParsed.length);
		while ($i<$doubleJeopardyClueStatusParsed.length){
			var	$currentStatus=$doubleJeopardyClueStatusParsed[$i];
			if ($currentStatus==='TRUE'){
				$count++;
			}
			$i++;
		}
		if ($count===25){
			//Overall game stats
			var $totalWinningPercentage=Number(localStorage.getItem('totalWinningPercentage'));
			var $totalPrize=Number(localStorage.getItem('totalPrize'));
			var $totalCorrect=Number(localStorage.getItem('totalCorrect'));

			var $doubleJeopardyWinningPercentage=Number(parseFloat(($doubleJeopardyCorrect/25)*100).toFixed()); 
			//Convert into percentage rounded to the nearest whole number.

			var $doubleJeopardyTotalPrize=Number(localStorage.getItem('doubleJeopardyTotalPrize'));
			var $doubleJeopardyCorrect=Number(localStorage.getItem('doubleJeopardyCorrect'));
			
			$totalPrize+=$doubleJeopardyTotalPrize;
			$totalCorrect+=$doubleJeopardyCorrect;
			
			var $jeopardyWinningPercentage=Number(localStorage.getItem('jeopardyWinningPercentage'));
			$totalWinningPercentage=($jeopardyWinningPercentage+$doubleJeopardyWinningPercentage)/2;
			localStorage.setItem('totalWinningPercentage',$totalWinningPercentage);
			
			var $htmlMarkup='<div id="completedMessage"><p>CONGRATULATIONS!</p><p>YOU HAVE FINISHED DOUBLE JEOPARDY!</p><h1>OVERALL STATS</h1><ul>';
			    $htmlMarkup+='<li>PRIZE WINNINGS:'+$totalPrize+'<li> NUMBER CORRECT:'+$totalCorrect+'</li><li>WINNING PERCENTAGE:'+$totalWinningPercentage+'%</li>';
				$htmlMarkup+='</ul><h1>DOUBLE JEOPARDY! STATS</h1><ul><li>PRIZE WINNINGS:'+$doubleJeopardyTotalPrize+'</li><li>NUMBER CORRECT:'+$doubleJeopardyCorrect+'</li>'; 
				$htmlMarkup+=+'<li>CORRECT:'+$doubleJeopardyCorrect+'</li></ul>';
				$htmlMarkup+='<li>WINNING PERCENTAGE:'+$doubleJeopardyWinningPercentage+'</li></ul>';
				$htmlMarkup+='<a>PROCEED TO FINAL JEOPARDY!</a>';
			//NOTE: In the first round, first round winning percentage=overall winning percentage;
			
			$('body').append($htmlMarkup);
		}
	}
	
	function alreadySelectedWarning(){
		$('body').append('<div id="alreadySelectedWarning"><span>X</span><p>YOU HAVE ALREADY ANSWERED THIS CLUE; CHOOSE ANOTHER ONE.</p></div>');
		$('#alreadySelectedWarning').addClass('fadeIntoView');
		
		function fadeAndRemove(){
			$('#alreadySelectedWarning').removeClass('fadeFromView').remove();
		}
		$('#alreadySelectedWarning').find('span').on('click',fadeAndRemove);
	}
	var $doubleJeopardyClueStatusParsed=JSON.parse(localStorage.getItem('doubleJeopardyClueStatus'));
	
	if ($eventTargetID>=0 && $eventTargetID<5){ //Category tiles
		showClue();
	} else if ($eventTargetID>=5 && $eventTargetID<=23 || $eventTargetID>=25 && $eventTargetID<=27 || $eventTargetID>28){ //Tiles awarding face value amounts
		if ($doubleJeopardyClueStatusParsed[$eventTargetID]==='TRUE'){
			alreadySelectedWarning();
		} else {
			showClue();
			startCountingTime();
			setTimeout(disappear,10000);
			/*Time limit of 10 seconds; the specific tile in the menu screen will be cleared after 10 seconds 
			  starting from the time the clue is displayed.
			*/
			answerAndScore();
			checkDoubleJeopardyGameProgress();
		}
	} else { //Daily double tiles
		if ($doubleJeopardyClueStatusParsed[$eventTargetID]==='TRUE'){
			alreadySelectedWarning();
		} else{
			dailyDouble();
			setTimeout(showClue,10000);
			setTimeout(startCountingTime,10000);
			setTimeout(answerAndScore,10000);
			setTimeout(disappear,10000);
			checkDoubleJeopardyGameProgress();
		}
	} 
}

function setup(){
	var $doubleJeopardyClueStatus=[]; 
	var $i=0;
	  
	while($i<5){
		$doubleJeopardyClueStatus.push('');
		$i++;
	}
		
	while($i>4 && $i<30){
		$doubleJeopardyClueStatus.push('FALSE'); 
		$i++;
	}

	localStorage['doubleJeopardyClueStatus']=JSON.stringify($doubleJeopardyClueStatus); 
	console.info($doubleJeopardyClueStatus); 
}

(function(){
	$(document).ready(setup);
	$('table').on('click',gameplay);
})();