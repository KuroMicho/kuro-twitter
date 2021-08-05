import React from "react";
import { Stack, Text, Container } from "@chakra-ui/react";

import Navbar from "../components/Navbar";

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <Container maxWidth="container.xl" alignSelf="center" pb={3}>
      <Stack direction="row">
        <Stack pos="relative" w="20%">
          <Navbar />
        </Stack>
        <Stack w="50%" borderLeft="1px solid gray" borderRight="1px solid gray">
          <Stack>{children}</Stack>
        </Stack>
        <Stack pos="relative" w="30%">
          <Stack direction="row" pos="fixed">
            <Text>Sidebar</Text>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Layout;
