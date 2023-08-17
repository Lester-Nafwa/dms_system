<template>
  <div class="details-file">
  <div>  <div v-for="(file, index) in docfiles" :key="index">
      <a :href="serverUrl + file.url" target="_blank">{{ file.name }}</a>
      <button @click="openModal(serverUrl +file.url, isImage(file.name))">Preview</button>

    </div>
    </div>
    <div class="items-preview">
      <Preview :show="modalShow" :fileUrl="modalFileUrl" :isImage="modalIsImage" @close="closeModal" />

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
      modalFileUrl: "",
      modalIsImage: false,
    }
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
          console.log('try me',response.data);
         
        })
        
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    openModal(fileUrl, isImage) {
      this.modalFileUrl = fileUrl;
      this.modalIsImage = isImage;
      this.modalShow = true;
    },
    closeModal() {
      this.modalShow = false;
    },
    isImage(fileName) {
      const ext = fileName.split(".").pop().toLowerCase();
      return ["jpg", "jpeg", "png"].includes(ext);
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