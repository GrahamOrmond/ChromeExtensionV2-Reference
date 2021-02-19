
// run on install only event listener
chrome.runtime.onInstalled.addListener(function() {
  
  // set the access_token storage to empty (default value)
  chrome.storage.sync.set({"oauth_token": ''}, function() {
    console.log("default token value set")
  })
});