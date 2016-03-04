(function(){
	var $finalJeopardyPrize;
	var $correctAnswer='SALUTARY NEGLLECT';
	var $startTime=new Date();
	
	function addFocus(){
		$('input').focus();
	}
		
	function markAndScore(){
		var $endTime=new Date();
		
		var $inputValue=$('input').val().toUpperCase();
		var $elapsedTime=Number(($endTime-$startTime))/1000;

		if ($inputValue===$correctAnswer && $elapsedTime<=30){
			$finalJeopardyPrize=$bidValue;
		} else if ($inputValue===$correctAnswer && $elapsedTime>30){
			$finalJeopardyPrize=-$bidValue;	
		} else if ($inputValue!=$correctAnswer && $elapsedTime<=30){
			$finalJeopardyPrize=-$bidValue;
		} else { //$inputValue!=$correctAnswer && $elapsedTime<=30
			$finalJeopardyPrize=$bidValue;
		}
	}
	
	$('input').on('click',addFocus);
	$('button').on('click',markAndScore);
})();