<?php
#Save the newly received statistics sent to PHP from "finaljeopardy.html" via the POST method into the corresponding PHP variables. 
/*$contestantName=filter_input(INPUT_POST,"contestantName");
$jeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$doubleJeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$finalPrize=filter_input(INPUT_POST,"finalPrize");
$jeopardyCorrect=filter_input(INPUT_POST,"jeopardyCorrect");
$doubleJeopardyCorrect=filter_input(INPUT_POST,"doubleJeopardyCorrect");*/

$contestantName="ere";
$jeopardyTotalPrize="";
$doubleJeopardyTotalPrize="";
$finalPrize="";
$jeopardyCorrect="";
$doubleJeopardyCorrect="";

#Create a new DOMDocument object to be able to work with a XML document & use the XML DOM methods in PHP.
$statSheet=new DOMDocument("1.0", "UTF-8");
$statSheet->load("data/playerstats.xml");
$statSheet->preserveWhiteSpace=false;
$statSheet->formatOutput=true;

/*Set up a XML node with 4 child nodes inside to store player data.

Example:
<playerSummary>
				<NICOLE>
						<jeopardyTotalPrize>15000</jeopardyTotalPrize>
						<doubleJeopardyTotalPrize>15000</doubleJeopardyTotalPrize>
						<finalPrize>30000</finalPrize>
						<jeopardyCorrect>25</doubleJeopardyCorrect>
						<doubleJeopardyCorrect>25</doubleJeopardyCorrect>
				</NICOLE>
</playerSummary>

*/

#Obtain the XML file's root element.
$rootElement=$statSheet->getElementsByTagName("playerSummary")->item(0);
$contestantNameElement=$statSheet->createElement("$contestantName");
$rootElement->appendChild($contestantNameElement); #Append the XML node for contestant name as a direct descendant of the root element.

#The contestant name node will have 4 children nodes: jeopardyTotalPrize, doubleJeopardyTotalPrize, finalPrize, jeopardyCorrect, doubleJeopardyCorrect.
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

#Run a for-loop to assign the 5 newly created nodes as children of the contestantName node.
for ($i=0;$i<count($childNodes);$i++){
	$contestantNameElement->appendChild($childNodes[$i]);
}

$statSheet->save("data/playerstats.xml");
?>