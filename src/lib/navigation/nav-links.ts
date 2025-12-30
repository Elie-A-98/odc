/**
 * This creates a navigation link.
 * I created this to centralize link creation outside of react, because links can be dynamic and is usually used outside of the react environment
 */
export const navLinkFactory = {
  login: "/login",
  home: "/home",
  products: "/products",
  productDetails: (productId: string) => `/products/${productId}`,
};