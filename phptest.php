<?php
include_once("core/APIKey.php");

$region = "na";
$url = "https://global.api.pvp.net/api/lol/static-data/{$region}/v1.2/champion?champData=all&api_key=" . $APIkey;
$data = file_get_contents($url);
$data = json_decode($data,true);
//var_dump($data);

/*
foreach($data["data"] as $champ) {
echo "<p>" . $champ["name"] . "</p>\n";
}
*/

// Sort by keys (champ names)
ksort($data["data"]);
$keys = array_keys($data["data"]);

// Table setup.
$nCols = 12;

// Table header
echo "<table>\n<tr>\n";


$colCount = 0;
for ($i = 0; $i < sizeof($data["data"]); $i++) {
    $champ_i = $data["data"][$keys[$i]];
    $image_i = '<img src="http://ddragon.leagueoflegends.com/cdn/6.6.1/img/champion/' . $champ_i["image"]["full"] . '" width="40" height="40" />' . "\n";
    echo "\t<td>\n\t\t<p>"  . $champ_i["name"] . "</p>\n\t\t" . $image_i . "\t</td>\n";

    $colCount++;
    if ($colCount >= $nCols) {
        $colCount = 0;
        echo "</tr>\n<tr>\n";
    }
    if ($i == (sizeof($data["data"]) - 1)) { echo "</tr>\n"; }
    
}

// Table footer
echo "</table>\n";

?>