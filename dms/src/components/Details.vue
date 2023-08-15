 <template>
  <div>
    <img :src="imageUrl" alt=""/>
    <div>{{ name }}</div>
    <div>{{ date }}</div>
    <img :src="imageUrl" alt="Image" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      imageUrl: '', 
      name: 'file.name',     
      
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios.get("http://localhost:3000/api/upload/data")
        .then(response => {
          this.imageUrl = response.data.imageUrl;
          this.name = response.data.name;
          this.date = response.data.date;
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
  },
};
</script>
