import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';


function App() {
  const [data, setData] = useState([]); //일기 데이터

  const dataIdx = useRef(0); //인덱스 초기값은 0

  const getData = async() => { //API를 호출하여 데이터를 받아옴: Promise 객체를 반환하는 async 함수로 만듦
    const res = await fetch('https://jsonplaceholder.typicode.com/comments') //자바스크립트 내장 객체 fetch
    .then((res)=>res.json());

    const initData = res.slice(0,20).map((it)=>{
      //0부터 19 인덱스까지 자른 후 map 함수를 사용하여 모든 원소를 순회
    //배열을 순회하며 return 하는 값들을 모아 배열을 만들고, initData에 집어넣고자 함.
        return {
          author: it.email,
          content: it.body,
          emotion: Math.floor(Math.random()*5)+1, //자바 스크립트에서 수학 연산을 담당하는 객체인 Math 사용
          created_date : new Date().getTime(),
          id : dataIdx.current++
        }
    }); 

    setData(initData);

  }
  
  useEffect(()=>{ //컴포넌트가 마운트 되는 시점에 API를 호출하는 함수 getData 호출
    getData();
  }, []);

  const onCreate = useCallback ((author, content, emotion) => {
    const created_date = new Date().getTime(); //현재 시간
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataIdx.current,
    };
    dataIdx.current += 1;
    setData((data)=>[newItem, ...data]); 
  }, 
  []); //빈 배열 전달 -> mount 되는 시점에 한번만 호출되도록 함

  const onRemove = useCallback((targetId) => {
    setData((data)=>{
      const newDiaryList = data.filter((it) => (it.id !== targetId));
      return newDiaryList;
    }); //최신 data를 받아 newDiaryList를 리턴
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
      setData((data)=>{
        return data.map((it)=> it.id===targetId ? {...it,content:newContent} : it);
      }
      );
      // 변경 대상이면 content를 바꿔주고, 그렇지 않으면 원본 데이터를 그대로 반환함
  }, [] );

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter( (it) => it.emotion>=3).length;
    //goodCount에 감정점수가 3 이상인 일기의 개수가 저장된다.

    const badCount = data.length- goodCount;

    const goodRatio = (goodCount)/data.length * 100;
    return {goodCount, badCount, goodRatio};
    //다시 기억하자. 값만 주는 경우 key값=  value값인 프로퍼티다.
    // 따라서 객체를 return한다.
  }, [data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate}></DiaryEditor>
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기: {goodCount}</div>
      <div>기분 나쁜 일기: {badCount}</div>
      <div>기분 좋은 일기의 비율: {goodRatio} %</div>
      <DiaryList onEdit={onEdit} diaryList={data} onRemove={onRemove}></DiaryList>
    </div>
  );
};

export default App;