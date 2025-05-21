import { createApi } from "@reduxjs/toolkit/query/react";
import { BaseServiceQuery } from "./BaseServiceQuery";

export const BaseService = createApi({
  tagTypes: ["User", "Comic", "Chapter"],
  baseQuery: BaseServiceQuery,
  endpoints: () => ({}),
});
