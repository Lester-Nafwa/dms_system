<template>
    <div class="details-file">
      <div class="items-buttons">
        <div class="sect-search">
          <div class="search-items">
            <div> <input type="text" placeholder="Search File" class="search-input" /> </div>
            <div> <img src="/img-resources/manage_search.svg" alt="" class="search-icons" /></div>
          </div>
        </div>
        <div v-for="(file, index) in docfiles" :key="index">
  
          <a :href="serverUrl + file.url" target="_blank" class="details-get">{{ file.name }}</a>
          <div class="buttons-opts">
            <div>
              <button @click="openModal(serverUrl + file.url, isImage(file.name))" class="btn-preview">
                Preview
              </button>
            </div>
            <div><button class="delete-btn">Delete</button></div>
            <div>
              <button class="share-icon">
                <div>
                  <img src="/img-resources/share-icon.svg" class="share" />
                </div>
                <div>Share</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="items-preview">
        <Preview :show="modalShow" :fileUrl="modalFileUrl" :isImage="modalIsImage" @close="closeModal" class="list-items" />
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
        selectedFileType: "cash",
      };
    },
    created() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        axios
          .get(`http://localhost:3000/api/upload/data/${this.selectedFileType}`)
          .then((response) => {
            this.docfiles = response.data.files.map((file) => ({
              name: file,
              url: `/uploads/${file}`,
            }));
            console.log("try me", response.data);
          })
  
          .catch((error) => {
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
        return ["jpg", "jpeg", "png", "svg"].includes(ext);
      },
    },
  };
  </script>
  <style>
  .details-file {
    width: fit-content;
    height: fit-content;
    padding: 1em;
    display: flex;
    gap: 2em;
  }
  
  .items-preview {
    height: 40em;
    width: 34em;
    background: whitesmoke;
    border: solid grey;
    border-radius: 0.5em;
  }
  
  .items-buttons {
    background: whitesmoke;
    border: solid grey;
    padding-left: 1em;
    padding-top: 0.5em;
    padding-right: 3em;
    border-radius: 0.5em;
  }
  
  .btn-preview {
    color: whitesmoke;
    background: linear-gradient(green, rgb(187, 214, 187), green);
    outline: none;
    border-radius: 0.6em;
    width: 5em;
    font-size: 0.9em;
    font-style: lato;
    border: none;
  }
  
  .btn-preview:hover {
    background: blue;
  }
  
  .buttons-opts {
    display: flex;
    gap: 2em;
    margin-top: 0.5em;
  }
  
  .share-icon {
    display: flex;
    font-size: 0.9em;
    font-style: lato;
    border-radius: 0.3em;
    background: linear-gradient(white, brown);
    color: antiquewhite;
    outline: none;
    border: none;
  }
  
  .share-icon:hover {
    background: green;
  }
  
  .share {
    height: 1.2em;
    width: 2em;
  }
  
  .delete-btn {
    color: whitesmoke;
    background: linear-gradient(black, white);
    outline: none;
    border-radius: 0.6em;
    width: 5em;
    font-size: 0.9em;
    font-style: lato;
    border: none;
  }
  
  .delete-btn:hover {
    background: rgb(234, 58, 79);
    color: solid rgb(188, 190, 194);
  }
  
  .search-items {
    display: flex;
    gap: 0.2em;
  }
  
  .search-icons {
    height: 2em;
    border-radius: 0.5em;
    color: white;
    box-shadow: 2em;
    padding: 0.1em;
    border: solid grey;
    cursor: pointer;
  }
  
  .search-input {
    height: 2em;
    border: solid grey;
    box-shadow: 2em;
    border-radius: 0.3em;
    padding-left: 0.2em;
    outline: none;
  }
  
  .sect-search {
    background: white;
    box-shadow: 5em;
    width: 50%;
    height: 4em;
    padding: 1em;
    border-radius: 0.4em;
  }
  
  .details-get {
    text-decoration: none;
    color: black;
  }</style>
  