import { Stack, Progress, Box, Button, Icon, Image } from "@chakra-ui/react";
import { css } from "@emotion/react";
import React, { useContext } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import TweetContext from "../../context/TweetContext";

const ProgressBar = () => {
  const { progress, url, setUrl } = useContext(TweetContext);

  return (
    <>
      {progress < 100 && progress > 0 ? (
        <Stack>
          <Progress size="md" value={progress} colorScheme="primary" />
        </Stack>
      ) : (
        url && (
          <Stack
            direction="row"
            w="100%"
            bgColor="blackAlpha.200"
            h="200px"
            justify="center"
            p={2}
            align="center"
          >
            <Box pos="relative" w="40%">
              <Button
                pos="absolute"
                variant="unstyled"
                onClick={() => setUrl("")}
                top={0}
                right={0}
                css={css`
                  &:hover {
                    svg {
                      color: lightgray;
                    }
                  }
                  &:focus {
                    box-shadow: none;
                    svg {
                      color: gray;
                    }
                  }
                `}
              >
                <Icon h={8} w={8} as={IoCloseCircleOutline} />
              </Button>
              <Image
                src={url}
                alt="image"
                w="150px"
                h="150px"
                objectFit="cover"
              />
            </Box>
          </Stack>
        )
      )}
    </>
  );
};

export default ProgressBar;
