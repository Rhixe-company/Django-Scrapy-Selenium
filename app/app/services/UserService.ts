// Need to use the React-specific entry point to import createApi
import { BaseService } from "@/app/services/BaseService";
import { UserType } from "@/app/services/types/UserType";

interface Pagination {
  page: number;
}

export const UsersService = BaseService.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UserType[], Pagination>({
      query: (param: Pagination) => `/users/?page=${param.page}`,
      providesTags: [{ type: "User", id: "LIST" }],
    }),
    getUser: build.query<UserType, number>({
      query: (_id) => ({
        url: `/users/${_id}`,
      }),
    }),
    createUser: build.mutation<UserType, UserType>({
      query: (body: UserType) => ({
        url: `/users`,
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: build.mutation<
      UserType,
      Pick<UserType, "_id"> & Partial<UserType>
    >({
      query: ({ _id, ...body }) => ({
        url: `/users/${_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    deleteUser: build.mutation<void, number>({
      query: (_id) => ({
        url: `/users/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} = UsersService;
