// Need to use the React-specific entry point to import createApi
import { BaseService } from "@/app/services/BaseService";
import { ComicType } from "@/app/services/types/ComicType";

interface Pagination {
  page: number;
}

export const ComicsService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getComics: build.query<ComicType[], Pagination>({
      query: (param: Pagination) => `/comics/?page=${param.page}`,
      providesTags: [{ type: "Comic", id: "LIST" }],
    }),
    getComic: build.query<ComicType, string>({
      query: (slug) => ({
        url: `/comics/${slug}`,
      }),
    }),
    createComic: build.mutation<ComicType, ComicType>({
      query: (body: ComicType) => ({
        url: `/comics`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Comic", id: "LIST" }],
    }),
    updateComic: build.mutation<
      ComicType,
      Pick<ComicType, "slug"> & Partial<ComicType>
    >({
      query: ({ slug, ...body }) => ({
        url: `/comics/${slug}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Comic", id: "LIST" }],
    }),
    deleteComic: build.mutation<void, string>({
      query: (slug) => ({
        url: `/comics/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Comic", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetComicsQuery,
  useGetComicQuery,
  useCreateComicMutation,
  useDeleteComicMutation,
  useUpdateComicMutation,
} = ComicsService;
