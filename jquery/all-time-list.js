(function(){
	$.ajax({
		type: 'GET',
		url: 'data/playerstats.xml',
		dataType: 'xml',
		success: function(xml){ //'success' in a callback context is still valid and acceptable; .success() as a chained method following $.ajax() is deprecated.
					var $statsList=['jeopardyTotalPrize','doubleJeopardyTotalPrize','totalPrize',
									'jeopardyCorrect','doubleJeopardyCorrect','totalCorrect'
					];
					
					for (var $i=0;$i<$statsList.length;$i++){
						var $currentStat=$statsList[$i]; //Obtain the current statistic by using the sentry variable's vlaue as the array index to select the element.
						var $totalCount=$(xml).find($currentStat).length; 
						//Find the total number of element nodes pertaining to that statistic; it will determine the number of times the for-loop will be run.

						var $playerNames=[]; //Initialize an array to hold all the names of players.
						var $allObservations=[]; //Initialize an array to hold all the figures for a certain statistic sourced from the XML file.
						
						for (var $i=0;$i<$totalCount;$i++){
							var $name=$(xml).find($currentStat).eq($i).parent().attr('name');
							var $valueName=$(xml).find($currentStat).eq($i).text();
							
							//Populate array with all the names and values from "playerstats.xml".
							$playerNames.push($name); 
							$allObservations.push($valueName); 
						}
						
						var $allObservationsSorted=$allObservations.sort(function(a,b){ 
							return b-a;
						}); //Sort $allObservations in a descending fashion & save the results to a new array called $allObservationsSorted.
						
						var $allObservationsSortedLength=$allObservationsSorted.length;
						var $numberOfElementsToRemove=$allObservationsSortedLength-10; 
						var $finalized=$allObservationsSorted.splice(9,$numberOfElementsToRemove);
						//Only keep the top 10 values and delete the rest.
						//Start deleting from the element with an index number of 9 (but not including this element).
						
						var $dynamicallyGeneratedNameList; //Will be used to hold dynamically generated <li> elements containing top 10 players' names.
						var $htmlMarkupForNameList='<ul>'+$dynamicallyGeneratedNameList+'</ul>';
						
						var $dynamicallyGeneratedStatList; //Will be used to hold dynamically generated <li> elements containing top 10 observations for that statistic.
						var $htmlMarkupForStatList='<ul>'+$dynamicallyGeneratedStatList+'</ul>';
						//Construct the list of the top 10 values using a for-loop.
						
						for (var $i=0;$i<$finalized.length;$i++){
							$dynamicallyGeneratedStatList+='<li>'+$finalized[$i]+'</li>';
							var $originalIndexPosition=$allObservations.indexOf($finalized[$i]);
							$dynamicallyGeneratedNameList+='<li>'+$playerNames[$originalIndexPosition]+'</li>';
						}
						
						$('body').find('section').eq($i).append($dynamicallyGeneratedNameList).append($dynamicallyGeneratedStatList);						
					}
		},
		fail: function(){
				$(e.target).parent().append('<p>SORRY, THERE WAS AN AJAX ERROR.</p>');
		}
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