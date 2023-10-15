import React from "react";
import Logo from "../assets/logo.png";
import { faIcons, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SecondaryCircleButton,
  DangerCircleButton,
} from "../components/widgets/Buttons";
import { PrimaryHeader } from "../components/widgets/Headers";

const Design2Navigation = () => {
  return (
    <PrimaryHeader
      icon={<img src={Logo} alt="" />}
      actions={[
        <SecondaryCircleButton icon={<FontAwesomeIcon icon={faIcons} />} />,
        <SecondaryCircleButton icon={<FontAwesomeIcon icon={faIcons} />} />,
        <SecondaryCircleButton icon={<FontAwesomeIcon icon={faIcons} />} />,
        <SecondaryCircleButton icon={<FontAwesomeIcon icon={faIcons} />} />,
        <DangerCircleButton
          icon={<FontAwesomeIcon icon={faRightFromBracket} />}
        />,
      ]}
    />
  );
};

export default Design2Navigation;
