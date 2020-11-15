import React, { useMemo } from 'react';
import { Form, Input } from 'antd';

const NicknameEditForm = () => {
  // use memo ref : https://velog.io/@devjuun_s/TIL-Hooks-3-useMemo-useCallback ...
  // ...이 배열 안에 넣은 내용이 바뀌면, 우리가 등록한 함수를 호출해서 값을 연산해주고, 만약에 내용이 바뀌지 않았다면 이전에 연산한 값을 재사용하게 된다.
  const style = useMemo(() => ({ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }), []);

  return (
    <Form style={style}>
      <Input.Search addonBefore="nickname" enterButton="edit" />
    </Form>
  );
};

export default NicknameEditForm; // 만든 컴포넌트를 export
