import React from "react";
import { styled } from "@mui/system";

import BarChartIcon from "@mui/icons-material/BarChart";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";

import {
  Toolbar,
  Drawer,
  ListItemText,
  List,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 240;

interface ISidebar {
  children?: JSX.Element | JSX.Element[];
}

export const Sidebar: React.FC<ISidebar> = ({ children }) => {
  return (
    <SidebarWrapper>
      <StyledDrawer variant="permanent">
        <Toolbar />
        <DrawerPaper>
          <List>
            <ListItemButton component={Link} to="/statistics">
              <BarChartIcon color="primary" />
              <ListItemText primary="Statistics" />
            </ListItemButton>
            <ListItemButton component={Link} to="/about">
              <CoronavirusIcon color="primary" />
              <ListItemText primary="About" />
            </ListItemButton>
          </List>
        </DrawerPaper>
      </StyledDrawer>
      <ContentWrapper>{children}</ContentWrapper>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled("div")({
  display: "flex",
});

const StyledDrawer = styled(Drawer)({
  width: drawerWidth,
  flexShrink: 0,
});

const DrawerPaper = styled("div")({
  width: drawerWidth,
});

const ContentWrapper = styled("div")({
  flexGrow: 1,
  padding: "20px",
});
