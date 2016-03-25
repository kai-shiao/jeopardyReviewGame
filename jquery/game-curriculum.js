(function(){
	function deliverContent(e){
		e.preventDefault();
		
	//	if (localStorage.getItem('gameComplete')==='true'){
			
			if (e.target.href==='jeopardy-curriculum.html') {
				$('h1').eq(1).text('JEOPARDY!').addClass('fadeIntoView')
			} else if (e.target.href==='doublejeopardy-curriculum.html'){
				$('h1').eq(1).text('DOUBLE JEOPARDY!').addClass('fadeIntoView')
			} else {
				$('h1').eq(1).text('');
			}
						$('section').load(e.target.href).addClass('fadeIntoView');

			$('footer').removeClass('absolute').addClass('static');
	/*	} else {
			$('<p>YOU CANNOT REVIEW GAME MATERIAL PRIOR TO COMPLETING THE GAME!</p>').insertBefore('footer');
			$('p').addClass('fadeIntoView');
		}*/
	}
		
	$('nav').find('ul').find('li').eq(2).find('ul').on('click',deliverContent);
})();