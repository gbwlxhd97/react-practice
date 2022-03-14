import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from './Routes/Coin';
import Coins from './Routes/Coins';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins/>}></Route>
        <Route path="/:coinId" element={<Coin/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;