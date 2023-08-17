<template>
  <div class="details-file">
  <div class="items-buttons">  <div v-for="(file, index) in docfiles" :key="index">
      <a :href="serverUrl + file.url" target="_blank">{{ file.name }}</a>
   <div>   <button @click="openModal(serverUrl +file.url, isImage(file.name))" class="btn-preview">Preview</button></div>

    </div>
    </div>
    <div class="items-preview">
      <Preview :show="modalShow" :fileUrl="modalFileUrl" :isImage="modalIsImage" @close="closeModal"  class="list-items"/>

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
  padding: 1em;
  display: flex;
  gap: 2em
 
}
.items-preview{
  height: 40em;
  width: 34em;
  background: #e9e2e2;
}
 
 .items-buttons{
  background:whitesmoke;
  border: solid grey;
  padding-left: 1em;
  padding-top: 0.5em;
 }
 .btn-preview{
  color: white;
  background:green;
  outline: none;
  border-radius: 0.6em;
  width: 5em;
  font-size: 0.8em;
  font-style: lato;
 }
</style>