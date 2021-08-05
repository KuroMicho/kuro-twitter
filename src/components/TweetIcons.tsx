import { Stack, Icon, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React from "react";
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai";
import { FiShare } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import useDecoration from "../hooks/useDecoration";

interface Tweet {
  id: string;
  author: string;
  content: string;
  likes?: string[];
  shares?: string[];
  comments?: {}[];
  image?: any;
}

interface TweetProp {
  tweet: Tweet;
}
const TweetIcons = ({ tweet }: TweetProp) => {
  const { colorMode } = useDecoration();

  return (
    <Stack direction="row" align="center" spacing="80px" py={2}>
      <Stack
        direction="row"
        spacing={2}
        css={css`
          &:hover {
            svg,
            p {
              transition: all 0.2s;
            }

            svg {
              color: var(--chakra-colors-primary-200);
              border-radius: 50%;
              background-color: ${colorMode === "dark"
                ? "var(--chakra-colors-primary-900)"
                : "var(--chakra-colors-primary-500)"};
              box-shadow: 0 0 0 6px
                ${colorMode === "dark"
                  ? "var(--chakra-colors-primary-900)"
                  : "var(--chakra-colors-primary-500)"};
            }

            p {
              color: var(--chakra-colors-primary-200);
            }
          }
        `}
      >
        <Icon as={IoChatbubbleOutline} h={5} w={5} />
        <Text fontSize="14px" lineHeight="normal">
          {tweet?.comments?.length}
        </Text>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        css={css`
          &:hover {
            svg,
            p {
              transition: all 0.2s;
            }

            svg {
              color: var(--chakra-colors-green-200);
              border-radius: 50%;
              background-color: ${colorMode === "dark"
                ? "var(--chakra-colors-green-700)"
                : "var(--chakra-colors-green-700)"};
              box-shadow: 0 0 0 6px
                ${colorMode === "dark"
                  ? "var(--chakra-colors-green-700)"
                  : "var(--chakra-colors-green-700)"};
            }

            p {
              color: var(--chakra-colors-green-200);
            }
          }
        `}
      >
        <Icon as={AiOutlineRetweet} h={5} w={5} />
        <Text fontSize="14px" lineHeight="normal">
          {tweet?.shares?.length}
        </Text>
      </Stack>
      <Stack
        direction="row"
        spacing={2}
        css={css`
          &:hover {
            svg,
            p {
              transition: all 0.2s;
            }

            svg {
              border-radius: 50%;
              color: var(--chakra-colors-red-200);
              background-color: ${colorMode === "dark"
                ? "var(--chakra-colors-red-700)"
                : "var(--chakra-colors-red-700)"};
              box-shadow: 0 0 0 6px
                ${colorMode === "dark"
                  ? "var(--chakra-colors-red-700)"
                  : "var(--chakra-colors-red-700)"};
            }

            p {
              color: var(--chakra-colors-red-200);
            }
          }
        `}
      >
        <Icon as={AiOutlineHeart} h={5} w={5} />
        <Text fontSize="14px" lineHeight="normal">
          {tweet?.likes?.length}
        </Text>
      </Stack>
      <Stack
        direction="row"
        transition=".15s"
        css={css`
          &:hover {
            svg {
              color: var(--chakra-colors-primary-200);
              transition: all 0.2s;
              border-radius: 50%;
              background-color: ${colorMode === "dark"
                ? "var(--chakra-colors-primary-900)"
                : "var(--chakra-colors-primary-500)"};
              box-shadow: 0 0 0 6px
                ${colorMode === "dark"
                  ? "var(--chakra-colors-primary-900)"
                  : "var(--chakra-colors-primary-500)"};
            }
          }
        `}
      >
        <Icon as={FiShare} h={5} w={5} />
      </Stack>
    </Stack>
  );
};

export default TweetIcons;
