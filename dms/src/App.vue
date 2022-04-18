<template>
 <nav class="navbar navbar-expand-lg navbar-light bg-dark">
   <div class="d-flex flex-row-reverse">
   
<button class="nav-item">  <router-link  to="/home">
             HOME 
          </router-link> </button> 
   <button class="nav-item">  <router-link  aria-current="page" to="/signin">
            Signin   
          </router-link>  </button>  
       <button class="nav-item">  <router-link  to="/admin_login">
             Admin  
          </router-link> </button> 

          </div>
          </nav>  
           <section>
           <div :style="image" class="image">
 
          <div class="text-center">
            <img alt="Vue logo" src="./assets/dms_logo.png" width="100" height="100"><hr>

         <h2> KDMS-SYSTEM</h2>


         </div>
   <router-view/>
   <div class="jumbotron text-center mb-0 fixed-bottom bg-dark text-white">
 <p>k-dms.co.ke</p> 

</div>
 </div>
  </section>
</template>
<script>
        

    export default {
        data() {
            return {
                image: {backgroundImage: "url(https://via.placeholder.com/150)"}
          
            };
        }
    };
 
</script>
<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
 
 