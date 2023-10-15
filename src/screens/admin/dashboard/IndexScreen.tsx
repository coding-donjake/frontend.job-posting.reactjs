import React from "react";
import BlockScreen from "../../../components/BlockScreen";
import AdminNavigation from "../../../navigations/AdminNavigation";

const IndexScreen = () => {
  return <BlockScreen leftPanel={<AdminNavigation />} body={<></>} />;
};

export default IndexScreen;
