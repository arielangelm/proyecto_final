const { createApp } = Vue;

createApp({
    data() {
        return {
            libros: [],
            url: 'https://arielangelm.pythonanywhere.com/libros', // Updated API endpoint
            error: false,
            cargando: true,
            id: 0,
            titulo: "",
            autor: "",
            genero: "",
            publicacion: "",
            paginas: 0,
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.libros = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(libroId) {
            const url = `${this.url}/${libroId}`;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(response => {
                    if (response.ok) {
                        // If the response status is OK (2xx), attempt to parse JSON
                        return response.json();
                    } else {
                        // If the server returns an error status, handle the error here
                        throw new Error(`Error al eliminar el libro: ${response.status} - ${response.statusText}`);
                    }
                })
                .then(data => {
                    console.log(data);
                    // Check if the response contains the expected message property
                    if (data && data.message === "Libro eliminado exitosamente") {
                        location.reload();
                    } else {
                        // If not, log an error and show a generic alert
                        console.error("Error al eliminar el libro: Respuesta inesperada", data);
                        alert("Libro eliminado exitosamente");
                        window.location.href = "./Productos.html";
                    }
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al eliminar el libro");
                });
        },
        
        grabar() {
            let libro = {
                titulo: this.titulo,
                autor: this.autor,
                genero: this.genero,
                publicacion: this.publicacion,
                paginas: this.paginas
            };
            var options = {
                body: JSON.stringify(libro),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            };
            fetch(this.url, options)
                .then(response => response.json()) // Assuming the server returns JSON for consistency
                .then(data => {
                    console.log(data); // Log the response for debugging
                    alert("Registro grabado");
                    window.location.href = "./Productos.html";
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al grabar");
                });
        }
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
