import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/pages/Login/Login";

function App() {

  return (


    <div className="bg-purple-100">
    <Login/>
    </div>

    
    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Login />} />
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );
}

export default App
