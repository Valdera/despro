import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import DesktopNav from "./desktop/DesktopNavbar";
import MobileNav from "./mobile/MobileNavbar";

const Navbar = () => {
  const { isOpen, onToggle } = useDisclosure();
  const cookies = new Cookies();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(cookies.get("token"));
  }, []);

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Link href="/">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              Logo
            </Text>
          </Link>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        {isLogin ? (
          <Link href={"/login"}>
            <Button
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"sm"}
              fontWeight={600}
              fontFamily={"heading"}
              color={"white"}
              bg={"primary.500"}
              _hover={{
                bg: "primary.400",
              }}
              onClick={() => {
                cookies.remove("token", { path: "/" });
                setIsLogin(false);
              }}
            >
              Log Out
            </Button>
          </Link>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Link href={"/login"}>
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                fontFamily={"heading"}
                variant={"link"}
                className="cursor-pointer"
              >
                Sign In
              </Button>
            </Link>
            <Link href={"/register"}>
              <Button
                display={{ base: "none", md: "inline-flex" }}
                fontSize={"sm"}
                fontWeight={600}
                fontFamily={"heading"}
                color={"white"}
                bg={"secondary.500"}
                _hover={{
                  bg: "secondary.400",
                }}
              >
                Sign Up
              </Button>
            </Link>
          </Stack>
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

export default Navbar;
