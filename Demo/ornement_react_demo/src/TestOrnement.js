import { Ornement } from 'ornement';
import { useState } from 'react';


function TestOrnement() {
    var [content, setContent] = useState("");
    var [result, setResult] = useState("");

    function HandleContentChange(e) {
        setContent(e.target.value);
    }

    function ParseContent(){
        setResult(Ornement(content));
    }

    return(
        <>
            <textarea onChange={HandleContentChange}></textarea>
            <br/>
            <button onClick={ParseContent}>Parse to HTML</button>
             <br/>
            <div dangerouslySetInnerHTML={{__html: result}}></div>
        </>
    )
}

export default TestOrnement;