import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, useTheme } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import ShowChartOutlinedIcon from '@mui/icons-material/ShowChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.gray[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography variant="h6" sx={{fontSize: '1.2rem'}}>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: "${colors.primary[500]} !important",
        },
        "& .pro-icon-wrapper": {
          background: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* Logo and menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          >
            {!isCollapsed && (
              <Box display="flex" alignItems="center" ml="15px" pb={5}>
                <MenuOutlinedIcon />
              </Box>
            )}
          
            <Box paddingLeft={isCollapsed ? undefined : "10%"}>
              <Item
                title="Dashboard"
                to="/dashboard"
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Orders"
                to="/orders"
                icon={<ShoppingCartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item
                title="Products"
                to="/products"
                icon={<LocalOfferOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />

              <Item 
                title="Categories"
                to="/categories"
                icon={<CategoryOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}/>

              <Item
                  title="Customers"
                  to="/customers"
                  icon={<PeopleOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
              />

              <Item
                title="Reports"
                to="/reports"
                icon={<ShowChartOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
