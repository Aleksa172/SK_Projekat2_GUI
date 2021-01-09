<template>
    <b-container>
        <b-row>
            <b-button-group>
                <b-button to="/">Home</b-button>
                <b-button to="/letovi">Kupovina karata</b-button>
                <b-dropdown right text="Admin">
                    <b-dropdown-item to="/admin/letovi">Letovi</b-dropdown-item>
                    <b-dropdown-item to="/admin/avioni">Avioni</b-dropdown-item>
                </b-dropdown>
            </b-button-group>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
    
}
</script>