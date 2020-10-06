import { userCheck, messages } from '@/constants/config';

export const state = () => ({
  isExpired: JSON.parse(localStorage.getItem('isExpired')) || false,
  loggedTime: JSON.parse(localStorage.getItem('loggedTime')) || null,
  expiredTime: JSON.parse(localStorage.getItem('expiredTime')) || null,
  isLogged: JSON.parse(localStorage.getItem('isLogged')) || false,
});

export const mutations = {
  authorization(state, payload) {
    state.isLogged = true;
    state.isExpired = false;
    state.loggedTime = Date.now();
    state.expiredTime = state.loggedTime + userCheck.expireTime;
    localStorage.setItem('isExpired', state.isExpired);
    localStorage.setItem('isLogged', state.isLogged);
    localStorage.setItem('loggedTime', state.loggedTime);
    localStorage.setItem('expiredTime', state.expiredTime);
    this.$router.replace({ path: '/cards' });
  },
  logout(state) {
    state.isLogged = false;
    localStorage.setItem('isLogged', state.isLogged);
  },
  expireSessionTime(state) {
    state.isExpired = true;
    localStorage.setItem('isExpired', state.isExpired);
  },
};

export const actions = {
  authorization({ commit }, payload) {
    commit('authorization', payload);
  },
  logout({ commit,}) {
    commit('logout');
    this.$router.push({ path: '/login' });
  },
  checkSessionTime({ state, commit, dispatch }) {
    const currentTime = Date.now();
    if (currentTime >= state.expiredTime) {
      commit('expireSessionTime');
      dispatch('logout');
    }
  }
};
