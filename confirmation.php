<?php
#Save the newly received statistics sent to PHP from "finaljeopardy.html" via the POST method into corresponding PHP variables; 
$contestantName=filter_input(INPUT_POST,"contestantName");
$jeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$doubleJeopardyTotalPrize=filter_input(INPUT_POST,"doubleJeopardyTotalPrize");
$jeopardyCorrect=filter_input(INPUT_POST,"jeopardyCorrect");
$doubleJeopardyCorrect=filter_input(INPUT_POST,"doubleJeopardyCorrect");

#Create a new DOMDocument object to be able to work with a XML documents & use the XML DOM methods in PHP.
$statSheet=new DOMDocument('1.0', 'UTF-8'); 
$statSheet->load("data/playerstats.xml"); 

$contestantNameElement=$statSheet->createElement('contestantName');
$contestantNameNodeValue=$statSheet->createTextNode($contestantName);
$contestantNameElement->appendChild($contestantNameNodeValue);

$jeopardyTotalPrizeElement=$statSheet->createElement('jeopardyTotalPrize');
$jeopardyTotalPrizeNodeValue=$statSheet->createTextNode($jeopardyTotalPrize);
$jeopardyTotalPrizeElement->appendChild($jeopardyTotalPrizeNodeValue);

$doubleJeopardyTotalPrizeElement=$statSheet->createElement('doubleJeopardyTotalPrize');
$doubleJeopardyTotalPrizeNodeValue=$statSheet->createTextNode($doubleJeopardyTotalPrize);
$doubleJeopardyTotalPrizeElement->appendChild($doubleJeopardyTotalPrizeNodeValue);

$jeopardyCorrectElement=$statSheet->createElement('jeopardyCorrect');
$jeopardyCorrectNodeValue=$statSheet->createTextNode($jeopardyCorrect);
$jeopardyCorrectElement->appendChild($jeopardyCorrectNodeValue);

$doubleJeopardyCorrectElement=$statSheet->createElement('doubleJeopardyCorrect');
$doubleJeopardyCorrectNodeValue=$statSheet->createTextNode($doubleJeopardyCorrect);
$doubleJeopardyCorrectElement->appendChild($doubleJeopardyCorrectElementNodeValue);

#Run a loop to assign the 4 stats as children of the contestantName node.



$statSheet->save('data/playerstats.xml');
?>