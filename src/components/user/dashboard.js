import React from "react";
import { Link, Route } from "react-router-dom";
import { getUser, setUser } from "../../utils/userFunction";
import OrderHistory from "./OrderHistory";
import GetOrder from "./GetOrder";
import FileUpload from "./FileReader";

function Dashboard({ match }) {
  const user = getUser();

  const logout = () => {
    localStorage.clear();
    setUser({});
  };

  return (
    <div className="sb-nav-fixed">
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand" href="#kkk">
          {user?.username}
        </a>
        <button
          className="btn btn-link btn-sm order-1 order-lg-0"
          id="sidebarToggle"
          href="#"
        >
          <i className="fas fa-bars"></i>
        </button>
        <ul className="navbar-nav ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <li className="nav-item dropdown">
            <div
              className="nav-link dropdown-toggle"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw"></i>
            </div>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <a className="dropdown-item" href="#fhfh">
                {user?.username && user?.username}
              </a>
              <a className="dropdown-item" href="#ndn">
                {user?.phone && user?.phone}
              </a>
              <a className="dropdown-item" href="#ndn">
                {user?.email && user?.email}
              </a>
              <div className="dropdown-divider"></div>
              <Link to={"/"} onClick={logout} className="dropdown-item">
                {Object.keys(user).length === 0 ? "Login" : "Logout"}
              </Link>
            </div>
          </li>
        </ul>
      </nav>
      <div id="layoutSidenav">
        <div id="layoutSidenav_nav">
          <nav
            className="sb-sidenav accordion sb-sidenav-dark"
            id="sidenavAccordion"
          >
            <div className="sb-sidenav-menu">
              <div className="nav">
                <div className="sb-sidenav-menu-heading">Operation</div>
                <Link to={`${match.url}`} className="nav-link">
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-tachometer-alt  text-light"></i>
                  </div>
                  New Order
                </Link>
                <Link className="nav-link" to={`${match?.url}/orders`}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-clock-history fs-5 text-light"></i>
                  </div>
                  Order history
                </Link>
                <Link className="nav-link" to={`${match?.url}/fileReader`}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-clock-history fs-5 text-light"></i>
                  </div>
                  File Reader
                </Link>
                <Link className="nav-link" to={"/"} onClick={logout}>
                  <div className="sb-nav-link-icon">
                    <i className="bi bi-power fs-5 text-light"></i>
                  </div>
                  logout
                </Link>
              </div>
            </div>
            <div className="sb-sidenav-footer">
              <div className="small">Logged in as:</div>
              {user?.username}
            </div>
          </nav>
        </div>
        <div id="layoutSidenav_content">
          <Route exact path={`${match?.path}`} component={GetOrder} />
          <Route exact path={`${match.path}/orders`} component={OrderHistory} />
          <Route
            exact
            path={`${match.path}/fileReader`}
            component={FileUpload}
          />
          <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between small">
                <div className="text-muted">Copyright &copy;food_app 2021</div>
                <div>
                  <a href="#uuu">Privacy Policy</a>
                  &middot;
                  <a href="#urururu">Terms &amp; Conditions</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;
