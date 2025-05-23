'use client';

import { setSelectedCategory, setSelectedOpenKey } from '@/features/products/productSlice';
import { fetchListProducts } from '@/features/products/productThunks';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import type { MenuProps } from 'antd';
import { Menu, Skeleton, Spin } from 'antd';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RequestSearch } from '@/types/requestSearch';

type MenuItem = Required<MenuProps>['items'][number];

interface MenuCategoryProps {
    items: MenuItem[];
    selectedId: string;
    onSelect: (key: string) => void;
    onSelectParent: () => void;
}

const MenuCategory: React.FC<MenuCategoryProps> = ({ items, selectedId, onSelect, onSelectParent }) => {
    const dispatch = useAppDispatch();

    const { openKeys, loadingCategories } = useAppSelector((state) => state.products) || '';

    const onClick: MenuProps['onClick'] = (e) => {
        onSelect(e.key);
    };
    let params: RequestSearch = {}

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        onSelectParent();
        const latestOpenKey = keys[keys.length - 1];
        dispatch(setSelectedOpenKey(latestOpenKey));
        if (latestOpenKey) {
            dispatch(setSelectedCategory(latestOpenKey));
            dispatch(fetchListProducts({...params, categoryId: latestOpenKey}));
        }
    };
    if (loadingCategories) {
        return (
            <div className="w-full">
                {Array.from({ length: 16 }).map((_, idx) => (
                    <div key={idx} className="mb-3 px-2">
                        <Skeleton active title={false} paragraph={{ rows: 1, width: "80%" }} />
                    </div>
                ))}
            </div>
        );
    }
    return (
        <Menu
            onClick={onClick}
            onOpenChange={onOpenChange}
            openKeys={[openKeys]}
            selectedKeys={[selectedId]}
            style={{ width: '100%' }}
            mode="inline"
            items={items}
        />
    );
};

export default MenuCategory;
