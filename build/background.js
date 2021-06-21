/* global chrome */

console.log('testing......');


var callback = function(details) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    console.log('testing', details, tabs[0].id);
    chrome.tabs.sendMessage(tabs[0].id, {type:'MESSAGE_URL', details: details.url});
  });
  // chrome.tabs.sendMessage(tab.id, { message: 'background' });
}
  
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});


chrome.webRequest.onBeforeRequest.addListener(callback, {urls: [ "*://track.flexlinks.com/conversiontracking.ashx?*" ]}, []);
