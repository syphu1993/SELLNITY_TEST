import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export const createMenuCategories = (
  categories: any[],
  getIcon: Record<string, React.ReactNode>
): MenuItem[] => {
  const menuItems: MenuItem[] = [];

  categories.forEach((cat, index) => {
    menuItems.push({
      key: cat.categoryId,
      label: cat.categoryName,
      icon: getIcon[cat.categoryId] ?? undefined,
      children:
        cat?.childrent?.length > 0
          ? createMenuCategories(cat.childrent, getIcon)
          : undefined,
    });

    if (index < categories.length - 1) {
      menuItems.push({ type: 'divider' } as MenuItem);
    }
  });

  return menuItems;
};
