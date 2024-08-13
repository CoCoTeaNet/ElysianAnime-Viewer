'use strict';

const {Service} = require('ee-core');
const Addon = require("ee-core/addon");
const Log = require('ee-core/log');
const {isProd, getHomeDir, isDev} = require("ee-core/ps");
const {join} = require("path");
const path = require("path");
const Config = require("ee-core/config");

/**
 * 示例服务（service层为单例）
 * @class
 */
class WindowService extends Service {

    windowMap = new Map();

    constructor(ctx) {
        super(ctx);
    }

    createMpv(args) {
        return this.createWindow(args);
    }

    /**
     * 打开新窗口
     */
    createWindow(args) {
        const {type, content, windowName, windowTitle, opusId} = args;
        let contentUrl = null;
        if (type === 'html') {
            contentUrl = path.join('file://', electronApp.getAppPath(), '#' + content);
            Log.info('html type >>>>> ', contentUrl);
        } else if (type === 'web') {
            contentUrl = content;
            Log.info('web type >>>>> ', contentUrl);
        } else if (type === 'vue') {
            let addr = 'http://localhost:8080/#'
            if (isProd()) {
                const mainServer = Config.getValue('mainServer');
                if (Config.isFileProtocol(mainServer)) {
                    addr = mainServer.protocol + join(getHomeDir(), mainServer.indexPath);
                    addr += '#';
                } else {
                    addr = mainServer.protocol + mainServer.host + ':' + mainServer.port;
                }
            }
            contentUrl = addr + content;
            Log.info('vue type >>>>> ', contentUrl);
        } else {
            Log.warn('unknown type');
        }

        contentUrl = contentUrl + "?opusId=" + opusId;

        Log.info('contentUrl: ', contentUrl);
        let mainOpt = Config.getValue('windowsOption');

        let opt = {
            title: windowTitle,
            width: mainOpt.width,
            height: mainOpt.height,
            minWidth: mainOpt.minWidth,
            minHeight: mainOpt.minHeight,
            webPreferences: {
                plugins: true,
                nodeIntegration: true,
                contextIsolation: false,
            },
        }

        let windowAddon = Addon.get('window');
        let win;

        let winCid = windowAddon.getWCid(windowName);
        if (winCid) {
            win = this.windowMap.get(winCid);
            win.setTitle(windowTitle);
        } else {
            win = windowAddon.create(windowName, opt);
            this.windowMap.set(win.webContents.id, win);
        }

        // load page
        win.loadURL(contentUrl).then(r => {});
        win.moveTop();

        if (isDev()) {
            win.openDevTools();
        }
        return win.webContents.id;
    }

    hideMpv(args) {
        let windowName = args.windowName;
        if (!windowName) {
            return false;
        }
        let windowAddon = Addon.get('window');
        let winCid = windowAddon.getWCid(windowName);
        let win = this.windowMap.get(winCid);
        win.hide();
        return true;
    }

}

WindowService.toString = () => '[class WindowService]';
module.exports = WindowService;
