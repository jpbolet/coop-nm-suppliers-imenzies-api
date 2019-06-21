# coop-nm-suppliers-imenzies-api

i-menzies data API, driven off real i-menzies website API endpoints

Copy .env.sample to .env and edit the store i-menzies credentials

Requires a MongoDB instance on localhost:27017
Install Node.js
Install npm
Run
  npm install
  npm start

In a browser, go to
  http://localhost:4002/imenzies/DeliveryNotes
  http://localhost:4002/imenzies/DeliveryNotes/View/3414348514 (last part of url is the ID of a delivery note)
  http://localhost:4002/imenzies/DeliveryNotes/Csv/3414348514 (last part of url is the ID of a delivery note)
  http://localhost:4002/imenzies/Files/Index/2019-06-17
  http://localhost:4002/imenzies/FinalDeliveryNotes
  http://localhost:4002/imenzies/FinalDeliveryNotes/View/3420300636
  http://localhost:4002/imenzies/Invoiceshttp://localhost:4002/imenzies/Invoices/View/2242449397
  http://localhost:4002/imenzies/CreditNotes
  http://localhost:4002/imenzies/CreditNotes/View/3433785192
  http://localhost:4002/imenzies/Allocations
  http://localhost:4002/imenzies/Orders
  http://localhost:4002/imenzies/Orders/Categories
  http://localhost:4002/imenzies/Returns
  http://localhost:4002/imenzies/Returns/View/17-06-2019
  http://localhost:4002/imenzies/Titles
  http://localhost:4002/imenzies/Titles/View/4037

Postman requests to the real SNapp endpoints are here (uses basic authentication using store SNapp login credentials)
  ./api/suppliers/Menzies/Co-op i-Menzies.postman_collection.json
