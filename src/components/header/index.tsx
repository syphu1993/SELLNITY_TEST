'use client';

import { logout } from '@/features/auth/authService';
import { removeToken } from '@/features/auth/authSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu } from 'antd';
import { useRouter } from 'next/navigation';

const { Header: AntHeader } = Layout;



export default function Header() {
    const dispatch = useAppDispatch();
    const { username } = useAppSelector((state) => state.auth.user) || {};
    const { token } = useAppSelector((state) => state.auth);
    const router = useRouter();

    const handleLoginClick = () => router.push('/login');
    const handleRegisteClick = () => router.push('/register');
    const handleHomeClick = () => router.push('/');
    const handleDashboardClick = () => router.push('/dashboard');

    const handleLogout = () => {
        logout();
        dispatch(removeToken())
        router.push('/login');
    };

    const dropdownMenu = (
        <Menu
            items={[
                {
                    key: 'profile',
                    label: 'Profile',
                    icon: <UserOutlined />,
                    onClick: () => router.push('/profile'),
                },
                {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout',
                    onClick: handleLogout,
                },
            ]}
        />
    );
    return (
        <AntHeader>
            <div className="flex items-center justify-between h-full">
                <div className="text-xl font-bold cursor-pointer" onClick={handleHomeClick}>
                    My App
                </div>
                <Menu
                    mode="horizontal"
                    items={[
                        { key: 'dashboard', label: 'Dashboard' , onClick: handleDashboardClick},
                        { key: 'about', label: 'About' },
                        { key: 'contact', label: 'Contact' },
                    ]}
                />
                <div className="flex gap-2">
                    {!token &&
                        <>
                            <Button type="primary" onClick={handleLoginClick}>
                                Login
                            </Button>
                            <Button type="dashed" onClick={handleRegisteClick}>
                                Sign In
                            </Button>
                        </>
                    }
                    {
                        (token) && <Dropdown overlay={dropdownMenu} trigger={['click']}>
                            <Avatar
                                style={{
                                    backgroundColor: '#fde3cf',
                                    color: '#f56a00',
                                    cursor: 'pointer',
                                }}
                            >
                                {username?.[0]?.toUpperCase() || 'U'}
                            </Avatar>
                        </Dropdown>
                    }
                </div>
            </div>
        </AntHeader>
    );
}
