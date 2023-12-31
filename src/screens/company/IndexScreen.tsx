import React, { useEffect, useState } from "react";
import Logo from "../../assets/banner.png";
import BlockScreen from "../../components/BlockScreen";
import {
  faPenToSquare,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  DangerButton,
  SecondaryButton,
} from "../../components/widgets/Buttons";
import { PrimaryContainer } from "../../components/widgets/Containers";
import { RegularForm } from "../../components/widgets/Forms";
import { PrimaryInput } from "../../components/widgets/Inputs";

const IndexScreen = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (processing) {
      return;
    }

    try {
      setProcessing(true);
      const response = await fetch("/company/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: formData }),
      });
      if (response.status === 401) {
        toast.error("Invalid username or password.");
        setProcessing(false);
        return;
      }
      if (response.status === 500) {
        toast.error("Internal server error!");
        setProcessing(false);
        return;
      }
      if (response.ok) {
        const res = await response.json();
        toast.success("Logged In Successfully.");
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("username", formData.username);
        navigate("dashboard");
        return;
      }
      toast.error("Unkown error occured!");
      setProcessing(false);
    } catch (error) {
      toast.error("Request failed!");
      console.error("Network error:", error);
      setProcessing(false);
    }
  };

  useEffect(() => {
    document.title = "Company";
  }, []);

  return (
    <BlockScreen
      body={
        <div className="flex justify-center py-16 px-4">
          <PrimaryContainer
            className="w-full max-w-md"
            body={
              <RegularForm
                logo={<img src={Logo} alt="" />}
                formGroups={[
                  {
                    name: "Career Pro Company",
                    items: [
                      <PrimaryInput
                        type="text"
                        id="username"
                        name="username"
                        key="username"
                        label="Username"
                        onChange={handleInputChange}
                      />,
                      <PrimaryInput
                        type="password"
                        id="password"
                        name="password"
                        key="password"
                        label="Password"
                        onChange={handleInputChange}
                      />,
                    ],
                  },
                ]}
                actions={[
                  <SecondaryButton
                    icon={<FontAwesomeIcon icon={faPenToSquare} />}
                    text="Register"
                    onClick={() => navigate("register")}
                  />,
                  <DangerButton
                    type="submit"
                    icon={<FontAwesomeIcon icon={faRightToBracket} />}
                    text="Log In"
                    processing={processing}
                  />,
                ]}
                onSubmit={handleOnSubmit}
              />
            }
          />
        </div>
      }
    />
  );
};

export default IndexScreen;
