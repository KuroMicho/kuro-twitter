import {
  Stack,
  Avatar,
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  Text,
  Image,
  useDisclosure,
  Divider,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Link,
} from "@chakra-ui/react";
import { formatDistance, subDays } from "date-fns";
import { css } from "@emotion/react";
import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FaEllipsisH } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import TweetContext from "../context/TweetContext";
import EditModal from "./EditModal";
import useDecoration from "../hooks/useDecoration";
import TweetIcons from "./TweetIcons";

const shadow = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 0.8,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "backOut",
    },
    transitionEnd: { display: "none" },
  },
};

interface TweetState {
  id: string;
  author: string;
  content: string;
  likes?: string[];
  shares?: string[];
  comments?: {}[];
  publish_date: Date;
  image?: any;
}

interface TweetProp {
  tweet: TweetState;
}

const Tweet = ({ tweet }: TweetProp) => {
  const history = useHistory();
  const { tweetHover } = useDecoration();
  const { handleDelete, isLoading } = useContext(TweetContext);
  const [tweetId, setTweetId] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleTweet = () => {
    history.push(`/tweet/${tweet.id}/`);
  };

  return (
    <Stack
      px={3}
      transition=".2s"
      key={tweet.id}
      borderTop="1px solid gray"
      borderBottom="1px solid gray"
      _hover={{ bgColor: tweetHover }}
      cursor="pointer"
    >
      {isLoading ? (
        <Stack
          as={motion.div}
          animate="show"
          initial="hidden"
          exit="hidden"
          divider={<Divider />}
          _first={{ mt: 0 }}
          variants={shadow}
        >
          <Stack direction="row">
            <SkeletonCircle size="10" />
            <Skeleton>{tweet?.author}</Skeleton>
          </Stack>
          <SkeletonText noOfLines={3} spacing={4} />
        </Stack>
      ) : (
        <Stack
          direction="row"
          align="top"
          mt={3}
          spacing={6}
          onClick={handleTweet}
          transition="all 0.2s"
        >
          <Avatar src="" name="Kuro Micho" _hover={{ bgColor: "lightgray" }} />
          <Stack w="100%">
            <Stack direction="row" align="baseline" justify="space-between">
              <Stack directon="row" spacing={1} w="100%">
                <Text
                  fontWeight="bold"
                  css={css`
                    span {
                      margin-left: 10px;
                      font-weight: normal;
                      font-size: 14px;
                    }
                  `}
                >
                  {tweet.author}
                  <span>
                    {formatDistance(
                      subDays(new Date(tweet.publish_date), 0),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </span>
                </Text>
              </Stack>
              <Menu>
                <MenuButton
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                  }}
                  aria-label="options"
                  as={IconButton}
                  icon={<FaEllipsisH />}
                  variant="unstyled"
                  css={css`
                    & {
                      display: flex;
                      justify-content: center;
                    }

                    &:hover,
                    &:focus {
                      box-shadow: none;
                      background-color: #1da1f220;
                      border-radius: 50%;
                      color: var(--chakra-colors-primary-500);
                    }
                  `}
                />
                <EditModal
                  isOpen={isOpen}
                  onClose={onClose}
                  tweetId={tweetId}
                />

                <MenuList
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      onOpen();
                      setTweetId(tweet.id);
                    }}
                    icon={<BiEdit color="#00AAE4" />}
                  >
                    Edit
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDelete(tweet.id)}
                    icon={<RiDeleteBinLine color="coral" />}
                  >
                    Delete
                  </MenuItem>
                  <MenuItem
                    isExternal
                    as={Link}
                    css={css`
                      &:hover {
                        box-shadow: none;
                        text-decoration: none;
                      }
                    `}
                    href="https://github.com/kuromicho"
                    icon={<FiExternalLink />}
                  >
                    @KuroMicho
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>

            <Stack spacing={1} align="left" justify="center">
              <Text>{tweet.content}</Text>
              {tweet.image && (
                <Stack
                  align="center"
                  h="300px"
                  w="100%"
                  onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                    e.stopPropagation();
                  }}
                >
                  <Image
                    src={tweet.image}
                    alt="image"
                    h="100%"
                    w="100%"
                    objectFit="cover"
                    borderRadius="lg"
                  />
                </Stack>
              )}
            </Stack>
            <TweetIcons tweet={tweet} />
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Tweet;
