<template>
  <div>
  <div class="header">
    <div class="navbar-header">
      <div class="header-nav">
        <div class="nav-item">
          <router-link to="/home"> Home </router-link>
        </div>
        <div class="nav-item">
          <router-link  to="/signin"> SignIn </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/admin_login"> Admin </router-link>
        </div>
      </div>
    </div>
 
      <div class="header-details">
        <div>
          <div>
          <img
            alt="Vue logo"
            src="./assets/dms_logo.png"
            class="header-img"
          />
          </div>
          <div class="k-dms-sub">
          <span>KDMS-SYSTEM</span>
          </div>
        </div>
      </div>
      <hr />
    </div>
        <router-view />
        <div class="jumbotron text-center mb-0 fixed-bottom bg-dark text-white">
          <p>k-dms.co.ke</p>
        </div>
      </div>
 
  
</template>
<script>
export default {
  data() {
    return {};
  },
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
button {
  border-radius: 2em;
  border: none;
}
.header {
  background: linear-gradient(green, white);
}
.header-nav{
  display: flex;
  gap: 3em;
  margin-left: 4em;
  height: 100%;
}
.nav-item router-link{
  text-decoration: none;
  font-style: normal;
  font-family: lato;
  font-size: 1em;
  color: whitesmoke;
  font-style: oblique;
}
.header-img{
  width:6em;
  height: 5em;
}
.navbar-header{
  background:rgb(1, 28, 1);
  z-index: 100;
  height: 4em;
  padding-top: 1em;
  border-bottom: whitesmoke;
  box-shadow:2em;
}
.header-details{
  margin-left: 45%;
  margin-top: 1.5em;
}
.k-dms-sub{
  margin-left: -1.5em;
  font-size: 1.3em;
}
</style>
