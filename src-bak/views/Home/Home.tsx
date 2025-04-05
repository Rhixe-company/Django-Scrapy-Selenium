import { NextPage } from "next";
import Head from "next/head";
import RightContent from "../../components/index/RightContent";
import LeftContent from "../../components/index/LeftContent";
import { Fragment, useEffect, useState } from "react";
import { useAppDispatch } from "services/hooks";
import { useRouter } from "next/router";
import { ComicType } from "../../services/types/ComicType";
import { getComics } from "../../services/slices/ComicSlice";
import { useGetComicsQuery } from "../../services/ComicService";
const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const {
    data,
    error,
    isLoading: isComicsLoading,
    isSuccess: isComicsQueried,
    isFetching: isComicsFetching,
    isError: isComicsError,
  } = useGetComicsQuery({ page });
  const handleChangePage = (_, nextPage) => {
    setPage(nextPage);
  };
  useEffect(() => {
    dispatch(getComics(page));
  }, [dispatch]);
  return (
    <Fragment>
      <Head>
        <title>Index</title>
      </Head>

      <div className="min[925px]:p-0 relative max-[882px]:p-4 max-[786px]:p-0 lg:my-0">
        <LeftContent />
        <RightContent />
      </div>
    </Fragment>
  );
};

export default Home;
