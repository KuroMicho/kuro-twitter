import { Wrap, Box, Icon } from "@chakra-ui/react";
import React from "react";
import { FiCalendar } from "react-icons/fi";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { RiFileGifLine, RiBarChartHorizontalFill } from "react-icons/ri";
import useDecoration from "../../hooks/useDecoration";

const FileIcons = () => {
  const { bgBoxHover, colorIcons } = useDecoration();

  return (
    <Wrap spacing={1} flex={1} ml="-5px">
      <Box
        px="10px"
        py="8px"
        _hover={{
          bgColor: bgBoxHover,
          borderRadius: "50%",
        }}
        cursor="pointer"
      >
        <Icon color={colorIcons} as={RiFileGifLine} h={5} w={5} />
      </Box>
      <Box
        px="10px"
        py="8px"
        _hover={{
          bgColor: bgBoxHover,
          borderRadius: "50%",
        }}
        cursor="pointer"
      >
        <Icon color={colorIcons} as={RiBarChartHorizontalFill} h={5} w={5} />
      </Box>
      <Box
        px="10px"
        py="8px"
        _hover={{
          bgColor: bgBoxHover,
          borderRadius: "50%",
        }}
        cursor="pointer"
      >
        <Icon color={colorIcons} as={HiOutlineEmojiHappy} h={5} w={5} />
      </Box>
      <Box
        px="10px"
        py="8px"
        _hover={{
          bgColor: bgBoxHover,
          borderRadius: "50%",
        }}
        cursor="pointer"
      >
        <Icon color={colorIcons} as={FiCalendar} h={5} w={5} />
      </Box>
    </Wrap>
  );
};

export default FileIcons;
