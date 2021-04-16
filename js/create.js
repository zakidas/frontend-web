const SERVER_URL = "http://localhost:3050";
Vue.use(Toasted);
new Vue({
    el: "#app",
    data: () => ({
        cliente: {
            nombre: "",
            apellido: "",
            edad: 0,
            fec_nac: null,
        },
    }),
    methods: {
        async save() {
            if (!this.cliente.nombre) {
                return this.$toasted.show("Por favor ingrese su nombre", {
                    position: "top-left",
                    duration: 1000,
                });
            }

            if (!this.cliente.apellido) {
                return this.$toasted.show("Por favor ingrese sus apellidos", {
                    position: "top-left",
                    duration: 1000,
                });
            }

            if (!this.cliente.edad) {
                return this.$toasted.show("Por favor ingrese su edad", {
                    position: "top-left",
                    duration: 1000,
                });
            }

            if (!this.cliente.fec_nac) {
                return this.$toasted.show("Por favor ingrese la fecha de nacimiento", {
                    position: "top-left",
                    duration: 1000,
                });
            }
            const url = SERVER_URL + "/creacliente";

            const res =await axios.post(url, {
                nombre: this.cliente.nombre,
                apellido: this.cliente.apellido,
                edad: this.cliente.edad,
                fec_nac: this.cliente.fec_nac
                })
                .then((result) => {
                    this.$toasted.show("Cliente registrado", {
                         position: "top-left",
                         duration: 1000
                        });
                    this.cliente = {
                        nombre: "",
                        apellido: "",
                        edad: 0,
                        fec_nac: ""
                    };
                })
                .catch(function(error) {
                  console.log(error);
                });
        }
    }
});