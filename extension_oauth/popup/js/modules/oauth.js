
// account login actions
extension.account.login = (function() {

  var oauthEndpoint = "/oauth/authorize";
  var tokenEndpoint = "/oauth/token";
  var redirectUri = "https://lfeejdckcpknlcodidoffjbgdhcfpajm.chromiumapp.org/";

  // load the login page
  function loadPage(){
    document.getElementById("login_page").style.display = "block";
  }

  // get the user to loggin with authentication code grant
  function loginAccount(){
    // create parameters
    const auth_params = {
      client_id: 'self',
      redirect_uri: redirectUri,
      response_type: 'code',
      scope: 'user',
    };

    // create url and make oauth request
    let authURL = extension.websiteUrl + oauthEndpoint; // oauth endpoint
    authURL += '?' + Object.keys(auth_params).map(key => key + '=' + auth_params[key]).join('&'); // add parameters to request
    chrome.identity.launchWebAuthFlow({url: authURL, interactive: true}, function(token) { getAuthToken(token); });
  }

  // gets oauth token from call back url after login
  function getAuthToken(callbackUrl){
    // get oauth code from url
    var codeGrantUrl = new URL(callbackUrl);
    var oauthCode = codeGrantUrl.searchParams.get("code");

    // setup request for tokens 
    const req = new XMLHttpRequest();
    const tokenUrl = extension.websiteUrl + tokenEndpoint;
    const urlParams = `grant_type=code&client_id=self&redirect_uri=${redirectUri}&code=${oauthCode}`;

    // make token request
    req.open("POST", tokenUrl, true);
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.send(urlParams);

    req.onreadystatechange = function() { // Call a function when the state changes.
      if (this.readyState === XMLHttpRequest.DONE && this.status === 200) { // successful request
        // store the token from the request in the storage
        token = JSON.parse(this.responseText); 
        chrome.storage.sync.set({"oauth_token": token}, function() {
        })
        extension.hideAllPages();
        extension.account.dashboard.loadPage();
      }
    }
  }

  return {
    loadPage: loadPage,
    loginAccount: loginAccount,
  }
})();
