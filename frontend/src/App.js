import './App.css';
import DisplayPage from './DisplayPageComponents/DisplayPage';
import Navbar from './SubmissionPageComponents/Navbar';
import SubmissionPage from './SubmissionPageComponents/SubmissionPage';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const fetchUserDetail = async () => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  const url = `${process.env.REACT_APP_BACKEND_URL}/user/select`;
  console.log(url);
  const apicall = await fetch(url);
  const response = await apicall.json();
  if (response) {
    console.log(response);
  }
  console.log("Called");
}
function App() {

  return (<>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navbar/>}>
          <Route index element={<SubmissionPage />} />
          <Route path='submissions' element={<DisplayPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
