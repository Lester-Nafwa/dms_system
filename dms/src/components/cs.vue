<template>
  <img v-bind:src="img" alt="" />

  <h1 class="text-center">CUSTOMER SERVICE DEPARTMENT</h1>

  <div class="file">
    <div>
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <div class="btn-back"> 
        <button type="button" class="btn btn-outline-primary">
          <router-link class="nav-link" to="/department"
            >BACK
          </router-link>
        </button>
      </div>
        <div class="fields">
          <cs_downloads class="fields-sec"></cs_downloads>
        </div>
        <br />
      </form>
    </div>
    <div class="card-body">
      <div class="posted-image">
        <div>
          <span class="cs_update-head">Updated Documents </span>
        </div>
        <Csdetails  class="details-component"/>
      </div>
    </div>
  </div>
</template>

<script>
import cs_downloads from "@/components/cs_downloads.vue";
import Csdetails from "@/components/csdetails.vue";

export default {
  components: {
    cs_downloads,
    Csdetails,
  },
  data() {
    return {
      img: "assets/back.png",
    };
  },
};
</script>
<style scoped>
.file {
  display: flex;
}
.card-body{
  margin-left: 12em;
}
.fields-sec{
  width: 25em;
  margin-left: 4em;
  border-radius: 0.5em;
  height:35em ;
}
.details-component{
  padding-right: 2em;
  
}
 .text-center{
  font-size: 1.5em;
  font-family: lato;
 }
 .cs_update-head{
font-size: 1.5em;
margin-left: 1em;
margin-bottom: 0.3em;
 }
 .btn-back{
  margin-left: 4em;
  margin-bottom: 1em;
 }
</style>
