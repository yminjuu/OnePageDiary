//App.js에서 생성한 더미리스트를 받음

const DiaryList = ({ diaryList }) => {
    console.log(diaryList);
    return (
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h2>{diaryList.length}개의 일기가 있습니다.</h2>
            <hr></hr>
            <div>
                {/* map 메소드를 통해 반복한다.  */}
                {/**it를 통해서 현재 요소에 접근할 수 있다. */}
                {/* 배열의 요소를 순회하되, 각 요소들은 고유한 키값을 가져야 하기에 key를 author로 할당해준다. */}
                {/* 고유한 키값이 없는 경우에는 map 메서드의 두번째 파라미터인 index를 사용하면 된다. */}
                {/*하지만 index를 키로 설정할 경우 데이터를 수정, 삭제 등을 할 때 데이터의 순서가 바뀌어버리면 문제가 생기기 때문에 각 데이터마다 고유한 식별자가 있으면 그 식별자를 key로 주는 것이 현명하다!  */}
                {diaryList.map((it, idx) =>
                    <div key={idx}>
                        <div>{idx + 1}번째 일기입니다.</div>
                        <div>작성자 : {it.author}</div>
                        <div>일기 : {it.content}</div>
                        <div>감정 : {it.emotion}</div>
                        <div>작성 시간 : {it.created_date}</div>
                        <hr></hr>
                    </div>)}
            </div>
        </div>);
};

//undefined로 전달될 것을 대비하여 defaultProps를 정의해준다.
DiaryList.defaultProps = {
    diaryList: [], //빈 배열을 디폴트로
}

export default DiaryList;