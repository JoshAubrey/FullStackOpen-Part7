import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button, makeStyles } from '@material-ui/core/'

const Menu = ({ handleLogout, currentUser }) => {

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      marginRight: theme.spacing(2),
    },
    nav: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bloglist
          </Typography>
          <div className={classes.nav}>
            <Button color="inherit" component={Link} to='/'>blogs</Button>
            <Button color="inherit" component={Link} to='/users'>users</Button>
          </div>
            {currentUser ?
              <div>{ currentUser.name } logged-in <Button color="inherit" onClick={handleLogout}>logout</Button></div> :
              <Button color="inherit" component={Link} to='/login'>login</Button>
            }
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Menu