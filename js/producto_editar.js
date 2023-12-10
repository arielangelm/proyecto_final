console.log(location.search); // reads the arguments passed to this form
var id = location.search.substr(4);
console.log(id);

const { createApp } = Vue;
createApp({
    data() {
        return {
            id: 0,
            titulo: "",
            autor: "",
            genero: "",
            publicacion: "",
            paginas: 0,
            url: 'https://arielangelm.pythonanywhere.com/libros/' + id,
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.id = data.id;
                    this.titulo = data.titulo;
                    this.autor = data.autor;
                    this.genero = data.genero;
                    this.publicacion = data.publicacion;
                    this.paginas = data.paginas;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        modificar() {
            let libro = {
                titulo: this.titulo,
                autor: this.autor,
                genero: this.genero,
                publicacion: this.publicacion,
                paginas: this.paginas,
            };
            var options = {
                body: JSON.stringify(libro),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };
            fetch(this.url, options)
                .then(function () {
                    alert("Registro modificado");
                    window.location.href = "./Productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar");
                });
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
