import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  typographyStyles: {
    flex: 1,
  },
}));

function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography className={classes.typographyStyles}>
          Oshiyell
        </Typography>
        <AccountCircleIcon />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
