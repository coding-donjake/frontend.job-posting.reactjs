import React from "react";
import Logo from "../assets/logo.png";
import { SideNavigation } from "../components/widgets/Navigations";
import {
  faBriefcase,
  faChartPie,
  faIcons,
  faRightFromBracket,
  faUserGroup,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SecondaryButton,
  DangerButton,
  PrimaryButton,
} from "../components/widgets/Buttons";
import { useNavigate } from "react-router-dom";

const CompanyNavigation = () => {
  const navigate = useNavigate();
  const currentURL = window.location.href;

  return (
    <SideNavigation
      logo={<img src={Logo} alt="" />}
      title={localStorage.getItem("username")!}
      actions={[
        currentURL.includes(":3000/company/dashboard") ? (
          <PrimaryButton
            icon={<FontAwesomeIcon icon={faChartPie} />}
            text="Dashboard"
          />
        ) : (
          <SecondaryButton
            icon={<FontAwesomeIcon icon={faChartPie} />}
            text="Dashboard"
            onClick={() => navigate("/company/dashboard")}
          />
        ),
        currentURL.includes(":3000/company/job-posts") ? (
          <PrimaryButton
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            text="Job Posts"
          />
        ) : (
          <SecondaryButton
            icon={<FontAwesomeIcon icon={faBriefcase} />}
            text="Job Posts"
            onClick={() => navigate("/company/job-posts")}
          />
        ),
        <DangerButton
          className="mt-auto"
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
          text="Log Out"
          onClick={() => navigate("/company")}
        />,
      ]}
    />
  );
};

export default CompanyNavigation;
