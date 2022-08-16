<template>
    <v-container>
        <HeadersGeneralComponent>
            <template v-slot:title>
                Visitas
            </template>
        </HeadersGeneralComponent>
        <v-row>
            <v-col class="col-12">
                <PropertiesVisitsComponent :items="items" @update="getVisits()"></PropertiesVisitsComponent>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                items:{}
            }
        },
        created() {
            this.getVisits()
        },
        methods:{
            getVisits() {
                this.$axios.get('/visits/').then(response => {
                    this.items = response.data
                })
            }
        }
    }
</script>
