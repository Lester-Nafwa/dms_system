<template>
 <div class="header">
        <h1 class="modal-title text-center"> Register User </h1>
       </div>
       <button type="button" class="button btn-outline-primary"> <router-link class="nav-link link-dark" to="/admin">BACK </router-link></button>
      <div class="modal-body">
        <form @submit.prevent="register( this.email, this.password )">
          <!-- mail --> 
          <div class="input-group mb-3">
          <span class="input-group-text"/>
          <input v-model="email" 
                  type="email"
                  required="true"
                  class="form-control"
                  placeholder="email">
          </div><br>
          <!-- PASSWORD --> 
          <div class="input-group mb-3">
          <span class="input-group-text"/>
          <input v-model="password" 
                  type="password"
                  required="true" 
                  class="form-control"
                  placeholder="password">
          </div>
          <div class="d-grid gap-2">
            <button type="submit" 
              class="btn btn-primary" 
              data-bs-dismiss="modal"><!-- Close the modal --> 
             Create User
            </button>
          </div>
          </form>
      </div>
    
</template>


<script>
 
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth' 

export default {
  name: 'app',
   data() {
        return {
            email: '',
            password: '',
             
        };
    },
   methods: {
     register(email, password) {
        const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      alert("User Created: ", user);
       this.$router.push('/signin')
     })
         

  .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error occured: ", errorCode, errorMessage);
      });
 }, 
}
}    

</script>

 
<style scoped>

 form {margin: auto;
  width: 100%;
  border: 3px solid green;
  padding: 10px;
  width: 50%;
   text-align: center
}
 
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}
.button {
  background-color: #04AA6D;
  color: white;
  padding:   10px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 10%;
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

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 50%;
  }
}
</style>