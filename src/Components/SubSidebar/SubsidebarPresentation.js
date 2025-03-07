import React from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import styles from "./SubSidebarStyles";

const SubSidebar = ({ subSidebarItems, SetActiveSubItem, activeSubItem }) => {
  return (
    <Box sx={styles.subSidebar}>
      <List sx={styles.list}>
        {subSidebarItems.map(({ text }) => (
          <ListItem
            button
            key={text}
            onClick={() => SetActiveSubItem(text)}
            sx={styles.subSidebarItem(activeSubItem === text)}
          >
            <ListItemText primary={text} sx={styles.listItemText(activeSubItem === text)} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default SubSidebar;
