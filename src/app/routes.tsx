import { Routes, Route, Navigate, Outlet } from "react-router";
import { lazy, Suspense } from "react";
import { navLinkFactory } from "../lib/navigation/nav-links";
import { useAccount } from "../api/account.api";
import { LoadingPage } from "../features/loading/page";

const HomePage = lazy(() => import("../features/home/page"));
const LoginPage = lazy(() => import("../features/login/page"));
const ProductsPage = lazy(
  () => import("../features/products/(all-products)/page")
);
const LayoutWithLeftNavBar = lazy(
  () => import("../features/_shared/surfaces/layout-with-navbar")
);

/**
 * To prevent accessing a strictly public route like '/login' when the user is authenticated
 */
const PublicRoute = () => {
  const { data: user, status } = useAccount();

  if (status === "pending") return <LoadingPage />;
  return user != null || status === "success" ? (
    <Navigate to={navLinkFactory.home} />
  ) : (
    <Outlet />
  );
};

const PrivateRoute = () => {
  const { data: user, status } = useAccount();

  if (status === "pending") return <LoadingPage />;

  return user != null || status === "success" ? (
    <Outlet />
  ) : (
    <Navigate to={navLinkFactory.login} />
  );
};

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route
            path={navLinkFactory.login}
            element={
              <Suspense fallback={<LoadingPage />}>
                <LoginPage />
              </Suspense>
            }
          />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route
            element={
              <Suspense fallback={<LoadingPage />}>
                <LayoutWithLeftNavBar />
              </Suspense>
            }
          >
            <Route
              path={navLinkFactory.home}
              element={
                <Suspense fallback={<LoadingPage />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path={navLinkFactory.products}
              element={
                <Suspense fallback={<LoadingPage />}>
                  <ProductsPage />
                </Suspense>
              }
            />
            {/* <Route path={navLinkFactory.productDetails("{id}")} element={<ProductDetailsPage/>} /> */}
          </Route>
        </Route>
        <Route path="/" element={<Navigate to={navLinkFactory.home} />} />
      </Routes>
    </>
  );
};
