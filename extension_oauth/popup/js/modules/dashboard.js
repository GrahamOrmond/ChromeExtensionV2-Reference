
// account dashboard actions
extension.account.dashboard = (function() {

    var endpoint = "/api/users"

    // loads the dashboard page
    function loadPage(){
        document.getElementById("dashboard_page").style.display = "block";
        getAccountInfo();
    }

    // get user info
    function getAccountInfo(){
        chrome.storage.sync.get('oauth_token', function(data) { // get the token from storage
            // check to see if the token is the default value set on install
            oauth_token = data.oauth_token;
            if(oauth_token == ''){
                extension.hideAllPages();
                extension.account.login.loadPage();
                return;
            }

            // setup request
            const req = new XMLHttpRequest();
            const url = extension.websiteUrl + endpoint + `/${oauth_token.user_id}`;
            console.log(url)

            console.log(oauth_token.user_id)
            console.log(oauth_token.access_token)

            // make request
            req.open("GET", url, true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.setRequestHeader("Authorization", "Bearer " + oauth_token.access_token);
            req.send();

            req.onreadystatechange = function() { // Call a function when the state changes.
                console.log("ran")
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) { // successful request
                    // store the token from the request in the storage
                    userInfo = JSON.parse(this.responseText);
                    console.log(userInfo)
                    document.getElementById("userId").innerHTML = `userId: ${userInfo.userId}`;
                    document.getElementById("firstName").innerHTML = userInfo.firstName;
                    document.getElementById("lastName").innerHTML = userInfo.lastName;
                    document.getElementById("email").innerHTML = userInfo.email;
                }
            }
        });
    }

    return {
        loadPage: loadPage,
    }
})();