'use client';
import React from 'react';
import { Avatar, Button, Dropdown, Input, Layout, Menu, MenuProps, Space } from 'antd';
import { NotificationOutlined, ProfileTwoTone, RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useDispatch, UseDispatch } from 'react-redux';
import { clearAuth } from '@/redux/reducers/authReducer';
import { useRouter } from 'next/navigation';
import { clearAuthori } from '@/redux/reducers/authouziReducer';

const { Header } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const HeaderComponent: React.FC = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
   
    dispatch(clearAuth());
    dispatch(clearAuthori());
    router.refresh();
  };
  
  const items: MenuItem[] = [
    {
      key: 'dashboard',
      icon: <ProfileTwoTone />,
      label: <Link href={'/auth/login'}>Dashboard</Link>,
    },
    {
      key: 'logout',
      icon: <RollbackOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];
  
  return (
    <Header className='px-2 bg-white row d-flex'>   
      <div className="col ml-2">
        <Input
          placeholder="Tìm kiếm..."
          prefix={<SearchOutlined className='text-muted' />}
          style={{ width: '50%' }}
        />
      </div>
      <div className="col text-right" style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Space>
          <Button
            icon={<NotificationOutlined />}
          />
          <Dropdown menu={{ items }} trigger={['click']}>
            <Avatar size={40} src="https://via.placeholder.com/150" />
          </Dropdown>
        </Space>
      </div>  
    </Header>
  );
};

export default HeaderComponent;
