import './App.css';
import SubmissionPage from './SubmissionPageComponents/SubmissionPage';

const fetchUserDetail = async()=>{
  console.log(process.env.REACT_APP_BACKEND_URL);
    const url = `${process.env.REACT_APP_BACKEND_URL}/user/select`;
    console.log(url);
    const apicall = await fetch(url);
    const response = await apicall.json();
    if(response){
      console.log(response);
    }
    console.log("Called");
}
function App() {

  return (
    <div>
      <SubmissionPage/>
      <button onClick={fetchUserDetail}>fetch Details K </button>

    </div>
  );
}

export default App;
