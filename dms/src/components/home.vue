  <template>
 <nav class="navbar navbar-dark text-white fixed-top bg-dark  ">
     
<div class="dropdown">
    <input type="search" class="w-full ..." autocomplete="off" placeholder="Search" />
<button>submit</button>
  </div>  
<button>Home</button>
 <button>About Us</button>
 <button >Contact Us</button>
  <button >Our Team</button>
</nav>
 
<marquee>   {{ fulldatetime }}</marquee>
     
<!-- Sidebar navigation -->
<div class="container-fluid">
  <div class="row">
     <!-- Main content -->
    <main role="main" style="margin-top: 50px;" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="inner-adjust">
        <!-- Use router template to show the components for which router service is activated -->
         <router-view />
      </div>
    </main>
  </div>
</div>
<div>
 
  <table class="table">
  
  <tbody>
    <tr>
     
      <td>  <iframe width="560" height="315" src="https://www.youtube.com/embed/1B_jZGhuBdU" title="YouTube video player" frameborder="0" ></iframe></td>
      <td><h3> Why K-Dms</h3><br>
       K-DMS Provide the most compliant and secure environment for the transfer of protected health information. Improve ROI workflow efficiency and streamline medical exchange information processes. Consolidate release and distribution management. 

      </td>
    </tr>
  </tbody>
</table>
 
 </div>
      <table class="table table-striped">
  <thead>
     <td colspan="4">
     <marquee>     Our Tarrifs </marquee>
   
    </td>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Corporates</td>
      <td>Individuals</td>
      <td>Package</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>USD 120</td>
      <td>USD 10</td>
      <td>Monthly</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>USD 900</td>
      <td>USD 200 </td>
      <td>Annual</td>
    </tr>
  </tbody>
</table><contactus/>
<div class="jumbotron text-center mb-0 fixed-bottom bg-dark text-white">
 <p>k-dms.co.ke</p> 

</div>

</template>
 <script>
 import contactus from "@/components/contactus.vue";
     export default {
     components: {
    contactus
  },

        name: "DateComponent",
        data: () => ({
         name: '',
      email: '',
      message: '',
           
      fulldatetime: ''
    
        }),
        methods: {
      

   printFullDate: function(){
            return new Date();
          }
        },

        mounted: function () {
          this.fulldatetime = this.printFullDate();
        },
   
    };
    
</script>

 

<style scoped>

* {box-sizing: border-box;}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding-left: 20px;
  width: 50%;
}

label {
  float: left;
}

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}
form {margin: auto;
  width: 100%;
  border: 3px solid green;
  padding: 10px;
  width: 50%;
  text-align: center
}

</style>

