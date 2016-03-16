(function(){
function redirectToGameCurriculum(){
	location.href='game-curriculum.html';
}

function redirectToJeopardy(){
	location.href='jeopardy.html';
}

function redirectToAllTimeList(){
	location.href='all-time-list.html';
}

$('button').eq(0).on('click', redirectToGameCurriculum);
$('button').eq(1).on('click', redirectToJeopardy);
$('button').eq(2).on('click', redirectToAllTimeList);
})();