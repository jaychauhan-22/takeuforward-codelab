// SubmissionPage.js
import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import '../App.css'; // Import CSS file for styling
import Navbar from './Navbar';
import { stdin } from 'process';

const SubmissionPage = () => {
    const [username, setUsername] = useState('');
    const [codeLanguage, setCodeLanguage] = useState('');
    const [standardInput, setStandardInput] = useState('');
    const [sourceCode, setSourceCode] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = `${process.env.REACT_APP_BACKEND_URL}/user/insert`;
        // const url = "http://localhost:3000/user/insert";
        console.log(url);
        let result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "username": username, "code_language": codeLanguage, "stdin": standardInput, "sourcecode": sourceCode })
        })
        result = await result.json();
        console.log(result);
        if (result) {

        }

    };

    return (
        <>
            <Navbar />
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
                            language="javascript" // Set the language mode to JavaScript
                            theme="vs-dark" // Set the editor theme
                            value={sourceCode}
                            onChange={setSourceCode}
                            width="100%"
                            height="500px"
                            options={{
                                selectOnLineNumbers: true,
                                fontSize: 14,
                                suggestOnTriggerCharacters: true, // Enable suggestions on typing characters like '.' or '('
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
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>
        </>
    );
};

export default SubmissionPage;