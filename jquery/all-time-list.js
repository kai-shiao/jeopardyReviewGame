(function(){
	$('document').ready(function(){
		$.ajax({
			type: 'POST',
			url: 'data/playerstats.xml',
			success: function(xml){ //'success' in a callback context is still valid and acceptable; .success() as a chained method following $.ajax() is deprecated.
						var $k=0;
						var $statsList=['jeopardyTotalPrize','doubleJeopardyTotalPrize','totalPrize',
										'jeopardyCorrect','doubleJeopardyCorrect','totalCorrect'
						];
						var $numberOfStats=$statsList.length;
						var $currentStat;
						console.log($statsList.length);
						
						while ($k<$numberOfStats){
							var $playerNames=[]; //Initialize an empty array to hold all the names of players.
							var $allObservations=[]; //Initialize an empty array to hold all the figures for a certain statistic sourced from the XML file.
							$currentStat=$statsList[$k];
							var $totalCount=$(xml).find($statsList[$k]).length; //Obtain the current statistic by using the sentry variable's vlaue as the array index to select the element.
							//Find the total number of element nodes pertaining to that statistic; it will determine the number of times the for-loop will be run.
							console.log($totalCount);
							
							for (var $i=0;$i<$totalCount;$i++){
								var $name=$(xml).find($currentStat).eq($i).parent().attr('name');
								var $value=$(xml).find($currentStat).eq($i).text();
									
								//Populate array with all the names and values from "playerstats.xml".
								$playerNames.push($name); 
								$allObservations.push($value); 
							}
							
							$allObservations.sort(function(a,b){ 
									return b-a;
							}).splice(9,$allObservations.length-10);
								//Sort $allObservations in a descending fashion and select only the top 10 and remove all remaining elements.
							console.log($allObservations.length);
							//Only keep the top 10 values and delete the rest.
							//Start deleting from the element with an index number of 9 (but not including this element).
							
							var $dynamicallyGeneratedNameList=''; //Will be used to hold dynamically generated <li> elements containing top 10 players' names.
							var $dynamicallyGeneratedStatList='';//Will be used to hold dynamically generated <li> elements containing top 10 observations for that statistic.
							//Construct the list of the top 10 values using a for-loop.
							
							var $dollarSign='';
							if ($k<=2){
								$dollarSign='$';
							}
							for (var $i=0;$i<$allObservations.length;$i++){
								$dynamicallyGeneratedStatList+='<li>'+$dollarSign+$allObservations[$i]+'</li>';
								var $originalIndexPosition=$allObservations.indexOf($allObservations[$i]);
								$dynamicallyGeneratedNameList+='<li>'+$playerNames[$originalIndexPosition]+'</li>';
							}
							console.log('reached line 45');
							var $htmlMarkupForNameList='<ol>'+$dynamicallyGeneratedNameList+'</ol>';
							var $htmlMarkupForStatList='<ul>'+$dynamicallyGeneratedStatList+'</ul>';
							$('#wrapper').find('section').eq($k).append($htmlMarkupForNameList).append($htmlMarkupForStatList);
							console.log($k);
							$k++;
						}
					},
			fail: function(){
					$('body').append('<p>SORRY, THERE WAS AN AJAX ERROR.</p>');
				  }
		});
	});
})();

/*beforeSend: function(){
			.parent().append('<p id="loading">ONE MOMENT PLEASE...</p>');
		}
		timeout: 2000; //2 second delay in implementing the Ajax request.
		complete: function(){
			$('#loading').remove();
		};
*/