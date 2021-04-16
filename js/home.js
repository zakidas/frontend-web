const SERVER_URL = "http://localhost:3050";
new Vue({
    el: "#app",
    data: () => ({
        info: null
    }),
    methods: {
        async getKpi() {
            const url = SERVER_URL + "/kpideclientes";
            const response = await axios.get(url);

            if (response.status = 200) {
                this.info = response.data;
                console.log(this.info)
            } else {
                this.info = null;
                this.errored = true;
            }
        }
    },
    async mounted() {
        await this.getKpi();
    }
});