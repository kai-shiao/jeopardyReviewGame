<?php
#Save the newly received statistics sent to PHP via the POST method into corresponding PHP variables; they will be used to update existing stats.
$scoreUpdate=$_POST["$score"];
$correctUpdate=$_POST["$correct"];
$answeredUpdate=$_POST["$answered"];
$percentageUpdate=$correctUpdate/25;

$score+=$scoreUpdate;
$correct+=$correctUpdate;
$answered+=$answeredUpdate;
$percentage+=$percentageUpdate;

$values=[$score,$correct,$answered,$percentage];
$stats=["score","correct","percentage","answered"]; #Create an array to collect all the tag names of the XML elements to be accessed.

$statSheet=new DOMDocument(); #Create a new DOMDocument object to be able to use DOM methods in PHP.
$statSheet->load("playerstats.xml"); #The object is populated with the XML file containing player stats.

$statSheet->getElementsByTagName($stats[0])->item(1)->nodeValue=$values[0];
$statSheet->getElementsByTagName($stats[1])->item(1)->nodeValue=$values[1];
$statSheet->getElementsByTagName($stats[2])->item(1)->nodeValue=$values[2];
$statSheet->getElementsByTagName($stats[3])->item(1)->nodeValue=$

$loadStats->save('playerstats.xml');
?>
