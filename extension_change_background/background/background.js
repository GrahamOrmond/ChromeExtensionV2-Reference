/*
    EVERYTHING IN THIS FILE RUNS ON BROWSER START UP
*/

// run on install only event listener
chrome.runtime.onInstalled.addListener(function() {

  // set the default color in storage to green
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('Color set to green');
  });

  // setup chrome extension button to open popup html page
  // declarativeContent allows showing popup without the need for permissions for the active tab
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({ // set extension to be available for a specific url only
        pageUrl: {hostEquals: 'developer.chrome.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()] // display popup html page
    }]);
  });
});