import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NavbarDropdown from './NavbarDropdown';
import NavbarDropdownComponents from './NavbarDropdownComponents';
import {
  authenticationRoutes,
  chatRoutes,
  componentRoutes,
  ECommerceRoutes,
  emailRoutes,
  homeRoutes,
  pageRoutes,
  pluginRoutes,
  utilityRoutes,
  widgetsRoutes,
  kanbanRoutes,
  calenderRoutes
} from '../../routes';
import { NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { breakpoints, getPageName } from '../../helpers/utils';
import { navbarBreakPoint, topNavbarBreakpoint } from '../../config';
import AppContext from '../../context/Context';

const NavbarTopDropDownMenus = ({ setNavbarCollapsed, setShowBurgerMenu }) => {
  const { isCombo, isTopNav } = useContext(AppContext);

  const components = [componentRoutes, pluginRoutes, utilityRoutes];

  const pages = [pageRoutes, calenderRoutes, kanbanRoutes, widgetsRoutes, chatRoutes, emailRoutes, ECommerceRoutes];

  const handleSetNavbarCollapsed = () => {
    const windowWidth = window.innerWidth;
    isTopNav && !isCombo && windowWidth < breakpoints[topNavbarBreakpoint] && setNavbarCollapsed(false);
    isCombo && windowWidth < breakpoints[navbarBreakPoint] && setShowBurgerMenu(false);
  };
  const isLanding = getPageName('landing');
  return (
    <>
      <NavbarDropdown
        title={homeRoutes.name}
        items={homeRoutes.children}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdown title={pageRoutes.name} items={pages} handleSetNavbarCollapsed={handleSetNavbarCollapsed} />
      <NavbarDropdownComponents
        title={componentRoutes.name}
        items={components}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />
      <NavbarDropdown
        title={authenticationRoutes.name}
        items={authenticationRoutes.children}
        handleSetNavbarCollapsed={handleSetNavbarCollapsed}
      />

      {isTopNav && !isLanding && (
        <NavItem onClick={handleSetNavbarCollapsed}>
          <NavLink className="nav-link" to="/documentation">
            Documentation
          </NavLink>
        </NavItem>
      )}
      {isLanding && (
        <NavItem onClick={handleSetNavbarCollapsed}>
          <NavLink className="nav-link" to="/changelog">
            Changelog
          </NavLink>
        </NavItem>
      )}
    </>
  );
};

NavbarTopDropDownMenus.propTypes = { setNavbarCollapsed: PropTypes.func.isRequired };

export default NavbarTopDropDownMenus;
