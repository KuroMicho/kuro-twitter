import axios from "axios";
import React, { createContext, useCallback, useEffect, useState } from "react";

interface TweetState {
  id: string;
  author: string;
  content: string;
  likes: string[];
  shares: string[];
  comments: {
    id: string;
    image: string;
  }[];
  publish_date: Date;
  image: any;
}

const initialTweet: TweetState[] = [
  {
    id: "1",
    author: "Kuro Micho",
    content: "Hola mundo",
    likes: ["Yato", "Inuyasha"],
    shares: ["id_1"],
    comments: [
      {
        id: "id_1",
        image: "image1",
      },
      {
        id: "id_2",
        image: "image2",
      },
    ],
    image: "https://via.placeholder.com/300x300",
    publish_date: new Date(),
  },
  {
    id: "2",
    author: "Lee Micho",
    content: "Hola Srs",
    likes: ["Yato", "Inuyasha"],
    shares: ["id_1"],
    comments: [
      {
        id: "id_1",
        image: "image1",
      },
      {
        id: "id_2",
        image: "image2",
      },
    ],
    image: "https://via.placeholder.com/300x300",
    publish_date: new Date(),
  },
];

type TweetAddFunction = (object: any) => void;
type TweetDeleteFunction = (id: string) => void;
type TweetUpdateFunction = (object: {}) => void;
type ImageUrlFunction = (url: string) => void;
type ImageProgressFunction = (progress: number) => void;
type HandleImageFunction = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface ContextType {
  tweets: TweetState[];
  handleAdd: TweetAddFunction;
  handleDelete: TweetDeleteFunction;
  handleUpdate: TweetUpdateFunction;
  handleImage: HandleImageFunction;
  setUrl: ImageUrlFunction;
  setProgress: ImageProgressFunction;
  url: string;
  progress: number;
  isLoading: Boolean;
}

const contextValues: ContextType = {
  tweets: [],
  handleAdd() {
    return;
  },
  handleDelete() {
    return;
  },
  handleUpdate() {
    return;
  },
  handleImage() {
    return;
  },
  setUrl() {
    return;
  },
  setProgress() {
    return;
  },
  url: "",
  progress: 0,
  isLoading: false,
};

const getLocalStorage = (key: any, values: any) => {
  const item = localStorage.getItem(key);
  if (item) {
    const data = JSON.parse(item);
    if (data.length > 0) return data;
    return values;
  }
  return values;
};

const setLocalStorage = (key: any, value: TweetState) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e.message);
  }
};

const TweetContext = createContext(contextValues);

const TweetProvider: React.FunctionComponent = ({ children }) => {
  const [tweets, setTweets] = useState(() =>
    getLocalStorage("tweets", initialTweet)
  );
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const handleAdd = (data: any) => {
    setTweets(
      tweets.concat({
        id: String(+new Date()),
        author: "Kuro Micho",
        comments: new Array(Math.floor(Math.random() * 20)).fill("userId"),
        likes: new Array(Math.floor(Math.random() * 20)).fill("userId"),
        shares: new Array(Math.floor(Math.random() * 20)).fill("userId"),
        publish_date: new Date(),
        ...data,
      })
    );
  };

  const handleDelete = (id: string) => {
    const dataChanged = tweets.filter((tweet: TweetState) => tweet.id !== id);
    setTweets(dataChanged);
  };

  const handleUpdate = (obj: any) => {
    // update old tweets
    const isSameContent = tweets.some(
      (tweet: TweetState) => tweet.content === obj.content
    );
    // update new comments
    const isSameComments = tweets.some(
      (tweet: TweetState) => tweet.comments.length === obj.comments.length
    );

    // change data
    if (!isSameContent || !isSameComments) {
      const dataChanged = tweets.filter(
        (tweet: TweetState) => tweet.id !== obj.id
      );
      setTweets(dataChanged.concat(obj));
    }
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!e.target.files) return;

      const file = e.target.files[0];
      const data = new FormData();

      data.append("file", file);
      data.append("upload_preset", "tweet_pr");
      data.append("cloud_name", "db9wyaboy");

      if (process.env.REACT_APP_API_CLOUDINARY) {
        const res = await axios.post(
          process.env.REACT_APP_API_CLOUDINARY,
          data,
          {
            onUploadProgress: (progressEvent: ProgressEvent) => {
              const { loaded, total } = progressEvent;
              let percent = Math.floor((loaded * 100) / total);
              setProgress(percent);
            },
          }
        );
        setUrl(res.data.url);
      }
    } catch (e) {
      console.error(`Error: `, e);
    }
  };

  const innerFunction = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setLocalStorage("tweets", tweets);
    }, 1200);
  }, [tweets]);

  useEffect(() => {
    innerFunction();
  }, [innerFunction]);

  const data = {
    tweets,
    handleAdd,
    handleDelete,
    handleUpdate,
    handleImage,
    url,
    setUrl,
    progress,
    setProgress,
    isLoading,
  };

  return <TweetContext.Provider value={data}>{children}</TweetContext.Provider>;
};

export { TweetProvider };
export default TweetContext;
