 <template>

 
 
<h1 class="text-center">RELATIONSHIP DEPARTMENT</h1>
    <div class="file">
   <form @submit.prevent="onSubmit" enctype="multipart/form-data">
   <button type="button" class="btn btn-outline-primary"> <router-link class="nav-link link-dark" to="/department">BACK </router-link></button>
      <div class="fields">
         <download></download></div><br>

         </form>
     
</div>
<button type="button" class="btn btn-outline-dark">Dark</button>

</template>

 
<script>
import download from "@/components/download.vue";
 
 
export default {
  components: {
    download
  },
}
</script>