<template>
  <img v-bind:src="img" alt="" />

  <h1 class="text-center">OPERATIONS DEPARTMENT</h1>

  <div class="file">
    <div>
      <form @submit.prevent="onSubmit" enctype="multipart/form-data">
        <button type="button" class="btn btn-outline-primary">
          <router-link class="nav-link link-dark" to="/department"
            >BACK
          </router-link>
        </button>
        <div class="fields">
          <ops_download class="fields-sec"></ops_download>
        </div>
        <br />
      </form>
    </div>
    <div class="card-body">
      <div class="posted-image">
        <div>
          <span>Updated Documents </span>
        </div>
        <Details class="details-component" />
      </div>
    </div>
  </div>
</template>

<script>
import ops_download from "@/components/ops_download.vue";
import Details from "@/components/details.vue";

export default {
  components: {
    ops_download,
    Details,
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
.card-body {
  margin-left: 12em;
}
.fields-sec {
  width: 25em;
  margin-left: 4em;
  margin-top: 2em;
  border-radius: 0.5em;
}
.details-component {
  padding-right: 2em;
}
.text-center {
  font-size: 1.5em;
  font-family: lato;
}
</style>
