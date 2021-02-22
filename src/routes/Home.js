import React, { useEffect, useState } from "react";
import { dbService } from "fbase";
import Sweet from "../components/Sweet";
import SweetFactory from "../components/SweetFactory";
const Home = ({ userObj }) => {
  const [sweets, setSweets] = useState([]);

  useEffect(() => {
    // getSweets();
    dbService.collection("sweets").onSnapshot((snapshot) => {
      // console.log("something happend");
      console.log(snapshot.docs); //sweets은 snapshot으로부터 가져온다는것.
      //24 비교 와 같은 역할을 하나 코드를 이렇게 짤 경우 더 적게 rerender하므로 더 빠르게 실행되도록 한다.
      const sweetArray = snapshot.docs.map((doc) => ({
        //query 가 아닌 snapshot 을 사용했기 때문에 실시간으로 볼 수 있다.
        id: doc.id,
        ...doc.data(),
      }));
      setSweets(sweetArray);
    });
  }, []);

  return (
    <div className="container">
      <SweetFactory userObj={userObj} />
      <div style={{marginTop: 30}}>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
