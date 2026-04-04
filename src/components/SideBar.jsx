import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Button,
  CircularProgress
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext.jsx";

const drawerWidth = 240;

export const SideBar = () => {
  const navigate = useNavigate();

  const { user, logout, loading } = useAuth()

  if (loading) return <CircularProgress />

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Магазин игрушек
        </Typography>
      </Box>
      <Divider />

      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/")}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/catalog")}>
            <ListItemIcon><AppsIcon /></ListItemIcon>
            <ListItemText primary="Каталог" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate("/about")}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <ListItemText primary="О нас" />
          </ListItemButton>
        </ListItem>
      </List>

      <Box sx={{ flexGrow: 1 }} />

      <Divider />
      <Box sx={{ p: 2 }}>
        {user ? (
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
              <AccountCircleIcon color="primary" />
              <Typography variant="body2" noWrap sx={{ fontWeight: 600 }}>
                {user.name || "Пользователь"}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              size="small"
              startIcon={<LogoutIcon />}
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Выйти
            </Button>
          </Box>
        ) : (
          <Button
            variant="contained"
            fullWidth
            startIcon={<LoginIcon />}
            onClick={() => navigate("/login")}
          >
            Войти
          </Button>
        )}
      </Box>
    </Drawer>
  )
}