import { isMacOS } from '../utils';
import { ProductName, I18nTextKey } from '../../common';
import { Menu } from 'electron';
import { saveAs, save, openFile, undo, redo } from './menu-event-handler';

function getMenu(i18n, windowMgr) {
  const t = key => i18n.t(key);
  const productName = {
    label: ProductName,
    submenu: [
      {
        label: t(I18nTextKey.preferences),
        click() {}
      },
      {
        label: `About ${ProductName}`,
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  };

  const file = {
    label: t(I18nTextKey.file),
    submenu: [
      {
        label: t(I18nTextKey.newFile),
        click() {
          windowMgr.newFile();
        }
      },
      {
        label: t(I18nTextKey.openFile),
        click() {
          openFile(windowMgr);
        }
      },
      {
        id: I18nTextKey.save,
        label: t(I18nTextKey.save),
        accelerator: 'CommandOrControl+S',
        click() {
          save(windowMgr);
        }
      },
      {
        id: I18nTextKey.saveAs,
        label: t(I18nTextKey.saveAs),
        accelerator: 'Shift+CommandOrControl+S',
        click() {
          saveAs(windowMgr);
        }
      }
    ]
  };

  const edit = {
    label: t(I18nTextKey.edit),
    submenu: [
      {
        label: t(I18nTextKey.undo),
        accelerator: 'CommandOrControl+Z',
        click() {
          undo();
        }
      },
      {
        label: t(I18nTextKey.redo),
        accelerator: 'Shift+CommandOrControl+Z',
        click() {
          redo();
        }
      },
      { type: 'separator' },
    ]
  };

  const view = {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' }, // !! 这里加入打开调试工具, 如果你不希望打开请去掉这行
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  };

  const help = {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'About BlinkMind',
        selector: 'orderFrontStandardAboutPanel:'
      }
    ]
  };

  const menu = isMacOS
    ? [productName, file, edit, view, help]
    : [file, edit, view, help];
  return menu;
}

export function buildMenu(i18n, windowMgr) {
  Menu.setApplicationMenu(Menu.buildFromTemplate(getMenu(i18n, windowMgr)));
}
