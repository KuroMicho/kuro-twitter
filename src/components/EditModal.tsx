import {
  Modal,
  ModalOverlay,
  Stack,
  Button,
  ModalContent,
  FormControl,
  Input,
  Text,
  FormHelperText,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import TweetContext from "../context/TweetContext";

const EditModal = ({ isOpen, tweetId, onClose }: any) => {
  const [newContent, setNewContent] = useState("");
  const { tweets, handleUpdate } = useContext(TweetContext);
  const tweet = tweets?.find((tweet: any) => tweet.id === tweetId);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    if (tweet === null || tweet === undefined) return;
    const { content, ...data } = tweet;

    onClose();
    setNewContent("");
    handleUpdate({
      ...data,
      content: newContent,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <Stack p={5} spacing={3}>
          <Text fontWeight="bold">Editing Tweet</Text>
          <FormControl as="form" id="email" onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <Text>{tweet?.author}</Text>
              <Input
                type="text"
                pt={2}
                as="textarea"
                value={newContent}
                placeholder={tweet?.content}
                overflowY="hidden"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewContent(e.target.value)
                }
              />
              <FormHelperText>Be creative.</FormHelperText>
            </Stack>
            <Button mt={5} type="submit" variant="solid" colorScheme="primary">
              Update
            </Button>
          </FormControl>
        </Stack>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
