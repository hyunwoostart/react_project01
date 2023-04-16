import React from 'react';
import { useState, useEffect } from 'react';

function Members() {
  // 초기 값
  const initVal = {
    userId: '',
    pwd1: '',
    pwd2: '',
    email: '',
    gender: false,
    interests: false,
  };

  const [Val, setVal] = useState(initVal);
  const [Err, setErr] = useState({});
  const [Submit, setSubmit] = useState(false); // 클릭 했는지 체크

  // 인풋 요소의 값이 변경 될 때 마다 실행될 함수
  const handleChange = (e) => {
    console.dir(e.target);
    // 현재 입력하고 있는 input 요소의 name, value 값을 비구조할당으로 뽑아서 출력
    const { name, value } = e.target;
    setVal({ ...Val, [name]: value });
  };

  // Val State값을 인증처리해주는 함수
  const check = (value) => {
    const errs = {};
    const eng = /[a-zA-Z]/;
    const num = /[0-9]/;
    const spc = /[~!@#$%^&*()_+]/;
    const spc2 = /@/; // 특수 문자
    if (value.userId.length < 5) {
      errs.userId = 'id를 5글자 이상 입력하세요.';
    }
    if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
      errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요.';
    }
    if (value.pwd1 !== value.pwd2 || !value.pwd2) {
      errs.pwd2 = '비밀 번호가 같지 않습니다.';
    }

    if (value.email.length < 8 || !spc2.test(value.email)) {
      errs.email = '이메일 주소를 다시 확인 부탁드립니다.';
    }

    if (!value.gender) {
      errs.gender = '성별을 체크해주세요.';
    }

    if (!value.interests) {
      errs.interests = '관심사를 하나 체크해주세요..';
    }

    return errs;

  };

  useEffect(() => {
    const len = Object.keys(Err).length;
    if (len === 0 && Submit) {
      alert('모든 인증을 통과했습니다.');
    }
  }, [Err]);

  // 라디오버튼 값이 변경될때마다 변경될 함수
  const handleRadio = (e) => {
    const { name } = e.target;
    const isChecked = e.target.checked;
    setVal({ ...Val, [name]: isChecked });
  };

  const handleCheckbox = (e) => {
    const { name } = e.target;
    let isChecked = false;
    const inputs = e.target.parentElement.querySelectorAll('input');

    //모든 체크박스를 반복돌면서 하나라도 체크된게 있으면 true값을 변경후 리턴
    inputs.forEach((el) => el.checked && (isChecked = true));
    setVal({ ...Val, [name]: isChecked });
  };

  // 전송 이벤트 발생 시 실행 될 함수 a
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setErr(check(Val)); 
  };

  useEffect(() => {
    console.log(Val);
  }, [Val]);

  return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className='h'>회원가입 폼 양식</legend>
          <table>
            <tbody>
              {/* userId */}
              <tr>
                <th scope='row'>
                  <label htmlFor='userId'>USER ID</label>
                </th>
                <td>
                  <input type='text' name='userId' id='userId' placeholder='아이디를 입력하세요.' onChange={handleChange} />
                  <p className='err'>{Err.userId}</p>
                </td>
              </tr>

              {/* password */}
              <tr>
                <th scope='row'>
                  <label htmlFor='pwd1'>PASSWORD</label>
                </th>
                <td>
                  <input type='password' name='pwd1' id='pwd1' placeholder='비밀번호를 입력하세요' onChange={handleChange} />
                  <p className='err'>{Err.pwd1}</p>
                </td>
              </tr>

              {/* repassword */}
              <tr>
                <th scope='row'>
                  <label htmlFor='pwd2'>RE-PASSWORD</label>
                </th>
                <td>
                  <input type='password' name='pwd2' id='pwd2' placeholder='비밀번호를 재입력하세요' onChange={handleChange} />
                  <p className='err'>{Err.pwd2}</p>
                </td>
              </tr>

              {/* email */}
              <tr>
                <th scope='row'>
                  <label htmlFor='email'>E-MAIL</label>
                </th>
                <td>
                  <input type='text' name='email' id='email' placeholder='이메일 주소를 입력하세요' onChange={handleChange} />
                  <p className='err'>{Err.email}</p>
                </td>
              </tr>
              {/*  radio */}
              <tr>
                <th scope='row'>Gender</th>
                <td>
                  <label htmlFor='male'>Male</label>
                  <input type='radio' name='gender' value='male' id='male' />

                  <label htmlFor='FeMale'>FeMale</label>
                  <input type='radio' name='gender' value='FeMale' id='FeMale' onChange={handleRadio} />
                  <p className='err'>{Err.gender}</p>
                </td>
              </tr>
              {/*  checkbox */}
              <tr>
                <th scope='row'>interest</th>
                <td>
                  <label htmlFor='sports'>sports</label>
                  <input type='checkbox' name='interests' value='sports' id='sports' onChange={handleCheckbox} />

                  <label htmlFor='music'>music</label>
                  <input type='checkbox' name='interests' value='music' id='music' onChange={handleCheckbox} />

                  <label htmlFor='game'>game</label>
                  <input type='checkbox' name='interests' value='game' id='game' onChange={handleCheckbox} />

                  <p className='err'>{Err.interests}</p>
                </td>
              </tr>
              {/* btnSet */}
              <tr>
                <th colSpan='2'>
                  <input type='reset' value='CANCEL' />
                  <input
                    type='submit'
                    value='SEND'
                    onClick={() => {
                      setSubmit(true);
                    }}
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </fieldset>
      </form>
  );
}

export default Members;