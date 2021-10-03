<template>
    <div class="content-main">
        <ShowContent :title='123'/>
    </div>
</template>
<script>
import ShowContent from './components/Content/ShowContent'
export default {
    components: {
        ShowContent
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
    .content-main {
        padding:20px;
    }
</style>