import React, { useState } from 'react';

export default function TextForm(props) {
    const [text, setText] = useState('Enter text here');
    const [showAnalysis, setShowAnalysis] = useState(false);
    const [result, setResult] = useState({});

    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Uppercase","success")
    };

    const handleOnChange = (event) => {
        setText(event.target.value);
    };

    const handleDownClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to Lowercase","success")
    };

    const handleClear = () => {
        setText('');
        props.showAlert("Cleared","success")
    };

    const handleAnalyze = () => {
        const wordOccurrences = {};
        const words = text.split(/\s+/);

        for (let word of words) {
            if (wordOccurrences[word]) {
                wordOccurrences[word]++;
            } else {
                wordOccurrences[word] = 1;
            }
        }

        setShowAnalysis(true);
        setResult(wordOccurrences);
    };

    const handleCopy = () =>{
        navigator.clipboard.writeText(text);
        props.showAlert("Copied","success")
    }

    const handleSpaces = () =>{
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
    }

    return (
        <>
            <div className="container my-4" style={{color:props.mode === 'dark'? 'white':'black'}}>
                <h1>{props.heading}</h1>
                <div className="mb-3">
                    <textarea
                        className="form-control"
                        value={text}
                        onChange={handleOnChange}
                        id="myBox"
                        rows="8"
                        style={{backgroundColor:props.mode === 'dark'? 'grey':'white', color:props.mode === 'dark'?'white':'black'}}
                    ></textarea>
                </div>
                <button className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>
                    Convert to uppercase
                </button>
                <button className="btn btn-primary mx-2 my-1" onClick={handleDownClick}>
                    Convert to Lowercase
                </button>
                <button className="btn btn-primary mx-2 my-1" onClick={handleClear}>
                    Clear Now
                </button>
                <button className="btn btn-primary mx-2 my-1" onClick={handleAnalyze}>
                    Analyze Now
                </button>
                <button className='btn btn-primary mx-2 my-1' onClick={handleCopy}>Copy Text</button>
                <button className='btn btn-primary mx-2 my-1' onClick={handleSpaces}>Remove Extra spaces</button>
            </div>
            <div className="container my-4" style={{color:props.mode === 'dark'? 'white':'black'}}>
                <h1>Your text Summary</h1>

                <p>
                    <b>{text.split(/\s+/).filter((word) => word !== '').length}</b> words and{' '}
                    <b>{text.length}</b> characters
                </p>
                <p>{0.008 * text.split(/\s+/).filter((word) => word !== '').length} to read the text</p>
                <h2>Preview</h2>
                <p>{text.length>0 ?text:"Nothing to Preview"}</p>
                {showAnalysis && (
                    <div>
                        <h2>Word Counter</h2>
                        <ul>
                            {Object.keys(result).map((word) => (
                                <li key={word}>
                                    {word}: {result[word]} occurrences
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}
