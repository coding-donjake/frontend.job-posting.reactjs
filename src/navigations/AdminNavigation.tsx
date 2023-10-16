import React from "react";
import Logo from "../assets/logo.png";
import { SideNavigation } from "../components/widgets/Navigations";
import {
  faBuilding,
  faChartPie,
  faIcons,
  faRightFromBracket,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SecondaryButton, DangerButton } from "../components/widgets/Buttons";
import { useNavigate } from "react-router-dom";

const AdminNavigation = () => {
  const navigate = useNavigate();
  const currentURL = window.location.href;

  return (
    <SideNavigation
      logo={<img src={Logo} alt="" />}
      title={localStorage.getItem("username")!}
      actions={[
        currentURL.includes(":3000/admin/dashboard") ? (
          <DangerButton
            icon={<FontAwesomeIcon icon={faChartPie} />}
            text="Dashboard"
          />
        ) : (
          <SecondaryButton
            icon={<FontAwesomeIcon icon={faChartPie} />}
            text="Dashboard"
            onClick={() => navigate("/admin/dashboard")}
          />
        ),
        currentURL.includes(":3000/admin/companies") ? (
          <DangerButton
            icon={<FontAwesomeIcon icon={faBuilding} />}
            text="Companies"
          />
        ) : (
          <SecondaryButton
            icon={<FontAwesomeIcon icon={faBuilding} />}
            text="Companies"
            onClick={() => navigate("/admin/companies")}
          />
        ),
        currentURL.includes(":3000/admin/admin") ? (
          <DangerButton
            icon={<FontAwesomeIcon icon={faUserGroup} />}
            text="Admin"
          />
        ) : (
          <SecondaryButton
            icon={<FontAwesomeIcon icon={faUserGroup} />}
            text="Admin"
            onClick={() => navigate("/admin/admin")}
          />
        ),
        <DangerButton
          className="mt-auto"
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
          text="Log Out"
          onClick={() => navigate("/admin/")}
        />,
      ]}
    />
  );
};

export default AdminNavigation;
