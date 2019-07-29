// 找到默认选中的菜单数据
function findDefaultActiveMenu(path, menus, res = '') {
  menus.forEach(item => {
    if (item.index === path && item.children.length === 0) {
      res = item;
    } else if (item.children.length > 0) {
      res = findDefaultActiveMenu(path, item.children, res);
    }
  });
  return res;
}

// eslint-disable-next-line
export { findDefaultActiveMenu };
