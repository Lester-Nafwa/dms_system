<template>
  <div class="signout">
    <p v-if="user">Customer:{{ user.email }}</p>
    <button class="ui pink submit button" @click="signout">Signout</button>
  </div>

  <div class="departments-list">
    <div class="dept-seg">
      <h1>Please Select Department</h1>
      <transition name="slide">
        <table class="table-item">
          <tr>
            <td class="td-data">Cs </td>
            <td>
              <router-link class="nav-link" to="/cs">
                Customer service
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="td-data">Ksh </td>
            <td>
              <router-link class="nav-link" to="/cash">
                Cash
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="td-data">Ops </td>
            <td>
              <router-link class="nav-link" to="/ops">
                Operations
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="td-data">RMs </td>
            <td>
              <router-link class="nav-link " to="/relations">
                Relationship
              </router-link>
            </td>
          </tr>
        </table>
      </transition>
    </div>
    <div class="card-body">
      <div v-if="user" class="alert alert-success" role="alert">
        You are logged in!
      </div>
    </div>
  </div>
  <hr />
  <footer>Copyright © 2022 k-DMS Kenya</footer>
</template>
<script>
import { getAuth, setPersistence, signOut } from "firebase/auth";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    var self = getAuth();
    setPersistence,
      function (user) {
        self.user = user;
      };
  },
  methods: {
    signout() {
      const auth = getAuth();
      signOut(auth).then((user) => {
        alert("Sucessiful signOut", user);
        this.$router.push("/login");
      });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2em;
}

.dept-seg {
  width: fit-content;
  margin-left: 2.5em;
  background: whitesmoke;
  border-radius: 1em;
  padding: 3em;
  margin-top: 3.5em;
  height: 20em;
  box-shadow: 4em;
  border: solid gray;
  font-size: 2em;
  font-family: lato;
  font-weight: 300;
}

.table-item {
  font: 1em;
}
.nav-link{
  margin-left: 1em;
}
.nav-link:hover{
color: green;
}
td{
font-size:0.8em;
}
.td-data{
  border-right: solid rgb(71, 66, 66) 0.3em;
  padding-right: 1em;
}
.departments-list {
margin-left: 30em; 
 
}
</style>
