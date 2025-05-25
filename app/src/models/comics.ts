import { z } from "zod";

const BasicDataSchema = z.object({
  next_page: z.string().nullable().optional(),
  previous_page: z.string().nullable().optional(),
  total_results: z.number(),
  total_pages: z.number(),
});

export const ComicSchema = z.object({
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
  category: z.object({
    name: z.string(),
    id: z.number(),
  }),
  author: z.object({
    name: z.string(),
    id: z.number(),
  }),
  artist: z.object({
    name: z.string(),
    id: z.number(),
  }),
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
  chapters: z.array(
    z.object({
      name: z.string(),
      title: z.string().nullable().optional(),
      slug: z.string(),
      link: z.string(),
      numimages: z.number(),
      updated_at: z.string(),
    })
  ),
  genres: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
    })
  ),
  has_images: z.boolean(),
  has_chapters: z.boolean(),
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
});

export const ComicsSchema = z.array(ComicSchema);

export const ComicSchemaWithData = BasicDataSchema.extend({
  results: z.array(ComicSchema),
});

export const ComicsSelectSchema = z.object({
  allcomics: z.array(ComicSchema),
  weeklycomics: z.array(ComicSchema),
  monthlycomics: z.array(ComicSchema),
});

export type Comic = z.infer<typeof ComicSchema>;
export type Comics = z.infer<typeof ComicsSchema>;
export type ComicsResults = z.infer<typeof ComicSchemaWithData>;

export type ComicsSelect = z.infer<typeof ComicsSelectSchema>;
