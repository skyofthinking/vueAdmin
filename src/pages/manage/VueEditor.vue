<template>
    <section>
        <el-form ref="form" :model="form" @submit.prevent="onSubmit" style="margin:10px;">
            <div class="plugins-tips">
                Vue-Quill-Editor：基于Quill、适用于Vue2的富文本编辑器。 访问地址：
                <a href="https://github.com/surmon-china/vue-quill-editor" target="_blank">vue-quill-editor</a>
            </div>
            <quill-editor ref="textEditor" v-model="content" :config="editorOption"></quill-editor>
            <el-button type="primary" @click="submit">提交</el-button>
            <el-button @click.native.prevent>取消</el-button>
        </el-form>
    </section>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor';
    export default {
        data: function () {
            return {
                content: '<p>Hello BBK</p>',
                editorOption: {
                    // something config
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit() {
                console.log(this.content);
                this.$message.success('提交成功！');
            }
        },
        computed: {
            editor() {
                return this.$refs.textEditor.quillEditor;
            }
        }
    }

</script>