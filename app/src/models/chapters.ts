import { z } from "zod";

const BasicDataSchema = z.object({
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  total_results: z.number(),
  total_pages: z.number(),
});

export const ChapterSchema = z.object({
  name: z.string(),
  title: z.string().nullable().optional(),
  slug: z.string(),
  link: z.string(),
  numimages: z.number(),
  updated_at: z.string(),

  has_images: z.boolean(),

  images: z.array(
    z.object({
      link: z.string(),
      image: z.string().nullable().optional(),
      status: z.string().nullable().optional(),
      checksum: z.string().nullable().optional(),
      comic: z.number(),
      blurredDataUrl: z.string().nullable().optional(),
    })
  ),
  comic: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    rating: z.string(),
    numchapters: z.number(),
    numimages: z.number(),
    images: z.array(
      z.object({
        link: z.string(),
        image: z.string().nullable().optional(),
        status: z.string().nullable().optional(),
        checksum: z.string().nullable().optional(),
        comic: z.number(),
        blurredDataUrl: z.string().nullable().optional(),
      })
    ),
    updated_at: z.string(),
    serialization: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    link: z.string(),
    has_images: z.boolean(),
    has_chapters: z.boolean(),
    first_chapter: z.object({
      name: z.string(),
      slug: z.string(),
      title: z.string().nullable().optional(),
      link: z.string(),
      numimages: z.number(),
      updated_at: z.string(),
    }),
    last_chapter: z.object({
      name: z.string(),
      title: z.string().nullable().optional(),
      slug: z.string(),
      link: z.string(),
      numimages: z.number(),
      updated_at: z.string(),
    }),
    related_series: z.array(
      z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string(),
        rating: z.string(),
        numchapters: z.number(),
        numimages: z.number(),
        updated_at: z.string(),
        serialization: z.string().optional(),
        status: z.string().optional(),
        link: z.string(),
        images: z.array(
          z.object({
            link: z.string(),
            image: z.string().nullable().optional(),
            status: z.string().nullable().optional(),
            checksum: z.string().nullable().optional(),
            comic: z.number(),
            blurredDataUrl: z.string().nullable().optional(),
          })
        ),
        first_chapter: z.object({
          name: z.string(),
          slug: z.string(),
          title: z.string().nullable().optional(),
          link: z.string(),
          numimages: z.number(),
          updated_at: z.string(),
        }),
        last_chapter: z.object({
          name: z.string(),
          title: z.string().nullable().optional(),
          slug: z.string(),
          link: z.string(),
          numimages: z.number(),
          updated_at: z.string(),
        }),
      })
    ),
  }),
});

export const ChapterSchemaWithData = BasicDataSchema.extend({
  results: z.array(ChapterSchema),
});

export type Chapter = z.infer<typeof ChapterSchema>;

export type ChaptersResults = z.infer<typeof ChapterSchemaWithData>;
