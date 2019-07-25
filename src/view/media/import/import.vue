<template>
    <div class="layout-import">
        <div class="layout-import-export">
            <Form :model="upload" :label-width="70" inline>
                <FormItem label="导入excel:">
                    <Upload :action="$config.BaseURL1 + '/media/v2/import'" ref="upload" :on-success="handleSuccess"
                        :show-upload-list="false" :with-credentials="true"  :format="['excel','xlsx']"  :on-format-error="handleFormatError">
                        <Button icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </FormItem>
                <FormItem>
                    <Button type="success" @click="downloadTemplate">下载模版</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="downloadExcel">导出Excel</Button>
                </FormItem>
            </Form>
        </div>
        <div class="layout-import-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                upload: {},//上传
                excel: '',//导出excel
                columns1: [
                    {
                        title: '序号',
                        type: 'index',
                        align: 'center',
                        width: 60
                    },
                    {
                        title: '节目名称',
                        key: 'title',
                        align: 'center'
                    },
                    {
                        title: '年代',
                        key: 'publish_year',
                        align: 'center'
                    },
                    {
                        title: '媒资是否存在',
                        key: 'exist',
                        align: 'center'
                    },
                    {
                        title: '播放源',
                        key: 'source',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        width: 160,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.JumpPpp(params.row)
                                        }
                                    }
                                }, '节目详情')
                            ]);
                        }
                    }
                ],
                data1: []
            }
        },
        methods: {
            handleSuccess(res, file) {
                console.log(res);
                console.log(file)
                this.data1 = res.data.list;
                console.log(this.data1)
                this.excel = res.data.excel;
            },
              // 上传格式验证
              handleFormatError(file) {
                this.$Notice.warning({
                    title: '文件格式不正确',
                    desc: '文件格式' + '文件名' + '不正确，请选择excel或xlsx格式'
                });
            },
            // 节目详情
            JumpPpp(row) {
                this.$router.push({
                    path: '/qqq'
                })
            },
            // 下载模版
            downloadTemplate() {
                let self = this;
                window.open('http://static2.ptxstv.gitv.tv/upload/181210/xlsx/1456279a0b9931ee22302fc767076522f88291.xlsx', '_blank')
            },
            // 导出excel
            downloadExcel() {
                window.open(this.excel, '_blank');
            }
        }
    }
</script>