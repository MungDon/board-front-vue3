import axios from 'axios';
import router from '@/router';
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
    login({ commit }, { loginObj, swalCall }) {
      axios
        .post('http://localhost:8080/login', loginObj, {
          withCredentials: true
        })
        .then((res) => {
          const email = res.data.email;
          const role = res.data.role;
          const userInfo = {
            email: email,
            role: role
          };
          localStorage.setItem('email', email);
          localStorage.setItem('role', role);
          commit('loginSuccess', userInfo);
          router.push('/board');
        })
        .catch((error) => {
          swalCall({
            title: '실패',
            text: error.response.data.message,
            icon: 'error'
          });
        });
    },
    logout({ commit }, { swalCall }) {
      // 로그아웃 actions
      axios
        .post('/api/member/logout', {
          withCredentials: true
        })
        .then((response) => {
          // 성공 시 commit과 함께 메시지 출력
          commit('logout');
          const thenFn = () => {
            router.push('/member/login'); // 로그아웃 후 리다이렉션
          };
          swalCall({
            title: '성공',
            text: response.data.message, // 서버에서 보낸 메시지
            icon: 'success',
            thenFn: thenFn()
          });
        })
        .catch((error) => {
          swalCall({
            title: '실패',
            text: error.response.data.message,
            icon: 'error'
          });
        });
      commit('logout');
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
