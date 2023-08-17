<template>
    <div class="file-modal" v-if="show">
      <div class="modal-content">
        <span class="close-btn" @click="closeModal">&times;</span>
        <template v-if="isImage">
          <img :src="fileUrl" alt="File Preview" class="image-dimensions"/>
        </template>
        <template v-else>
          <iframe :src="fileUrl" width="100%" height="620em" frameborder="0"></iframe>
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
  width: 30em;
  height: 38em;
}

</style>