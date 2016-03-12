<?php
$stats=new DOMDocument();
$stats->load("data/playerstats.xml"); # "->" is the equivalent of JavaScript's dot notation used when accessing a specific object's property or method.
$list=["score","correct","percentage","answered"]; #always use double quotes; never use single quotes as they produce invalid results in PHP.
$length=count($list); #PHP's equivalent of the JavaScript's length property is a function known as count() that determines the length of a string, array, etc.
$k=0;
$i=0;
$value=[4,4,4,4];

while ($i<$length && $k<$length){
	$stats->getElementsByTagName($list[$k])->item(0)->nodeValue=$value[$i];
	$i++;
	$k++;
}
$stats->save("playerstats.xml");
?>