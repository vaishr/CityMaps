/// <reference path="./typings/tsd.d.ts"/>

function initial() {
  const ref = new Firebase("https://fiery-heat-2958.firebaseio.com");

  const gmailOpts = {
    remember: "sessionOnly",
    scope: "email"
  };

  const gmailOnSignin = (error: Error) => {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      // We"ll never get here, as the page will redirect on success.
    }
  };

  $("#signingoogle").on("click", () => {
    ref.authWithOAuthRedirect("google", gmailOnSignin, gmailOpts);
  });
}

document.addEventListener("DOMContentLoaded", initial);
