import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons';

const tabs = [{
    route: "/home",
    icon: faHome,
    label: "Home"
  },{
    route: "/occupancy",
    icon: faSearch,
    label: "Occupancy"
  },{
    route: "/startworkout",
    icon: faUserCircle,
    label: "StartWorkout"
  },{
    route: "/notes",
    icon: faUserCircle,
    label: "Notes"
  },{
    route: "/profile",
    icon: faUserCircle,
    label: "Profile"
  }]

// const Navigation = (props) => {
// 	return (
//         <nav className="navbar fixed-bottom navbar-light bottom-tab-nav" role="navigation">
//         <Nav className="w-100">
//           <div className=" d-flex flex-row justify-content-around w-100">
//             {
//               tabs.map((tab, index) =>(
//                 <NavItem key={`tab-${index}`}>
//                   <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
//                     <div className="row d-flex flex-column justify-content-center align-items-center">
//                       <FontAwesomeIcon size="lg" icon={tab.icon}/>
//                       <div className="bottom-tab-label">{tab.label}</div>
//                     </div>
//                   </NavLink>
//                 </NavItem>
//               ))
//             }
//           </div>
//         </Nav>
//       </nav>
//   )
// };

// export default Navigation;

const Navigation = (props) => {
  return (
    <nav className="navbar fixed-bottom navbar-light bottom-tab-nav" role="navigation">
      <Nav className="w-100">
        <div className="d-flex justify-content-between w-100">
          {
            tabs.map((tab, index) => (
              <NavItem key={`tab-${index}`} style={{ width: `${100 / tabs.length}%` }}>
                <NavLink to={tab.route} className="nav-link bottom-nav-link" activeClassName="active">
                  <div className="d-flex flex-column align-items-center">
                    <FontAwesomeIcon size="lg" icon={tab.icon} />
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))
          }
        </div>
      </Nav>
    </nav>
  )
};

export default Navigation;