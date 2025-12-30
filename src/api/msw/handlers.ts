import { http, HttpResponse, type PathParams } from "msw";
import { productsMock } from "./MOCK_DATA";
export type ErrorResponse = { error: string }; // TODO: This won't be needed after adding axios

export type LoginRequestDto = {
  username: string;
  password: string;
};

export type LoginResponseDto = object;
export type AccountResponseDto = {
  name: string;
};

const sessionKey = "session";
const validSession = "valid-session";

let session: string | null = null;

export type ProductFiltersDto = {
  name?: string;
  sortBy?: "name" | "price" | "-";
  availability?: "inStock" | "arrivingSoon" | "all";
  maxPrice?: number;
  cursor?: string;
  pageSize?: number;
};

export type PaginatedProductsResponseDto = {
  products: typeof productsMock;
  nextCursor: string | null;
  prevCursor: string | null;
  totalPages: number;
  currentPage: number;
};

// TODO: secure cookies on https
const handlers = [
  http.post<PathParams, LoginRequestDto>("/api/login", async (req) => {
    const { username, password } = await req.request.json();
    if (username === "Admin" && password === "123456") {
      session = validSession;
      return HttpResponse.json<LoginResponseDto>(
        {},
        {
          status: 200,
          headers: {
            "Set-Cookie": `${sessionKey}=${session}; Path=/; HttpOnly; SameSite=Strict`,
          },
        }
      );
    }

    session = null;
    return HttpResponse.json<ErrorResponse>(
      {
        error: "Wrong credentials",
      },
      {
        status: 401,
        headers: {
          "Set-Cookie": `${sessionKey}=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict`,
        },
      }
    );
  }),
  http.get<PathParams, LoginRequestDto>("/api/account", (req) => {
    if (req.cookies[sessionKey] === validSession)
      return HttpResponse.json<AccountResponseDto>(
        { name: "John" },
        { status: 200 }
      );

    return HttpResponse.json<ErrorResponse>(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }),
  http.get<PathParams>("/api/products", (req) => {
    if (req.cookies[sessionKey] === validSession)
      return HttpResponse.json<PaginatedProductsResponseDto>(
        {
          products: productsMock,
          nextCursor: null,
          prevCursor: null,
          totalPages: 1,
          currentPage: 1,
        },
        { status: 200 }
      );

    return HttpResponse.json<ErrorResponse>(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }),
  http.post<PathParams, ProductFiltersDto>(
    "/api/products/filter",
    async (req) => {
      if (req.cookies[sessionKey] !== validSession) {
        return HttpResponse.json<ErrorResponse>(
          { error: "Not authenticated" },
          { status: 401 }
        );
      }

      const filters = await req.request.json();
      let filtered = [...productsMock];

      // Filter by name
      if (filters.name && filters.name.trim()) {
        const searchTerm = filters.name.toLowerCase();
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
      }

      // Filter by availability
      if (filters.availability && filters.availability !== "all") {
        if (filters.availability === "inStock") {
          filtered = filtered.filter((p) => p.availability);
        } else if (filters.availability === "arrivingSoon") {
          filtered = filtered.filter((p) => !p.availability);
        }
      }

      // Filter by price range
      if (filters.maxPrice) {
        const { maxPrice } = filters;
        filtered = filtered.filter((p) => p.price <= maxPrice);
      }

      // Sort
      if (filters.sortBy && filters.sortBy !== "-") {
        if (filters.sortBy === "name") {
          filtered.sort((a, b) => a.name.localeCompare(b.name));
        } else if (filters.sortBy === "price") {
          filtered.sort((a, b) => a.price - b.price);
        }
      }

      // Pagination
      const pageSize = filters.pageSize || 12;
      const totalPages = Math.ceil(filtered.length / pageSize);
      
      let currentPage = 1;
      if (filters.cursor) {
        try {
          currentPage = parseInt(atob(filters.cursor), 10);
        } catch {
          currentPage = 1;
        }
      }

      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = filtered.slice(startIndex, endIndex);

      const nextCursor = currentPage < totalPages ? btoa(String(currentPage + 1)) : null;
      const prevCursor = currentPage > 1 ? btoa(String(currentPage - 1)) : null;

      return HttpResponse.json<PaginatedProductsResponseDto>(
        {
          products: paginatedProducts,
          nextCursor,
          prevCursor,
          totalPages,
          currentPage,
        },
        { status: 200 }
      );
    }
  ),
];

export default handlers;
