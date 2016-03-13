<?php
#Save the newly received statistics sent to PHP from "finaljeopardy.html" via the POST method into the corresponding PHP variables. 
/*$contestantName=filter_input(INPUT_POST,"contestantName");
$jeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$doubleJeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$finalPrize=filter_input(INPUT_POST,"finalPrize");
$jeopardyCorrect=filter_input(INPUT_POST,"jeopardyCorrect");
$doubleJeopardyCorrect=filter_input(INPUT_POST,"doubleJeopardyCorrect");*/

$contestantName="errrr";
$jeopardyTotalPrize="43";
$doubleJeopardyTotalPrize="33";
$finalPrize="33";
$jeopardyCorrect="33";
$doubleJeopardyCorrect="33";

#Create a new DOMDocument object to be able to work with a XML document & use the XML DOM methods in PHP.
$statSheet=new DOMDocument();
#Important! These 2 following lines of code must be before the file is loaded so PHP knows that the XML file should be formatted.
$statSheet->preserveWhiteSpace=false; 
$statSheet->formatOutput=true;
$statSheet->load("data/playerstats.xml");

/*
Set up a XML node with 5 child nodes inside to store player stats.

Example:
<playerSummary>
	<player name="NICOLE">
		<jeopardyTotalPrize>15000</jeopardyTotalPrize>
		<doubleJeopardyTotalPrize>15000</doubleJeopardyTotalPrize>
		<finalPrize>30000</finalPrize>
		<jeopardyCorrect>25</doubleJeopardyCorrect>
		<doubleJeopardyCorrect>25</doubleJeopardyCorrect>
	</player>
</playerSummary>
*/

#Obtain the XML file's root element.
$rootElement=$statSheet->getElementsByTagName("playerSummary")->item(0);
$playerElement=$statSheet->createElement("player");
$rootElement->appendChild($playerElement); #Append the XML node for contestant name as a direct descendant of the root element.
$playerElement->setAttribute("name","$contestantName");

#The contestant name node will have 5 children nodes: jeopardyTotalPrize, doubleJeopardyTotalPrize, finalPrize, jeopardyCorrect, doubleJeopardyCorrect.

$jeopardyTotalPrizeElement=$statSheet->createElement("jeopardyTotalPrize");
$jeopardyTotalPrizeNodeValue=$statSheet->createTextNode($jeopardyTotalPrize);
$jeopardyTotalPrizeElement->appendChild($jeopardyTotalPrizeNodeValue);

$doubleJeopardyTotalPrizeElement=$statSheet->createElement("doubleJeopardyTotalPrize");
$doubleJeopardyTotalPrizeNodeValue=$statSheet->createTextNode($doubleJeopardyTotalPrize);
$doubleJeopardyTotalPrizeElement->appendChild($doubleJeopardyTotalPrizeNodeValue);

$finalPrizeElement=$statSheet->createElement("finalPrize");
$finalPrizeNodeValue=$statSheet->createTextNode($finalPrize);
$finalPrizeElement->appendChild($finalPrizeNodeValue);

$jeopardyCorrectElement=$statSheet->createElement("jeopardyCorrect");
$jeopardyCorrectNodeValue=$statSheet->createTextNode($jeopardyCorrect);
$jeopardyCorrectElement->appendChild($jeopardyCorrectNodeValue);

$doubleJeopardyCorrectElement=$statSheet->createElement("doubleJeopardyCorrect");
$doubleJeopardyCorrectNodeValue=$statSheet->createTextNode($doubleJeopardyCorrect);
$doubleJeopardyCorrectElement->appendChild($doubleJeopardyCorrectNodeValue);

$childNodes=array($jeopardyTotalPrizeElement,$doubleJeopardyTotalPrizeElement,$finalPrizeElement,$jeopardyCorrectElement,$doubleJeopardyCorrectElement);

#Run a for-loop to assign the 6 newly created nodes as children of the contestantName node.
for ($i=0;$i<count($childNodes);$i++){
	$playerElement->appendChild($childNodes[$i]);
}
$statSheet->save("data/playerstats.xml");
?>