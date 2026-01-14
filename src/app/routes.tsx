import { Routes, Route, Navigate, Outlet, useLocation } from "react-router";
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
  return user != null && status === "success" ? (
    <Navigate to={navLinkFactory.home} />
  ) : (
    <Outlet />
  );
};

const PrivateRoute = () => {
  const { data: user, status } = useAccount();

  if (status === "pending") return <LoadingPage />;

  return user != null && status === "success" ? (
    <Outlet />
  ) : (
    <Navigate to={navLinkFactory.login} />
  );
};

export const AppRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<LoadingPage />}>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={navLinkFactory.login} element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<LayoutWithLeftNavBar />}>
            <Route
              element={
                <Suspense key={location.key} fallback={<LoadingPage />}>
                  <Outlet />
                </Suspense>
              }
            >
              <Route
                path={navLinkFactory.home}
                element={<HomePage/>}
              />
              <Route
                path={navLinkFactory.products}
                element={<ProductsPage />}
              />
              {/* <Route path={navLinkFactory.productDetails("{id}")} element={<ProductDetailsPage/>} /> */}
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<Navigate to={navLinkFactory.home} />} />
      </Routes>
    </Suspense>
  );
};
