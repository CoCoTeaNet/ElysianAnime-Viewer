const { Application } = require('ee-core');
const path = require("path");
const {app} = require("electron");
const Log = require('ee-core/log');
const Ps = require("ee-core/ps");

class Index extends Application {


  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready () {
    // 加载mpv lib
    let mpvPluginDir = path.join(Ps.getExtraResourcesDir(), 'dll').replace(/\\/g, '\\\\');
    let pluginPath = path.join(mpvPluginDir, 'mpvjs/mpvjs.node;application/x-mpvjs').split('\\').join('/');

    if (Ps.isProd()) {
      pluginPath = pluginPath.replace('app.asar', 'app.asar.unpacked')
    }

    Log.info("mpv.js plugin loading, dir=" + pluginPath);

    app.commandLine.appendSwitch("no-sandbox");
    app.commandLine.appendSwitch("ignore-gpu-blacklist");
    app.commandLine.appendSwitch("register-pepper-plugins", pluginPath);
  }

  /**
   * electron app ready
   */
  async electronAppReady () {
    // do some things
  }

  /**
   * main window have been loaded
   */
  async windowReady () {
    // do some things
    // 延迟加载，无白屏
    const winOpt = this.config.windowsOption;
    if (winOpt.show == false) {
      const win = this.electron.mainWindow;
      win.once('ready-to-show', () => {
        win.show();
        win.focus();
      })
    }
  }

  /**
   * before app close
   */
  async beforeClose () {
    // do some things
  }
}

Index.toString = () => '[class Index]';
module.exports = Index;
