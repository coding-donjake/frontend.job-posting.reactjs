import React, { useEffect, useState } from "react";
import BlockScreen from "../../../components/BlockScreen";
import AdminNavigation from "../../../navigations/AdminNavigation";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RowTable } from "../../../components/widgets/Tables";
import {
  DangerCircleButton,
  SecondaryCircleButton,
} from "../../../components/widgets/Buttons";
import {
  faArrowsRotate,
  faBuildingCircleXmark,
  faEye,
  faPenToSquare,
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

  const [companies, setCompanies] = useState<any>([]);
  const [loadedCompanies, setLoadedCompanies] = useState<boolean>(false);
  const [searchCompaniesData, setSearchCompaniesData] = useState({
    key: "",
  });

  const handleSearchCompaniesKeyChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setSearchCompaniesData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCompanies = async () => {
    setLoadedCompanies(false);
    try {
      const response = await fetch("/company/get", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to load company.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setCompanies(res.data);
        setLoadedCompanies(true);
        return;
      }
      toast.error("Unkown error occured!");
      console.log(response);
    } catch (error) {
      toast.error("Client error!");
      console.error("catch error:", error);
    }
  };

  const searchCompanies = async () => {
    setLoadedCompanies(false);
    try {
      const response = await fetch("/company/search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: searchCompaniesData.key }),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to search company.");
        return;
      }
      if (response.ok) {
        const res = await response.json();
        setCompanies(res.data);
        setLoadedCompanies(true);
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
    document.title = "Companies";
  }, []);

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>Companies</h1>
          <hr />
          <PrimaryContainer
            header="Companies List"
            actions={[
              <SearchInput
                id="key"
                name="key"
                key="key"
                label="Search..."
                onChange={handleSearchCompaniesKeyChange}
                onClick={
                  searchCompaniesData.key === ""
                    ? getCompanies
                    : searchCompanies
                }
              />,
            ]}
            body={
              loadedCompanies ? (
                companies.length > 0 ? (
                  <RowTable
                    headers={["Name", "User Full Name", ""]}
                    rows={companies.map((company: any) => [
                      company.name,
                      `${company.User.UserInformation.lastName}, ${company.User.UserInformation.firstName} ${company.User.UserInformation.middleName} ${company.User.UserInformation.suffix}`,
                      <RowList
                        className="justify-end"
                        items={[
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faEye} />}
                            onClick={() => navigate(`view/${company.id}`)}
                          />,
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faPenToSquare} />}
                            onClick={() => navigate(`update/${company.id}`)}
                          />,
                          <SecondaryCircleButton
                            icon={<FontAwesomeIcon icon={faArrowsRotate} />}
                            onClick={() =>
                              navigate(`reset-password/${company.id}`)
                            }
                          />,
                          <DangerCircleButton
                            icon={<FontAwesomeIcon icon={faTrashCan} />}
                            onClick={() => navigate(`remove/${company.id}`)}
                          />,
                        ]}
                      />,
                    ])}
                  />
                ) : (
                  <PrimarySticker
                    icon={<FontAwesomeIcon icon={faBuildingCircleXmark} />}
                    text="No companies found."
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
