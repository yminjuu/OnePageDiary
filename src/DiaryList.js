import DiaryItem from "./DiaryItem";
import { useRef } from "react";

const DiaryList = ({ onEdit, onRemove, diaryList }) => {


    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h3>{diaryList.length}개의 일기가 있습니다.</h3>
            <div>
                {diaryList.map((it) => (
                    <DiaryItem onEdit={onEdit} onRemove={onRemove} key={it.id} {...it}></DiaryItem>
                    //spread 연산자를 통해서 현재 접근하고 있는 객체의 모든 프로퍼티가 전달된다. 
                ))
                }
            </div>
        </div>);
};

//undefined로 전달될 것을 대비하여 defaultProps를 정의해준다.
DiaryList.defaultProps = {
    diaryList: [], //빈 배열을 디폴트로
}

export default DiaryList;