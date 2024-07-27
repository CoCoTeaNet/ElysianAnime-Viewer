'use strict';

const {Service} = require('ee-core');
const Storage = require('ee-core/storage');
const Log = require("ee-core/log");
const jdb = Storage.connection('janime_db');

/**
 * 客户端服务
 */
class ClientService extends Service {
    constructor(ctx) {
        super(ctx);
    }

    /**
     * test
     */
    async test(args) {
        console.log(args)
        let obj = {
            status: 'ok',
            params: args
        }
        return obj;
    }

    async curl(args) {
        let apiUrl = jdb.getItem('janime_api_url');
        if (!apiUrl) {
            apiUrl = 'http://localhost:8088/v2-api';
            jdb.setItem('janime_api_url', apiUrl);
        }
        args.url = apiUrl + args.url;
        return await this.app.curl(args.url, args.options);
    }

    async cache(args) {
        if (args.key) {
            jdb.setItem(args.key, args.value)
        } else {
            Log.warn('unknown cache key');
        }
    }

    async getCache(key) {
        let value = '';
        if (key) {
            value = jdb.getItem(key);
        }
        return value;
    }
}

ClientService.toString = () => '[class ClientService]';
module.exports = ClientService;