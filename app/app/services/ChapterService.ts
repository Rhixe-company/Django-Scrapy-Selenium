// Need to use the React-specific entry point to import createApi
import { BaseService } from "@/app/services/BaseService";
import { ChapterType } from "@/app/services/types/ChapterType";

interface Pagination {
  page: number;
}

export const ChaptersService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getChapters: build.query<ChapterType[], Pagination>({
      query: (param: Pagination) => `/chapters/?page=${param.page}`,
      providesTags: [{ type: "Chapter", id: "LIST" }],
    }),
    getChapter: build.query<ChapterType, string>({
      query: (slug) => ({
        url: `/chapters/${slug}`,
      }),
    }),
    createChapter: build.mutation<ChapterType, ChapterType>({
      query: (body: ChapterType) => ({
        url: `/chapters`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Chapter", id: "LIST" }],
    }),
    updateChapter: build.mutation<
      ChapterType,
      Pick<ChapterType, "slug"> & Partial<ChapterType>
    >({
      query: ({ slug, ...body }) => ({
        url: `/chapters/${slug}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "Chapter", id: "LIST" }],
    }),
    deleteChapter: build.mutation<void, string>({
      query: (slug) => ({
        url: `/chapters/${slug}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Chapter", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetChaptersQuery,
  useGetChapterQuery,
  useCreateChapterMutation,
  useDeleteChapterMutation,
  useUpdateChapterMutation,
} = ChaptersService;
