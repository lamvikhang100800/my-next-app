import React, { useState } from 'react';
import { Layout } from 'antd';
import SiderComponent from './components/SiderComponent';
import HeaderComponent from './components/HeaderComponent';
import ContentComponent from './components/ContentComponent';
import LayoutWrapper from './components/LayoutWraper';



const DashBoardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <LayoutWrapper>
      <Layout style={{ minHeight: '100vh' }}>
        <SiderComponent  />
        <Layout>
          <HeaderComponent />
          <ContentComponent>
            {children} 
          </ContentComponent>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
};

export default DashBoardLayout;
