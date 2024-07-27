'use strict';

const {Controller} = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');

class HttpClientController extends Controller {
    constructor(ctx) {
        super(ctx);
    }

    async test() {
        const result = await Services.get('client').test('janime');
        Log.info('service result:', result);
        return 'hello janime';
    }

    async curl(args) {
        const result = await Services.get('client').curl(JSON.parse(args));
        Log.info('curl >>>>>', result);
        return result;
    }
}

HttpClientController.toString = () => '[class HttpClientController]';
module.exports = HttpClientController;  