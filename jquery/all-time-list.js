(function(){
	$.ajax({
		type: 'GET',
		url: 'data/playerstats.xml',
		dataType: 'xml',
		complete: function(){
			$('#loading').remove();
		};
		success: function(xml){ //'success' in a callback context is still valid and acceptable; .success() as a chained method following $.ajax() is deprecated.
					var $totalCount=$(xml).find('jeopardyCorrect').length; 
					//Find the total number of 'jeopardyCorrect' element nodes; it will determine the number of times the for-loop will be run.

					var $playerNames=[]; //Gather all the names of players.
					var $jeopardyCorrect=[]; //Hold all the figures for this statistic sourced from the XML file.
					
					for (var $i=0;$i<$totalCount;$i++){
						var $name=$(xml).find('jeopardyCorrect').eq($i).parent().attr('name');
						var $valueName=$(xml).find('jeopardyCorrect').eq($i).text();

						$playerNames.push($name); //Populate array with all the names and values from "playerstats.xml".
						$jeopardyCorrect.push($valueName); 
					}
					
					var $jeopardyCorrectSorted=$jeopardyCorrect.sort(function(a,b){ 
						return b-a;
					}); //Sort $jeopardyCorrect in a descending fashion & save the results to a new array called $jeopardyCorrectSorted.
					
					var $jeopardyCorrectSortedLength=$jeopardyCorrectSorted.length;
					var $numberOfElementsToRemove=$jeopardyCorrectSortedLength-10; 
					var $finalized.splice(9,$numberOfElementsToRemove);
					//Only keep the top 10 values and delete the rest.
					//Start deleting from the element with an index number of 9 (not including this element).
					
					var $dynamicallyGeneratedNameList; //Will be used to hold dynamically generated <li> elements containing top 10 players' names.
					var $htmlMarkupForNameList='<ul>'+$dynamicallyGeneratedNameList+'</ul>';
					
					var $dynamicallyGeneratedStatList; //Will be used to hold dynamically generated <li> elements containing top 10 stats.
					var $htmlMarkupForStatList='<ul>'+$dynamicallyGeneratedStatList+'</ul>';
					//Construct the list of the top 10 values using a for-loop.
					for (var $i=0;$i<$finalized.length;$i++){
						var $originalIndexPosition=$jeopardyCorrect.indexOf($finalized[$i]);
						$dynamicallyGeneratedNameList+='<li>'+$playerNames[$originalIndexPosition]+'</li>';
					}						
		}
		fail: function(){
				$(e.target).parent().append('<p>SORRY, THERE WAS AN AJAX ERROR.</p>');
		}
	});
})();

/*beforeSend: function(){
			.parent().append('<p id="loading">ONE MOMENT PLEASE...</p>');
		};
		timeout: 2000; //2 second delay in implementing the Ajax request.*/