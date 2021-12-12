import React, { useState, useEffect } from "react";
import {
  Toolbar,
  AppBar,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
  useMediaQuery,
  SwipeableDrawer,
  IconButton,
  List,
  ListItem,
  ListItemText
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { makeStyles, useTheme } from "@material-ui/styles";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
}

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "3em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "2em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "1.25em"
    }
  },
  logo: {
    height: "8em",
    [theme.breakpoints.down("md")]: {
      height: "7em"
    },
    [theme.breakpoints.down("xs")]: {
      height: "5.5em"
    }
  },
  logoContainer: {
    padding: 0
  },
  tabContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: "50px",
    marginLeft: "50px",
    marginRight: "25px",
    height: "45px"
  },
  menu: {
    backgroundColor: theme.palette.common.arcBlue,
    color: "white",
    borderRadius: "0px"
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1
    }
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent"
    }
  },
  drawerIcon: {
    width: "50px",
    height: "50px"
  },
  drawer: {
    backgroundColor: theme.palette.common.arcBlue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white"
  },
  drawerItemEstimate: {
    backgroundColor: theme.palette.common.arcOrange
  },
  drawerItemSelected: {
    "& .MuiListItemText-root": {
      opacity: 1
    }
  },
  appBar: {
    zIndex: theme.zIndex.modal + 1
  }
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setOpenMenu(true);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleMenuItemClick = (e, i) => {
    setAnchorEl(null);
    setOpenMenu(false);
    setSelectedIndex(i);
  };

  const menuOptions = [
    { link: "/services", name: "Services" },
    { link: "/softwaredevelopment", name: "Custom Software Development" },
    { link: "/appdevelopment", name: "Mobile App Development" },
    { link: "/websites", name: "websites" }
  ];

  const routes = [
    { link: "/", name: "Home" },
    {
      link: "/services",
      name: "Services",
      ariaOwns: anchorEl ? "simple-menu" : undefined,
      ariaPopup: anchorEl ? "true" : undefined,
      mouseOver: (event) => handleClick(event)
    },
    { link: "/revolution", name: "The Revolution" },
    { link: "/about", name: "About Us" },
    { link: "/contact", name: "Contact Us" }
  ];

  useEffect(() => {
    const pathname = window.location.pathname;
    const valueIndex = routes.findIndex((option) => option.link === pathname);
    const index = menuOptions.findIndex((option) => option.link === pathname);

    if (pathname === "/estimate") {
      setValue(false);
    } else {
      setValue(valueIndex === -1 ? 1 : valueIndex);
    }
    setSelectedIndex(index);
  }, []);

  const tabs = (
    <>
      <Tabs
        className={classes.tabContainer}
        value={value}
        disableRipple
        onChange={handleChange}
        indicatorColor="primary">
        {routes.map((route, index) => (
          <Tab
            key={`${route.name}-${index}`}
            className={classes.tab}
            component={Link}
            to={route.link}
            label={route.name}
            aria-owns={route.ariaOwns}
            aria-haspopup={route.ariaPopup}
            onMouseOver={route.mouseOver}
          />
        ))}
      </Tabs>
      <Button className={classes.button} variant="contained" color="secondary">
        Free Estimate
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        MenuListProps={{
          onMouseLeave: handleClose
        }}
        classes={{ paper: classes.menu }}
        elevation={0}
        style={{ zIndex: 1302 }}
        keepMounted>
        {menuOptions.map((option, i) => (
          <MenuItem
            key={i}
            onClick={(e) => {
              handleMenuItemClick(e, i);
              setValue(1);
              handleClose();
            }}
            component={Link}
            to={option.link}
            classes={{
              root: classes.menuItem
            }}
            selected={i === selectedIndex && value === 1}>
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  const drawer = (
    <>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{
          paper: classes.drawer
        }}>
        <div className={classes.toolbarMargin}></div>
        <List>
          {routes.map((route, index) => (
            <ListItem
              key={`${route.name}-${index}`}
              classes={{ selected: classes.drawerItemSelected }}
              divider
              button
              onClick={() => {
                setOpenDrawer(false);
                setValue(index);
              }}
              component={Link}
              to={route.link}
              selected={value === index}>
              <ListItemText className={classes.drawerItem} disableTypography>
                {route.name}
              </ListItemText>
            </ListItem>
          ))}

          <ListItem
            classes={{
              root: classes.drawerItemEstimate,
              selected: classes.drawerItemSelected
            }}
            divider
            button
            onClick={() => {
              setOpenDrawer(false);
              setValue(5);
            }}
            component={Link}
            to="/estimate"
            selected={value === 5}>
            <ListItemText className={classes.drawerItem} disableTypography>
              Free Estimate
            </ListItemText>
          </ListItem>
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple>
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </>
  );

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
          <Toolbar disableGutters>
            <Button
              className={classes.logoContainer}
              component={Link}
              to="/"
              onClick={() => setValue(0)}>
              <img className={classes.logo} alt="company logo" src={logo} />
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin} />
    </>
  );
};

export default Header;
