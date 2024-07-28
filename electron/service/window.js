'use strict';

const {Service} = require('ee-core');
const Addon = require("ee-core/addon");
const Log = require('ee-core/log');
const {isProd, getHomeDir, isDev} = require("ee-core/ps");
const {getValue, isFileProtocol} = require("ee-core/config");
const {join} = require("path");
const {getPluginEntry} = require("mpv.js");
const path = require("path");
const {app} = require("electron");

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
            contentUrl = path.join('file://', electronApp.getAppPath(), content)
        } else if (type === 'web') {
            contentUrl = content;
        } else if (type === 'vue') {
            let addr = 'http://localhost:8080/#'
            if (isProd()) {
                const mainServer = getValue('mainServer');
                if (isFileProtocol(mainServer)) {
                    addr = mainServer.protocol + join(getHomeDir(), mainServer.indexPath);
                } else {
                    addr = mainServer.protocol + mainServer.host + ':' + mainServer.port;
                }
            }
            contentUrl = addr + content;
        } else {
            Log.warn('unknown type');
        }

        contentUrl = contentUrl + "?opusId=" + opusId

        Log.info('contentUrl: ', contentUrl);
        let opt = {
            title: windowTitle,
            webPreferences: {plugins: true},
        }

        let windowAddon = Addon.get('window');
        let win;

        let winCid = windowAddon.getWCid(windowName);
        if (winCid) {
            win = this.windowMap.get(winCid);
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

}

WindowService.toString = () => '[class WindowService]';
module.exports = WindowService;
