import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

import axios from "axios";
import config from "config/config";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const cookies = new Cookies();

  useEffect(() => {
    if (cookies.get("token")) router.push("/loker");
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, email is required")
        .email("This is not a valid email"),
      password: Yup.string().required("Sorry, password is required"),
    }),
    onSubmit: (values) => {
      axios
        .post(`${config.SERVER_ADDR}/auth/register`, {
          email: values.email,
          password: values.password,
        })
        .then((res) => {
          cookies.set("token", res.data.token);
          router.push("/loker");
        });
    },
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("background")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Dont Have an Account? Lets{" "}
            <span className="text-primary-400">Sign up</span>
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          onSubmit={formik.handleSubmit}
        >
          <Stack spacing={4}>
            <FormControl
              id="email"
              isRequired
              isInvalid={formik.errors.email && formik.touched["email"]}
            >
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={formik.errors.password && formik.touched["password"]}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={formik.handleSubmit}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link href={"/login"}>
                  <span className="text-blue-400 cursor-pointer hover:underline">
                    Login
                  </span>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
