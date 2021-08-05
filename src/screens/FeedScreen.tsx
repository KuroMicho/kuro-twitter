import {
  Avatar,
  Box,
  Divider,
  Icon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { WiStars } from "react-icons/wi";

import EditModal from "../components/EditModal";
import AllTweets from "../components/AllTweets";
import useDecoration from "../hooks/useDecoration";
import FormTweet from "../components/Form/FormTweet/FormTweet";

const FeedScreen: React.FunctionComponent = () => {
  const { isOpen, onClose } = useDisclosure();
  const { colorIcons, colorMode } = useDecoration();

  return (
    <Box pt={2} h="100%">
      <EditModal isOpen={isOpen} onClose={onClose} />
      <Stack
        divider={<Divider />}
        borderBottomColor={colorMode === "dark" ? "whiteAlpha.400" : "blue.50"}
        borderBottomWidth="5px"
      >
        <Stack direction="row" align="center" justify="space-between" px={3}>
          <Text fontSize="lg" fontWeight="bold">
            Inicio
          </Text>
          <Box
            px="2px"
            py="2px"
            _hover={{
              bgColor: "#1DA1F220",
              borderRadius: "50%",
            }}
            cursor="pointer"
          >
            <Icon color={colorIcons} as={WiStars} h={8} w={8} />
          </Box>
        </Stack>
        <Stack direction="row" spacing={4} px={3}>
          <Avatar name="Kuro Micho" src="" />
          <Stack w="100%">
            <FormTweet />
          </Stack>
        </Stack>
      </Stack>
      <AllTweets />
    </Box>
  );
};

export default FeedScreen;
