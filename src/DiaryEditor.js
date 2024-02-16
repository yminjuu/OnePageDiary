import React,{ useEffect, useRef, useState } from 'react';

const DiaryEditor = ({ onCreate }) => {

    useEffect(()=>{console.log("DiaryEditor Rerender")});

    const authorInput = useRef();
    const contentInput = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 1,
    });

    //내용이 입력될 때마다 호출되는 콜백함수. useRef
    const handleStateChange = (e) => {
        setState({
            ...state,
            //이전에 저장돼있던 state 정보들을 spread 연산자로 뿌려준다.
            [e.target.name]: e.target.value,
        })
    };

    const handleSubmit = (e) => {
        if (state.author.length < 1) {
            authorInput.current.focus();
            return;
        }
        if (state.content.length < 5) {
            contentInput.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion); //데이터 추가
        setState({ //작성 내용 초기화
            author: "",
            content: "",
            emotion: 1,
        })
        alert("저장되었습니다.");
    }

    return (
        <div className="DiaryEditor">
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={contentInput}
                    name="author"
                    value={state.author}
                    onChange={handleStateChange} /></div>
            <div>
                <textarea
                    ref={contentInput}
                    name="content"
                    value={state.content}
                    onChange={handleStateChange} />
            </div>
            <div>
                <span>오늘의 감정점수: </span>
                <select
                    name="emotion"
                    value={state.emotion}
                    onChange={handleStateChange}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button
                    onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div >
    )
};


export default React.memo(DiaryEditor);