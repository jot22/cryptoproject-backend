const mongoose = require('mongoose');
const rp = require('request-promise');
const cryptoDao = require('../data/models/crypto/crypto.dao.server');

exports.get = function(req,res) {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            symbol: req.params.symbol
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1094ecde-497e-414a-8d99-74401970bce3'
        },
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        cryptoDao.createCrypto({
            _id: response.data.BTC.id,
            name: response.data.BTC.name,
            symbol: response.data.BTC.symbol,
            priceWhenLoaded: response.data.BTC.quote.USD.price,
            percentChange24: response.data.BTC.quote.USD.percent_change_24h,
            volume: response.data.BTC.quote.USD.volume_24h,
            marketCap: response.data.BTC.quote.USD.market_cap
        }).then(newCrypto => console.log('API call response:', response.data.BTC));
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
};

exports.update = () => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            symbol: "BTC",
            convert: 'USD'
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1094ecde-497e-414a-8d99-74401970bce3'
        },
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        cryptoDao.updateCrypto(response.data.BTC.id, {
            _id: response.data.BTC.id,
            name: response.data.BTC.name,
            symbol: response.data.BTC.symbol,
            priceWhenLoaded: response.data.BTC.quote.USD.price,
            percentChange24: response.data.BTC.quote.USD.percent_change_24h,
            volume: response.data.BTC.quote.USD.volume_24h,
            marketCap: response.data.BTC.quote.USD.market_cap
        }).then(newCrypto => console.log('API call response:', response.data.BTC));
    }).catch((err) => {
        console.log('API call error:', err.message);
    });
};
