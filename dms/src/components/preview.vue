<template>
    <div class="file-modal" v-if="show">
      <div class="modal-content">
      <img src="/img-resources/close.svg" class="close-btn" @click="closeModal"> 
        <template v-if="isImage">
          <img :src="fileUrl" alt="File Preview" class="image-dimensions"/>
        </template>
        <template v-else>
          <iframe :src="fileUrl" width="100%" height="600em" frameborder="1"></iframe>
        </template>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      fileUrl: String,
      show: Boolean,
      isImage: Boolean,
    },
    methods: {
      closeModal() {
        this.$emit("close");
      },
    },
  };
  </script>
  <style>

.image-dimensions{
  height: 35em;
  padding: 1em;
  width:34em
}
.close-btn{
  height: 2em;
  width: 2em;
  background: #f1ecec;
  border: solid grey;
  color: black;
  margin-left: 0.4em;
  margin-top: 0.3em;
  margin-bottom: 0.2em;
  border-radius: 3em;
  align-items: center;
  padding: 0.3em;
}

</style>