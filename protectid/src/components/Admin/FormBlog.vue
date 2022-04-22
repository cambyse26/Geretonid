<template>
  <section class="page-section">
    <form id="postForm" action="" @submit.prevent="createPost">
      <div class="col-12 row">
        <div class="col-12">
          <!-- Lien à définir -->
          <a href="#">Revenir aux articles</a>
          <h1 class="h3 mt-2 mb-3">Ajouter un nouvel article</h1>
          <div class="row">
            <div class="col-lg-8 col-12">
              <div class="form-group">
                <input
                  type="text"
                  name="title"
                  id="title"
                  class="form-control"
                  placeholder="Titre de l'article"
                />
              </div>
              <div class="form-group">
                <TextEditor id="content" class="myeditor" name="content" />
              </div>
              <div class="col-12 drop-down">
                <div class="drop-btn" @click="dropdown" data-target="excerpt">
                  Extrait de l'article
                  <i
                    class="fas fa-caret-down float-right"
                    style="transform: rotate(0deg)"
                    data-target="excerpt"
                  ></i>
                </div>
                <div class="drop position-relative hidden" data-drop="excerpt">
                  <textarea
                    name="excerpt"
                    id="excerpt"
                    class="form-control"
                    rows="5"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="col-lg-4 col-12">
              <div class="drop-down col-12">
                <div class="drop-btn" data-target="infos">Informations</div>
                <div
                  class="drop position-relative"
                  data-drop="infos"
                  style="height: auto"
                >
                  <div class="form-group">
                    <label for="status">Status</label>
                    <select
                      name="status"
                      id="status"
                      class="custom-select form-control"
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                    </select>
                  </div>
                  <!-- Mettre la date de création si formulaire de modification -->
                  <!-- Mettre un lien pour prévisualiser l'article  -->
                  <a href="#">
                    <i class="fas fa-eye"></i> &nbsp; Visualiser l'article en
                    direct
                  </a>
                </div>
              </div>
              <div class="drop-down col-12">
                <div class="drop-btn" data-target="slug" @click="dropdown">
                  <i
                    class="fas fa-caret-down float-right"
                    style="transform: rotate(0deg)"
                    data-target="slug"
                  ></i
                  >Lien personalisé
                </div>
                <div
                  class="drop position-relative hidden"
                  data-drop="slug"
                  style="height: auto"
                >
                  <div class="form-group">
                    <input
                      type="text"
                      name="slug"
                      id="slug"
                      class="form-control"
                    />
                  </div>
                </div>
              </div>
              <div class="col-12 drop-down">
                <div class="drop-btn" @click="dropdown" data-target="image">
                  Image
                  <i
                    class="fas fa-caret-down float-right"
                    style="transform: rotate(0deg)"
                    data-target="image"
                  ></i>
                </div>
                <div class="drop position-relative hidden" data-drop="image">
                  <img
                    src=""
                    alt="Image chargée"
                    srcset=""
                    class="hidden"
                    id="uploadedFile"
                  />
                  <p id="upload-error" class="text-danger"></p>
                  <input type="file" name="poster" id="poster" class="hidden" />
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      @change="upload"
                    />
                    <label class="custom-file-label" for="customFile"
                      >Choose file</label
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import TextEditor from "@/components/TextEditor";
export default {
  name: "FormBlog",
  data() {
    return {
      editorText: "",
    };
  },
  components: {
    TextEditor,
  },
  methods: {
    createPost($this) {
      const form = $this.srcElement;
      const url = "";
      const data = new FormData(form);
      axios
        .post(url, data)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log(errors);
        });
    },
    dropdown($this) {
      const arrow = $this.target.classList.contains("fa-caret-down")
        ? $this.target
        : $this.target.querySelector(".fa-caret-down");

      // get angle from elemnt style attribute
      let angle = parseInt(arrow.style.transform.replace(/[^0-9]/g, ""));
      angle += 180;
      arrow.style.transform = `rotate(${angle}deg)`;

      const target = $this.target.dataset.target;
      let targetElement = document.querySelector(`[data-drop="${target}"]`);

      if (targetElement.classList.contains("hidden")) {
        return targetElement.classList.replace("hidden", "show");
      }

      return targetElement.classList.replace("show", "hidden");
    },
    upload($event) {
      let imageContainer = document.querySelector("img#uploadedFile");
      const uploadedFile = $event.target.files[0];

      const acceptedFile = ["gif", "jpg", "jpeg", "png", "svg"];
      let filename = uploadedFile.name;
      let extension = filename.split(".")[1].toLowerCase();
      const errorUpload = document.querySelector("#upload-error");

      // display filename of uploaded file
      document.querySelector("label[for=customFile]").innerText = filename;

      // If uploaded file extesion in acceptedFile[]
      if (acceptedFile.includes(extension)) {
        imageContainer.classList.remove("hidden");
        imageContainer.src = URL.createObjectURL(uploadedFile); // generate temporary link for the uploaded file
        imageContainer.srcset = URL.createObjectURL(uploadedFile); // generate temporary link for the uploaded file
        imageContainer.onload = () => URL.revokeObjectURL(imageContainer.src); // free memory
        errorUpload.classList.add("hidden");
        errorUpload.innerHTML = "";
      } else {
        errorUpload.classList.remove("hidden");
        imageContainer.classList.add("hidden");
        errorUpload.innerHTML = `Seuls les fichiers .gif, .jpg, .jpeg, .png ou .svg sont acceptés, vous avez uploadé un fichier <i>.${extension}</i>`;
      }
    },
  },
};
</script>