import React from "react";
import { authService, firebaseInstance } from "fbase";

const SocialAuth = () => {
  const onSocialClick = async (event) => {
    // console.log(event.target.name);
    const {
      target: { name },
    } = event; //es6로 위의 코드를 작성
    let provider;
    if (name === "google") {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === "github") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };
  return (
    <>
      <div className="authBtns">
        <button className="authBtn" onClick={onSocialClick} name="github">
          Continue with Github
        </button>
        <button className="authBtn" onClick={onSocialClick} name="google">
          Continue with Google
        </button>
      </div>
    </>
  );
};

export default SocialAuth;
