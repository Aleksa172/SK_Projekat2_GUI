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
                        Avion dropdown
                    </b-td>
                </b-tr>
                    <b-td>
                        <button class="btn" @click="filtriraj">Filtriraj</button>
                    </b-td>
                <b-tr>

                </b-tr>
            </b-table-simple>
        </div>

        <b-table-lite :items="letovi"></b-table-lite>

        <button @click="stranaNazad">
            nazad
        </button>

        <button @click="stranaNapred">
            napred
        </button>
    </b-container>
</template>

<script>
import api from '../api' 

export default {
    data: function(){
        return {
            letovi: [],
            totalRows: 0,
            filteri: {
                pocetnaDestinacija: "",
                krajnjaDestinacija: "",
                trajanjeOd: "",
                trajanjeDo: "",
                cenaOd: "",
                cenaDo: "",
                avionId: ""
            },
            paginacija: {
                from: 0,
                count: 10 // count se realno nece menjati
            }
        }
    },
    mounted() {
        var p = this.pripremiParametre();
        this.ucitajLetove(p);
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
            if(this.filteri.avionId.trim().length>0){
                parametri.avionId = this.filteri.avionId.trim();
            }
            
            return parametri;
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