import {
  useColorMode,
  useColorModeValue,
  useStyleConfig,
} from "@chakra-ui/react";

const useDecoration = () => {
  const { colorMode } = useColorMode();
  const bgBoxHover = useColorModeValue("primary.100", "#1DA1F220");
  const colorIcons = useColorModeValue(undefined, "primary.500");
  const tweetHover = useColorModeValue("primary.100", "gray.700");
  const logoColor = useColorModeValue("primary.500", "white");
  const bgColorAvatar = useColorModeValue("primary.100", "#1DA1F220");
  const styles = useStyleConfig("customWrapItem");

  return {
    bgBoxHover,
    colorIcons,
    colorMode,
    tweetHover,
    logoColor,
    bgColorAvatar,
    styles,
  };
};

export default useDecoration;
