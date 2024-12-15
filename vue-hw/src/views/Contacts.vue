<template>
    <div>
        <Header />
        <main>
            <h1>MEIST</h1>
            <p>This is out homework number 4</p>
            <br>
            <p>Contact us using the following links</p>
        </main>
        <Footer />
    </div>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Header,
        Footer
    }
};
</script>

<style scoped>
/* Add your styles here */
main {
    margin: 0;
    padding: 0;

}
</style>