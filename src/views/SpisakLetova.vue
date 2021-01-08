<template>
    <b-container>
        Spisak letova
        <b-table-lite :items="letovi"></b-table-lite>

    </b-container>
</template>

<script>
import api from '../api' 

export default {
    data: function(){
        return {
            letovi: [],
            totalRows: 0
        }
    },
    mounted() {
        this.ucitajLetove();
    },
    methods: {
        ucitajLetove() {
            api.sviLetovi().then((res) => {
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
        }
    }
}
</script>