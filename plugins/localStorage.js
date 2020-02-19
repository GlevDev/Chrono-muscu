// Permet de conserver les données du store malgré le rechargement de la page
import createPersistedState from "vuex-persistedstate"

export default({store}) => {
  window.onNuxtReady(() => {
    createPersistedState({})(store);
  })
}