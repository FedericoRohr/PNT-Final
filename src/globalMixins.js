import Vue from 'vue'

const miMixinGlobal = {
    methods: {
    },
    computed: {
        mostrarTituloVuex() {
            let titulo = this.$store.state.receta.titulo
            return titulo
        },
        mostrarDescripcionVuex() {
            let descripcion = this.$store.state.receta.descripcion
            return descripcion
        },
        mostrarCategoriaVuex() {
            let categoria = this.$store.state.receta.categoria
            return categoria
        },
        mostrarMomentoVuex() {
            let momento = this.$store.state.receta.momento
            return momento
        },
        mostrarIngredientesVuex() {
            let ingredientes = this.$store.state.receta.ingredientes
            return ingredientes
        },
        mostrarLikesVuex() {
            let likes = this.$store.state.receta.likes
            return likes
        },
        mostrarIdVuex() {
            let id = this.$store.state.receta._id
            return id
        },
        usuarioLogeadoVuex() {
            if (this.$store.state.usuario) {
                return true
            }
            else {
                return false
            }
        }
    }
}

Vue.mixin(miMixinGlobal)