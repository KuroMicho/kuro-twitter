import {
  FormControl,
  Input,
  FormHelperText,
  Stack,
  Icon,
  Divider,
  FormErrorMessage,
  Text,
  Box,
  CircularProgress,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { Form, Field, ErrorMessage } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import React, { useContext } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiWorld } from "react-icons/bi";
import { FaImage } from "react-icons/fa";
import TweetContext from "../../../context/TweetContext";
import useDecoration from "../../../hooks/useDecoration";
import FileIcons from "../FileIcons";
import FileUpload from "../FileUpload";
import ProgressBar from "../ProgressBar";

interface FormikProps {
  values: {
    content: string;
  };
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isValid: boolean;
}

const FormTweetField = ({ values, handleSubmit, isValid }: FormikProps) => {
  const { colorMode, bgBoxHover, colorIcons } = useDecoration();
  const { handleImage } = useContext(TweetContext);

  return (
    <Form onSubmit={handleSubmit}>
      <Field name="content" variant="unstyled">
        {({ field, form }: any) => (
          <FormControl isInvalid={form.errors.name && form.touched.name}>
            <Input
              {...field}
              as="textarea"
              id="content"
              css={css`
                border: none;
                background-color: ${colorMode === "dark"
                  ? "undefined"
                  : "aliceblue"};
                height: 50px;
                padding: 10px 15px;
                ::placeholder {
                  color: ${colorMode === "dark" ? "white" : "black"};
                  font-weight: bold;
                  font-size: 16px;
                }

                &:enabled + div {
                  display: block;
                }
              `}
              placeholder="¿Qué está pasando?"
              overflowY="hidden"
            />
            <FormHelperText display="none">
              <Stack
                _hover={{
                  bgColor: bgBoxHover,
                  borderRadius: "999px",
                }}
                transition=".15s"
                cursor="pointer"
                p="8px"
                w="max-content"
                direction="row"
                align="center"
                color="primary.500"
                fontWeight="bold"
              >
                <Icon h={4} w={4} as={BiWorld} />
                <Text>Cualquier persona puede responder</Text>
              </Stack>
            </FormHelperText>
            <Divider mt={2} />
            <FormErrorMessage>{form.errors.name}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
      <ErrorMessage name="content" component={"div"} />
      <ProgressBar />
      <Stack direction="row" justify="space-between" align="center" py={2}>
        <Stack>
          <Field name="image">
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FileUpload
                  handleImage={(e) => handleImage(e)}
                  field={field}
                  accept={"image/*"}
                >
                  <Box
                    px="10px"
                    py="8px"
                    _hover={{
                      bgColor: bgBoxHover,
                      borderRadius: "50%",
                    }}
                    cursor="pointer"
                  >
                    <Icon color={colorIcons} as={FaImage} h={5} w={5} />
                  </Box>
                </FileUpload>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Stack>
        <FileIcons />
        <Stack
          divider={<Divider orientation="vertical" borderWidth="thin" h={8} />}
          direction="row"
          align="center"
          spacing={2}
        >
          <Stack direction="row">
            {values?.content?.length > 0 && (
              <>
                <CircularProgress
                  value={values?.content?.length}
                  trackColor="gray"
                  size="25px"
                />

                {values?.content?.length >= 90 && (
                  <Text>{values?.content?.length}</Text>
                )}
              </>
            )}
          </Stack>
          <Box as="button">
            <Icon
              as={AiOutlinePlusCircle}
              h={9}
              w={9}
              color="primary.500"
              _hover={{ fill: "primary.700" }}
            />
          </Box>
        </Stack>
        <SubmitButton disabled={!isValid} variant="solid" colorScheme="primary">
          Twittear
        </SubmitButton>
      </Stack>
    </Form>
  );
};

export default FormTweetField;
