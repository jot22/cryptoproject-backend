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

var cryptoController = require('../controller/CryptoController');
var tradeController = require('../controller/TradeController');
var coinMarketController = require('../controller/CoinMarketController');
var userController = require('../controller/UserController');
var followingController = require('../controller/FollowingController');

router.route('/user')
    .get(userController.findAll)
    .post(userController.new)
    .delete(userController.deleteAll);

router.route('/user/:id')
    .get(userController.findById)
    .delete(userController.delete);

router.route('/crypto')
    .get(cryptoController.index)
    .post(cryptoController.new);

router.route('/crypto/:id')
    .get(cryptoController.findById)
    .put(cryptoController.update)
    .delete(cryptoController.delete);

router.route('/trade')
    .get(tradeController.index)
    .delete(tradeController.deleteAllTrades);

router.route('/investor/:iid/trade')
    .get(tradeController.findTradesByInvestor);

router.route('/broker/:bid/trade')
    .get(tradeController.findTradesByBroker);

router.route('/investor/:iid/broker/:bid/crypto/:cid/trade')
    .post(tradeController.buy);

router.route('/crypto/:cid/trade')
    .get(tradeController.findTradeByCrypto)
    .delete(tradeController.removeCrypto);

router.route('/trade/:tid')
    .put(tradeController.updateTrade)
    .delete(tradeController.deleteTrade);


router.route('/coin')
    .put(coinMarketController.update)
    .get(coinMarketController.findAll)
    .put(coinMarketController.update)
    .post(coinMarketController.get);

router.route('/coin/:symbol')
    .get(coinMarketController.get);

router.route('/coins/:id')
    .get(coinMarketController.getById);

router.route('/following')
    .get(followingController.findAllFollowings)
    .post(followingController.createFollowing)
    .delete(followingController.deleteFollowing);

router.route('/following/:id')
    .get(followingController.findFollowingById)
    .put(followingController.addToFollowing)
    .delete(followingController.removeFromFollowing);

router.route('/following/:id/user')
    .get(followingController.findFollowingByUserId)
    .delete(followingController.deleteFollowing);

// Export API routes
module.exports = router;
