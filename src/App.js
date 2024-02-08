import { useState, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]); //빈 배열 초기값

  const dataIdx = useRef(0); //인덱스 초기값은 0

  //새로 작성된 글에 대한 데이터를 모아 새로운 객체를 정의하고, 해당 객체를 data 배열에 추가하는 함수를 
  //App.js에서 선언 및 정의하여 DiaryEditor.js에 해당 함수를 넘겨준다!
  //안드로이드에서 인터페이스 사용하며 배웠던 로직과 매우 유사하다.

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime(); //현재 시간
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataIdx.current,
    };
    dataIdx.current += 1;
    setData([newItem, ...data]);
    //spread 연산자를 사용해서 이미 존재하는 데이터에 새 아이템을 "추가" (새 아이템이 가장 위에 보이는 형식)
  };

  const onRemove = (targetId) => {
    console.log(`${targetId}가 삭제되었습니다`);
    const newDiaryList = data.filter((it) => (it.id !== targetId));
    setData(newDiaryList);
  }

  const onEdit = (targetId, newContent) => {
      setData(
        data.map((it)=> it.id===targetId ? {...it,content:newContent} : it)
      );
      // 변경 대상이면 content를 바꿔주고, 그렇지 않으면 원본 데이터를 그대로 반환함
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove}></DiaryList>
    </div>
  );
};

export default App;
