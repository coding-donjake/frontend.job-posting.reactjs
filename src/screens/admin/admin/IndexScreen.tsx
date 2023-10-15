import React, { useEffect, useState } from "react";
import BlockScreen from "../../../components/BlockScreen";
import AdminNavigation from "../../../navigations/AdminNavigation";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RowTable } from "../../../components/widgets/Tables";
import {
  DangerCircleButton,
  SecondaryButton,
  SecondaryCircleButton,
} from "../../../components/widgets/Buttons";
import {
  faArrowsRotate,
  faEye,
  faPenToSquare,
  faPlus,
  faTrashCan,
  faUsersSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryLoader } from "../../../components/widgets/Loaders";
import { PrimarySticker } from "../../../components/widgets/Stickers";
import { RowList } from "../../../components/widgets/Lists";
import { SearchInput } from "../../../components/widgets/Inputs";

const IndexScreen = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState<any>([]);
  const [loadedAdmin, setLoadedAdmin] = useState<boolean>(false);
  const [searchAdminData, setSearchAdminData] = useState({
    key: "",
  });

  const handleSearchAdminKeyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSearchAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getAdmin = async () => {
    setLoadedAdmin(false);
    try {
      const response = await fetch("/admin/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to load admin.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setAdmin(res.data);
        setLoadedAdmin(true);
        return;
      }
      toast.error("Unkown error occured!");
      console.log(response);
    } catch (error) {
      toast.error("Client error!");
      console.error("catch error:", error);
    }
  };

  const searchAdmin = async () => {
    setLoadedAdmin(false);
    try {
      const response = await fetch("/admin/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: searchAdminData.key }),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to search admin.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setAdmin(res.data);
        setLoadedAdmin(true);
        return;
      }
      toast.error("Unkown error occured!");
      console.log(response);
    } catch (error) {
      toast.error("Client error!");
      console.error("catch error:", error);
    }
  };

  useEffect(() => {
    document.title = "Admin";
  }, []);

  useEffect(() => {
    getAdmin();
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>Admin</h1>
          <hr />
          <PrimaryContainer
            header="Admin List"
            actions={[
              <SecondaryButton
                icon={<FontAwesomeIcon icon={faPlus} />}
                text="New Admin"
                onClick={() => navigate("create")}
              />,
              <SearchInput
                id="key"
                name="key"
                key="key"
                label="Search..."
                onChange={handleSearchAdminKeyChange}
                onClick={searchAdminData.key === "" ? getAdmin : searchAdmin}
              />,
            ]}
            body={
              loadedAdmin ? (
                admin.length > 0 ? (
                  <RowTable
                    headers={["Username", "Full Name", "Gender", "Role", ""]}
                    rows={admin.map((admin: any) => [
                      admin.User.username,
                      `${admin.User.UserInformation.lastName}, ${admin.User.UserInformation.firstName} ${admin.User.UserInformation.middleName} ${admin.User.UserInformation.suffix}`,
                      admin.User.UserInformation.gender,
                      admin.role,
                      <RowList
                        className="justify-end"
                        items={[
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faEye} />}
                            onClick={() => navigate(`view/${admin.id}`)}
                          />,
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => navigate(`update/${admin.id}`)}
                          />,
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faArrowsRotate} />}
                            onClick={() =>
                              navigate(`reset-password/${admin.id}`)
                            }
                          />,
                          <DangerCircleButton
                            icon={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => navigate(`remove/${admin.id}`)}
                          />,
                        ]}
                      />,
                    ])}
                  />
                ) : (
                  <PrimarySticker
                    icon={<FontAwesomeIcon icon={faUsersSlash} />}
                    text="No admin found."
                  />
                )
              ) : (
                <PrimaryLoader />
              )
            }
          />
        </div>
      }
    />
  );
};

export default IndexScreen;
