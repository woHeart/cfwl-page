import Header from "@/layout/header/Header.tsx";
import Sidebar from "@/layout/sidebar/Sidebar.tsx";
import { Outlet } from "react-router-dom";
import styles from "./index.module.css"

function Layout() {
    return (
        <>
            <Header />
            <div className={styles.bodyContainer}>
                <Sidebar />
                <div className={styles.outletContainer}>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Layout
