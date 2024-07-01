import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
        let [length, setLength] = useState(8);
        let [isNumber, setNumberAllow] = useState(false);
        let [isSpecialChar, setSpecialCharAllow] = useState(false);
        let [password, setPassword] = useState("");

        let passwordGenerator = useCallback(()=>{
          let pass = "";
          let str = "ABCDEFGHIJKLMNOPQRSTEUVWXYZabcdefghijklmnopqrstuvwxyz";
          if(isNumber) str += "1234567890";
          if(isSpecialChar) str += "!@#$%^&*(_=+`";
          for(let i=1; i<=length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
          } 
          setPassword(pass);
        } , [length, isNumber, isSpecialChar])

        let passRef = useRef(null);

        const copyPasswordToClipboard = useCallback(() => {
          passRef.current.select();
        //  passRef.current.setSelectionRange(0, 999);
          window.navigator.clipboard.writeText(password);
        }, [password])

        useEffect(()=>{
          passwordGenerator();
        }, [length, isNumber, isSpecialChar])


  return (
    <section className='h-screen w-screen bg-slate-500 flex items-center justify-center'>    

        <div className=' w-2/4 flex flex-wrap justify-center items-center gap-8'>
              <div className='w-full flex justify-center items-center'><input type="text" readOnly placeholder='Password' value={password} className='p-4 h-10 w-80 rounded-l-md' /> <button className='h-10 w-20 bg-blue-700 text-white rounded-r-md' onClick={copyPasswordToClipboard}>Copy</button></div>

        <div className='w-full text-white flex justify-evenly items-center'>
                     <div className='flex gap-3'><input type="range" min={8} max={20} value={length} className='bg-white accent-white border-none' ref={passRef} onChange={(e)=> {setLength(e.target.value)}}/> <h1 className='font-extrabold'>Length: {length}</h1></div>

                     <div className='flex gap-3'><input type="checkbox" id='check1' defaultChecked={isNumber} onChange={()=>{
                      setNumberAllow((val) => !val)
                     }}/> <label htmlFor="check1"><h1 className='font-extrabold'>Number</h1></label></div>

                     <div className='flex gap-3'>
                      <input type="checkbox" id='check2' defaultChecked={isSpecialChar} onChange={()=> {
                        setSpecialCharAllow((val)=> !val)
                      }} />  <label htmlFor="check2"><h1 className='font-extrabold'>Special Character</h1></label>
                     </div>
      </div>
        </div>   

      
       
      
    </section>
  )
}

export default App
