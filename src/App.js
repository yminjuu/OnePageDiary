import React, 
{useRef, 
  useEffect, 
  useMemo, 
  useCallback, 
  useReducer, 
  memo} 
  from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const reducer = (state, action) => {
  switch (action.type){
    case 'INIT': {
      return action.data;
    }
    case 'CREATE': {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data, //스프레드 연산자
        created_date
      }
      return [newItem, ...state];
    } 
    case 'REMOVE': {
      return state.filter((it) => (it.id !== action.data));
    }
    case 'EDIT': {
      return state.map(
        (it)=> it.id===action.targetId ? {...it,content:action.newContent} : it);
    }
    default : //상태 변화 X
    return state;
  }
};

export const DiaryStateContext = React.createContext();
//내보내서 다른 컴포넌트에게 전달

export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []); //전체 일기 데이터

  const dataIdx = useRef(0); //일기 데이터 각각의 index 관리


  //////// 1. INIT
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

    dispatch({type:"INIT", data: initData}); //reducer에 type: INIT으로 객체를 전달해줌.
  }
  
  useEffect(()=>{ //컴포넌트가 마운트 되는 시점에 API를 호출하는 함수 getData 호출
    getData();
  }, []);

  //////// 2. CREATE
  const onCreate = useCallback ((author, content, emotion) => {
    const created_date = new Date().getTime(); //현재 시간

    dispatch({type:'CREATE', data: {author, content, emotion, id:dataIdx.current}});
    dataIdx.current += 1;
  }, 
  []); //빈 배열 전달 -> mount 되는 시점에 한번만 호출되도록 함

  //////// 3. REMOVE
  const onRemove = useCallback((targetId) => {
    dispatch({type:'REMOVE', data: targetId}); //targetId를 지워!
  }, []);

  //////// 4. EDIT
  const onEdit = useCallback((targetId, newContent) => {
    dispatch({type:'EDIT', targetId, newContent});

      // setData((data)=>{
      //   return data.map((it)=> it.id===targetId ? {...it,content:newContent} : it);
      // }
      // );
      // 변경 대상이면 content를 바꿔주고, 그렇지 않으면 원본 데이터를 그대로 반환함
  }, [] );

  ////// Context에서 함수들을 전달하기 위해 묶어줌
  //useMemo를 사용해야 하는 이유: 그냥 묶으면 최적화가 풀림(App component가 리랜더링될때마다 다 재생성될거기 때문). 
  //얘네를 묶어주는 상수도 최적화시켜둬야 최적화가 유지되는 것임
  const memoizedDispatches  = useMemo(()=>{
    return {onCreate, onRemove, onEdit};
  }, []);
  //처음에 mount 될 때 한번만 랜더링

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

  //공급자 컴포넌트로 Context를 공유하는 자식컴포넌트들을 모두 래핑한다. 
  //가장 바깥의 Context Provider에 dispatch를 실행하는 함수를 넣으면 안되나?
  // -> 안된다. Provider도 하나의 컴포넌트이기 때문에 만약 data와 useCallback을 사용하여
  //최적화해준 함수들을 함께 prop으로 전달하게 되면 data가 바뀔 때마다 리랜더링되어버려
  //최적화가 풀려버린다. 따라서 중첩으로 Context를 사용하게 된다.
  return (
    <DiaryStateContext.Provider value={data}> 
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor></DiaryEditor>
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기: {goodCount}</div>
          <div>기분 나쁜 일기: {badCount}</div>
          <div>기분 좋은 일기의 비율: {goodRatio} %</div>
          <DiaryList></DiaryList>
      </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;