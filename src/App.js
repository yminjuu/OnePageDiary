import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList = [
  {
    id: 1,
    author: "이마크",
    content: "hi 1",
    emotion: 5,
    created_date: new Date().getTime(), //현재 시간을 기준으로 생성됨, getTime 메서드 사용시 밀리초 기준으로 생성됨
  },
  {
    id: 2,
    author: "이해찬",
    content: "hi 2",
    emotion: 3,
    created_date: new Date().getTime(), //현재 시간을 기준으로 생성됨, getTime 메서드 사용시 밀리초 기준으로 생성됨
  },
  {
    id: 3,
    author: "나재민",
    content: "hi 3",
    emotion: 4,
    created_date: new Date().getTime(), //현재 시간을 기준으로 생성됨, getTime 메서드 사용시 밀리초 기준으로 생성됨
  }, {
    id: 4,
    author: "이제노",
    content: "hi 4",
    emotion: 4,
    created_date: new Date().getTime(), //현재 시간을 기준으로 생성됨, getTime 메서드 사용시 밀리초 기준으로 생성됨
  }
];

function App() {
  return (
    <div className="App">
      <DiaryEditor></DiaryEditor>
      <DiaryList diaryList={dummyList}></DiaryList>
    </div>
  );
}
// 더미 리스트를 DiaryList 태그에 전달 

export default App;
