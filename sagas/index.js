// 제너레이터를 활용 func*의 형태를 말한다
export default function* rootSaga() {

}

//함수에 yield를 중간에 넣어서 작성을 하게되면 next할때마다 그전단계가 하나씩 하나씩 호출되어진다. 단계별로 실행이 되어진다. 중단점을 설정해 줄 수 있는 함수
//.next를 호출함으로써 특정상황에 대한 이벤트리스너를 활용 할 수 있다.