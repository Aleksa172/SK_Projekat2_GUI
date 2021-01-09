<template>
    <b-container>
        Spisak letova
        <div>
            <b-table-simple>
                <b-tr>
                    <b-td>
                        Pocetna destinacija:
                    </b-td>
                    <b-td>
                        Krajnja destinacija:
                    </b-td>
                    <b-td>
                        Trajanje
                    </b-td>
                    <b-td>
                        Cena
                    </b-td>
                    <b-td>
                        Avion
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>   
                        <b-form-input v-model="filteri.pocetnaDestinacija"></b-form-input>
                    </b-td>
                    <b-td>   
                        <b-form-input v-model="filteri.krajnjaDestinacija"></b-form-input>
                    </b-td>
                    <b-td>   
                        <b-form-input v-model="filteri.trajanjeOd" placeholder="Trajanje od"></b-form-input> - 
                        <b-form-input v-model="filteri.trajanjeDo" placeholder="Trajanje do"></b-form-input> 
                    </b-td>
                    <b-td>   
                        <b-form-input v-model="filteri.cenaOd" placeholder="Cena od"></b-form-input> - 
                        <b-form-input v-model="filteri.cenaDo" placeholder="Cena do"></b-form-input> 
                    </b-td>
                    <b-td>   
                        <b-form-select v-model="filteri.avionId" :options="avioni"></b-form-select>
                    </b-td>
                </b-tr>
                    <b-td>
                        <b-btn class="btn" variant="secondary" @click="filtriraj">Filtriraj</b-btn>
                    </b-td>
                <b-tr>

                </b-tr>
            </b-table-simple>
        </div>

        <b-table-simple>
            <b-tr>
                <b-th>
                    Id
                </b-th>

                <b-th>
                    Avion
                </b-th>
            
                <b-th>
                    Pocetna destinacija
                </b-th>
            
                <b-th>
                    Krajnja destinacija
                </b-th>
            
                <b-th>
                    Trajanje leta (min)
                </b-th>
            
                <b-th>
                    Cena (EUR)
                </b-th>
            
                <b-th>
                    STATUS
                </b-th>
                <b-th>
                    Radnja
                </b-th>
            </b-tr>

            <b-tr v-for="red in letovi" :key="red.id">
                <b-td>
                    {{ red.id }}
                </b-td>
                <b-td>
                    {{ red.avion }}
                </b-td>
                <b-td>
                    {{ red.pocetnaDestinacija }}
                </b-td>
                <b-td>
                    {{ red.krajnjaDestinacija }}
                </b-td>
                <b-td>
                    {{ red.trajanjeLeta }}
                </b-td>
                <b-td>
                    {{ red.cena }}
                </b-td>
                <b-td>
                    {{ red.status }}
                </b-td>
                <b-td>
                    <b-button v-if="red.status != 'CANCELLED'" @click="obrisiLet(red.id)" variant="danger">Ukloni let</b-button>
                    <b-button v-else disabled @click="obrisiLet(red.id)" variant="danger">Ukloni let</b-button>
                </b-td>
            </b-tr>
        </b-table-simple>
        <div>
            <button @click="stranaNazad">
                nazad
            </button>

            <button @click="stranaNapred">
                napred
            </button>
        </div>
        <div class="row">
            <b-btn class="btn" variant="primary" @click="otvorenoDodavanjeNovogLeta=!otvorenoDodavanjeNovogLeta">Novi let...</b-btn>
        </div>
        <div v-if="otvorenoDodavanjeNovogLeta" class="container">
            <b-table-simple>
                <b-tr>
                    <b-td>
                        <b-form-input v-model="noviLet.pocetnaDestinacija" placeholder="Pocetna destinacija..."></b-form-input>
                    </b-td>
                    <b-td>
                        <b-form-input v-model="noviLet.krajnjaDestinacija" placeholder="Krajnja destinacija..."></b-form-input>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-form-input v-model="noviLet.trajanje" placeholder="Trajanje ..."></b-form-input>
                    </b-td>
                    <b-td>
                        <b-form-input v-model="noviLet.cena" placeholder="Cena ..."></b-form-input>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-form-select v-model="noviLet.avionId" :options="avioni"></b-form-select>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-btn class="btn" variant="danger" @click="otvorenoDodavanjeNovogLeta=!otvorenoDodavanjeNovogLeta">Cancel</b-btn>
                    </b-td>
                    <b-td>
                        <b-btn class="btn" variant="success" @click="otvorenoDodavanjeNovogLeta=!otvorenoDodavanjeNovogLeta">Dodaj let</b-btn>
                    </b-td>
                </b-tr>
            </b-table-simple>
        </div>

    </b-container>
