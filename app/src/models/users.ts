import { z } from "zod";

const BasicDataSchema = z.object({
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  total_results: z.number(),
  total_pages: z.number(),
});

export const UserSchema = z.object({
  id: z.number(),
  email: z.string(),
  username: z.string(),
  image: z.string().nullable().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  full_name: z.string().optional(),
  is_admin: z.boolean(),
});

export const UserSchemaWithData = BasicDataSchema.extend({
  results: z.array(UserSchema),
});
export const UserSchemaWithToken = UserSchema.extend({
  access: z.string(),
  refresh: z.string(),
  refreshedtoken: z.string(),
});

export type UserToken = z.infer<typeof UserSchemaWithToken>;
export type User = z.infer<typeof UserSchema>;

export type UsersResults = z.infer<typeof UserSchemaWithData>;
