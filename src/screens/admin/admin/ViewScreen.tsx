import React, { useEffect, useState } from "react";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BlockScreen from "../../../components/BlockScreen";
import { SecondaryButton } from "../../../components/widgets/Buttons";
import { PrimaryContainer } from "../../../components/widgets/Containers";
import { RegularForm } from "../../../components/widgets/Forms";
import { PrimaryInput } from "../../../components/widgets/Inputs";
import AdminNavigation from "../../../navigations/AdminNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { PrimaryLoader } from "../../../components/widgets/Loaders";
import { fromISOToDate } from "../../../services/Conversion";

const ViewScreen = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [admin, setAdmin] = useState<any>({});
  const [loadedAdmin, setLoadedAdmin] = useState<boolean>(false);

  const selectAdmin = async () => {
    setLoadedAdmin(false);
    try {
      const response = await fetch("/admin/select", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      if (response.status === 500) {
        toast.error("Internal server error!");
        console.log("Failed to load user.");
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
      toast.error("Load user failed!");
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    document.title = "View Admin";
  }, []);

  useEffect(() => {
    selectAdmin();
  }, []);

  return (
    <BlockScreen
      leftPanel={<AdminNavigation />}
      body={
        <div className="p-4">
          <h1>View Admin</h1>
          <hr />
          <PrimaryContainer
            actions={[
              <SecondaryButton
                icon={<FontAwesomeIcon icon={faChevronLeft} />}
                text="Go Back"
                onClick={() => navigate(-1)}
              />,
            ]}
            body={
              loadedAdmin ? (
                <RegularForm
                  onSubmit={() => {}}
                  formGroups={[
                    {
                      name: "Account Information",
                      items: [
                        <div className="flex gap-2">
                          <PrimaryInput
                            type="text"
                            id="username"
                            name="username"
                            key="username"
                            label="Username"
                            value={admin.User.username}
                            readonly={true}
                          />
                          <PrimaryInput
                            type="text"
                            id="role"
                            name="role"
                            key="role"
                            label="Role"
                            value={admin.role}
                            readonly={true}
                          />
                        </div>,
                      ],
                    },
                    {
                      name: "Personal Information",
                      items: [
                        <div className="flex gap-2">
                          <PrimaryInput
                            type="text"
                            id="lastName"
                            name="lastName"
                            key="lastName"
                            label="Last name"
                            value={admin.User.UserInformation.lastName}
                            readonly={true}
                          />
                          <PrimaryInput
                            type="text"
                            id="firstName"
                            name="firstName"
                            key="firstName"
                            label="First name"
                            value={admin.User.UserInformation.firstName}
                            readonly={true}
                          />
                        </div>,
                        <div className="flex gap-2">
                          <PrimaryInput
                            type="text"
                            id="middleName"
                            name="middleName"
                            key="middleName"
                            label="Middle name"
                            value={admin.User.UserInformation.middleName}
                            readonly={true}
                          />
                          <PrimaryInput
                            type="text"
                            id="firstName"
                            name="firstName"
                            key="firstName"
                            label="Suffix"
                            value={admin.User.UserInformation.suffix}
                            readonly={true}
                          />
                        </div>,
                        <div className="flex gap-2">
                          <PrimaryInput
                            type="text"
                            id="gender"
                            name="gender"
                            key="gender"
                            label="Gender"
                            value={admin.User.UserInformation.gender}
                            readonly={true}
                          />
                          <PrimaryInput
                            type="text"
                            id="birthDate"
                            name="birthDate"
                            key="birthDate"
                            label="Birth date"
                            value={fromISOToDate(
                              admin.User.UserInformation.birthDate
                            )}
                            readonly={true}
                          />
                        </div>,
                      ],
                    },
                  ]}
                  actions={[]}
                />
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

export default ViewScreen;
