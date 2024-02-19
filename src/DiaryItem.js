import React, {useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ 

    //새로 작성된 일기 객체의 모든 프로퍼티
    author, 
    content, 
    created_date, 
    emotion, 
    id, 
}) => {

    const {onEdit, onRemove} = useContext(DiaryDispatchContext);

    const contentRef= useRef(); //focus를 주기 위해 Ref를 가져옴

    const [state, setState] = useState(content); //작성 내용 state

    const [isEdit, setEdit] = useState(false); //수정중인지 여부를 보관하는 state
    
    //현재 상태와 반대로 isEdit을 바꿔주는 토글 함수
    const toggleIsEdit = () => {
        setEdit(!isEdit); 
    };

    const handleQuitEdit = () => {
        toggleIsEdit();
        setState(content);
    };
    
    const handleEdit = () => {
        if (state.length < 5) {
            contentRef.current.focus();
            return;
        }
        if (window.confirm(`${id}번째 일기를 수정하시겠습니까?`)) {
            onEdit(id,  state);
            toggleIsEdit();
        }
    }

    const handleRemove = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
    }
    };
    
    return <div className="DiaryItem">
        <div key={author}>
            <div>작성자 : {author} | 감정 : {emotion} </div>
            <div id="wrote_date">작성 시간 : {new Date(created_date).toLocaleString()}</div>
            <hr></hr>
            <div id="content">
            {isEdit ?
            //수정중임
            <><textarea ref={contentRef} 
            value={state} 
            onChange={
                //콜백함수에 이벤트 객체를 넘겨준다.
                (e) => {setState(e.target.value)}}>
                </textarea></>

            //수정중이 아님 
            :<>{content}</>}</div>
            
            {isEdit ? 
            //수정중임
            <><button onClick={handleQuitEdit}>수정 취소</button>
            <button onClick={handleEdit}>수정 완료</button></>
            : //수정중이 아님
            <><button onClick={handleRemove}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button></>}
        </div>
    </div >
};

export default React.memo(DiaryItem);