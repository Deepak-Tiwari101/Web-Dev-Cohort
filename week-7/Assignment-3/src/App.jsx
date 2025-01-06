// import { useState } from "react";
import { useRef } from "react";
import "./index.css";
import { wordList } from "./words";

const LENGTH = wordList.length;

function App() {
  // const [sentence, setSentence] = useState([]);
  const inputRef = useRef();
  const paraRef = useRef();

  const handleGenerate = (e) => {
    e.preventDefault();
    // setSentence([]);
    paraRef.current.innerText = "";
    const numWords = parseInt(inputRef.current.value) || 0;

    if (numWords <= 0) return alert("Sahi se value daal pehle");
    const newSentence = [];
    for (let i = 0; i < numWords; i++) {
      const randomIndex = Math.floor(Math.random() * LENGTH)
      newSentence.push(wordList[randomIndex]);
    }
    // setSentence(newSentence);

    setTimeout(() => {
      const newSentenceString = newSentence.join(" ");
      paraRef.current.innerText = newSentenceString;
    }, 0)
  }

  return (
    <div className="container">
      <h1>Para Generator</h1>
      <div className="input-div">
        <input type="text" ref={inputRef} placeholder="Enter number of words..." />
        <button onClick={handleGenerate}>Generate</button>
      </div>


      {/* {sentence.length !== 0 && (
        <div className="para-div" ref={paraRef}>
          <ChunkedParagraph words={sentence} />
        </div>
      )} */}
      <div className="para-div" style={{ maxWidth: "100vw" }} ref={paraRef}>
      </div>
    </div>
  )
}

// To increase performance we use the below Component
// const ChunkedParagraph = ({ words, chunkSize = 1000 }) => {
//   const chunks = [];
//   for (let i = 0; i < words.length; i += chunkSize) {
//     chunks.push(words.slice(i, i + chunkSize));
//   }

//   return chunks.map((chunk, chunkIndex) => (
//     <p key={chunkIndex}>
//       {chunk.map((word, index) => (
//         <span key={`${chunkIndex}-${index}`}>{word} </span>
//       ))}
//     </p>
//   ));
// };

export default App