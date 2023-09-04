<template>
  <div class="details-file">
    <div class="items-buttons">
      <div class="sect-search">
        <div class="search-items">
          <div>
            <input type="text" placeholder="Search File" class="search-input" />
          </div>
          <div>
            <img
              src="/img-resources/manage_search.svg"
              alt=""
              class="search-icons"
            />
          </div>
        </div>
      </div>
      <div v-for="(file, index) in paginatedFiles" :key="index">
        <a :href="serverUrl + file.url" target="_blank" class="details-get">{{
          file.name
        }}</a>
        <div class="buttons-opts">
          <div>
            <button
              @click="openModal(serverUrl + file.url, isImage(file.name))"
              class="btn-preview"
            >
              Preview
            </button>
          </div>
          <div>
            <button
              class="delete-btn"
              @click="deleteFile(selectedFileType, file.name)"
            >
              Delete
            </button>
          </div>

          <div>
            <button class="share-icon" @click="toggleSharingOptions(file)">
              <img src="/img-resources/share-icon.svg" class="share" />
              <div>Share</div>
            </button>
          </div>
          <div :class="{ 'sharing-options': !file.showSharingOptions }">
            <div class="social-opt">
              <div class="select-pts">Email</div>
              <div class="select-pts">WhatsApp</div>
              <div class="select-pts">Twitter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="items-preview">
      <Preview
        :show="modalShow"
        :fileUrl="modalFileUrl"
        :isImage="modalIsImage"
        @close="closeModal"
        class="list-items"
      />
    </div>
  </div>
  <div class="pagination">
    <div @click="prevPage" :disabled="currentPage === 1" class="btn-pg">
      Previous
    </div>
    <div @click="nextPage" :disabled="currentPage >= totalPages" class="btn-pg">
      Next
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Preview from "@/components/preview.vue";
import io from "socket.io-client";

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
      selectedFileType: "cs",
      currentPage: 1,
      filesPerPage: 6,
    };
  },

  computed: {
    totalPages() {
      return Math.ceil(this.docfiles.length / this.filesPerPage);
    },
    paginatedFiles() {
      const start = (this.currentPage - 1) * this.filesPerPage;
      const end = start + this.filesPerPage;
      return this.docfiles.slice(start, end);
    },
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
            url: `/${this.selectedFileType}_uploads/${file}`,
          }));
          console.log("try me", response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    toggleSharingOptions(file) {
      file.showSharingOptions = !file.showSharingOptions;
      console.log("Toggle Sharing Options", file.showSharingOptions);
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
    deleteFile(fileType, fileName) {
      const deleteUrl = `http://localhost:3000/api/upload/data/delete/${fileType}/${fileName}`;
      console.log("Delete URL:", deleteUrl);

      axios
        .delete(deleteUrl)
        .then(() => {})
        .catch((error) => {
          console.error("Error deleting file:", error);
        });

      this.fetchData();
      const socket = io("http://localhost:3000");
      socket.on("fileDeleted", ({ fileType, fileName }) => {
        console.log(`File deleted: ${fileType}/${fileName}`);
        this.docfiles = this.docfiles.filter((file) => file.name !== fileName);
      });
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
  width: fit-content;
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
  width: 15em;
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
}
.pagination {
  gap: 3em;
  margin-left: 6em;
}
.btn-pg {
  width: 5.5em;
  height: 2.2em;
  cursor: pointer;
  color: whitesmoke;
  background-color: rgb(79, 75, 71);
  text-align: center;
  border-radius: 1em;
  font-size: 0.8em;
  font-style: lato;
  padding-top: 0.4em;
}
.sharing-options {
  display: none;
}

.sharing-options.show {
  display: block;
}
.social-opt {
  z-index: 999;
  width: 9em;
  height: 5em;
  padding-left: 1em;
  position: absolute;
  background:linear-gradient(rgb(17, 207, 153),rgb(97, 172, 219));
  color: azure;
  border-radius: 1em;
  font-size: 0.8em;
  margin-left: -3em;
}
.social-opt:hover{
  color: rgb(2, 79, 54);
  background: aliceblue;
  border: solid grey;
}
.select-pts:hover{
 
  background:green;
  color: white;
  margin-right: 0.3em;
  cursor: pointer;
}
</style>
