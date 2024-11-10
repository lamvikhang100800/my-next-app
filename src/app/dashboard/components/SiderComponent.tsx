'use client'
import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps, message, notification, Typography } from 'antd';
import { PieChartOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addAuthori, authoriSelector, AuthoriState } from '@/redux/reducers/authouziReducer';
import handelAPI from '@/apis/handelAPI';
import { useRouter } from 'next/navigation';
import { permission } from 'process';

const { Sider } = Layout;
const { Text } = Typography;


const items = [
  {
    key: 'dashboard',
    icon: <PieChartOutlined />,
    label: 'Role & Permission',
    link: '/dashboard/role-and-permission',
    permission_name: 'read-auth',
  },
  {
    key: 'page-1',
    icon: <UserOutlined />,
    label: 'User',
    link: '/dashboard/user',
    permission_name: 'read-user',
  },
  {
    key: 'page-2',
    icon: <TeamOutlined />,
    label: 'Page 2',
    link: '/dashboard',
    permission_name: 'read-staff',
  },
];

const StyledSider = styled(Sider)`
   background-color: #001529; 

  .ant-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.2) !important; 
    color: #1890ff !important; 
    font-size: 18px !important;
  }

  .ant-menu-item-selected {
    background-color: rgba(255, 255, 255, 0.1); 
    color: #1890ff; 
    font-size: 18px;
  }

  .ant-menu-item-selected .anticon {
    color: #1890ff !important; 
    font-size: 18px !important; 
  }

  .ant-menu-item .anticon {
    color: #ffffff; 
  }

  .ant-menu-item:hover .anticon {
    color: #1890ff !important; 
    font-size: 18px !important;
  }

  .ant-menu-item a {
    color: inherit; 
    text-decoration: none; 
  }
`;

const SiderComponent = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleCollapse = (value: boolean) => {
    setCollapsed(value);
  };


  const fetchAuthorization = async () => {
    try {
      const authori = await handelAPI('api/authoriz/check-permission', null, 'post');
      if (authori.data) {
        dispatch(addAuthori(authori.data));

      }

    } catch (error) {
      console.error("Error fetching authorization:", error);
    }
  };


  const permission = useSelector(authoriSelector);
  const handleMenuClick = async (link: string, permission_name: string) => {
    await fetchAuthorization();

    const permissionExists = permission.some(permission => permission.name === permission_name);
    if (permissionExists) {
      router.push(link);
    } else {
      notification.error({
        message: 'Module Not Found',
        description: 'You do not have access to this page.',
        duration: 3,
        placement: 'top'
      });
    }
  };

  useEffect(() => {
    fetchAuthorization();
  }, []);

  return (
    <StyledSider collapsible collapsed={collapsed} onCollapse={handleCollapse}>
      <div className="m-3 container">
        <Text style={{ color: 'white', fontSize: '24px', width: '100%' }}>
          {!collapsed ? ('CMS SITE') : ('LK')}
        </Text>
      </div>
      <div className="demo-logo-vertical" />
      <Menu theme='dark' mode="inline" items={items.map(item => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        onClick: () => handleMenuClick(item.link, item.permission_name),
      }))} />
    </StyledSider>
  );
};

export default SiderComponent;
