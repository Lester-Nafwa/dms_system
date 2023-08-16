<template>
  <div>
    <div v-for="(file, index) in docfiles" :key="index">
      <a :href="serverUrl + file.url" target="_blank">{{ file.name }}</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      docfiles: [],
      serverUrl: "http://localhost:3000",
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
  },
};
</script>
