<template>
  
  <form @submit.prevent="onSubmit" enctype="multipart/form-data">
    <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectFile">
    </div>
    
    <input ref="fileInput" type="file" @input="pickFile"   @change="onSelect"   >
  <br>
   <div class="fields">
        <button>Submit</button>
      </div><br>
      <div class="message">
        <h5>{{message}}</h5>
 
   </div>
   </form>
</template>
 
<script>
 import axios from 'axios';
    export default {
  name: 'FileUpload',
  data() {
    return {
      file:"",
      message:"",
      previewImage:null
    }
  },
  methods: { 
   selectFile () {
          this.$refs.fileInput.click()
      },
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result
          }
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      },

 onSelect(){
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png",".pdf,.doc"];
      const file = this.$refs.fileInput.files[0];
      this.file = file;
      if(!allowedTypes.includes(file.type)){
        this.message = "Filetype is wrong!!"
      }
      if(file.size>10000000){
        this.message = 'Too large, max size allowed is 500kb'
      }
    },

async onSubmit(){
      const formData = new FormData();
      formData.append('file',this.file);
      try{
        await axios.post('http://localhost:5000/upload',formData);
        this.message = 'Uploaded!!'
      }
      catch(err){
        console.log(err);
        this.message = err.response.data.error
      }
    }
  },
}
</script>
 
<style scoped>
.imagePreviewWrapper {
    width: 100%;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-color: grey;
    background-position: center center;
}
form {margin: auto;
  width: 100%;
  border: 3px solid green;
  padding: 10px;
  width: 50%;
   text-align: center
  }
</style>
  