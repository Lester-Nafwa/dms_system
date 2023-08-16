<template>
    <span>Preview Files</span>
<div class="image-modal" v-if="show">
    <div class="modal-content">
      <span class="close-btn" @click="closeModal">&times;</span>
      <img :src="imageUrl" alt="Image" />
    </div>
  </div>

</template>
<script>
export default {
  props: {
    imageUrl: String,
    show: Boolean,
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};


</script>