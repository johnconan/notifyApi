import loadMore from '../assets/js/loadMore.js';
import axios from 'axios';

export default {
  state: {
    messages: [],
    messageMain: [],
    loading: false,
    error: false
  },
  mutations: {
    setMessage(state, payload) {
      state.messages = payload;
    },
    loadMessages(state, payload) {
      state.messageMain = [ ...state.messageMain, ...payload];
    },
    setNotify(state, payload) {
      state.messageMain = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    setNotify({ commit }) {
      commit('setLoading', true);
      axios
        .get('https://tocode.ru/static/c/vue-pro/notifyApi.php')
        .then(response => {
          let data = response.data.notify,
              messages = [],
              messagesMain = [];
          for (const i of data) {
            if (i.main) {
              messagesMain.push(i);
            } else {
              messages.push(i);
            }
          }
          commit('setMessage', messages);
          commit('setNotify', messagesMain);
        })
        .catch(error => {
          commit('setError', error + ': error Api! :(');
        })
        .finally(() => (commit('setLoading', false)))
    },
    loadMessages({ commit, getters }) {
      let res = getters.getMessageFilter;
      commit('loadMessages', loadMore(res, 2));
    }
  },
  getters: {
    getMessageFilter(state) {
      return state.messages.filter(message => !message.main);
    },
    getMessageMain(state) {
      return state.messageMain;
    },
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    }
  }
}