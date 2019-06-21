const express = require('express');
const mongoose = require('mongoose');
const envalid = require("envalid");
const router = express.Router();
const axios = require("axios");

// Get environment variables
const env = envalid.cleanEnv(process.env, {
    IMENZIES_CLIENT_ID: envalid.str(),
    IMENZIES_CLIENT_SECRET: envalid.str(),
    IMENZIES_HOST_ENDPOINT: envalid.str({default: "www.i-menzies.com"})
});

const imenziesAxios = axios.create({
  baseURL: env.IMENZIES_ENDPOINT,
  timeout: 20000,
  withCredentials: true
});

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1;
var yyyy = today.getFullYear();
if(dd<10)
{
    dd='0'+dd;
}
if(mm<10)
{
    mm='0'+mm;
}
var today = yyyy + '-' + mm + '-' + dd;

mongoose.connect('mongodb://localhost:27017/coop-nm', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Supplier Data MongoDB database connection established successfully");
})

let SupplierData = require('../model/supplierData.model');

router.route('/').get(function(req, res) {
    SupplierData.find(function(err, SupplierData) {
        if (err) {
            console.log(err);
        } else {
            res.json(SupplierData);
        }
    });
});

router.route('/login').get(function(req, res) {
  imenziesAxios.post("Account/Login?Username=" + env.IMENZIES_CLIENT_ID + "&Password=" + env.IMENZIES_CLIENT_SECRET + "&Password-clone=" + env.IMENZIES_CLIENT_SECRET + "&X-Requested-With=XMLHttpRequest")
    .then(function (response) {
      // handle success
      console.log(req.headers);
      console.log(response.headers);
      console.log(response.headers["set-cookie"].join(';'));
      res.json(response.headers["set-cookie"]);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

function login() {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      imenziesAxios.post("Account/Login?Username=" + env.IMENZIES_CLIENT_ID + "&Password=" + env.IMENZIES_CLIENT_SECRET + "&Password-clone=" + env.IMENZIES_CLIENT_SECRET + "&X-Requested-With=XMLHttpRequest")
        .then(function (response) {
          console.log("promise:" + response.headers["set-cookie"].join(';'));
          resolve(response.headers["set-cookie"].join(';'));
        })
        .catch(function (error) {
          // handle error
          console.log("error:" + error);
          resolve(null);
        });

    }, 1000);
  });
};

router.route('/DeliveryNotes').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("DeliveryNotes/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/DeliveryNotes/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("DeliveryNotes/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/DeliveryNotes/Csv/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("DeliveryNotes/Csv/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Files/Index/:date').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Files/Index/" + req.params.date + "?type=DeliveryNote", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.contentType("application/pdf");
    res.send(response.data);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/FinalDeliveryNotes').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("FinalDeliveryNotes/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/FinalDeliveryNotes/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("FinalDeliveryNotes/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Titles').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Titles/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Titles/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Titles/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Invoices').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Invoices/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Invoices/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Invoices/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/CreditNotes').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("CreditNotes/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/CreditNotes/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("CreditNotes/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Allocations').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Allocations/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Allocations/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Allocations/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Orders').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Orders/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Orders/Categories').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Orders/Categories", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Orders/View/:id').get(function(req, res) {
  logi
  n()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Orders/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/BackOrder/All').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("BackOrder/All", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Returns').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Returns/List", { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

router.route('/Returns/View/:id').get(function(req, res) {
  login()
  .then(function (response) {
    // handle success
    console.log(response);
    return imenziesAxios.get("Returns/View/" + req.params.id, { credentials: 'include', headers: { Cookie: response } });
  })
  .then(function (response) {
    // handle success
    console.log(req.headers);
    console.log(response.headers);
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    res.json(error);
  });
});

module.exports = router;
