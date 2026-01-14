import { styled } from "@linaria/react";
import { useState } from "react";
import { cssFluidClamp, themeToken } from "../../../design/styling/theme/theme";
import { css } from "@linaria/core";
import { NavLink, Outlet, useLocation } from "react-router";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import HomeIcon from "../../../assets/home.svg?react";
import ProductsSvgIcon from "../../../assets/products.svg?react";
import { navLinkFactory } from "../../../lib/navigation/nav-links";
import { UserProfileAvatar } from "../user/profile-avatar";

const VIEWPORT_WIDTH_BREAKPOINT = 768;

const ToggleButton = styled.button`
  display: none;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  padding: 0;
  background-color: ${themeToken("palette-surfaces-sidebar")};
  border: 1px solid ${themeToken("palette-borders-secondary")};
  border-radius: 4px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  color: ${themeToken("palette-text-accent")};
  font-size: 20px;

  @media (max-width: ${VIEWPORT_WIDTH_BREAKPOINT}px) {
    display: flex;
    margin-left: auto;
  }
`;

const SideBar = styled.div`
  background-color: ${themeToken("palette-surfaces-sidebar")};
  flex: 0.13 0 auto;
  padding: 16px;
  position: sticky;
  height: 100vh;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  transition: width 0.3s ease, margin-left 0.3s ease;

  @media (max-width: ${VIEWPORT_WIDTH_BREAKPOINT}px) {
    position: fixed;
    left: 0;
    height: 100vh;
    width: 280px;
    z-index: 20;
    isolation: isolate;
    flex: none;

    &[data-collapsed="true"] {
      margin-left: -100%;

      ${ToggleButton} {
        position: fixed;
        left: 16px;
        right: unset;
      }
    }
  }
`;

const Overlay = styled.div`
  display: none;

  @media (max-width: ${VIEWPORT_WIDTH_BREAKPOINT}px) {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${themeToken("palette-backgrounds-overlay-dark-50")};
    z-index: 10;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;

    &[data-visible="true"] {
      opacity: 1;
      pointer-events: auto;
    }
  }
`;

const E = styled.span`
  width: ${cssFluidClamp(26, 32)};
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeToken("palette-surfaces-primary-inverted")};
  font-size: ${cssFluidClamp(16, 20)};
  font-weight: 700;
  text-align: center;
  color: ${themeToken("palette-text-primary")};
  border-radius: 4px;
`;
const NavLinkWrapper = styled(NavigationMenu.Link)`
  padding: 10px 12px;
  display: flex;
  align-items: center;
  gap: 12px;

  color: ${themeToken("palette-text-tertiary-inverted")};
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  &:hover {
    background-color: ${themeToken("palette-backgrounds-overlay-accent-10")};
  }

  &[data-active] {
    background-color: ${themeToken("palette-backgrounds-overlay-accent-10")};
    border-right: 2px solid ${themeToken("palette-borders-accent")};
    color: ${themeToken("palette-text-accent")};
  }
`;

const NavSideBar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Overlay data-visible={isOpen} onClick={handleClose} />
      <SideBar
        data-collapsed={!isOpen}
        className={css`
          @media (max-width: ${VIEWPORT_WIDTH_BREAKPOINT}px) {
            top: 0;
          }
        `}
      >
        <ToggleButton onClick={() => setIsOpen((oldVal) => !oldVal)}>
          {isOpen ? "✕" : "☰"}
        </ToggleButton>
        <header
          className={css`
            display: flex;
            gap: 8px;
            align-items: flex-start;
          `}
        >
          <E>E</E>
          <div>
            <h3
              className={css`
                font-weight: 700;
              `}
            >
              E-Shop
            </h3>
            <span
              className={css`
                font-size: 12px;
                font-weight: 400;
                color: ${themeToken("palette-text-tertiary-inverted")};
              `}
            >
              Admin panel
            </span>
          </div>
        </header>
        <NavigationMenu.Root
          orientation="vertical"
          className={css`
            margin-block-start: ${themeToken("spacing-xm")};
          `}
        >
          <NavigationMenu.List
            className={css`
              display: flex;
              flex-direction: column;
              gap: 8px;
              list-style: none;
            `}
          >
            <NavigationMenu.Item>
              <NavLinkWrapper
                active={location.pathname === navLinkFactory.home}
                asChild
              >
                <NavLink to={navLinkFactory.home} onClick={handleClose}>
                  <HomeIcon />
                  <span>Home</span>
                </NavLink>
              </NavLinkWrapper>
            </NavigationMenu.Item>

            <NavigationMenu.Item>
              <NavLinkWrapper
                active={location.pathname === navLinkFactory.products}
                asChild
              >
                <NavLink to={navLinkFactory.products} onClick={handleClose}>
                  <ProductsSvgIcon />
                  <span>Products</span>
                </NavLink>
              </NavLinkWrapper>
            </NavigationMenu.Item>
          </NavigationMenu.List>

          <NavigationMenu.Viewport />
        </NavigationMenu.Root>
        <footer
          className={css`
            margin-top: auto;
            border-top: 1px solid ${themeToken("palette-borders-secondary")};
            padding-block-start: 16px;
          `}
        >
          <UserProfileAvatar />
        </footer>
      </SideBar>
    </>
  );
};

const Layout = {
  FlexRoot: styled.div`
    display: flex;
    height: 100%;
    align-items: stretch;
  `,
};

const LayoutWithLeftNavBar = () => {
  return (
    <Layout.FlexRoot>
      <NavSideBar />
      <div
        className={css`
          flex: 1;
          overflow: auto;
          @media (max-width: ${VIEWPORT_WIDTH_BREAKPOINT}px) {
            margin-left: 0;
            margin-top: 50PX;
          }
        `}
      >
        <Outlet />
      </div>
    </Layout.FlexRoot>
  );
};

export default LayoutWithLeftNavBar;
