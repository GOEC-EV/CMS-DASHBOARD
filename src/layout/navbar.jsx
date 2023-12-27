import styled from '@emotion/styled';
import { AppBar, Avatar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {ReactComponent as Notification} from '../assets/icons/notification.svg'
import { grey } from '@mui/material/colors';


const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  border:'none',
  boxShadow:'none'
}));

export const DashboardNavbar = (props) => {
  const { open,onSideBarOpen, ...other } = props;

  return (
      <DashboardNavbarRoot
        sx={{
          left: {
            lg: 260
          },
          width: {
            lg: 'calc(100% - 260px)'
          },
          border:'none'
        }}
        {...other}>
        <Toolbar
          disableGutters
          sx={{
            minHeight: 64,
            left: 0,
            px: 2
          }}
        >
          <IconButton
            onClick={onSideBarOpen}
            sx={{
              display: {
                xs: 'inline-flex',
                lg: 'none'
              }
            }}
          >
            <MenuIcon fontSize="small" />
          </IconButton>
         
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{paddingRight:'25px'}}>
          <Notification />
          </Box>
          <Typography sx={{
            color: 'primary.DimText'
          }} variant='subtitle2'>Jackie Chan</Typography>

          <Avatar
                  sx={{
                    cursor: 'pointer',
                    height: 40,
                    width: 40,
                    ml: 1,
                    bgcolor: grey[500]
                  }}       
                        
                      >
                        
                      {/* { localStorage.getItem("username")?  getInitials(localStorage.getItem("username") ) : getInitials("Admin" )} */}
                      </Avatar>
          
        </Toolbar>
      </DashboardNavbarRoot>
  );
};

