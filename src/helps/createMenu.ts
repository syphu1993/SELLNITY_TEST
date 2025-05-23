import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>['items'][number];

export const createMenuCategories = (
    categories: any[],
    getIcon: Record<string, React.ReactNode>
): MenuItem[] => {
    return categories.map((cat) => ({
        key: cat.categoryId,
        label: cat.categoryName,
        icon: getIcon[cat.categoryId] ? getIcon[cat.categoryId] : undefined,
        children: cat.childrent.length > 0 ? createMenuCategories(cat.childrent, getIcon) : undefined,
    }));
};