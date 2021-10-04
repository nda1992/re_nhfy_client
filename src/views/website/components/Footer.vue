<template>
    <div class="main">
        <div class="title">
            <div class="line1">
                <span>南华大学附属第一医院</span>
                <span><a href="https://beian.miit.gov.cn/">版权所有：湘ICP备05005356号-1 湘卫网审字(2001)27号</a></span>
                <span>文保网安备案号：1101020002</span>
            </div>
            <div class="line2">
                <span>医院地址：衡阳市船山路69号</span>
                <span>电话：0734-8279088；0734-8279087</span>
                <span>传真：0734-8279009</span>
                <span>邮编：421001</span>
            </div>
            <div class="line3">
                <span>技术支持：火星科技(电话： 18980808200)</span>
                <span>©Copyright</span>
                <span @click="openDialog">意见反馈</span>
            </div>
        </div>
        <div class="qrcode">
            <img :src="qrcode_url">
        </div>
        <div slot="footer">
            <el-dialog title="请输入您的建议" :visible.sync="openDialogvisible">
                <el-form :model="adviceForm" ref='adviceForm' :rules="rules">
                <el-form-item prop="content">
                    <el-input
                    type="textarea"
                    v-model="adviceForm.content"
                    placeholder="请输入建议..." />
                </el-form-item>
                <div class="btns">
                    <el-button type="primary" @click='submit'>提交</el-button>
                    <el-button @click="resetForm('adviceForm')">重置</el-button>
                </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import { FOOTER_QRCODE_WOWNLOAD } from '@/utils/urlConfig'
import { submitAdvice } from '@/api/advice/advice' 
export default {
    data() {
        return {
            qrcode_url: FOOTER_QRCODE_WOWNLOAD,
            openDialogvisible: false,
            adviceForm: { content: '' },
            rules: {
                content: [{ required: true, trigger: 'blur', message: '输入内容不能为空' }]
            }
        }
    },
    methods: {
        resetAdviceForm() {
            this.adviceForm = {
                content: ''
            }
        },
        openDialog() {
            this.openDialogvisible = true
            this.resetAdviceForm()
            this.$nextTick(() => {
                this.$refs['adviceForm'].clearValidate()
            })
        },
        // 重置按钮
        resetForm(adviceForm) {
            this.$refs[adviceForm].resetFields()
        },
        submit() {
            if (this.adviceForm.content === '') {
                this.$message.error('输入的内容不能为空')
                return
            }
            this.$refs.adviceForm.validate((valid) => {
                if (valid) {
                this.$confirm('是否提交建议?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning' }).then(() => {
                    const temp = Object.assign({}, this.adviceForm)
                    submitAdvice(temp).then((res) => {
                    const { msg } = res
                    this.openDialogvisible = false
                    this.$notify({
                        title: 'Success',
                        message: msg,
                        type: 'success',
                        duration: 2000
                    })
                    })
                })
            }
        })
        }
    }
}
</script>
<style lang="scss" scoped>
    .main {
        height: 120px;
        width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-around;
        .title {
            width: 900px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            .line1, .line2, .line3 {
                display: flex;
                justify-content: space-around;
            }
            .line3 {
                span {
                    &:nth-child(3) {
                        cursor: pointer;
                        &:hover {
                            color: #1a181b;
                        }
                    }
                }
            }
        }
        .qrcode {
            display: flex;
            flex-direction: column;
            justify-content: center;
            img {
                width: 100px;
                height: 100px;
            }
        }
    }
</style>