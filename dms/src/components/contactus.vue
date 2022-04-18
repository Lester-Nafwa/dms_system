  <template>
  <section>
    <div class="form-container">
        <p>Contact Us</p>
        <form class="form" ref="form"  @submit.prevent="sendMail" >
          <div class="form-group">
            <input name="from_name" placeholder="name" type="text" :value="inputFieldReset" required>
          </div>
          <div class="form-group">
            <input name="email" placeholder="email" type="email" :value="inputFieldReset" required>
          </div>
          <div class="form-group">
            <input  name="subject" placeholder="subject" type="text" :value="inputFieldReset" required>
          </div>
          <div class="form-group">
            <textarea class="text-area" name="message" placeholder="message" type="text" :value="inputFieldReset" required></textarea>
          </div>
          <div class="form-group">
            <input class="submit" type="submit" name="send" />
          </div>
        </form>
      </div>
  </section>
</template> 



<script>
import emailjs from 'emailjs-com';
import {ref} from 'vue';

export default {
  setup() {
    const form = ref(null);
    const inputFieldReset = ref(null);

    const sendMail = () => {
      emailjs.sendForm('gmail', 'template_8dvidkl', form.value, 'oPsl26UV898nlG8m0')
      .then(() => {
        alert('Message sent!');
         inputFieldReset.value = ""; 
      }, (error) => {
        alert('Message not sent', error);
      });
     
    }

    return{
      sendMail,
      form,
      inputFieldReset
    }
  }
}
</script>

<style>

</style>


<style scoped>
* {box-sizing: border-box;}

.form-container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
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
</style>