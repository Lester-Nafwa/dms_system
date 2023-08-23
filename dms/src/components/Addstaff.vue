<template>
 
    <div class="Add">
              <button type="button" class="btn btn-outline-primary"> <router-link class="nav-link link-dark" to="/admin">BACK </router-link></button>
        <h2 class="text  text-center">Add New Member</h2>
            <form @submit.prevent="onFormSubmit">
                <div class="form-group">
                    
                    <input type="text" class="form-control" placeholder ="Name" v-model="user.name" required>
                </div><br>

                <div class="form-group">
                    
                    <input type="email" class="form-control" placeholder ="Email" v-model="user.email" required>
                </div><br>

                <div class="form-group">
                
                    <input type="text" class="form-control" placeholder ="Phone Number"  v-model="user.phone" required>
                </div><br>

                <div class="form-group">
                    <button class="btn btn-primary btn-block">Add User</button>
                </div><br>
            </form>
        </div>
    
</template>

<script>
    import { db } from '../../firebase/firebase';

    export default {
        data() {
            return {
                user: {
                }
            }
        },
        methods: {
            onFormSubmit(event) {
                event.preventDefault()
                db.collection('users').add(this.user).then(() => {
                    alert("User successfully created!");
                    this.user.name = ''
                    this.user.email = ''
                    this.user.phone = ''
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
</script>



<style scoped>
.Add {margin: auto;
  width: 100%;
  border: 3px solid green;
  padding: 10px;
  width: 50%;
   text-align: center
}

button {
  width: 50%;
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

div {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

</style>