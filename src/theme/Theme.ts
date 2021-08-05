import { extendTheme, theme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export default extendTheme({
  styles: {
    global: (props) => ({
      "html,body,#root": {
        color: mode(undefined, "whiteAlpha.800")(props),
        height: "100%",
        bgColor: mode("gray.50", undefined)(props),
      },
    }),
  },
  colors: {
    primary: theme.colors.twitter,
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
      },
      variants: {
        solid: (props) => ({
          bgColor: `${props.colorScheme}.500`,
          color: mode(undefined, "white")(props),
          borderRadius: "3xl",
          _hover: {
            bg: `${props.colorScheme}.600`,
          },
        }),
      },
    },
    Divider: {
      baseStyle: (props) => ({
        bgColor: mode("gray.900", undefined)(props),
      }),
    },
    customWrapItem: {
      baseStyle: ({ colorMode }) => ({
        _hover: {
          bg: colorMode === "dark" ? "#1DA1F220" : "primary.100",
        },
        py: "12px",
        px: "12px",
        borderRadius: "3xl",
      }),
    },
  },
});
