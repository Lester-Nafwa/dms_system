<template>
  <div class="details-file">
  <div>  <div v-for="(file, index) in docfiles" :key="index">
      <a :href="serverUrl + file.url" target="_blank">{{ file.name }}</a>
      <button @click="openModal(file.url)">Preview</button>
    </div>
    </div>
    <div class="items-preview">
    <Preview :show="modalShow" :imageUrl="modalImageUrl" @close="closeModal"  />
    </div>
  </div>
</template>
 
<script>
import axios from "axios";
import Preview from "@/components/preview.vue"; 

export default {
  components: {
    Preview,
  },
  data() {
    return {
      docfiles: [],
      serverUrl: "http://localhost:3000",
      modalShow: false,
      modalImageUrl: "",
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/api/upload/data")
        .then(response => {
          this.docfiles = response.data.files.map(file => ({
            name: file,
            url: `/uploads/${file}`,
          }));
          console.log('try me',response.data)
        })
        
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    openModal(imageUrl) {
      this.modalImageUrl = imageUrl;
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
  },
};
</script>
<style>
.details-file{
  width: fit-content;
  height: fit-content;
  background:linear-gradient(white,rgb(213, 195, 195));
  padding: 1em;
  display: flex;
  gap: 2em
 
}
.items-preview{
  height: 40em;
  width: 15em;
}
</style>