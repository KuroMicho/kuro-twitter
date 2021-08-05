import {
  FormControl,
  Input,
  FormErrorMessage,
  Box,
  Icon,
  Stack,
  Divider,
  CircularProgress,
  Text,
} from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { SubmitButton } from "formik-chakra-ui";
import React, { useContext } from "react";
import { FaImage } from "react-icons/fa";
import TweetContext from "../../../context/TweetContext";
import useDecoration from "../../../hooks/useDecoration";
import FileUpload from "../FileUpload";
import ProgressBar from "../ProgressBar";
import * as Yup from "yup";
import { css } from "@emotion/react";

interface Tweet {
  id: string;
  author: string;
  content: string;
  likes?: string[];
  shares?: string[];
  comments?: {}[];
  image?: any;
}

interface TweetProp {
  tweet: Tweet;
}

const validationSchema = Yup.object({
  comment: Yup.string().max(100, "Maximo 100 Caracteres").required(""),
});

const FormComment = ({ tweet }: TweetProp) => {
  const { handleUpdate, handleImage, url, setUrl } = useContext(TweetContext);
  const { bgBoxHover, colorIcons, colorMode } = useDecoration();

  return (
    <Formik
      initialValues={{
        comment: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const { comments, image, ...rest } = tweet;

        handleUpdate({
          ...rest,
          comments: comments?.concat({ id: values.comment, image: url }),
        });
        actions.resetForm({
          values: {
            comment: "",
          },
        });
        setUrl("");
        actions.setSubmitting(false);
      }}
    >
      {({ handleSubmit, values, isValid }) => (
        <Stack p={2}>
          <Text>
            Respondiendo a
            <Text as="span" color="primary.500">
              {` @${tweet.author}`}
            </Text>
          </Text>
          <Form onSubmit={handleSubmit}>
            <Field name="comment">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <Input
                    id="comment"
                    pt={2}
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
                    as="textarea"
                    overflowY="hidden"
                    variant="unstyled"
                    h={1}
                    {...field}
                    placeholder="Twittea tu respuesta..."
                  />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <ErrorMessage name="comment" component={"div"} />
            <ProgressBar />
            <Stack
              direction="row"
              justify="space-between"
              align="center"
              py={2}
            >
              <Stack flex={1}>
                <Field name="image">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FileUpload
                        handleImage={handleImage}
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
              <Stack
                divider={
                  <Divider orientation="vertical" borderWidth="thin" h={8} />
                }
                direction="row"
                align="center"
                spacing={2}
              >
                <Stack direction="row">
                  {values.comment.length > 0 && (
                    <>
                      <CircularProgress
                        value={values?.comment?.length}
                        trackColor="gray"
                        size="25px"
                      />

                      {values?.comment?.length >= 90 && (
                        <Text>{values?.comment?.length}</Text>
                      )}
                    </>
                  )}
                </Stack>
              </Stack>
              <SubmitButton
                disabled={!isValid}
                variant="solid"
                colorScheme="primary"
              >
                Responder
              </SubmitButton>
            </Stack>
          </Form>
        </Stack>
      )}
    </Formik>
  );
};

export default FormComment;
