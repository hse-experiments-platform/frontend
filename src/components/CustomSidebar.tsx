import { useState } from 'react';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { BsDatabase } from "react-icons/bs";
import { LuBrainCog } from "react-icons/lu";
import { TbGraph } from "react-icons/tb";
import { TbLogout } from "react-icons/tb";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";

const StyledSidebar = styled(Sidebar)`
  color: white;
`

export const CustomSidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

    return (
        <StyledSidebar collapsed={isCollapsed}>
            <Menu
              menuItemStyles={
                {
                  button: {
                    '&:hover': {
                      backgroundColor: '#0245D1'
                    },
                  }
                }
              }
            >
              <MenuItem
                component={<Link to="/datasets" />}
                icon={<BsDatabase size={"30px"}/>}
                style={{}}
              >
                Datasets
              </MenuItem>
              <MenuItem
                component={<Link to="/trained-models" />}
                icon={<LuBrainCog size={"30px"}/>}
                active={true}
              >
                Models
              </MenuItem>

              <MenuItem
                component={<div onClick={() => setIsCollapsed(!isCollapsed)}/>}
                icon={isCollapsed ? <FaArrowRightLong size={"30px"}/> : <FaArrowLeftLong size={"30px"}/>}
              >
                Close menu
              </MenuItem>
              <MenuItem
                component={<Link to="/logout" />}
                icon={<TbLogout size={"30px"}/>}
              >
                Logout
              </MenuItem>
            </Menu>
        </StyledSidebar>
    );
}