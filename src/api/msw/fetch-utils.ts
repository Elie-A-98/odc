import type { ErrorResponse } from "./handlers";
export class ApiError extends Error {
  status?: number;
  constructor(
    _message: string,
    _status?: number
  ) {
    super(_message);
    this.name = "ApiError";
    this.status = _status;
  }
}

export const wrappedFetch = async (
  url: string,
  options?: RequestInit
) => {
  try {
    const res = await fetch(url, {
      ...options,
      credentials: "include",
    });

    if (res.status === 401) {
      const body = (await res.json()) as ErrorResponse;
      throw new ApiError(body.error ?? "Unauthorized", 401);
    }

    if (!res.ok) {
      throw new ApiError("Something went wrong", res.status);
    }

    return res;
  } catch (err) {
    if (err instanceof ApiError) {
      throw err;
    }

    throw new ApiError("Unknown error");
  }
};
