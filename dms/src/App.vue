<template>
  <div>
  <div class="header">
    <div class="navbar-header">
      <div class="header-nav">
        <div class="nav-item">
          <router-link to="/home"> HOME </router-link>
        </div>
        <div class="nav-item">
          <router-link aria-current="page" to="/signin"> Signin </router-link>
        </div>
        <div class="nav-item">
          <router-link to="/admin_login"> Admin </router-link>
        </div>
      </div>
    </div>
 
      <div>
        <div>
          <div>
          <img
            alt="Vue logo"
            src="./assets/dms_logo.png"
            class="header-img"
          />
          </div>
          <hr />
          <h2>KDMS-SYSTEM</h2>
        </div>
      </div>
        <router-view />
        <div class="jumbotron text-center mb-0 fixed-bottom bg-dark text-white">
          <p>k-dms.co.ke</p>
        </div>
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
  background: linear-gradient(green, rgb(217, 237, 200));
}
.header-nav{
  display: flex;
  gap: 3em;
  margin-left: 4em;
  height: 100%;
}
.nav-item{
  text-decoration: none;
  font-style: normal;
  font-family: lato;
  font-size: 1em;
  color: whitesmoke;
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
  box-shadow: inset;
}
</style>
