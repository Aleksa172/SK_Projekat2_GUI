<template>
    <b-container>
        <div>
            <h3>Vaši podaci</h3>

            <div class="form-group">
                <label>Email addresa</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Lozinka</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Lozinka ponovo</label>
                <input v-model="passwordPonovo" type="password" class="form-control form-control-lg" />
            </div>
            <hr/>
            <div class="form-group">
                <label>Ime</label>
                <input v-model="ime" type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Prezime</label>
                <input v-model="prezime" type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Broj pasosa</label>
                <input v-model="brojPasosa" type="text" class="form-control form-control-lg" />
            </div>
            <div class="error-msg">
                {{ error }}
            </div>
            <button @click="updateProfile" class="btn btn-dark btn-lg btn-block">Izmeni</button>
            <hr>
            <h3>Vaše kreditne kartice 
                <b-button @click="otvorenoDodavanjeNoveKartice=true">Dodaj novu</b-button>
            </h3>
            <div v-if="otvorenoDodavanjeNoveKartice" class="container">
                <div class="row">
                    <b-form inline>
                        <label class="sr-only" for="input-brkar">Broj kartice</label>
                        <b-form-input
                            id="input-brkar"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="4443123498761982"
                        ></b-form-input>


                        <label class="sr-only" for="input-name">Ime (na kartici)</label>
                        <b-form-input
                            id="input-name"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="npr. Jorgovan"
                        ></b-form-input>

                        <b-input-group>
                            <label class="sr-only" for="input-prezime">Prezime (na kartici)</label>
                            <b-form-input id="input-prezname" placeholder="npr. Slavić"></b-form-input>
                        </b-input-group>

                        <label class="sr-only" for="input-ccv">CCV</label>
                        <b-form-input
                            id="input-ccv"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="083"
                        ></b-form-input>


                        <b-button @click="dodajKarticu" variant="primary">Dodaj</b-button>
                    </b-form>
                </div>
            </div>
            <div class="container">
                <div class="row">
                    <b-card-group deck>
                        <kreditna-kartica v-for="kartica in kartice" :key="kartica.brojKartice" 
                            :ime="kartica.ime"
                            :prezime="kartica.prezime"
                            :brojKartice="kartica.brojKartice"
                            :ccv="kartica.ccv"></kreditna-kartica>
                    </b-card-group>
                </div>
            </div>


            

        </div>
        
    </b-container>
</template>

<script>
import api from '../api';
import { mapGetters } from 'vuex'
import store from '../store'

import KreditnaKartica from '@/components/KreditnaKartica';


export default {
    components: {
        KreditnaKartica
    },
    data: function() {
        return {
            email: "",
            password: "",
            passwordPonovo: "",
            ime: "",
            prezime: "",
            brojPasosa: "",
            error: "",
            kartice: [
                {
                    ime: "Pera",
                    prezime: "Peric",
                    brojKartice: "4438139238123",
                    ccv: "123"
                },
                {
                    ime: "Pera",
                    prezime: "Peric",
                    brojKartice: "4276319876312",
                    ccv: "123"
                }
            ],
            otvorenoDodavanjeNoveKartice: false,
            novaKartica: {
                broj: "",
                ime: "",
                prezime: "",
                ccv: ""
            }
        }
    },
    mounted() {
        // Ucitaj profil sa whoAmI

        // Ucitaj kartice
        
    },
    methods: {
        updateProfile() {
            this.error = "";
            if(this.password != this.passwordPonovo) {
                this.error = "Molimo vas proverite unos lozinki."
                return;
            }

            var email = this.email.trim();
            var password = this.password;
            var ime = this.ime.trim();
            var prezime = this.prezime.trim();
            var brojPasosa = this.brojPasosa.trim();
            // Validacija polja
            if(email.length == 0) {
                this.error = "E-Mail ne može biti prazan";
                return;
            }
            if(ime.length == 0) {
                this.error = "Ime ne može biti prazno";
                return;
            }
            if(prezime.length == 0) {
                this.error = "Prezime ne može biti prazno";
                return;
            }
            if(brojPasosa.length == 0) {
                this.error = "Pasoš ne može biti prazan";
                return;
            }
            

            api.changeUser({
                email: email,
                password: password,
                prezime: prezime,
                ime: ime,
                brojPasosa: brojPasosa
                
            }).then((res) => {
                this.napraviToast('success', 'Uspeh', 'Uspešno ste izmenili profil.')
            }).catch((e) => {
                this.error = "Neuspešna izmena profila. Proverite formu."
            })
        },
        napraviToast(vrsta, title, poruka) {
            this.$bvToast.toast(poruka, {
                title: title,
                autoHideDelay: 5000,
                appendToast: true,
                variant: vrsta
            });
        },
        dodajKarticu() {
            var brojKartice = this.novaKartica.broj;
            var ime = this.novaKartica.ime;
            var prezime = this.novaKartica.prezime;
            var ccv = this.novaKartica.ccv;

            api.dodajKarticu({
                brojKartice,
                ime,
                prezime,
                ccv
            }).then((res) => {
                this.novaKartica.broj = "";
                this.novaKartica.ime = "";
                this.novaKartica.prezime = "";
                this.novaKartica.ccv = "";
                
                this.napraviToast('success', 'Uspeh', 'Uspešno ste dodali karticu.')

            }).catch((e) => {
                this.napraviToast('danger', 'Greška', 'Došlo je do greške prilikom unosa kartice. Pokušajte ponovo.')
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