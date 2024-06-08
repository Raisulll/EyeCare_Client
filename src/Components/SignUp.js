import React,{useState} from "react";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const collectData = () => {
    console.warn(name, email, password);
  }
  return (
    <div className="input">
      <h1>Sign Up</h1>
      <input type="text" className="inputbox" placeholder="Username"
      value={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="email" className="inputbox" placeholder="Email"
        value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <input type="password" className="inputbox" placeholder="Password"
      value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button onClick={collectData} className="btn">Sign Up</button>
    </div>
  );
};

export default SignUp;
