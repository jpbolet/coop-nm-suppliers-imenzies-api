const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var supplier = new Schema({
    display_name: {
        type: String
    },
    supplier_id: {
        type: String
    },
    logo_uri: {
        type: String
    }
});

var publication = new Schema({
    title: {
        type: String
    },
    issue: {
        type: String
    },
    number_expected: {
        type: Number
    },
    number_received: {
        type: Number
    },
    number_returned: {
        type: Date
    }
});

var format = new Schema({
  deliveries: [{
      type: publication
  }],
  recalls: [{
      type: publication
  }]
});

let SupplierData = new Schema({
    store_id: {
        type: String
    },
    delivery_date: {
        type: Date
    },
    supplier: {
        type: supplier
    },
    received_datetime: {
        type: Date
    },
    returned_datetime: {
        type: Date
    },
    newspapers: {
        type: format
    },
    magazines: {
        type: format
    },
    update_timestamp: {
        type: Date
    }

});

module.exports = mongoose.model('SupplierData', SupplierData);
