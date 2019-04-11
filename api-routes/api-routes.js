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

router.route('/investor')
    .get(investorController.index)
    .post(investorController.new);

router.route('/investor/:id')
    .get(investorController.findById)
    .put(investorController.update)
    .delete(investorController.delete);

// Export API routes
module.exports = router;
