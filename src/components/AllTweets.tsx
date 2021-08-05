import { AnimatePresence } from "framer-motion";
import React from "react";
import { useContext } from "react";

import TweetContext from "../context/TweetContext";
import Tweet from "./Tweet";

interface TweetState {
  id: string;
  author: string;
  content: string;
  likes: string[];
  shares: string[];
  comments: {}[];
  publish_date: Date;
  image: any;
}

const AllTweets = () => {
  const { tweets } = useContext(TweetContext);

  const sortedTweets: TweetState[] = tweets.sort(
    (a, b): number => parseInt(b.id) - parseInt(a.id)
  );

  return (
    <AnimatePresence>
      {sortedTweets?.map((tweet: TweetState) => (
        <Tweet key={tweet.id} tweet={tweet} />
      ))}
    </AnimatePresence>
  );
};

export default AllTweets;
