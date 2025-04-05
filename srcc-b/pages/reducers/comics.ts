import { createSlice } from '@reduxjs/toolkit';

interface ComicModal {
    comic_id: string;
    title: string;
    slug: string;
    description: string;
    status: string;
    rating: string;
    serialization: string;
    spider: string;
    link: string;
    updated_at: string;
    has_images: boolean;
    has_chapters: boolean;
    numimages: number;
    numchapters: number;
    category: CategoryModal;
    author: AuthorModal;
    artist: ArtistModal;
    genres: GenreModal[];
    comicimages: ComicimageModal[];
    comicchapters: ChapterModal[];
    // deleteComic: (comic_id: string) => void;
  }

//   interface ComicAddModal {
//     title: string;
//     slug: string;
//     description: string;
//     status: string;
//     rating: string;
//     serialization: string;
//     spider: string;
//     link: string;
//     updated_at: string;
//   }

  interface GenreModal {
    id: number;
    name: string;
  }
  interface CategoryModal {
    id: number;
    name: string;
  }
  interface AuthorModal {
    id: number;
    name: string;
  }
  interface ArtistModal {
    id: number;
    name: string;
  }

  interface ChapterimageModal {
    chapter_image_id: string;
    link: string;
    image: string;
    status: string;
    comic_id: string;
    chapter_id: string;
    // deleteChapterImage: (chapter_image_id: string) => void;
  }
//   interface ChapterimageAddModal {
//     link: string;
//     image: string;
//     status: string;
//     comic_id: string;
//     chapter_id: string;
//   }

  interface ComicimageModal {
    comic_image_id: string;
    link: string;
    image: string;
    status: string;
    comic_id: string;
    // deleteComicImage: (comic_image_id: string) => void;
  }
//   interface ComicimageAddModal {
//     link: string;
//     image: string;
//     status: string;
//     comic_id: string;
//   }

  interface ChapterModal {
    comic_id: string;
    comic_title: string;
    chapter_id: string;
    name: string;
    slug: string;
    title: string;
    spider: string;
    link: string;
    updated_at: string;
    created_at: string;
    has_images: boolean;
    numimages: number;
    chapterimages: ChapterimageModal[];
    // deleteChapter: (chapter_id: string) => void;
  }
//   interface ChapterAddModal {
//     comic_id: string;
//     name: string;
//     slug: string;
//     title: string;
//     spider: string;
//     link: string;
//     updated_at: string;
//   }




interface ComicsState {
    comics: ComicModal[];
  }

  const initialState: ComicsState = {
    comics: [],
  };

  const comicsSlice = createSlice({
    name: 'comics',
    initialState,
    reducers: {
      addComic: (state, action) => {
        state.comics.push(action.payload);
      },
      deleteComic: (state, action) => {
        state.comics = state.comics.filter(comic => comic.comic_id !== action.payload);
      },

    },
  });
export const { addComic, deleteComic } = comicsSlice.actions;
export default comicsSlice.reducer;
