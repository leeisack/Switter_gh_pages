import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";

function App() {
  // const auth = fbase.auth(); 이렇게 해줄수도있고 firebase에 직접 해줄수도있다(마지막줄)
  const [init, setInit] = useState(false);
  // console.log(authService.currentUser);
  // authService.currentUser //사용할 거 불러오기. 공식문서 참고! currentUser는 유저 또는 null 값을 리턴.
  // const [isLoggedIn, setIsLoggedIn] = useState(false); //기본값 false 대신 authService.currentUser 넣어서 로그인상태로 만들수도 있음 // 또한 hooks를 사용하지않고 해결하는 방법도있음
  // console.log(authService.currentUser); 로 확인해보면 시작할 때는 null이라뜨고 그 이후에 사용자 정보가 뜨는데 이것은 처음에는 로그인이 안되어있다는것이다. 이걸 해결하기 위해서 onAuthStateChanged 를 사용
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => /*console.log(user)*/ {
      if (user) {
        // setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        }); // 로그인을 하면 onAuthStateChanged가 실행되고 userObj에 user이름을 받아오게 한다.
      }else{
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        <AppRouter
          refreshUser={refreshUser}
          isLoggedIn={/*isLoggedIn*/ Boolean(userObj)}
          userObj={userObj}
        /> //inLoggedIn 이 없어도 userObj가 있으면 inLoggedIn이 true인것과 같기때문에 이렇게 줄여서 사용할 수 있다.
      ) : (
        "Initializing..."
      )}
      <footer>&copy; Switter {new Date().getFullYear()}</footer>
    </>
  );
}

export default App;
