/* global chrome */

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
  console.log(request, 'test....')
  main();
});

function main() {
  // eslint-disable-next-line no-undef
  const extensionOrigin = 'chrome-extension://' + chrome.runtime.id;
  // eslint-disable-next-line no-restricted-globals
  if (!location.ancestorOrigins.contains(extensionOrigin)) {
    // Fetch the local React index.html page
    // eslint-disable-next-line no-undef
    fetch(chrome.runtime.getURL('index.html') /*, options */)
      .then((response) => response.text())
      .then((html) => {
        const styleStashHTML = html.replace(/\/static\//g, `${extensionOrigin}/static/`);
        // eslint-disable-next-line no-undef
        $(styleStashHTML).appendTo('body');
      })
      .catch((error) => {
        console.warn(error);
      });
  }
}

window.addEventListener("message", function(event) {
  console.log(event, 'test....')
  // if (event.source !== window) return;
  onDidReceiveMessage(event);
});

async function onDidReceiveMessage(event) {
console.log(event, 'event....')
  if (event.data.type && (event.data.type === "GET_SID")) {
    window.postMessage({ type: "SID_RESULT", sid: localStorage.getItem("sid"), url : window.location.href }, "*");
  }
  if(event.data.type && (event.data.type === 'CLEAR_LOCAL_STORAGE')){
    window.localStorage.clear();
    window.postMessage({type: 'CLEAR_LOCAL_RESULT', value:'success'});
  }
}


