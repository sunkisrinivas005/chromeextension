/* global chrome */

let urlSaved = '';

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  if(request.type === 'MESSAGE_URL'){
    window.localStorage.setItem('url', request.details);
    urlSaved = request.details;
  }
  main();
});


function main() {
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        $(styleStashHTML).appendTo('body');
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

window.addEventListener("message", function(event) {
  onDidReceiveMessage(event);
});

async function onDidReceiveMessage(event) {
  if (event.data.type && (event.data.type === "GET_SID")) {
    window.postMessage({ type: "SID_RESULT", sid: localStorage.getItem("sid"), url : window.location.href }, "*");
  }
  if(event.data.type && (event.data.type === 'CLEAR_LOCAL_STORAGE')){
    window.localStorage.clear();
    window.postMessage({type: 'CLEAR_LOCAL_RESULT', value:'success'});
  }
  if(event.data.type && (event.data.type === "MESSAGE_URL")){
   window.postMessage({type: 'MESSAGE_URL_RESULT', value:localStorage.getItem('url'), urlSaved});
  }

}


