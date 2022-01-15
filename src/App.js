import styled,{keyframes} from "styled-components";

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

const animation = keyframes`
  to {
    transform:rotate(0deg)
  }
  from {
    transform:rotate(360deg)
  }
`;

const Title = styled.div`
  color: aqua;
`;

const Box = styled.div`
  height: 200px;
  width: 100px;
  background-color: tomato;
  animation: ${animation} 1s linear;
  ${Title} {
    &:hover {
      color: blue;
    }
  }
`;



function App() {
  return (
    <Wrap>
      <Box>
        <Title>hi~~</Title>
      </Box>
    </Wrap>
  );
}

export default App;