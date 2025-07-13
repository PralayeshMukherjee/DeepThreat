import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const JwtSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get("token");

    if (token) {
      localStorage.setItem("jwt", token);
      navigate("/mainhome");
    }
  }, []);
};

export default JwtSuccess;
