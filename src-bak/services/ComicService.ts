// Need to use the React-specific entry point to import createApi
import {BaseService} from "./BaseService";
import { ComicType } from "./types/ComicType";
import {createSlice} from "@reduxjs/toolkit";

interface Pagination {
  // offset: number,
  // limit: number,
  page:number
}

export const ComicsService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getComics: build.query<ComicType[], Pagination>({
      query: (param: Pagination) => `/comics/?page=${param.page}/`,
      // query: (param: Pagination) => `/comics?page=${param.page}&limit=${param.limit}`,
      providesTags: [{type: "Comic", id: "LIST"}]
    }),
    getComic: build.query<ComicType, number>({
      query: (comic_id) => ({
        url: `/comics/${comic_id}`,
      })
    }),
    createComic: build.mutation<ComicType, ComicType>({
      query: (body: ComicType) => ({
        url: `/comics`,
        method: 'POST',
        body
      }),
      invalidatesTags: [{type: "Comic", id: "LIST"}]
    }),
    updateComic: build.mutation<ComicType, Pick<ComicType, 'comic_id'> & Partial<ComicType>>({
      query: ({comic_id, ...body}) => ({
        url: `/comics/${comic_id}`,
        method: 'PATCH',
        body
      }),
      invalidatesTags: [{type: "Comic", id: "LIST"}]
    }),
    deleteComic: build.mutation<void, number>({
      query: (comic_id) => ({
        url: `/comics/${comic_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{type: "Comic", id: "LIST"}],
    }),
  }),
  overrideExisting: true,
})

export const {
  useGetComicsQuery, useGetComicQuery,
  useCreateComicMutation, useDeleteComicMutation, useUpdateComicMutation
} = ComicsService;
