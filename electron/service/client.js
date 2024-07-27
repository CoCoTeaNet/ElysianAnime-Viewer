'use strict';

const { Service } = require('ee-core');
const Storage = require('ee-core/storage');
const jdb = Storage.connection('janime_db');

/**
 * 示例服务（service层为单例）
 * @class
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
      status:'ok',
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
  
}

ClientService.toString = () => '[class ClientService]';
module.exports = ClientService;