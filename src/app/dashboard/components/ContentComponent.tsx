'use client'
import React from 'react';
import { Breadcrumb, Layout, theme } from 'antd';
import { usePathname } from 'next/navigation';
import { authSelector, AuthState } from '@/redux/reducers/authReducer';
import { useSelector } from 'react-redux';

const { Content } = Layout;

interface ContentProps  {
  children : React.ReactNode
}

const ContentComponent: React.FC<ContentProps> = ({children}) => {
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
  const pathname = usePathname();

  
  const breadcrumbItems = pathname
  .split('/')
  .filter((item) => item) 
  .map((item, index) => ({
    title: item.charAt(0).toUpperCase() + item.slice(1), 
    path: `/${item}`,
  }));

  const items = breadcrumbItems.map((item, index) => ({
    title: index === breadcrumbItems.length - 1 ? (
      item.title 
    ) : (
      <a href={item.path}>{item.title}</a> 
    ),
  }));

  return (
    
    <Content style={{ margin: '0 16px'  }}>

      <Breadcrumb style={{ margin: '16px 0' }} items={items} />

      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
          height:'100vh'
        }}
      >
        {children}
      </div>
    </Content>
  );
};

export default ContentComponent;
