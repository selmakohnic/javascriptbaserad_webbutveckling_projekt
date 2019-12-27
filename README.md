# Projektuppgift Reselogg REST-webbtjänst - JavaScriptbaserad webbutveckling
Den första delen i projektet består av en REST-webbtjänst som kan läsa ut, lägga till, ändra och radera information med GET, POST, PUT och DELETE.

För att starta systemet klona först projektet genom: **git clone https://github.com/selmakohnic/javascriptbaserad_webbutveckling_projekt.git**.

Följande curl requests kan användas för att testa REST-webbtjänsten:
* __GET:__ curl -i -X GET http://localhost:3001/api/travels/
* __GET med ID:__ curl -i -X GET http://localhost:3001/api/travels/VALT_ID
* __POST:__ curl -i -X POST -d '{"country": "Sverige", "city": "Sundsvall", "date": "2019-12-27 - 2020-01-03", "description": "En fin stad.", "image": "sundsvall.jpg"}' http://localhost:3001/api/travels/add
* __PUT:__ curl -i -X PUT -d '{"country": "Sverige", "city": "Sundsvall", "date": "2019-12-27 - 2020-01-06", "description": "En fin stad.", "image": "sundsvall.jpg"}' http://localhost:3001/api/travels/update/VALT_ID
* __DELETE:__ curl -i -X DELETE http://localhost:3001/api/travels/delete/VALT_ID