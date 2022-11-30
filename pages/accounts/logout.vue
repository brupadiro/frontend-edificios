<template>
  
</template>

<script>
export default {
    async created(){
        await this.$auth.logout()
        return this.$router.push('/accounts/login')
    }
}
</script>

<style>

</style>