
document.getElementById("login-btn").addEventListener("click", function(){
   const numberUser = document.getElementById("input-user");
   const inputNumber = numberUser.value;
     console.log(inputNumber);

     const inputPin = document.getElementById("input-pin");
     const inputPassword = inputPin.value;
     console.log(inputPassword);

     if(inputNumber == "admin" && inputPassword== "admin123"){
      alert("login Successfull")

      window.location.assign("./home.html")
     }

     else{
      alert("Login Failed")
      return;
     }
});