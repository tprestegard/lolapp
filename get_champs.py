#! /usr/bin/env python

import urllib2, json

url = "https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion?champData=all&api_key=";


response = urllib2.urlopen(url)
data = response.read()

with open('data.txt','w') as outfile:
    json.dump(data,outfile)

file = open('data2.txt','w')
file.write(data)
file.close()
    
# EOF
