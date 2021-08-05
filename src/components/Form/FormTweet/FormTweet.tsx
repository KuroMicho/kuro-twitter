import { Formik } from "formik";
import React, { useContext } from "react";

import * as Yup from "yup";
import TweetContext from "../../../context/TweetContext";
import FormTweetField from "./FormTweetField";

const validationSchema = Yup.object({
  content: Yup.string().max(100, "Maximo 100 Caracteres").required(""),
});

interface TweetState {
  id: string;
  author: string;
  content: string;
  likes: string[];
  shares: string[];
  comments: string[];
  image: any;
}

const initialValues: TweetState = {
  id: "",
  author: "",
  content: "",
  likes: [],
  shares: [],
  comments: [],
  image: "",
};

const FormTweet = () => {
  const { handleAdd, setUrl, url } = useContext(TweetContext);

  console.log(url);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const { image, content } = values;
        handleAdd({
          image: url,
          content,
        });
        setUrl("");
        actions.resetForm({
          values: {
            id: "",
            author: "",
            content: "",
            likes: [""],
            shares: [""],
            comments: [""],
            image: "",
          },
        });
        actions.setSubmitting(false);
      }}
    >
      {({ values, isValid, handleSubmit }) => (
        <FormTweetField
          values={values}
          isValid={isValid}
          handleSubmit={handleSubmit}
        />
      )}
    </Formik>
  );
};

export default FormTweet;
