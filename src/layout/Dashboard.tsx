import React from "react";
import { Outlet } from "react-router-dom";

import { Sidebar } from "./Sidebar";
import styles from "./Layout.module.css";

export const Dashboard: React.FC = () => {
  return (
    <div className={styles.root}>
      <Sidebar>
        <main className={styles.main}>
          <Outlet />
        </main>
      </Sidebar>
    </div>
  );
};