</template>

<script>
import api from '../../api' 

export default {
    data: function(){
        return {
            letovi: [],
            avioni: [],
            totalRows: 0,
            filteri: {
                pocetnaDestinacija: "",
                krajnjaDestinacija: "",
                trajanjeOd: "",
                trajanjeDo: "",
                cenaOd: "",
                cenaDo: "",
                avionId: null
            },
            paginacija: {
                from: 0,
                count: 10 // count se realno nece menjati
            },
            otvorenoDodavanjeNovogLeta: false,
            noviLet: {
                pocetnaDestinacija: "",
                krajnjaDestinacija: "",
                trajanje: "",
                cena: "",
                avionId: null
            }
        }
    },
    mounted() {
        var p = this.pripremiParametre();
        this.ucitajLetove(p);
        this.ucitajAvione();
    },
    methods: {
        ucitajLetove(parametri) {
            api.sviLetovi(parametri).then((res) => {
                var podaci = [];
                var serverData = res.data.data;
                for(var i=0; i<serverData.length; i++){
                    var serverLet = serverData[i];
                    
                    podaci.push({
                        id: serverLet.id,
                        avion: serverLet.avion.naziv,
                        pocetnaDestinacija: serverLet.pocetnaDestinacija,
                        krajnjaDestinacija: serverLet.krajnjaDestinacija,
                        trajanjeLeta: serverLet.trajanjeLeta,
                        cena: serverLet.cena,
                        status: serverLet.status
                    })
                }
                this.totalRows = res.data.total_count;
                this.letovi = podaci;
            })
        },
        ucitajAvione() {
            // Uzimamo sve letove, paginacija nije moguca u dropdownu
            api.sviAvioni({from:0, count:100}).then((res) => {
                // Moramo promeniti strukturu zbog dropdowna
                var serverPodaci = res.data.data;
                var podaci = [{
                    value: null,
                    text: 'Svi avioni'
                }];
                for(var i=0; i<serverPodaci.length; i++){
                    podaci.push({
                        value: serverPodaci[i].id,
                        text: serverPodaci[i].naziv
                    });
                }
                this.avioni = podaci;
            })
        },
        filtriraj() {
            var p = this.pripremiParametre();
            this.ucitajLetove(p);
        },
        pripremiParametre() {
            var parametri = {
                from: this.paginacija.from,
                count: this.paginacija.count
            };

            if(this.filteri.pocetnaDestinacija.trim().length>0){
                parametri.pocetnaDestinacija = this.filteri.pocetnaDestinacija.trim();
            }
            if(this.filteri.cenaOd.trim().length>0){
                parametri.cenaOd = this.filteri.cenaOd.trim();
            }
            if(this.filteri.cenaDo.trim().length>0){
                parametri.cenaDo = this.filteri.cenaDo.trim();
            }
            if(this.filteri.trajanjeOd.trim().length>0){
                parametri.trajanjeOd = this.filteri.trajanjeOd.trim();
            }
            if(this.filteri.trajanjeDo.trim().length>0){
                parametri.trajanjeDo = this.filteri.trajanjeDo.trim();
            }
            if(this.filteri.avionId!=null){
                parametri.avionId = this.filteri.avionId;
            }
            
            return parametri;
        },
        obrisiLet(letId) {
            api.obrisiLet({
                letId
            }).then(() => {
                // Najverovatnije ce uvek sve biti okej
                this.filtriraj();
            })
        },
        stranaNapred() {
            if(this.letovi.length == 0){
                return;
            }
            this.paginacija.from +=this.paginacija.count;
            this.filtriraj();
        },
        stranaNazad() {
            this.paginacija.from -=this.paginacija.count;
            if(this.paginacija.from<0){
                this.paginacija.from=0;
            }
            this.filtriraj();
        }
    }
}
</script>