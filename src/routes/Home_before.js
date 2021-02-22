import React, { useEffect, useState } from "react";
import { dbService, storageService } from "fbase";
import Sweet from "../components/Sweet";
import { v4 as uuidv4 } from "uuid";
import SweetFactory from "../components/SweetFactory";
const Home = ({ userObj }) => {
  // console.log(userObj);  로 해서 출력된 값을 보면 그중에서 uid 라는 것이있는데 이게 필요하다
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);
  const [attachment, setAttachment] = useState("");
  // 새로운 글을 올리고 바로바로 화면상의 업데이트를 할 수 있도록 하기위해서 밑의 코드를 사용하지 않음 (24 비교)
  // const getSweets = async() => {
  //     const dbSweets = await dbService.collection("sweets").get(); //이렇게 읽어오면 이상한 값이 나오는데 그 이유는 가져온것이 QueryDocumentSnapshot 이기떄문
  //     dbSweets.forEach((document) => {
  //         const sweetObject ={
  //             ...document.data(),
  //             id : document.id,
  //         }
  //         setSweets((prev) => [sweetObject, ...prev]);
  //     });
  // };

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

  const onSubmit = async (event) => {
    event.preventDefault();
    /*await dbService.collection("sweets").add({
      // sweet:sweet
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setSweet(""); */
    //위의 코드를 변경하는데 만약 이미 사진이 있다면 그 사진을 업로드하고 없다면 업로드하여 등록하게한 이후에 sweet을 작성하게 한다.
    let attachmentUrl = "";
    if (attachment !== "") {
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`); //collection 이랑 아주 흡사
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const sweetObj = {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    
    await dbService.collection("sweets").add(sweetObj);
    setSweet("");
    setAttachment("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  const onFileChange = (event) => {
    // console.log(event.target.files);
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      // 이 이벤트는 읽기 동작이 성공적으로 완료 되었을 때마다 발생합니다.
      // console.log(finishedEvent);
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  }; // console.log(sweets);

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <SweetFactory />
      <div>
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
