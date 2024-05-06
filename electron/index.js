const { Application } = require('ee-core');
const path = require("path");
const {app} = require("electron");
const {getPluginEntry} = require("mpv.js");

class Index extends Application {

  constructor() {
    super();
    // this === eeApp;
  }

  /**
   * core app have been loaded
   */
  async ready () {
    // do some things
    // 加载mpv lib
    const path = require("path");
    const pdir = path.join(path.dirname(require.resolve("mpv.js")), "build", "Release");
    if (process.platform !== "linux") {process.chdir(pdir);}
    app.commandLine.appendSwitch("no-sandbox");
    app.commandLine.appendSwitch("ignore-gpu-blacklist");
    app.commandLine.appendSwitch("register-pepper-plugins", getPluginEntry(pdir));
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
