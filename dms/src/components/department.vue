<template>
 
    <div> <p v-if="user">Customer:{{user.email}}</p>
                <button class="ui pink submit button" @click="signout">Signout</button>
            </div>
 <h1> Please Select Department</h1>
    <transition name="slide">
 
<table class="table table-striped table-hover">
 
  
  <tr>
    <td>cs </td>
    <td><router-link class="nav-link link-dark" to="/cs">
             Customer_Service
          </router-link></td>
   
  </tr>
  <tr>
    <td>Ksh</td>
    <td><router-link class="nav-link link-dark" to="/cash">
             Cash
          </router-link></td>
     
  </tr>
  <tr>
    <td>Ops</td>
    <td><router-link class="nav-link link-dark" to="/ops">
             Operations
          </router-link></td>
 
  </tr>
  <tr>
    <td>RMs</td>
    <td><router-link class="nav-link link-dark" to="/relations">
             Relationship
          </router-link></td>
 
  </tr>
  
</table>
   </transition>
   <div class="card-body">
 <div v-if="user" class="alert alert-success" role="alert">You are logged in!</div>
          </div> 
<hr>
<footer> Copyright © 2022  k-DMS Kenya </footer>
</template> 
<script>
import { getAuth, setPersistence,  signOut} from 'firebase/auth' 
export default {
    data() {
        return {
            user: null
        };
    },
    created() {
        var self = getAuth();
         setPersistence,(function(user) {
            self.user = user;
        });
    },
    methods: {
        signout() {
            const auth = getAuth();
          signOut(auth)
        .then(user => {
                   alert("Sucessiful signOut", user);
                    this.$router.push("/login");
                });
        }
    }
};
</script>
 
 
 
 
