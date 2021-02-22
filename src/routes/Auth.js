
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
// import isack from './isack.jpeg';
import AuthForm from "../components/AuthForm";
import SocialAuth from "../components/AuthSocial";

const Auth = () => {
  return (
    <div className="authContainer">
            {/* <img
        src = {isack}
        alt ="isacklogo"
      /> */}
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
      <AuthForm />
      <SocialAuth />
    </div>
  );
};

export default Auth;
