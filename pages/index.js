import React, { useEffect, useState } from "react";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import { Segment } from "semantic-ui-react";
import { parseCookies } from "nookies";
import { NoLists } from "../components/Layout/NoData";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  PlaceHolderPosts,
  EndMessage,
} from "../components/Layout/PlaceHolderGroup";
import cookie from "js-cookie";
import CreateList from "../components/List/CreateList";
import CardList from "../components/List/CardList";

function Index({ user, listsData, errorLoading }) {
  //   const [posts, setPosts] = useState(postsData || []);
  const [lists, setLists] = useState(listsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const [pageNumber, setPageNumber] = useState(2);

  useEffect(() => {
    document.title = `Eubrics | ${user.name.split(" ")[0]}`;
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/lists`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      // alert("Error fetching Lists");
    }
  };

  //   if (posts.length === 0 || errorLoading) return <NoPosts />;

  return (
    <>
      {/* {showToastr && <PostDeleteToastr />} */}
      <Segment>
        <CreateList user={user} setLists={setLists} />
        {/* <CreatePost user={user} setPosts={setPosts} /> */}
        {/* <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<PlaceHolderPosts />}
          endMessage={<EndMessage />}
          dataLength={lists.length}
        >
          {lists.map((post) => (
            <CardList
              key={lists._id}
              list={lists}
              user={user}
              setLists={setLists}
            />
          ))}
        </InfiniteScroll> */}

        {lists.length === 0 || errorLoading ? (
          <NoLists />
        ) : (
          <InfiniteScroll
            hasMore={hasMore}
            next={fetchDataOnScroll}
            loader={<PlaceHolderPosts />}
            endMessage={<EndMessage />}
            dataLength={lists.length}
          >
            {lists.map((list) => (
              <CardList
                listId={list._id}
                list={list}
                user={user}
                setLists={setLists}
              />
            ))}
          </InfiniteScroll>
        )}
      </Segment>
    </>
  );
}

Index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/lists`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 },
    });

    return { listsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;
