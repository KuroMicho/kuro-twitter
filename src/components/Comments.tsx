import { Avatar, Divider, Stack, Text, Image } from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import TweetContext from "../context/TweetContext";
import TweetIcons from "./TweetIcons";

interface Comment {
  id: string;
  image: string;
}

interface TweetState {
  id: string;
  author: string;
  content: string;
  likes?: string[];
  shares?: string[];
  comments?: Comment[];
  image?: any;
}

interface Params {
  id: string;
}

const Comments = () => {
  const { id }: Params = useParams();
  const { tweets } = useContext(TweetContext);

  const tweet: TweetState | undefined = tweets.find(
    (tweet: TweetState) => tweet.id === String(id)
  );

  if (!tweet) return <p>Back</p>;

  return (
    <Stack
      w="100%"
      divider={<Divider orientation="horizontal" borderWidth="thin" />}
    >
      {tweet.comments?.map((comment: Comment, index: number) => (
        <Stack key={index} px={3}>
          <Stack direction="row" spacing={7}>
            <Avatar name="Visitante" alt="image" />
            <Stack>
              <Text>{tweet.id}</Text>
              <Text fontSize="sm" color="whiteAlpha.500">
                En respuesta a:
              </Text>
              <Text>{comment.id}</Text>
              {comment.image && (
                <Image
                  w="90%"
                  h="80%"
                  objectFit="cover"
                  src={comment.image}
                  alt="image"
                />
              )}
              <Stack>
                <TweetIcons tweet={tweet} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default Comments;
