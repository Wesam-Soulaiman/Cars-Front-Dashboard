import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const client = new QueryClient();

const ReactQueryProvider = ({ children }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
