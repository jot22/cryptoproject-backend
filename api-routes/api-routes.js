// Filename: api-routes.js
// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
            status: 'API Its Working',
            message: 'Welcome to RESTHub crafted with love!',
        }
    );
});

var investorController = require('../controller/InvestorController');
var cryptoController = require('../controller/CryptoController');
var tradeController = require('../controller/TradeController');
var brokerController = require('../controller/BrokerController');

router.route('/investor')
    .get(investorController.index)
    .post(investorController.new);

router.route('/investor/:id')
    .get(investorController.findById)
    .put(investorController.update)
    .delete(investorController.delete);

router.route('/crypto')
    .get(cryptoController.index)
    .post(cryptoController.new);

router.route('/crypto/:id')
    .get(cryptoController.findById)
    .put(cryptoController.update)
    .delete(cryptoController.delete);

router.route('/broker')
    .get(brokerController.index)
    .post(brokerController.new);

router.route('/broker/:id')
    .get(brokerController.findById)
    .put(brokerController.update)
    .delete(brokerController.delete);

router.route('/trade')
    .get(tradeController.index);

router.route('/investor/:iid/broker/:bid/trade')
    .get(tradeController.findTradesByInvestor)
    .post(tradeController.buy);

router.route('/broker/:bid/investor/:iid/trade')
    .get(tradeController.findTradesByBroker);

router.route('/crypto/:cid/trade')
    .put(tradeController.sell);

// Export API routes
module.exports = router;
