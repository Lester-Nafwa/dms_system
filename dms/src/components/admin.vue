<template>
 
 

<!-- Sidebar navigation -->
<div class="container-fluid">
  <div class="row">
    <nav class="col-md-2 d-md-block bg-light sidebar vh-100" style="margin-top: 60px;">
      <div class="sidebar-sticky">
        <ul class="nav flex-column">
         
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/register">
             Create User
          </router-link> 
          </li>
          
          <li class="nav-item">
           
            <router-link class="nav-link link-dark" to="/Addstaff">
             Add Staff
           </router-link>
          </li><br>
         
          <li class="nav-item">
            <router-link class="nav-link link-dark" to="/stafflist">
             Members List
          </router-link> 
          </li>
          
        </ul>
      </div>
      
    </nav>
    <!-- Main content -->
    <main role="main" style="margin-top: 50px;" class="col-md-9 ml-sm-auto col-lg-10 px-4">
      <div class="inner-adjust">
        <!-- Use router template to show the components for which router service is activated -->
         <router-view />
      </div>
    </main>
  </div>
</div>
<div class="jumbotron text-center mb-0 fixed-bottom bg-dark text-white">
 <p>k-dms.co.ke</p> 
</div>

</template>
 


<style scoped>

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>