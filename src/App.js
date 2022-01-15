import styled from "styled-components";

const Father = styled.div`
  display: flex;
`;

const Btn = styled.button`
  background-color: red;
`;

const Input = styled.input.attrs({required: true, maxLength:10})`

`;

function App() {
  return (
    <Father>
      <Btn/>
      123
      <Btn as="a" href="www.naver.com">hi~</Btn>
      <Input/>
      <Input/>
    </Father>
  );
}

export default App;