const buttonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1']; // option colors

// function for creating options
function constructOptions(buttonColors) {
  for (let colorOption of buttonColors) { // loop through all colors
    
    let button = document.createElement('button'); // create button
    button.style.backgroundColor = colorOption; // set button color

    // create on click action that changes the color in the storage
    button.addEventListener('click', function() {
      chrome.storage.sync.set({color: colorOption}, function() {
        document.getElementById("confirmation_text").innerHTML = `Color changed!` // show confirmation message
      })
    });

    document.getElementById('buttonDiv').appendChild(button); // add button to page
  }
}

constructOptions(buttonColors);