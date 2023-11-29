import * as React from "react";
import Tabs, { TabsProps } from "@mui/material/Tabs";
import Tab, { TabProps } from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const CustomTabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
type TTabProps = TabProps & {
  children: React.ReactNode;
  index: number;
};

type TTabsProps = TabsProps & {
  children: React.ReactNode;
};
export const TabWrapper = (props: TTabProps) => {
  const { sx, index } = props;

  return (
    <Tab
      {...props}
      {...a11yProps(index)}
      key={index}
      disableTouchRipple
      sx={{
        minWidth: "150px",
        "&.Mui-selected": {
          zIndex: 2,
          fontWeight: "bold",
          // color: "white",
        },
        textTransform: "unset",
        ...sx,
      }}
    />
  );
};

export const TabsWrapper = (props: TTabsProps) => {
  const { children, ...rest } = props;

  return (
    <Paper elevation={0} sx={{ padding: "0.6rem", mb: "1rem" }}>
      <Tabs
        {...rest}
        variant="scrollable"
        scrollButtons="auto"
        aria-label={`tabs-${props.value}`}
        TabIndicatorProps={{
          sx: {
            height: "49px",
            borderRadius: "99px",
            backgroundColor: "#e6eef9",
          },
        }}
      >
        {children}
      </Tabs>
    </Paper>
  );
};

export const BasicTabs = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ minWidth: { sm: "640px", lg: "100%", md: "768px" } }}>
      {children}
    </Box>
  );
};
