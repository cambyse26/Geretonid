<template>
  <editor v-model="editorText" height="500px" initialEditType="wysiwyg" />
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import "codemirror/lib/codemirror.css";
import { Editor } from "@toast-ui/vue-editor";

export default {
  name: "TextEditor",
  components: {
    editor: Editor,
  },
  data() {
    return {
      editorText: "",
    };
  },
};
</script>