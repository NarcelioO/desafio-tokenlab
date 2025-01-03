import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';


export function useAuth() {
  const router = useRouter();
  const isLoggedIn = ref(!!localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const token = response.data.token;

      localStorage.setItem('token', token); 
      isLoggedIn.value = true; 
      router.push('/');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    isLoggedIn.value = false; 
    router.push('/login');
  };

  const checkAuth = () => !!localStorage.getItem('token'); 

  return { isLoggedIn, login, logout, checkAuth };
}
