import type { ErrorResponse } from "./handlers";

/**
 * TODO: remove this and add axios if i have time
 * @returns a wrapper around the fetch api that unauthenticates the user on 401
 */
export const wrappedFetch = async (url: string, options?: RequestInit) => {
  try {
    const res = await fetch(url, { ...options, credentials: "include" });
    if (res.status === 401) {
      const errRes = (await res.json()) as ErrorResponse;
      throw { error: errRes.error ?? "Something went wrong" };
    }

    if (res.status / 100 !== 2) {
      /**
       *  if the response is not in the 200 - 300 range
       *  axios can do this automatically
       */
      throw { error: "Something went wrong" };
    }
    return res;
  } catch (error) {
    // Handle network error
    if (error && typeof error === "object" && "error" in error) {
      throw error;
    }
    throw { error: "Network error. Please check your connection." };
  }
};
