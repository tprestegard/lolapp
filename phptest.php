<html>

<head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
     <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css" />
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
<script type="text/javascript" src="js/champs.js"></script>
<link rel="stylesheet" type="text/css" href="css/champs.css" />
</head>

<body>
    
<?php
include_once("core/APIKey.php"); // get $APIKey

$region = "na";
$url = "https://global.api.pvp.net/api/lol/static-data/{$region}/v1.2/champion?champData=all&api_key=" . $APIKey;
#$data = file_get_contents($url);
$data = file_get_contents("data/champ_info.json");
$data = json_decode($data,true);

// Sort by keys (champ names)
ksort($data["data"]);
$keys = array_keys($data["data"]);

// Table setup.
$nCols = 12;

// Table header
echo "<table class=\"champs\" id=\"champ_table\">\n<tr>\n";


$colCount = 0;
for ($i = 0; $i < sizeof($data["data"]); $i++) {
    $champ_i = $data["data"][$keys[$i]];
    $image_i = '<img src="http://ddragon.leagueoflegends.com/cdn/6.9.1/img/champion/' . $champ_i["image"]["full"] . '" alt="' . $champ_i["name"] . '" data-name="' . $keys[$i] . '" />' . "\n";
    echo "\t<td>\n\t\t" . $image_i . "\t</td>\n";

    $colCount++;
    if ($colCount >= $nCols) {
        $colCount = 0;
        echo "</tr>\n<tr>\n";
    }   
}

// Add more empty table cells.
while ($colCount < $nCols) {
    echo "\t<td></td>\n";
    $colCount++;
}
// Table footer
echo "</tr>\n";
echo "</table>\n";

echo "<br /><br /><br />";

?>

<div id="skill_div" style="display: none;">
    <p></p>
    <table id="skill_table">
    <tr>
    <td><div><img src="" /></div></td>
    <td><div><img src="" /></div></td>
    <td><div><img src="" /></div></td>
    <td><div><img src="" /></div></td>
    <td><div><img src="" /></div></td>
    </tr>
    </table>
</div>

<style>
//.ui-tooltip {
//  background: black;
//}
</style>
    

</body>
</html>