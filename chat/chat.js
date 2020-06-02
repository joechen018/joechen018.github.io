function signup() {
  axios
    .post("http://localhost:5000/createUser", {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    })
    .then(
      (response) => {
        if (response.data.status == "success") login();
        else console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  return false;
}

function login() {
  let user_input = document.getElementById("username").value;
  let pass_input = document.getElementById("password").value;
  axios
    .post("http://localhost:5000/login", {
      username: user_input,
      password: pass_input,
    })
    .then(
      (response) => {
        if (response.data.status == "success") {
          document.cookie = "username=" + user_input;
          document.cookie = "token=" + response.data.token;
          console.log(document.cookie);
          // window.location.href = "./chat.html";
        }
      },
      (error) => {
        console.log(error);
      }
    );
  return false;
}

function connect_socket() {
  var socket = io("http://localhost:8000");
  socket.on("connect", function () {
    socket.emit("authenticate", {
      user: username,
      token: auth_token,
    });
  });

  socket.on("authenticated", function () {
    console.log("authenticated");
  });

  socket.on("unauthenticated", function () {
    console.log("unauthenticated");
    window.location.replace("https://princetonlivingwater.org");
  });
}
