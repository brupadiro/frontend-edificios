<template>
  <v-container>
    <v-row>
        <v-col class="col-12">
            <StaffTasksListComponent :filters="filters"></StaffTasksListComponent>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    name: 'StaffTasksListPage',
    data() {
        return {
        filters: {
            staff:{
                user:this.$auth.user.id
            },
        },
        };
    },
}
</script>

<style>

</style>