// antd에서 Form불러와서 만들어 준다
import { IdcardFilled } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import React, { useCallback, useInput, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';

const PostForm = () => {
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  // 만들어 놓은 액션을 실행하기 위한 dispatch
  const dispatch = useDispatch();

  const [text, onChangeText, setText] = useInput('');

  // useEffect를 활용하여 post가 완료되면 입력 input을 초기화 시킴
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  // 실제 리엑트 돔에 접근하기 위해서 사용한다
  const imageInput = useRef();
  const onSubmit = useCallback(() => {
    // 액션은 객체 그리고 동적으로 데이터를 다루어야 할 때는 액션크리에이트를 만들어 줘야 한다
    dispatch(addPost(text));
    // setText('');
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
  // 처음에는 내부에 style을 적용시켜두 된다. (이를 inline styling이라고 한다) 따로 빼는 작업은 성능에 문제가 확실히 보일경우에
    <Form style={{ margin: '10px 0  20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        value={text}
        onChange={onChangeText}
        maxLength={140}
        placeholder="what did you do today?"
      />
      <div>
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">bird bird</Button>
      </div>
      <div>
        {/* 이미지 경로를 찾아서 썸네일 이미지 보여주기 목적 원래라면 컴포넌트 처리 해주는 것이 성능상으로나 퍼포먼스 상으로나 좋다. */}
        {imagePaths.map((v) => (
          <div key={v} style={{ display: 'inline-block' }}>
            <img src={v} style={{ width: '200px' }} alt={v} />
            <div>
              <Button>제거하기</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
