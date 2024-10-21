import axios from 'axios';
import { getCurrentInstance } from 'vue';
const proxy = getCurrentInstance();
const loginStore = {
  state: {
    userInfo: null,
    isLogin: false
  },
  mutations: {
    // 로그인 상태를 변경해주는 코드
    loginSuccess: function (state, info) {
      state.userInfo = info;
      state.isLogin = true;
    },
    logout: function (state) {
      state.userInfo = null;
      state.isLogin = false;
      localStorage.removeItem('email');
      localStorage.removeItem('role');
      localStorage.removeItem('vuex');
    }
  },
  actions: {
    login(dispatch, loginObj) {
      axios
        .post('http://localhost:8080/login', loginObj)
        .then((res) => {
          const email = res.data.email;
          const role = res.data.role;
          const userInfo = {
            email: email,
            role: role
          };
          localStorage.setItem('email', email);
          localStorage.setItem('role', role);
          this.commit('loginSuccess', userInfo);
        })
        .catch((error) => {
          proxy.$swalCall({
            title: '실패',
            text: error.response.data.message,
            icon: 'error'
          });
        });
    },
    logout() {
      // 로그아웃 actions
      axios
        .post('/api/member/logout', {
          withCredentials: true
        })
        .catch((error) => {
          proxy.$swalCall({
            title: '실패',
            text: error.response.data.message,
            icon: 'error'
          });
        });
      this.commit('logout');
    }
  },
  getters: {
    isLogin(state) {
      return state.isLogin;
    },
    userInfo(state) {
      return state.userInfo;
    }
  }
};

export default loginStore;
