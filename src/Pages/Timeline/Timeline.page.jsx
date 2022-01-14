import React, { useState, useEffect, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./Timeline.module.scss";
import { PostCardSkeleton } from "Components";

import { AddPostCard, PostCard } from "Containers";

import { Layout } from "Layouts";

import { getTimelinePosts, getTechNews } from "queries";

const Timeline = (props) => {
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
    <Layout>
      <div className={styles.timelineGrid}>
        <div>
          <AddPostCard fetchFunction={fetchTimelinePosts} />
          <div>
            {posts ? (
              posts.length == 0 ? (
                <p className={styles.noPosts}>
                  Sorry. There are no posts to show. Follow some people so that
                  their posts come on your timeline
                </p>
              ) : (
                posts.map((post) => (
                  <PostCard
                    post={post}
                    fetchFunction={fetchTimelinePosts}
                    page={"timeline"}
                  />
                ))
              )
            ) : (
              Array(3)
                .fill("-")
                .map(() => <PostCardSkeleton />)
            )}
          </div>
        </div>
        <div>
          <div className={styles.techNewsCard}>
            <Typography variant="h5">Tech News</Typography>
            <ol className={styles.techNewsList}>
              {techNews.map((news) => (
                <li>{news.title}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Timeline;
