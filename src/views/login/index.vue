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
            <el-form ref="loginFormref" :model="loginForm" style="max-width: 600px" class="demo-ruleForm"
                :rules="rules">
                <el-form-item prop="userName">
                    <el-input v-model="loginForm.userName" placeholder="手机号" :prefix-icon="UserFilled"></el-input>
                </el-form-item>
                <el-form-item prop="passWord">
                    <el-input v-model="loginForm.passWord" type="password" placeholder="密码"
                        :prefix-icon="Lock"></el-input>
                </el-form-item>
                <el-form-item v-if="formType" prop="validCode">
                    <el-input v-model="loginForm.validCode" placeholder="验证码" :prefix-icon="Lock">
                        <template #append>
                            <span @click="countdownChange">{{ countdown.vaildtText }}</span>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :style="{ width: '100%' }" @click="subimitForm(loginFormref)">{{
                        formType
                            ? "注册账号" :
                            "登录" }}</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </el-row>
</template>

<script setup>
import { ref, reactive, computed, toRaw, nextTick } from 'vue';
import { getCode, userAuthentication, login, menuPermissions } from '../../api'
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'

//图片路径
const imgUrl = new URL('../../../public/login-head.png', import.meta.url).href

//表单初始数据
const loginForm = reactive({
    userName: '',
    passWord: '',
    validCode: ''
})



//切换表单(0 登录 1 注册)
const formType = ref(0)

//点击切换登录和注册
const handerChange = () => {
    formType.value = formType.value ? 0 : 1
}

//手机号校验规则
const validatorUser = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入手机号'));
    } else {
        //手机号正则
        const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
        phoneReg.test(value) ? callback() : callback(new Error('手机号格式不正确,请输入正确的手机号'));
    }
}
//密码校验规则
const validatorPass = (rule, value, callback) => {
    //不能为空
    if (value === '') {
        callback(new Error('请输入密码'));
    } else {
        //密码正则
        const passReg = /^[a-zA-Z0-9_-]{4,16}$/;
        passReg.test(value) ? callback() : callback(new Error('密码格式不正确,请输入4-16位字母数字下划线组合'));
    }
}


//表单校验
const rules = reactive({
    userName: [{ validator: validatorUser, trigger: 'blur' }],
    passWord: [{ validator: validatorPass, trigger: 'blur' }],

})

//发送验证码短信
const countdown = reactive({
    vaildtText: "获取验证码",
    time: 60
})

//记录当前定时器状态 只能有一个定时器
let flag = false;
const countdownChange = () => {
    //如果短信已发送就不处理
    if (flag) {
        return;
    }
    //判断手机号是否正确
    // 手机号正则
    const phoneReg = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    if (!loginForm.userName || !phoneReg.test(loginForm.userName)) {
        return ElMessage({
            message: '请检查手机号是否正确',
            type: 'warning',
        });
    }

    //倒计时   定时器
    const time = setInterval(() => {
        if (countdown.time <= 0) {
            countdown.time = 60;
            countdown.vaildtText = `获取验证码`
            flag = false;
            //清除定时器
            clearInterval(time);
        }
        else {
            countdown.time -= 1;
            countdown.vaildtText = `剩余${countdown.time}s`
        }

    }, 1000);
    flag = true;
    getCode({
        tel: loginForm.userName,
    }).then(({ data }) => {
        if (data.code === 10000) {
            ElMessage.success('验证码发送成功，请注意查收')
        }
    })
}

const loginFormref = ref()
const router = useRouter()
const store = useStore()

const routerList = computed(() => store.state.menu.routerList)
//表单提交
const subimitForm = async (formEl) => {
    if (!formEl) return
    //手动触发表单校验
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log(loginForm, 'submit!')
            //注册页面
            if (formType.value) {
                userAuthentication(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('注册成功，请登录')
                        formType.value = 0
                    }
                })
            } else {
                //登录页面
                login(loginForm).then(({ data }) => {
                    if (data.code === 10000) {
                        ElMessage.success('登录成功')
                        console.log(data)
                        //将token和用户信息缓存到浏览器
                        localStorage.setItem('pz_token', data.data.token)
                        localStorage.setItem('pz_userInfo', JSON.stringify(data.data.userInfo))
                        menuPermissions().then(({ data }) => {
                            store.commit('dynamicMenu', data.data)
                            console.log('动态菜单数据:', data.data)
                            console.log('路由列表:', routerList.value)

                            // 等待下一个tick确保路由数据更新
                            nextTick(() => {
                                // 添加动态路由
                                toRaw(routerList.value).forEach(item => {
                                    console.log('添加路由:', item)
                                    router.addRoute('main', item)
                                })

                                // 路由添加完成后跳转
                                router.push('/')
                            })
                        })

                    } else {
                        ElMessage.error('用户名或密码错误')
                    }
                })
            }
        } else {
            console.log('error submit!', fields)
        }
    })
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