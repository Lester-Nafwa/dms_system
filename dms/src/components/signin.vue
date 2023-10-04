<template>
  <div class="header-sign">
    <span class="sign-header">Please Sign in to Continue</span>
  </div>
  <div class="body-signin">
    <form @submit.prevent="login(this.email, this.password)">
      <div class="input-group">
        <input
          v-model="email"
          type="email"
          required="true"
          class="form-control"
          placeholder="user"
          email
        />
      </div>
      <br />

      <div class="input-group">
        <input
          v-model="password"
          type="password"
          required="true"
          class="form-control"
          placeholder="password"
        />
      </div>
      <div class="submit">
        <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">
          Log in</button
        ><br />
        <router-link to="/forgetpass"> Forgot Password...? </router-link>
      </div>
    </form>
  </div>
  <router-view />
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "app",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(email, password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Sucessiful signin", user);

          this.$router.push("/department");
        })

        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log("An error occured: ", errorCode, errorMessage);
        });
    },
  },
};
</script>

<style scoped>
form {
  margin: auto;
  width: 100%;
  border: 3px solid green;
  border-radius: 1em;
  padding: 10px;
  width: 50%;
  text-align: center;
}

button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 50%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}
.sign-header{
  font-size: 1.2em;
  font-family: lato;
  font-weight: 400;
  margin-left:-2em;
}
.header-sign{
text-align: center;
margin-left:-2em;
}
/* Change styles for span and cancel button on extra small screens */
</style>
