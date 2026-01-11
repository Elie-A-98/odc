import React from "react";
import type { protectedFetch } from "./fetch-utils";

type ContextVal = {
  protectedFetch: typeof protectedFetch;
};

export const FetchContext = React.createContext<ContextVal | null>(null);

export const useFetch = () => {
    const ctx = React.useContext(FetchContext);
    if(ctx == null){
        throw new Error('useFetch must be called within a FetchProvider')
    }

    return ctx;
};