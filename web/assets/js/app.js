  // [START get_messaging_object]
  // Retrieve Firebase Messaging object.
console.log("sessionStorage.status: "+sessionStorage.status);
const messaging = firebase.messaging();

  // [END get_messaging_object]

  // IDs of divs that display Instance ID token UI or request permission UI.
  var myToken="";
  // [START refresh_token]
  // Callback fired if Instance ID token is updated.
  messaging.onTokenRefresh(function() {
      messaging.getToken()
          .then(function(refreshedToken) {
              console.log('Token refreshed.');
              // Indicate that the new Instance ID token has not yet been sent to the
              // app server.
              setTokenSentToServer(false);
              // Send Instance ID token to app server.
              sendTokenToServer(refreshedToken);
              // [START_EXCLUDE]
              // Display new Instance ID token and clear UI of all previous messages.
              resetUI();
              // [END_EXCLUDE]
          })
          .catch(function(err) {
              console.log('Unable to retrieve refreshed token ', err);
              showToken('Unable to retrieve refreshed token ', err);
          });
  });
  // [END refresh_token]

  // [START receive_message]
  // Handle incoming messages. Called when:
  // - a message is received while the app has focus
  // - the user clicks on an app notification created by a sevice worker
  //   `messaging.setBackgroundMessageHandler` handler.
  messaging.onMessage(function(payload) {
      console.log("Message received. ", payload);
	  console.log(payload.data.access_token);
	  console.log(payload.data.status);
	  if(payload.data.status == "authenticated")
	  { 
		sessionStorage.access_token = payload.data.access_token;  
		sessionStorage.status = 1;
	   	location.href="incidents.html";
	  }
	  else
	  {
		  sessionStorage.status = 0;
		  $('#loginMessage').show();
		  $('#loginMessage').html("Invalid User");
	  }
   
  });

  // [END receive_message]

  function resetUI() {
      // [START get_token]
      // Get Instance ID token. Initially this makes a network call, once retrieved
      // subsequent calls to getToken will return from cache.
      messaging.getToken()
          .then(function(currentToken) {
              if (currentToken) {
                  sendTokenToServer(currentToken);
                  console.log("TOKEN: "+currentToken)
				  myToken=currentToken;
              } else {
                  // Show permission request.
                  console.log('No Instance ID token available. Request permission to generate one.');
                  setTokenSentToServer(false);
				  requestPermission()
				  
              }
          })
          .catch(function(err) {
              console.log('An error occurred while retrieving token. ', err);
              setTokenSentToServer(false);
          });
  }
  // [END get_token]



  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  function sendTokenToServer(currentToken) {
      if (!isTokenSentToServer()) {
          console.log('Sending token to server...');
          // TODO(developer): Send the current token to your server.
          setTokenSentToServer(true);
      } else {
          console.log('Token already sent to server so won\'t send it again ' +
              'unless it changes');
      }

  }

  function isTokenSentToServer() {
      return window.localStorage.getItem('sentToServer') == 1;
  }
sessionStorage.status == 0
  function setTokenSentToServer(sent) {
      window.localStorage.setItem('sentToServer', sent ? 1 : 0);
  }



  function requestPermission() {
      console.log('Requesting permission...');
      // [START request_permission]
      messaging.requestPermission()
          .then(function() {
              console.log('Notification permission granted.');
              // TODO(developer): Retrieve an Instance ID token for use with FCM.
              // [START_EXCLUDE]
              // In many cases once an app has been granted notification permission, it
              // should update its UI reflecting this.
              resetUI();
              // [END_EXCLUDE]
          })
          .catch(function(err) {
              console.log('Unable to get permission to notify.', err);
          });
      // [END request_permission]
  }

  function deleteToken() {
      // Delete Instance ID token.
      // [START delete_token]
      messaging.getToken()
          .then(function(currentToken) {
              messaging.deleteToken(currentToken)
                  .then(function() {
                      console.log('Token deleted.');
                      setTokenSentToServer(false);
                      // [START_EXCLUDE]
                      // Once token is deleted update UI.
                      resetUI();
                      // [END_EXCLUDE]
                  })
                  .catch(function(err) {
                      console.log('Unable to delete token. ', err);
                  });
              // [END delete_token]
          })
          .catch(function(err) {
              console.log('Error retrieving Instance ID token. ', err);
          });

  }



  resetUI();
