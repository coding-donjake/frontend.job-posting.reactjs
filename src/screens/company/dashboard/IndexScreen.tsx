import React from "react";
import BlockScreen from "../../../components/BlockScreen";
import CompanyNavigation from "../../../navigations/CompanyNavigation";

const IndexScreen = () => {
  return <BlockScreen leftPanel={<CompanyNavigation />} body={<></>} />;
};

export default IndexScreen;
