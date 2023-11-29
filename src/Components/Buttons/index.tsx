import React from "react";
import {
  IconButton,
  IconButtonProps,
  Button,
  ButtonProps,
  Box,
} from "@mui/material";
import * as XLSX from 'xlsx';
import { Edit, Delete, Visibility, Download } from "../MuiIcons";

type TCustomButton = ButtonProps & {
  children: React.ReactNode;
};

interface IExportTable {data: Record<string, any>[], filename: string, text?: string, icon?: any}

export const exportToXLSX = (data: Record<string, any>[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const CustomButton = ({ children, sx, ...rest }: TCustomButton) => {
  return (
    <Button {...rest} sx={{...sx, textTransform: "unset" }}>
      {children}
    </Button>
  );
};

export const ExportTableButton = ({data, filename, text, icon, ...rest}: IExportTable & ButtonProps) => 
  <Box display='flex' justifyContent={'flex-end'}>
    <CustomButton
        {...rest}
        variant="text"
        color="primary"
        startIcon={icon || <Download />}
        onClick={() => exportToXLSX(data, filename || 'Details')}
        
      >
        {text || 'Export Details'}
    </CustomButton>
  </Box>

type TIconButton = IconButtonProps & {
  children: React.JSX.Element;
};
export const CustomIconButton = ({ children, ...rest }: TIconButton) => {
  return <IconButton sx={{borderRadius: '10px'}} {...rest}>{children}</IconButton>;
};

export const EditButton = (props: Omit<TIconButton, "children">) => (
  <CustomIconButton {...props}>
    <Edit />
  </CustomIconButton>
);

export const DeleteButton = (props: Omit<TIconButton, "children">) => (
  <CustomIconButton {...props}>
    <Delete />
  </CustomIconButton>
);
export const ViewButton = (props: Omit<TIconButton, "children">) => (
  <CustomIconButton {...props}>
    <Visibility />
  </CustomIconButton>
);
