/* global chrome */


var callback = function(details) {
  console.log('testing', details);
  chrome.tabs.query({active: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, {message:'load', data: details});
  });
  // chrome.tabs.sendMessage(tab.id, { message: 'background' });
}
  
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});


chrome.webRequest.onBeforeRequest.addListener(callback, {urls: [ "https://www.youtube.com/*" ]}, []);
