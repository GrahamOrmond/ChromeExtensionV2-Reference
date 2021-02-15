let action_button = document.getElementById("action_button") // get the action button that changes the page color

// set the buttons value to the storage color
chrome.storage.sync.get('color', function(data) { // get the color from storage
    action_button.style.backgroundColor = data.color; // set button background color
    action_button.setAttribute('value', data.color); // set button value
});
  

// add event listener to the button to change background color when clicked
action_button.onclick = function(element) {
    let color = element.target.value; // get the buttons set value
    
    document.getElementById("menu_title").style.color = color; // change menu title color

    // get active tab and change the background color the the set storage color
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // execute script that changes background color
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
};


