import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./Timeline.module.scss";
import { PostCardSkeleton } from "Components";

import { AddPostCard, PostCard } from "Containers";

import { Layout } from "Layouts";

import { getTimelinePosts, getTechNews } from "queries";

const Timeline = (props) => {
  const [posts, setPosts] = useState(null);

  const [techNews, setTechNews] = useState([]);

  const fetchTimelinePosts = async () => {
    const data = await getTimelinePosts();
    setPosts(data);
  };

  let fetchTechNews = async () => {
    const { articles } = await getTechNews();
    setTechNews(articles.slice(0, 3));
  };

  useEffect(() => {
    fetchTimelinePosts();
    fetchTechNews();
  }, []);

  return (
    <Layout>
      <div className={styles.timelineGrid}>
        <div>
          <AddPostCard fetchFunction={fetchTimelinePosts} />
          <div>
            {posts
              ? posts.map((post) => (
                  <PostCard
                    post={post}
                    fetchFunction={fetchTimelinePosts}
                    page={"timeline"}
                  />
                ))
              : Array(3)
                  .fill("-")
                  .map(() => <PostCardSkeleton />)}
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
