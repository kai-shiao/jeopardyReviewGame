(function(){
	function deliverContent(e){
		e.preventDefault();
		
		if (localStorage.getItem('gameComplete')==='true'){
			$('section').load(e.target.href).addClass('fadeIntoView');
		} else {
			$('<p>YOU CANNOT REVIEW GAME MATERIAL PRIOR TO COMPLETING THE GAME!</p>').insertBefore('footer');
			$('p').addClass('fadeIntoView');
			$('footer').addClass('absolute');
		}
	}
		
	$('nav').find('ul').find('li').eq(2).find('ul').on('click',deliverContent);
})();