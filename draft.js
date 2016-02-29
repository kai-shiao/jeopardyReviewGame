var names=[];
names[0]='k'; //assign value to the array elements.
names[1]='2';
localStorage["names"] = JSON.stringify(names); //convert the array elements contained in the 'names' array into a string.

var storedNames = JSON.parse(localStorage["names"]);
storeNames[2]='1'; 
//convert back into an array.

console.log(storedNames);

function myFunction(){
	var clueStatus=[];
	var i=0;
	  
	while (i<25){   
		clueStatus.push("false");
		i++;
	}
	
	console.log(clueStatus); //Check to see the result of the while-loop.
	localStorage.setItem('clueStatus',JSON.stringify(clueStatus));
}

var $clueStatus=JSON.parse(localStorage['clueStatus']);
var $i=5;
var $count=0;

while ($i<$clueStatus.length){
	if ($clueStatus[$i].val()==='TRUE'){
		$count++;
	}
	$i++;
}

if ($count===25){
	var $contestantName=localStorage['contestantName'];
	var $totalPrize=localStorage['totalPrize'];
	var $correct=localStorage['correct'];
}
