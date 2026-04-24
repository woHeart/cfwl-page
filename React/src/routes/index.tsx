/* eslint-disable react-refresh/only-export-components */

import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// 🔥 全部改为懒加载（核心修改）
const Layout = lazy(() => import("@/layout/index.tsx"));
const Login = lazy(() => import("@/login/Login.tsx"));
const RoleBase = lazy(() => import("@/form/RoleBase.tsx"));
const RoleDet = lazy(() => import("@/form/RoleDet"));
const WeaponBase = lazy(() => import("@/form/WeaponBase.tsx"));
const WeaponDet = lazy(() => import("@/form/WeaponDet"));
const Music = lazy(() => import("@/form/Music"));
const Atlas = lazy(() => import("@/form/Atlas"));
const Video = lazy(() => import("@/form/Video"));
const Banner = lazy(() => import("@/form/Banner"));

// 加载占位符（可自定义为你的loading组件）
const Loading = <div style={{ textAlign: 'center', padding: '50px' }}>加载中...</div>;

const router = createBrowserRouter([
  {
    path: "/",
    // 🔥 Suspense 包裹懒加载组件（必须加）
    Component: () => (
      <Suspense fallback={Loading}>
        <Layout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        Component: () => (
          <Suspense fallback={Loading}>
            <Atlas />
          </Suspense>
        ),
      },
      {
        path: "/music",
        Component: () => (
          <Suspense fallback={Loading}>
            <Music />
          </Suspense>
        ),
      },
      {
        path: "/video",
        Component: () => (
          <Suspense fallback={Loading}>
            <Video />
          </Suspense>
        ),
      },
      {
        path: "/banner",
        Component: () => (
          <Suspense fallback={Loading}>
            <Banner />
          </Suspense>
        ),
      },
      {
        path: "/role/base",
        Component: () => (
          <Suspense fallback={Loading}>
            <RoleBase />
          </Suspense>
        ),
      },
      {
        path: "/role/detail",
        Component: () => (
          <Suspense fallback={Loading}>
            <RoleDet />
          </Suspense>
        ),
      },
      {
        path: "/weapon/base",
        Component: () => (
          <Suspense fallback={Loading}>
            <WeaponBase />
          </Suspense>
        ),
      },
      {
        path: "/weapon/detail",
        Component: () => (
          <Suspense fallback={Loading}>
            <WeaponDet />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: () => (
      <Suspense fallback={Loading}>
        <Login />
      </Suspense>
    ),
  },
]);

export default router;