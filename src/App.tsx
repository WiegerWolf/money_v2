import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Database } from 'sql.js'

function loadBinaryFile(path: string) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", path, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function() {
      const data = new Uint8Array(xhr.response);
      const arr = [];
      for(let i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      resolve(arr.join(""));
    };
    xhr.onerror = function() {
      reject(xhr);
    };
    xhr.send();
  });
}

let db: Database;
try {
  const SQL = await window.initSqlJs({
    locateFile: (file: string) => {
      return `./${file}`
    }
  });
  db = new SQL.Database();
} catch (error) {
  console.error(error);
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
