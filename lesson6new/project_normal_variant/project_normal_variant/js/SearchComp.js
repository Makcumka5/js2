Vue.component("filters", {
    data() {
        return {
            searchLine: "",
        };
    },
    template: `<form ref="search" action="#" class="search-form" >
                <input type="text" @input ="$root.$refs.products.filter(searchLine)" v-model="searchLine" class="search-field">
                <button @click="$root.$refs.products.filter(searchLine)" class="btn-search" type="submit" >
                    <i class="fas fa-search"></i>
                </button>
            </form>`,
});