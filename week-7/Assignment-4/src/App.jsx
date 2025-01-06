import { useState } from "react";
import "./index.css";
import { useRef } from "react";

function App() {

  return (
    <div className="container">
      <h2>Login via OTP</h2>
      <OTPLogin />
    </div>
  )
}

// eslint-disable-next-line react/prop-types
function OTPLogin({ OTPLength = 4 }) {
  const [otp, setOtp] = useState(new Array(OTPLength).fill(''));
  const inputs = useRef([]);

  function handleChange(value, index) {
    if (!value) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (index < OTPLength - 1) {
      inputs.current[index + 1].focus()
    }
  }

  function handleKeyDown(e, index) {
    // console.log(e.key, index);
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
      if (index > 0) inputs.current[index - 1].focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    if (!e.isTrusted) return console.error("Something's fishy...");

    const pasteData = e.clipboardData.getData("text").trim();
    if (isNaN(parseInt(pasteData))) return;

    const newOtp = [...otp];

    for (let i = 0; i < pasteData.length && i < OTPLength; i++) {
      const digit = pasteData.charAt(i);
      newOtp[i] = digit;
      setOtp(newOtp)
      inputs.current[i].focus();
    }
  }

  return (
    <>
      <div className="otp-div" onPaste={handlePaste}>
        {
          otp.map((_, index) => (
            <input
              type="number"
              className="input-box"
              key={index}
              ref={ele => inputs.current[index] = ele}  // store the current input box reference inside the "inputs" ref array
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              value={otp[index]}
            />
          ))
        }
      </div>
      <button className="loginBtn" type="submit" onClick={(e) => {
        e.preventDefault();
        for (let i = 0; i < OTPLength; i++) {
          if (otp[i] === '') return alert("Fill out the OTP field first");
        }
        alert(`You have exposed your OTP 😈: ${otp.join('')}`)
      }}>Login</button>
    </>
  )
}

export default App
