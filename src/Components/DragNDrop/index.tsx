import {
  Box,
  Button,
  FormHelperText,
  InputLabel,
  SxProps,
  Typography,
  styled,
} from "@mui/material";
import React, { ComponentPropsWithRef } from "react";
import { DropzoneProps, useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { CustomButton } from "../Buttons";

interface IDragNDrop extends DropzoneProps {
  setFiles: (props: any) => void;
  acceptedFilesExt: string[];
}
const index = (props: IDragNDrop) => {
  const maxFileSize = 1024 * 1000 * 5 ?? props.maxSize;
  const {
    accept = {
      "image/*": [],
    },
    setFiles,
    maxFiles = 1,
    multiple = false,
    acceptedFilesExt,
  } = props;
  const { getRootProps, getInputProps, open } = useDropzone({
    noKeyboard: true,
    accept,
    maxFiles,
    maxSize: maxFileSize,
    multiple,
    onDrop: (acceptedFiles) => {
      const selectedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
          isSupported: !!acceptedFilesExt.includes(file.type),
          isFileSizeExceeded: !!(maxFileSize === file.size),
        })
      );

      setFiles((prev: any) =>
        multiple ? [...prev, ...selectedFiles] : [...selectedFiles]
      );
    },
    onDropRejected: (rejectedFiles) => {
      console.log("Selected files are rejected", { rejectedFiles });
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0,0,0,0.05)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        border: "2px dashed rgba(0,0,0,0.23)",
        padding: "1rem 0px",
        height: "inherit",
      }}
    >
      <div className="container">
        <Box
          {...getRootProps({ className: "dropzone" })}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"1rem"}
          sx={{ cursor: "pointer" }}
        >
          <input {...getInputProps()} />
          <Typography>
            <CloudUploadIcon />
          </Typography>
          <Typography color={"rgba(0,0,0,0.23)"}>
            Drag 'n' drop files here
          </Typography>
        </Box>
      </div>
      <Box
        display={"flex"}
        width={"80%"}
        my={"1rem"}
        gap={"2rem"}
        alignItems={"center"}
      >
        <HorizontalLine /> or <HorizontalLine />
      </Box>
      <CustomButton
        component="label"
        variant="contained"
        color="info"
        onClick={open}
      >
        Upload file
      </CustomButton>
      <center>
        <Typography
          fontSize={"10px"}
          color={"rgba(0,0,0,23)"}
          my={"8px"}
        >{`Maximum file size is ${Math.ceil(
          maxFileSize / (1000 * 1024)
        )} Mb`}</Typography>
      </center>
    </Box>
  );
};

export default index;

const HorizontalLine = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "1px" /* Adjust the height as needed */,
        backgroundColor: "#00000060" /* Line color */,
        margin: "10px 0" /* Margin spacing above and below the line */,
        border: "none",
      }}
    ></Box>
  );
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface IFileUploadButton extends ComponentPropsWithRef<"input"> {
  label: string;
  sx: SxProps;
  btnText?: string;
  acceptedFilesExt: string[];
  setFile: (props: any) => void;
}

export const FileUploadButton = (props: IFileUploadButton) => {
  const { label, sx, btnText, acceptedFilesExt, setFile, ...rest } = props;
  const maxFileSize = 1024 * 1000 * 5;
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];
    if (!file) return;
    Object.assign(file, {
      preview: URL.createObjectURL(file),
      isSupported: !!acceptedFilesExt.includes(file.type),
      isFileSizeExceeded: !!(maxFileSize === file.size),
    });
    console.log({ file });
    // prettier-ignore
    setFile({
      file: file,
      // @ts-ignore
      msg: !file?.isSupported
        ? "Unsupported file"
        // @ts-ignore 
        : file?.isFileSizeExceeded
        ? "Files size exceeded"
        : "",
    });
  };
  return (
    <Box mb={"1rem"}>
      <InputLabel
        sx={{
          textTransform: "uppercase",
          fontSize: "0.875rem",
          mb: "0.2rem",
        }}
      >
        {label}
      </InputLabel>
      <Button
        component="label"
        variant="contained"
        sx={{ py: "8px", boxShadow: "none", ...sx }}
        startIcon={<CloudUploadIcon />}
      >
        {btnText ?? "Upload file"}
        <VisuallyHiddenInput {...rest} type="file" onChange={handleFile} />
      </Button>
    </Box>
  );
};
