export const state = () => ({
  nbSeries: 0,
  sessions: []
})

export const mutations = {
  addSession (state, session) {
    if(session.type === 'Serie') {
      state.nbSeries++;
      state.sessions.push({...session, numSerie: state.nbSeries});
    }
    else state.sessions.push(session);
  },

  clearSession (state) {
    state.sessions = [];
    state.nbSeries = 0;
  }
}

export const getters = {
  getSessions(state) {
    return state.sessions
  }
}