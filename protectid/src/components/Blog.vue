<template>
    <section class="page-section">
        <div class="container">
            <button type="button" class="btn btn-primary" @click="testApi">Test api</button>
        </div>
    </section>
</template> 
<script>
import axios from 'axios';
export default {
    name: 'Blog', 
    data: function () {
        return {
            headers: {
                "Accept": "application/json, plain/text",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer-Policy': 'strict-origin'
            },
        }        
    }, 
    methods: {
        testApi() { 
            axios.defaults.headers = this.headers;
            axios.post('http://api.protectid/', {}, this.headers);
        }
    },
}
</script>