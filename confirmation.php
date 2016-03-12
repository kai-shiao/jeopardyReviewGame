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

$contestantName=$statSheet->createElement('contestantName');
$contestantNameNodeValue=$statSheet->createTextNode($contestantName);
$contestantName->appendChild($contestantNameNodeValue);

$jeopardyTotalPrize=$statSheet->createElement('jeopardyTotalPrize');
$jeopardyTotalPrizeNodeValue=$statSheet->createTextNode($jeopardyTotalPrize);
$jeopardyTotalPrize->appendChild($jeopardyTotalPrizeNodeValue);

$doubleJeopardyTotalPrize=$statSheet->createElement('doubleJeopardyTotalPrize');
$doubleJeopardyTotalPrizeNodeValue=$statSheet->createTextNode($doubleJeopardyTotalPrize);
$doubleJeopardyTotalPrize->appendChild($doubleJeopardyTotalPrizeNodeValue);

$statSheet->createElement('jeopardyCorrect');
$statSheet->createElement('doubleJeopardyCorrect');

$statSheet->save('data/playerstats.xml');
?>