//(function(){
	if (localStorage.getItem('gameComplete')==='false' || 'null'){
		window.stop(); 
		/*
		Since there's no record of game completion, stop the window from loading to prevent the user from seeing the review material; this ensures 
		students are not able to preview material prior to playing Jeopardy!
		*/
		$('body').append('<div id="incomplete"><span>X</span><p>YOU CANNOT REVIEW GAME MATERIAL PRIOR TO COMPLETING THE GAME.</p></div>');
	}
//})();