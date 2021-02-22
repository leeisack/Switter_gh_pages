import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";
import Navigation from "components/Navigation";

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {
  //Router는 예약어라 사용이 안된다
  //Router 코드는 router기능만 넣기 위해서 현재는 밑의 코드를 App.js로 옮겨 놓았다.
  // const [isLoggedIn, setIsLoggedIn] = useState(false); //기본 상태 값으로 false 를 줬다. 로그인이 안 되어있는 상태.
  return (
    <Router>
      {isLoggedIn && <Navigation userObj={userObj} />}
      {/* 이 코드는 로그인이 되어있는 상태일때 네비게이션존재가 가능하게 하기 위한것 */}
      <Switch>
        {isLoggedIn ? (
          //   fragment, <> 는 render 하고싶은 요소가 많을때 사용한다. <div> <span> 에 넣기 싫지만 사용은 해야 할 경우에.
          <>
            <div
              style={{
                maxWidth: 890,
                width: "100%",
                margin: "0 auto",
                marginTop: 80,
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Route exact path="/">
                <Home userObj={userObj} />
              </Route>
              <Route exact path="/profile">
                <Profile userObj={userObj} refreshUser={refreshUser} />
              </Route>
              {/* <Redirect from="*" to="/" /> */}
            </div>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            {/* <Redirect from="*" to="/" />  를 통해서 현재위치로부터 home으로 이동도 가능은 하다 */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;
