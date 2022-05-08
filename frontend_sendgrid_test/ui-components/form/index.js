import styled from 'styled-components';

export const Form = styled.form`
  background: #eee;
  border: 1px solid #aaa;
  border-radius: 8px;
  padding: 30px;
  width: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 90%;
  overflow: auto;

  &.big-form {
    width: 500px;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  margin-bottom: 10px;
  padding: 5px;
  font-size: 16px;
  border: 1px solid #aaa;
  border-radius: 4px;
  width: 100%;
`;

export const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #aaa;
  transition: all .3s ease;

  &.primary {
    background: #1a1a1a;
    color: #fff;
    border-color: #1a1a1a;

    &:hover {
      background: #fff;
      color: #1a1a1a;
    }
  }
`;

export const Select = styled.select`
  padding: 5px;
  -webkit-appearance: none;
  border: 1px solid #aaa;
  border-radius: 4px;
  font-size: 16px;
  
  option {
    font-size: 16px;
  }
`;