#! /usr/bin/env python

# Parameters.
fname = "data/champ_info.dat"

# Imports
import urllib2, json, re, pdb

# Get APIKey from core/APIKey.php.
with open('core/APIKey.php', 'r') as myfile:
    data=myfile.read()
APIKey = re.search(r'APIKey = \"(.*)\"',data).group(1)

# Champs URL
url = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=" + APIKey;

response = urllib2.urlopen(url)
data = response.read()

# Save to file
file = open(fname,'w')
file.write(data)
file.close()
    
# EOF
