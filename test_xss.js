const xss = require('xss');
console.log(xss('{"name":"<script>alert(1)</script>"}'));
