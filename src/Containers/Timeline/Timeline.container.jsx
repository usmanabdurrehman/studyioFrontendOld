import React, { useState, useEffect, useCallback } from "react";

import { getTimelinePosts, getTechNews } from "queries";

import { Timeline } from "Components";

const TimelineContainer = (props) => {
  const [posts, setPosts] = useState(null);

  const [techNews, setTechNews] = useState([]);

  const fetchTimelinePosts = useCallback(async () => {
    const data = await getTimelinePosts();
    setPosts(data);
  }, [getTimelinePosts, setPosts]);

  let fetchTechNews = useCallback(async () => {
    const { articles } = await getTechNews();
    setTechNews(articles.slice(0, 3));
  }, [getTechNews, setTechNews]);

  useEffect(() => {
    fetchTimelinePosts();
    fetchTechNews();
  }, [fetchTimelinePosts, fetchTechNews]);

  return (
    <Timeline
      fetchTimelinePosts={fetchTimelinePosts}
      techNews={techNews}
      posts={posts}
    />
  );
};

export default TimelineContainer;
