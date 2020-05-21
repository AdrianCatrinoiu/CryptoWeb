function updateTextInput(val) {
  document.getElementById("age").value = val;
}
function getUserData() {
  let username = document.getElementById("username").value;
  console.log(username);
  let email = document.getElementById("email").value;
  console.log(email);
  let password = document.getElementById("password").value;
  console.log(password);
  let experience = document.getElementById("experience").value;
  console.log(experience);
  let gender = Array.from(document.getElementsByName("gender")).find(
    (r) => r.checked
  ).value;

  let age = document.getElementById("age").value;
  console.log(age);
  alert("The value of the radio button is: " + gender);
  document.getElementById("demouser").innerHTML = "Nume:" + username;
  document.getElementById("demoemail").innerHTML = email;
  document.getElementById("demoparola").innerHTML = password;
  document.getElementById("demoexp").innerHTML = experience;
  document.getElementById("demosex").innerHTML = gender;
  document.getElementById("demovarsta").innerHTML = age;
}
