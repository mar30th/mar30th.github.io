function signUp(event) {

  var name = document.getElementById("floatingInput signup-name").value;
  var password = document.getElementById("floatingPassword password").value;
  var repassword = document.getElementById("floatingPassword repassword").value;
  var mail = document.getElementById("floatingInput signup-email").value;
  var date = document.getElementById("day").value;
  var month = document.getElementById("month").value;
  var year = document.getElementById("years").value;
    if (password != repassword) {
      alert ("Error! Re-enter confirm password");
      event.preventDefault()
    }
    if (date == "none" ) {
      if (month == "none") {
        if (year == "none") {
          alert ("please confirm your date of birth");
          event.preventDefault();

        }
      }
    }
    
    else {
      alert ("Creating account succsessfully" + "\n" + 
            "Your account info: " + "\n" + 
            "Name: " + name + "\n" + 
            "Email:" + mail + "\n" + 
            "Date of birht " + date + "/ " + month + "/ " + year);
    }
  console.log(typeof date)
  sessionStorage.setItem("signMail", mail);
  sessionStorage.setItem("signPass", password);
  }
  
function signIn(event) {
  var signiMail = document.getElementById("floatingInput signin-mail").value;
  var signinPass = document.getElementById("floatingPassword signin-pass").value;
  var umail = sessionStorage.getItem("signMail");
  var upass = sessionStorage.getItem("signPass");
  if(signiMail != umail || signinPass != upass) {
    alert ("This account does not exist")
    event.preventDefault();
  } else {
    alert ("Login successfully");
  }
}