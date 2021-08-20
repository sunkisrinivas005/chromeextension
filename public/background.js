/* global chrome */



var callback = function(details) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {type:'MESSAGE_URL', details: details.url});
  });
}
  
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.sendMessage(tab.id, { message: 'load' });
});


chrome.webRequest.onBeforeRequest.addListener(callback, {urls: [ "*://track.flexlinks.com/conversiontracking.ashx?*" ]}, []);
