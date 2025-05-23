import { z } from "zod";

const BasicDataSchema = z.object({
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  total_results: z.number(),
  total_pages: z.number(),
});

const ComicImageSchema = z.object({
  link: z.string(),
  image: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  checksum: z.string().nullable().optional(),
  comic: z.number(),
});

const ChapterImageSchema = z.object({
  link: z.string(),
  image: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  checksum: z.string().nullable().optional(),
  comic: z.number(),
  chapter: z.number(),
});

export const ChapterSchema = z.object({
  name: z.string(),
  title: z.string().nullable().optional(),
  slug: z.string(),
  link: z.string(),
  numimages: z.number(),
  updated_at: z.string(),
  images: z.array(ChapterImageSchema),
  has_images: z.boolean(),
  comic: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    rating: z.string(),
    numchapters: z.number(),
    numimages: z.number(),
    images: z.array(ComicImageSchema),
    updated_at: z.string(),
    serialization: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    link: z.string(),
    has_images: z.boolean(),
    has_chapters: z.boolean(),
  }),
});

export const ChapterSchemaWithData = BasicDataSchema.extend({
  results: z.array(ChapterSchema),
});

export type Chapter = z.infer<typeof ChapterSchema>;

export type ChaptersResults = z.infer<typeof ChapterSchemaWithData>;
