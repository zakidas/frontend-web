const SERVER_URL = "http://localhost:3050";
Vue.use(Toasted);
new Vue({
    el: "#app",
    data: () => ({
        clientes: [],
    }),
    methods: {
        async getClients() {
            const url = SERVER_URL + "/listclientes";
            const response = await axios.get(url);
            if (response.status = 200) {
                this.clientes = response.data
            }else if(response.status = 404){
                this.clientes = [];
                this.errored = true;
            }
        },
        edit(cliente) {
            window.location.href = "./edit.html?id=" + cliente.idclient;
        },
        async deleteClient(cliente) {
            console.log(cliente)
            const result = await Swal.fire({
                title: 'Delete',
                text: "Desea eliminarlo?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#1f9bcf',
                cancelButtonColor: '#d9534f',
                cancelButtonText: 'No',
                confirmButtonText: 'Si, eliminar'
            });
            // Stop if user did not confirm
            if (!result.value) {
                return;
            }
            const r = await axios.delete(SERVER_URL + "/cliente/" + cliente.idclient);
            if (r.status = 200) {
                this.$toasted.show("Cliente eliminado", {
                    position: "top-left",
                    duration: 1000,
                });
                await this.getClients();
            } else {
                this.$toasted.show("Something went wrong. Try again", {
                    position: "top-left",
                    duration: 1000,
                });
            }
        }
    },
    async mounted() {
        await this.getClients();
    }
});