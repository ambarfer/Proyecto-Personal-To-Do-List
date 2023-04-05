import * as React from "react";

import { useState } from "react";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

import About from "../About/About";
import ToDoListComponent from "../ToDoListComponent";

function TabPanel(props) {
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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabComponent() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ background: "white" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          textColor="inherit"
          indicatorColor="inherit"
        >
          <Tab
            icon={<FormatListBulletedIcon />}
            label="List"
            {...a11yProps(0)}
          />
          <Tab icon={<InfoOutlinedIcon />} label="About" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <ToDoListComponent></ToDoListComponent>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About></About>
      </TabPanel>
    </Box>
  );
}
