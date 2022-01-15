import React from "react";
import Typography from "@material-ui/core/Typography";
import styles from "./Timeline.module.scss";
import { PostCardSkeleton } from "Components";

import { AddPostCard, PostCard } from "Containers";

const Timeline = ({ fetchTimelinePosts, techNews, posts }) => {
  return (
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
  );
};

export default Timeline;
