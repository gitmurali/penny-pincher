import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";
import { signIn, signOut, useSession } from "next-auth/react";

type Props = {};

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginBottom: 64,
  },
  drawer: {
    width: 250,
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header({}: Props) {
  const classes = useStyles();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { data: session, status } = useSession();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setIsDrawerOpen(true)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Penny pincher
          </Typography>
          {session && (
            <div>
              <Tooltip title="Create post">
                <IconButton
                  aria-label="create post"
                  color="inherit"
                  onClick={() => router.push("/create")}
                >
                  <AddIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={() => signOut()}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
          {!session && (
            <>
              <Button variant="outlined" onClick={() => signIn()}>
                Login
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => router.push("/signup")}
              >
                Sign up
              </Button>
            </>
          )}
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List className={classes.drawer}>
              <ListItem
                button
                onClick={() => {
                  router.push("/dashboard");
                  setIsDrawerOpen(false);
                }}
              >
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  router.push("/categories");
                  setIsDrawerOpen(false);
                }}
              >
                <ListItemText primary="Categories" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  router.push("/types");
                  setIsDrawerOpen(false);
                }}
              >
                <ListItemText primary="Types" />
              </ListItem>

              <ListItem
                button
                onClick={() => {
                  router.push("/expenses");
                  setIsDrawerOpen(false);
                }}
              >
                <ListItemText primary="Expenses" />
              </ListItem>
            </List>
          </Drawer>
        </Toolbar>
      </AppBar>
    </div>
  );
}
