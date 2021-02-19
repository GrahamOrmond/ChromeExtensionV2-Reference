
extension.startUp();

/*
*   add function to login page
*/

// add onclick to login button
let loginButton = document.getElementById("login_button");
loginButton.addEventListener('click', function() {
    chrome.storage.sync.get('oauth_token', function(data) { // get the token from storage

        // check to see if the token is the default value set on install
        oauth_token = data.oauth_token;
        if(oauth_token != ''){ // token is not the default value set
            // user is already logged in
            console.log("already logged in");
            console.log(oauth_token);
            extension.hideAllPages();
            extension.account.dashboard.loadPage();
        }else{ // default value set on install
            extension.account.login.loginAccount();
        }
    });
});


/*
*   add function to dashboard page
*/