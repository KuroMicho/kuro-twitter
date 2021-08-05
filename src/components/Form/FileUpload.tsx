import { Input, InputGroup } from "@chakra-ui/react";
import React, { useRef } from "react";

type FileUploadProps = {
  accept?: string;
  children?: React.ReactNode;
  field: any;
  handleImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload = (props: FileUploadProps) => {
  const { accept, children, field, handleImage } = props;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <InputGroup onClick={handleClick}>
      <Input
        ref={inputRef}
        type={"file"}
        {...field}
        id="image"
        hidden
        accept={accept}
        onChange={handleImage}
      />
      {children}
    </InputGroup>
  );
};

export default FileUpload;
