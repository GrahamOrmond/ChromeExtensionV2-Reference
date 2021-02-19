
// setup module pattern design
var extension = (function() {

    var websiteUrl = "https://localhost:44300";

    // control account actions
    var account = (function(){
        var login; // login actions
        var dashboard; // dashboard actions

        return {
            login: login,
            dashboard: dashboard,
        }
    })();

    // hides all the divs that are acting as pages
    function hideAllPages(){
        var pages = document.querySelectorAll('[id*="page"]')
        for (i = 0; i < pages.length; i++) {
            pages[i].style.display = "none";
        }
    }

    // startup function that determins what page to start showing
    function startUp(){
        hideAllPages();
        // check if the user has to login in
        chrome.storage.sync.get('oauth_token', function(data) { // get the token from storage
            // check to see if the token is the default value set on install
            oauth_token = data.oauth_token;
            if(oauth_token != ''){ // token is not the default value set
                account.dashboard.loadPage(); // load dashboard
            }else{ // default value set on install
                account.login.loadPage(); // get user to login
            }
        });
    }

    return {
        websiteUrl: websiteUrl,
        account: account,
        startUp: startUp,
        hideAllPages: hideAllPages,
    }
})();