import React, { useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Menu, type MenuProps } from 'antd';
import styles from './Sidebar.module.css';
import type { MenuItem } from '@/api/menu';
import { getMenu } from '@/api/menu';

const Sidebar: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const location = useLocation();
  const selectedKeys = [location.pathname];

  useEffect(() => {
    const fetchMenuData = async () => {
      const mockMenuData = await getMenu();
      setMenuData(mockMenuData);
    };
    fetchMenuData();
  }, []);

  const renderMenuItems = (data: MenuItem[]): MenuProps['items'] => {
    return data.map((item) => {
      const children = item.children ? renderMenuItems(item.children) : undefined;

      return {
        key: item.key,
        label: (
          <NavLink to={item.path}>
            {item.label}
          </NavLink>
        ),
        children,
      };
    });
  };

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.menuContent}>
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={renderMenuItems(menuData)}
          theme="light"
          className={styles.menuItem}
        />
      </div>
    </div>
  );
};

export default Sidebar;