import React, { useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import MonacoEditor from 'react-monaco-editor';


export default function DisplayPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchSubmissions();
    
  }, []);
  const fetchSubmissions = async () => {
    const url = "http://localhost:3000/submission/all";
    let result = await fetch(url);
    result = await result.json();
    // let result = [
    //   {
    //     "id": 1,
    //     "username": "Harry",
    //     "code_language": "cpp",
    //     "stdin": "3\n1 2 4\n1 4 4",
    //     "sourcecode": "hello",
    //     "timestamp": "20/3/2024 18:1:28",
    //     "stdout": null
    //   },
    //   {
    //     "id": 2,
    //     "username": "Sam",
    //     "code_language": "python",
    //     "stdin": "4\n1 2 3\n4 56 6",
    //     "sourcecode": "print(\"Hello Word\");",
    //     "timestamp": "20/3/2024 18:4:39",
    //     "stdout": null
    //   },
    //   {
    //     "id": 3,
    //     "username": "Sam",
    //     "code_language": "python",
    //     "stdin": "4\n1 2 3\n4 56 6",
    //     "sourcecode": "print(\"Hello Word How are you\");",
    //     "timestamp": "20/3/2024 18:4:59",
    //     "stdout": null
    //   }]
    console.log(result);
    if (result) {
      // setSubmissions(result);
      setSubmissions(result.result);
      setLoading(false);
    }
  }
  return (
    <div className='container'>
      <h1>User Submissions:</h1>
      {loading ?
        <div className='d-flex justify-content-center'>
          <Spinner animation="grow" variant="danger" />
        </div>
        : null}
      <Accordion defaultActiveKey="0">
        {submissions && submissions.length > 0 ?
          submissions.map((item, index) => {
            return (
              <Accordion.Item eventKey={index} key={index} >
                <Accordion.Header>
                  <div style={{ color: '#ee4b2b' }} className='d-flex'>
                  <div>{item.username}</div>
                  <div style={{ position: 'absolute', right: '14em'}}>{item.code_language}</div>
                  <div style={{ position: 'absolute', right: '4em' }}>{item.timestamp}</div>
                  
                  </div>
                </Accordion.Header>
                {/* <MonacoEditor
                      language={item.code_language} // Set the language mode to the provided code language
                      theme="vs-dark" // Set the editor theme
                      value={item.sourcecode}
                      // onChange={setSourceCode}
                      width="100%"
                      height="100px"
                      options={{
                        selectOnLineNumbers: true,
                        fontSize: 14,
                        suggestOnTriggerCharacters: true,
                        quickSuggestions: true, // Show quick suggestions as you type
                        wordBasedSuggestions: true, // Use word-based suggestions
                        suggestSelection: 'first', // Preselect the first suggestion
                      }}
                    /> */}

                <Accordion.Body className='m-2 px-3 bg-dark text-white'>
                  <div className=''>
                    <textarea >
                    {item.sourcecode.slice(0,500)}
                    </textarea>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )
          })

          : null}


        {/* <Accordion.Item eventKey="1">
          <Accordion.Header>Accordion Item #2</Accordion.Header>
          <Accordion.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Accordion.Body>
        </Accordion.Item> */}
      </Accordion>
    </div>
  )
}
