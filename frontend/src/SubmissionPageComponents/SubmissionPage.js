// SubmissionPage.js
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import '../App.css'; // Import CSS file for styling
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';

const SubmissionPage = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('');
    const [standardInput, setStandardInput] = useState('');
    const [sourceCode, setSourceCode] = useState('');
    const handleRun = ()=>{alert("hello")}
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(sourceCode);
        // const url = `${process.env.REACT_APP_BACKEND_URL}/user/insert`;
        const url = "http://localhost:3000/user/insert";
        console.log(url);
        const newDate = new Date();
        let timestamp = newDate.getDate()+"/"+ (newDate.getMonth()+1) +"/"+newDate.getFullYear()+" ";
        timestamp += newDate.getHours()+":";
        timestamp += newDate.getMinutes()+":";
        timestamp += newDate.getSeconds();
        console.log(timestamp);
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "code_language": codeLanguage, "stdin": standardInput, "sourcecode": sourceCode,"timestamp":timestamp })
        })
        result = await result.json();
        console.log(result);
        if (result) {
            navigate("/submissions")
        }

    };
    const handleKeyPress = (event) => {
        // If "Enter" key is pressed (keyCode 13), append a newline character to the source code
        console.log("Hello");
        if (event.keyCode === 13) {
            setSourceCode(prevSourceCode => prevSourceCode + '\n');
        }
    };

    return (
        <>
            <div className="submission-page">
                <h2>Submission Page</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Preferred Code Language:</label>
                        <select
                            className="language-select"
                            value={codeLanguage}
                            onChange={(e) => setCodeLanguage(e.target.value)}
                            required
                        >
                            <option value="">Select a language</option>
                            <option value="java">Java</option>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="javascript">JavaScript</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Source Code:</label>
                        <MonacoEditor
                            language={codeLanguage} // Set the language mode to JavaScript
                            theme="vs-dark" // Set the editor theme
                            value={sourceCode}
                            onChange={setSourceCode}
                            onKeyPress={handleKeyPress}
                            width="100%"
                            height="500px"
                            options={{
                                selectOnLineNumbers: true,
                                fontSize: 14,
                                suggestOnTriggerCharacters: true, 
                                quickSuggestions: true, // Show quick suggestions as you type
                                wordBasedSuggestions: true, // Use word-based suggestions
                                suggestSelection: 'first', // Preselect the first suggestion
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label>Standard Input:</label>
                        <textarea
                        
                            value={standardInput}
                            onChange={(e) => setStandardInput(e.target.value)}
                            required
                        />
                    </div>
                    <input type='button' onClick={handleRun} className="submit-button" style={{marginRight:10,backgroundColor:'grey'}} value={"Run Code"}/>
                    <button type="submit" className="submit-button">Submit Code</button>
                    
                </form>
            </div>
        </>
    );
};

export default SubmissionPage;
