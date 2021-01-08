<template>
    <b-container>
        <div>
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>
            <div class="error-msg">
                {{ error }}
            </div>

            <button @click="attemptLogin" class="btn btn-dark btn-lg btn-block">Sign In</button>

        </div>
        
    </b-container>
</template>

<script>
import api from '../api';
import { mapGetters } from 'vuex'
import store from '../store'


export default {
    data: function() {
        return {
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
        attemptLogin() {
            this.error = "";
            api.login({
                email: this.email,
                password: this.password
            }).then((res) => {
                var jwtToken = res.headers.authorization;
                store.commit('SET_JWT', jwtToken)

            }).catch((e) => {
                // error najverovatnije znaci da je login neuspesan
                this.error = "Invalid credentials"
            })
        }
    },
    computed: {
        ...mapGetters(['currentJwt'])
    }
}
</script>

<style scoped>
.error-msg {
    color: red;
}
</style>