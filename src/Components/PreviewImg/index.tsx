import {
  Box,
  FormHelperText,
  IconButton,
  InputLabel,
  Paper,
  Typography,
  TypographyProps,
} from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
//@ts-ignore
import docImg from "../../assets/documentImage.png";
import { truncateFileName } from "../../utils";

interface IPreview extends TypographyProps {}
const index = (props: IPreview) => {
  const { sx, ref, ...rest } = props;
  return (
    <Typography
      {...rest}
      component={"img"}
      sx={{
        objectFit: "contain",
        height: "100%",
        width: "100%",
        ...sx,
      }}
    />
  );
};

export default index;

export const ListImagePreview = ({
  handleRemoveFile,
  fileName,
  msg,
  label
}: {
  handleRemoveFile: () => void;
  fileName: string;
  msg: string;
  label?: string;
}) => {
  return (
    <Box mb={"1rem"}>
      <InputLabel
        sx={{
          textTransform: "uppercase",
          fontSize: "0.875rem",
          mb: "0.2rem",
          visibility: label ? 'visible' : "hidden",
        }}
      >
        {label}
      </InputLabel>
      <Paper
        sx={{
          backgroundColor: "rgba(0,0,0,0.05)",
          padding: "09px 05px",
          position: "relative",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
        elevation={0}
      >
        <img
          src={docImg}
          style={{ width: "auto", height: "25px" }}
          alt="docImg"
        />
        <Typography flex={"1"} fontSize={"0.875rem"}>
          {truncateFileName(fileName)}
        </Typography>
        <IconButton
          sx={{ position: "absolute", top: "0rem", right: "0rem" }}
          onClick={handleRemoveFile}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </Paper>
      <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>{msg}</FormHelperText>
    </Box>
  );
};
