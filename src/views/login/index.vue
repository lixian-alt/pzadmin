<template>
    <el-row class="login-container" justify="center" :align="'middle'">
        <el-card style="max-width: 480px;">
            <template #header>
                <div class="card-header">
                    <img :src="imgUrl" alt="">
                </div>
            </template>
            <div class="jump-link">
                <el-link type="primary" @click="handerChange">{{ formType ? "返回登录" : "注册账号" }}</el-link>
            </div>
            <el-form :model="loginForm" label-width="120px">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" type="password" placeholder="密码"
                        :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock"></el-input>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { Lock, UserFilled } from '@element-plus/icons-vue';
import { ref, reactive } from 'vue';
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

//表单初始数据
const loginForm = reactive({
    userName: '',
    password: '',
    validCode: ''
})



//切换表单(0 登录 1 注册)
const formType = ref(0)

//点击切换登录和注册
const handerChange = () => {
    formType.value = formType.value ? 0 : 1
}
</script>

<style lang="less" scoped>
:deep(.el-card__header) {
    padding: 0
}

.login-container {
    height: 100%;

    .card-header {
        background-color: #899fe1;

        img {
            width: 430px;
        }
    }

    .jump-link {
        text-align: right;
        margin-bottom: 10px;
    }
}
</style>