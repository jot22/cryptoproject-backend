const mongoose = require('mongoose');
const rp = require('request-promise');
const cryptoDao = require('../data/models/crypto/crypto.dao.server');

exports.get = function (req, res) {
    const coinSymbol = req.params.symbol;
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            symbol: coinSymbol
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1bc92859-ebcc-434c-9283-fd0084d77dba'
        },
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        res.send(response)
    });
    //     cryptoDao.createCrypto({
    //         _id: response.data[coinSymbol].id,
    //         name: response.data[coinSymbol].name,
    //         symbol: response.data[coinSymbol].symbol,
    //         priceWhenLoaded: response.data[coinSymbol].quote.USD.price,
    //         percentChange24: response.data[coinSymbol].quote.USD.percent_change_24h,
    //         volume: response.data[coinSymbol].quote.USD.volume_24h,
    //         marketCap: response.data[coinSymbol].quote.USD.market_cap
    //     }).then(newCrypto => res.json({response}));
    // }).catch((err) => {
    //     res.json({err});
    // });
};
exports.getById = function (req, res) {
    const coinSymbol = req.params.id;
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            id: coinSymbol
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1bc92859-ebcc-434c-9283-fd0084d77dba'
        },
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        res.send(response)
    });
};

exports.update = (req, res) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest',
        qs: {
            symbol: "BTC",
            convert: 'USD'
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1bc92859-ebcc-434c-9283-fd0084d77dba'
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
        }).then(newCrypto => res.json({response}));
    }).catch((err) => {
        res.json({err});
    });
};

exports.findAll = (req, res) => {
    // This example is in Node ES6 using the request-promise library
    const rp = require('request-promise');
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
        qs: {
            start: 1,
            limit: 1000,
            convert: 'USD'
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1bc92859-ebcc-434c-9283-fd0084d77dba'
        },
        json: true,
        gzip: true
    };
    rp(requestOptions).then(response => {
        res.json(response);
    }).catch((err) => {
        res.json(err);
    });
};

exports.globalMetrics = (req,res) => {
    const requestOptions = {
        method: 'GET',
        uri: 'https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest',
        qs: {
        },
        headers: {
            'X-CMC_PRO_API_KEY': '1bc92859-ebcc-434c-9283-fd0084d77dba'
        },
        json: true,
        gzip: true
    };

    rp(requestOptions).then(response => {
        res.send(response)
    });
};
