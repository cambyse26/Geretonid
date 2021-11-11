<template>
    <title>Liste des Posts</title>
</template>


<script>
//import axios from 'axios';

export default {
    mounted() {

        var url = "https://blog.geretonid.com/blog/api/posts";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.status);
      console.log(xhr.responseText);
   }};

xhr.send();
    }
  }
</script>