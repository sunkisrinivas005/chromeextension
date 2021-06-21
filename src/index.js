import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
 
// setTimeout(() => {
//     var req = new XMLHttpRequest();
//     req.open(
//       "GET",
//       "https://dev.track.flexlinks.com/conversiontracking.ashx?AID=" +
//         321412123 +
//         "&AMT=" +
//         1000 +
//         "&UID=" +
//         12994821 +
//         "&SID=" +
//         848330042233
//     );
//     req.send();
//     console.log("Conversion Done");
// }, 5000);

ReactDOM.render(
  <>
    <App />
  </>, document.getElementById('modal-window'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
