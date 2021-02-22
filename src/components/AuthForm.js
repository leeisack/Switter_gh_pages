import React, { useState } from 'react';
import { authService } from "fbase";


const AuthForm = () => {
    const [newAccount, setNewAccount] = useState(true);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault(); //일반적으로 submit을 하면 새로고침하면서 다시 랜더링이되는데 이럴경우 state가 날라가버린다. 이런상황을 막기위해 preventDefault를 쓰고 이럴경우 새로고침이 되지 않는다.
        try {
          let data;
          if (newAccount) {
            //create account
            data = await authService.createUserWithEmailAndPassword(
              // 계정이 없을때 새로운 계정을 만들고
              email,
              password
            );
          } else {
            //log in
            data = await authService.signInWithEmailAndPassword(
              // 계정이 있으면 로그인
              email,
              password
            );
          }
          console.log(data);
        } catch (error) {
          setError(error);
        }
      };
      const onChange = (event) => {
        //onChange 는 어떤 일이 일어났을때 사용되는 함수인데 여기서 event는 무슨일이 일어 났는가를 의미한다. 여기서는 input이 변경된것
        const {
          target: { name, value },
        } = event; //그중에서 하나의 정보가 타겟,
        if (name === "email") {
          setEmail(value);
        } else if (name === "password") {
          setPassword(value);
        } //console.log(value);
      };
      const toggleAccount = () => setNewAccount((prev) => !prev);

    return (
        <>
        <form onSubmit={onSubmit} className="container">
        {/* http://tcpschool.com/html-tag-attrs/input-required  input태그의 required 는 폼데이터가 서버로 제출되기 전 반드시 채워져있어야 하는 입력필드를 의미 */}
        {/* input은 letter를 추가하는것이 아닌 value를 받아오는것!  input이 바뀔때마다 state도 바뀌는것! */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={onChange}
          required
          value={email}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={onChange}
          required
          value={password}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "Create Account" : "Sign In"}
          className="authInput authSubmit"
        />{" "}
        {/* 상태가 로그인이 되어있는 상태라면 로그인 아니라면 아이디 생성을 하게 한다. */}
        {error && <span className="authError">{error}</span>}
      </form>
      <span onClick={toggleAccount} className="authSwitch">
        {newAccount ? "Sign in" : "Create Account"}
      </span>
      </>
    )
}

export default AuthForm;