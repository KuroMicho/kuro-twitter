import { Avatar, Icon, Stack, Text } from "@chakra-ui/react";

import React from "react";
import { useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Comments from "../components/Comments";
import FormComment from "../components/Form/FormComment/FormComment";

import Tweet from "../components/Tweet";
import TweetContext from "../context/TweetContext";
import useDecoration from "../hooks/useDecoration";

interface TweetProp {
  id: string;
  author: string;
  content: string;
  likes?: string[];
  shares?: string[];
  comments?: {}[];
  publish_date: Date;
  image?: any;
}

interface Params {
  id: string;
}

const TweetScreen: React.FunctionComponent = () => {
  const { id }: Params = useParams();
  const { tweets } = useContext(TweetContext);
  const { bgBoxHover, colorMode } = useDecoration();

  const tweet: TweetProp | undefined = tweets.find(
    (tweet: TweetProp) => tweet.id === String(id)
  );

  if (!tweet)
    return (
      <Stack direction="row" align="center" spacing={4}>
        <Stack
          py="6px"
          px="8px"
          as={Link}
          to="/"
          ml={5}
          mt={1}
          cursor="pointer"
          w="fit-content"
          _hover={{
            bgColor: bgBoxHover,
            borderRadius: "50%",
          }}
        >
          <Icon as={IoArrowBack} h={5} w={5} color="primary.500" />
        </Stack>
        <Text fontWeight="bold" lineHeight="normal" fontSize="24px">
          Inicio
        </Text>
      </Stack>
    );

  return (
    <Stack w="100%">
      <Tweet key={tweet?.id} tweet={tweet} />
      <Stack
        direction="row"
        w="100%"
        px={3}
        borderBottomColor={colorMode === "dark" ? "whiteAlpha.400" : "blue.50"}
        borderBottomWidth="5px"
      >
        <Avatar name="Ningento" alt="image" />
        <Stack w="100%">
          <FormComment tweet={tweet} />
        </Stack>
      </Stack>
      <Comments />
    </Stack>
  );
};

export default TweetScreen;
