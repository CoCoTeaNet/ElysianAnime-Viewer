'use strict';

const {Controller} = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

class HttpClientController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async test() {
        const result = await Services.get('client').test('ElysianAnime');
        Log.info('service result:', result);
        return 'hello ElysianAnime';
    }

    async curl(args) {
        const result = await Services.get('client').curl(JSON.parse(args));
        Log.info('curl >>>>>', result);
        return result;
    }

    async cache(args) {
        await Services.get('client').cache(JSON.parse(args));
        return 'ok.';
    }

    async getCache(args) {
        return await Services.get('client').getCache(args);
    }
}

HttpClientController.toString = () => '[class HttpClientController]';
module.exports = HttpClientController;  