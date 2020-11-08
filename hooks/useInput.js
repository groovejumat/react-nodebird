import { useState, useCallback } from 'react';

// useInput이라는 커스텀 훅을 생성했다
export default (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        setValue(e.target.value);
    },[]);
    // value : 값
    // handler : 현재 상태에 대한 callback
    // setValue : 세팅하는 특정 값
    return [value, handler, setValue];
}