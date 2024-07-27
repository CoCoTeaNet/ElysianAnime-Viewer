
/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
  test: 'controller.client.test',
  curl: 'controller.client.curl',
  createWindow: 'controller.window.createWindow',
  createMpv: 'controller.window.createMpv',
}

export {
  ipcApiRoute
}

