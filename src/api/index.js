import axios from 'axios';

axios.interceptors.request.use(config => {
    handleRequestInterceptor(config);
    return config;
});

function handleRequestInterceptor(config) {
    try {
        let jwt = sessionStorage.getItem("jwt");
        console.log('jwt', jwt);
    }
    catch(e) {
        console.error("INTERCEPTOR ERROR: "+e);
    }
}



var SERVIS1_URL = "http://localhost:8081";
var SERVIS2_URL = "http://localhost:8082";
var SERVIS3_URL = "http://localhost:8083";

export default {

    login: (params) => axios({
      url: `${SERVIS1_URL}/login`,
      method: 'POST',  
      data: {
          email: params.email,
          password: params.password
      }
    }),

    sviLetovi: (params) => axios({
        url: `${SERVIS2_URL}/letovi`
    })

}