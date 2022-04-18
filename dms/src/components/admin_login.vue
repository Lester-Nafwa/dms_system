 <template>
 
      <div class="header">
        <h1 class="text-center"> Admin login </h1>
         
      </div>
      <div class="body">
        <form @submit.prevent="login( this.email, this.password )">
          
          <div class="input-group">
          <input v-model="email" 
                  type="email"
                  required="true"
                  class="form-control"
                  placeholder=user email>
          </div><br>
           
          <div class="input-group">
        
          <input v-model="password" 
                  type="password"
                  required="true" 
                  class="form-control"
                  placeholder="password">
          </div>
          <div class="submit">
            <button type="submit" 
              class="btn btn-primary" 
              data-bs-dismiss="modal"> 
             Log in
            </button>
          </div>
          </form>
      </div>
   
</template>


<script>
 
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth' 

export default {
  name: 'app',
   data() {
        return {
            email: '',
            password: '',
             
        };
    },
   methods: {
     login(email, password) {
        const auth = getAuth();
       signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
      alert("Singed in user: ", user);
       this.$router.push('/admin')
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