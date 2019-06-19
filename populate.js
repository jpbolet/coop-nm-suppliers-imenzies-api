const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/coop-nm', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Delivery Note MongoDB database connection established successfully");
})

let SupplierData = require('./api/model/supplierData.model');

SupplierData.findOne({'store_id': "12345678", 'delivery_date': "2019-06-13T00:00:00.000Z"}, function(err, supplierData){
  if (!supplierData) {
    supplierData = new SupplierData({
      store_id: "12345678",
      delivery_date: "2019-06-13T00:00:00.000Z",
      supplier: {"display_name" : "Menzies Distribution", "supplier_id": "1", "logo_uri": "https://www.menziesdistribution.com/content/img/menzies-dist-logo.svg"},
      received_datetime: "2019-06-13T06:30:01.000Z",
      returned_datetime: null,
      newspapers: {
        deliveries: [
          {
            title: "EXPRESS M-S",
            issue: "2019-06-13T00:00:00.000Z",
            number_expected: 8
          },
          {
            title: "FINANCIAL TIMES",
            issue: "2019-06-13T00:00:00.000Z",
            number_expected: 1
          },
          {
            title: "GUARDIAN M-S",
            issue: "2019-06-13T00:00:00.000Z",
            number_expected: 3
          },
          {
            title: "HULL DAILY MAIL M-S",
            issue: "2019-06-13T00:00:00.000Z",
            number_expected: 24
          },
          {
            title: "I DAILY M-S",
            issue: "2019-06-13T00:00:00.000Z",
            number_expected: 6
          },
          {
            title: "MAIL-MS",
            issue: "2019-06-13T00:00:00.000Z",
            number_expected: 7
          }
        ],
        recalls: [
          {
            title: "NON LEAGUE PAPER",
            issue: "2019-06-02T00:00:00.000Z",
            number_expected: 2
          },
          {
            title: "RUGBY PAPER (SUNDAY)",
            issue: "2019-06-02T00:00:00.000Z",
            number_expected: 2
          }
        ]
      },
      magazines: {
        deliveries: [
          {
            title: "ANGLING TIMES",
            issue: "2019-06-04T00:00:00.000Z",
            number_expected: 1
          },
          {
            title: "BELLA",
            issue: "NO 24",
            number_expected: 3
          },
        ],
        recalls: [
          {
            title: "HEAT",
            issue: "2019-06-06T00:00:00.000Z",
            number_expected: 2
          },
          {
            title: "BELLA",
            issue: "NO 23",
            number_expected: 1
          }
        ]
      },
      update_timestamp: "2019-06-13T06:30:01.000Z"
    });

    supplierData.save()
        .then(supplierData => {
          console.log("saved delivery note")
        })
        .catch(err => {
          console.error(err)
        });
  }
});
