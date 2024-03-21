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
    const url = `${process.env.REACT_APP_BACKEND_URL}/submission/all`;
    let result = await fetch(url);
    result = await result.json();
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

                <Accordion.Body className='m-2 px-3 bg-dark text-white'>
                  <div className=''>
                    <textarea rows={10}>
                    {item.sourcecode.slice(0,100)}
                    </textarea>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            )
          })

          : null}
      </Accordion>
    </div>
  )
}
