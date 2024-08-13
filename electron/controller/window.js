'use strict';

const { Controller } = require('ee-core');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const Config = require('ee-core/config');

/**
 * WindowController
 * @class
 */
class WindowController extends Controller {

  constructor(ctx) {
    super(ctx);
  }

  async createWindow (args) {
    const result = await Services.get('window').createWindow(args);
    Log.info('createWindow result:', result);
    return result;
  }

  async createMpv (args) {
    const result = await Services.get('window').createMpv(args);
    Log.info('createMpv result:', result);
    return result;
  }

  async closeMpv (args) {
    const result = await Services.get('window').closeMpv(args);
    Log.info('hideMpv result:', result);
    return result;
  }

}

WindowController.toString = () => '[class WindowController]';
module.exports = WindowController;