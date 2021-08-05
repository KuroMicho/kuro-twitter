import {
  Stack,
  Icon,
  Wrap,
  WrapItem,
  Text,
  Button,
  Avatar,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import {
  FaTwitter,
  FaEllipsisH,
  FaUserAlt,
  FaBell,
  FaHashtag,
  FaHome,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IconType } from "react-icons/lib";
import { Link, useLocation } from "react-router-dom";
import useDecoration from "../hooks/useDecoration";

interface LinksProps {
  href: string;
  name: string;
  inactiveIcon: IconType;
  activeIcon: IconType;
}

const links: LinksProps[] = [
  {
    href: "/",
    name: "Inicio",
    inactiveIcon: FaHome,
    activeIcon: FaHome,
  },
  {
    href: "/explore",
    name: "Explora",
    inactiveIcon: FaHashtag,
    activeIcon: FaHashtag,
  },
  {
    href: "/notifications",
    name: "Notificaciones",
    inactiveIcon: FaBell,
    activeIcon: FaBell,
  },
  {
    href: "/messages",
    name: "Mensajes",
    inactiveIcon: FiMail,
    activeIcon: FiMail,
  },
  {
    href: "/profile",
    name: "Perfil",
    inactiveIcon: FaUserAlt,
    activeIcon: FaUserAlt,
  },
  {
    href: "/options",
    name: "Mas opciones",
    inactiveIcon: FaEllipsisH,
    activeIcon: FaEllipsisH,
  },
];

const Navbar = () => {
  const { toggleColorMode } = useColorMode();
  const { pathname } = useLocation();
  const { logoColor, bgColorAvatar, styles } = useDecoration();

  return (
    <Stack spacing={7} mr={12} py={3} pos="fixed">
      <span>
        <Tooltip
          hasArrow
          label="Change theme mode"
          fontSize="sm"
          placement="bottom"
        >
          <span>
            <Icon
              as={FaTwitter}
              onClick={toggleColorMode}
              w={7}
              h={7}
              color={logoColor}
              ml={2}
              cursor="pointer"
            />
          </span>
        </Tooltip>
      </span>
      <Wrap direction="column" spacing={2}>
        {links.map((link: LinksProps) => (
          <WrapItem key={link.name} sx={styles}>
            <Link to={link.href}>
              <Stack
                direction="row"
                spacing={4}
                align="center"
                color={link.href === pathname ? "primary.500" : "inherit"}
              >
                <Icon
                  as={
                    link.href === pathname ? link.activeIcon : link.inactiveIcon
                  }
                  w={6}
                  h={6}
                />
                <Text fontSize="xl" fontWeight="bold">
                  {link.name}
                </Text>
              </Stack>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
      <Button variant="solid" size="lg" colorScheme="primary">
        Tweet
      </Button>
      <Stack flex={1} direction="row" alignItems="flex-end" justify="center">
        <Stack
          direction="row"
          align="center"
          justify="space-around"
          w="100%"
          p={3}
          borderRadius="3xl"
          cursor="pointer"
          _hover={{
            bgColor: bgColorAvatar,
          }}
        >
          <Stack direction="row" align="center">
            <Avatar name="Kuro Micho" src="" />
            <Text>Kuro Micho</Text>
          </Stack>
          <Icon as={FaEllipsisH} />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Navbar;
