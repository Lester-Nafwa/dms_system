<template>
  <div>
    <div v-for="(file, index) in imageFiles" :key="index">
  
      <div>{{ file.name }}</div>
       
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageFiles: [],
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/api/upload/data")
        .then(response => {
          this.imageFiles = response.data.files.map(file => ({
            name: file,
            url: `http://localhost:3000//uploads/${file}`,
          }));
          console.log('try me',response.data)
        })
        
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>
