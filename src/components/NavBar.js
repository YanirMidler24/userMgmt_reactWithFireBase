import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import HomeIcon from "@material-ui/icons/Home";
import { useHistory } from "react-router-dom";
import { useAuthAPI } from "../contextAPI/AuthAPI";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SearchIcon from "@material-ui/icons/Search";
import { useDataAPI } from "../contextAPI/dataAPI";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const history = useHistory();
  const { logout, loginFlagAPI, setLoginFlagAPI } = useAuthAPI();
  const [error, setError] = useState("");
  const { setSearch } = useDataAPI();

  useEffect(() => {
    setLoginFlagAPI(true);
  }, [loginFlagAPI == false]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      setLoginFlagAPI(true);
      history.push("/Login");
    } catch {
      setError("Failed to log out");
      alert(error);
    }
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Todo's Web App <HomeIcon />
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <IconButton
            hidden={loginFlagAPI}
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleLogout}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
