<h1>jeopardyReviewGame</h1>
<ul>
	<li>A simple interactive, jQuery, one-player flashcard review game for AP US History.</li>
	<li>The review material used in this game came straight from my old course notes while still in high school in Texas.</li>
	<li>This web game uses Jeopardy!'s format by replicating the screen appearance & prize values; the main divergence is that this version is only for 1 player.
	and obviously, prize money does not translate to real-life prize earnings!</li>
	<li>Instead of using jQuery's fade effects, I used CSS animations for faster performance, thus requiring less burden on memory.</li>
	<li>Players have the option of having their scores saved to the XML data file and considered for possible inclusion in the all-time records. I use PHP code
		to transcibe players' stats to the XML data file.
	</li>
	<li>In the all time reocrds page, I make an Ajax request and go through the XML file to find the top 10 values for each of the follwing categories:
		<ul>
			<li>HIGHEST TOTAL PRIZE</li>
			<li>HIGHEST TOTAL PRIZE FOR JEOPARDY!</li>
			<li>HIGHEST TOTAL PRIZE FOR DOUBLE JEOPARDY!</li>
			<li>HIGHEST NUMBER OF CORRECTLY ANSWERED QUESTIONS</li>
			<li>HIGHEST NUMBER OF CORRECTLY ANSWERED QUESTIONS IN JEOPARDY!</li>
			<li>HIGHEST NUMBER OF CORRECTLY ANSWERED QUESTIONS IN DOUBLE JEOPARDY!</li>
		</ul>
	</li>
</ul>

<footer>&copy; 2016. Kai Shiao. All rights reserved.</footer>