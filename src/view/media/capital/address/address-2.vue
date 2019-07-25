<style>
    .layout-address-search {
        float: left;
    }

    .layout-address-add {
        float: right;
    }

    .span {
        font-size: 14px;
        margin: 15px;
        color: #495060;
        padding-bottom: 20px;
    }

    .layout-address .ivu-poptip-confirm .ivu-poptip-body .ivu-icon {
        font-size: 16px;
        color: #ff9900;
        line-height: 18px;
        position: absolute;
        margin-left: -55px;
    }

    .ivu-table th,
    .ivu-table td {
        height: 40px;
    }

    .cut {
        width: 80%;
        height: auto;
        /* margin: 30px auto;  */
    }

    .c-item {
        max-width: 800px;
        margin: 10px auto;
        margin-top: 20px;
    }

    .content {
        margin: auto;
        max-width: 1200px;
        margin-bottom: 100px;
    }

    .test-button {
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        justify-content: center;
    }

    .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        /* text-align: center; */
        box-sizing: border-box;
        outline: none;
        /* margin: 20px 10px 0px 0px; */
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
        transition: all .2s ease;
        text-decoration: none;
        user-select: none;
        margin-left: -300px;
    }

    .des {
        line-height: 30px;
    }

    code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo, Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
    }

    .show-info {
        margin-bottom: 50px;
    }

    .show-info h2 {
        line-height: 50px;
    }

    /*.title, .title:hover, .title-focus, .title:visited {
        color: black;
      }*/

    .title {
        display: block;
        text-decoration: none;
        text-align: center;
        line-height: 1.5;
        margin: 20px 0px;
        background-image: -webkit-linear-gradient(left, #3498db, #f47920 10%, #d71345 20%, #f7acbc 30%, #ffd400 40%, #3498db 50%, #f47920 60%, #d71345 70%, #f7acbc 80%, #ffd400 90%, #3498db);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        font-size: 40px;
    }

    .test {
        height: 500px;
    }

    .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
    }

    .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
    }

    .c-item {
        display: block;
        user-select: none;
    }

    @keyframes slide {
        0% {
            background-position: 0 0;
        }
        100% {
            background-position: -100% 0;
        }
    }

    .layout-address-page {
        float: right;
        margin-top: 10px;
    }
</style>
<template>
    <div class="layout-address">
        <!-- 搜索 -->
        <div class="layout-address-search">
            <Form :model="search" inline>
                <FormItem label="节目集名称:" :label-width="80">
                    <Input v-model="search.albumId" style="width: 200px;" disabled></Input>
                </FormItem>
                <!-- <FormItem label="海报名称:" :label-width="80">
                    <Input v-model="search.name" style="width: 200px;" placeholder="请输入海报名称..."></Input>
                </FormItem> -->
                <FormItem :label-width="20">
                    <!-- <Button type="primary" @click="query">搜索</Button> -->
                </FormItem>
            </Form>
        </div>
        <!-- 添加 -->
        <div class="layout-address-add">
            <Button type="success" @click="modalAdd = true;info.ratio = 1;cutimgs=[]" style="margin-right: 10px;">添加</Button>
            <Button type="primary" @click="onModalEdit">修改</Button>
            <Modal v-model="modalAdd" title="添加" width="500" :styles="{top: '20px'}" @on-ok="addOk">
                <Form :model="info" label-position="right" :label-width="100">
                    <FormItem label="节目集名称:">
                        <Input v-model="info.name"></Input>
                    </FormItem>
                    <FormItem label="海报比例:">
                        <RadioGroup v-model="info.ratio" @on-change="changeRatio">
                            <Radio :label="1">26:36</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="上传海报:">
                        <div style="width: 100%;height: 100%;float: left;">
                            <div>
                                <div class="cut">
                                    <!-- <img :src="modelSrc" alt="" style="max-width:200px;max-height:200px;"> -->
                                    <div v-for="(img,key) in cutimgs" :key="key" style="float: left;">
                                        <img :src="img" :alt="img">
                                    </div>
                                </div>
                                <div class="test-button">
                                    <label class="btn" for="uploads">上传</label>
                                    <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
                                        @change="uploadImg($event, 1)">
                                </div>
                            </div>
                        </div>
                    </FormItem>
                </Form>
            </Modal>
            <Modal v-model="modalAddCut" title="裁剪图片" fullscreen @on-ok="modalCutOnOk">
                <div style="width:100%;height:100%;">
                    <vue-cropper v-if="modalAddCut == true" ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType"
                        :info="true" :full="option.full" :can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox"
                        :original="option.original" :auto-crop="option.autoCrop" :auto-crop-width="option.autoCropWidth" :auto-crop-height="option.autoCropHeight"
                        :center-box="option.centerBox" @realTime="realTime" :high="option.high" @img-load="imgLoad" :fixedNumber="option.fixedNumber"
                        :fixed="option.fixed"></vue-cropper>
                </div>
            </Modal>

        </div>
        <div style="clear: both;"></div>
        <div class="layout-address-table">
            <Table border :columns="columns1" :data="data1"></Table>
        </div>
        <div class="layout-address-page">
            <Page :total="total" :current="page" :page-size='pageSize' @on-change="changePage" show-elevator />
        </div>
        <!-- 修改 -->
        <div class="layout-address-add">
            <Modal v-model="modalEdit" title="修改" @on-ok="editOk">
                <Form :model="edit" label-position="right" :label-width="100">
                    <FormItem label="节目集名称:">
                        <Input v-model="edit.name"></Input>
                    </FormItem>
                    <FormItem label="海报比例:">
                        <RadioGroup v-model="edit.ratio" @on-change="changeRatio">
                            <Radio :label="1">26:36</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="上传海报:">
                        <div class="cut">
                            <!-- <img :src="modelSrc" alt="" style="max-width:200px;max-height:200px;"> -->
                            <div v-for="(img,key) in cutimgs" :key="key" style="float: left;">
                                <img :src="img" :alt="img">
                            </div>
                        </div>
                        <div class="test-button">
                            <label class="btn" for="uploads1">上传</label>
                            <input type="file" id="uploads1" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg"
                                @change="uploadImg($event, 1)">
                        </div>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    </div>
</template>

<script>    
    var moment = require("moment");
    // import VueCropper from vue-cropper

    export default {
        data() {
            return {
                model: false,
                modelSrc: '', // 裁剪后的图片
                cutSelectRatio: 1, // 裁剪选择的比例
                cutimgs: [], // 服务端返回裁剪的图片列表
                crap: false,
                previews: {},
                //分页
                pageSize: 10,
                page: 1,
                total: 0,
                lists: [
                    {
                        img: 'https://qn-qn-kibey-static-cdn.app-echo.com/goodboy-weixin.PNG'
                    },
                    {
                        img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4'
                    }
                ],
                option: {
                    img: '',
                    size: 1,
                    full: false,
                    outputType: 'png',
                    canMove: true,
                    fixedBox: false,
                    original: false,
                    canMoveBox: true,
                    autoCrop: true,
                    // 只有自动截图开启 宽度高度才生效
                    autoCropWidth: 200,
                    autoCropHeight: 150,
                    centerBox: false,
                    high: true,
                    fixed: true,
                    fixedNumber: [4, 3]
                },
                show: true,
                previewStyle1: {},
                previewStyle2: {},

                search: {
                    albumId: 5,
                    name: ''
                },//搜索
                info: {},
                modalAdd: false,//添加
                modalAddCut: false, // 添加-图片编辑
                edit: {},
                modalEdit: false,//修改
                columns1: [
                    {
                        title: '海报ID',
                        key: 'id',
                        align: 'center'
                    },
                    {
                        title: '海报预览',
                        key: 'poster_url',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('img', {
                                    attrs: {
                                        src: params.row.poster_url
                                    },
                                    style: {
                                        width: '50px',
                                        height: '50px',
                                        marginTop: '5px'
                                    }
                                }),
                            ]);
                        }
                    },
                    {
                        title: '默认海报',
                        key: 'ISdefault',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        key: 'Iscreate_time',
                        align: 'center'
                    },
                    {
                        title: '状态',
                        key: 'ISstatus',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                // h('Button', {
                                //     props: {
                                //         type: 'primary',
                                //         size: 'small',
                                //     },
                                //     style: {
                                //         marginRight: '5px'
                                //     },
                                //     on: {
                                //         click: () => {
                                //             this.modify(params.row)
                                //         }
                                //     }
                                // }, '修改'),
                                h(
                                    "Poptip", {
                                        props: {
                                            confirm: true,
                                            title: "要更改默认海报吗!",
                                            type: "warning",
                                            size: "small",
                                            width: "170"
                                        },
                                        on: {
                                            "on-ok": () => {
                                                this.default(params.row);
                                            }
                                        }
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "warning",
                                                    size: "small",
                                                },
                                                style: {
                                                    marginRight: '5px'
                                                }
                                            },
                                            "默认海报"
                                        )
                                    ]
                                ),
                                h(
                                    "Poptip", {
                                        props: {
                                            confirm: true,
                                            title: "确定要删除吗！",
                                            type: "error",
                                            size: "small",
                                            width: "150"
                                        },
                                        on: {
                                            "on-ok": () => {
                                                this.remove(params.row);
                                            }
                                        }
                                    }, [
                                        h(
                                            "Button", {
                                                props: {
                                                    type: "error",
                                                    size: "small",
                                                }
                                            },
                                            "删除"
                                        )
                                    ]
                                )
                            ]);
                        }
                    }
                ],
                data1: [],

            }
        },
        methods: {
            // 表格数据
            getTableList() {
                let self = this;
                if (typeof this.search.albumId == 'undefined') {
                    this.search.albumId = ''
                }
                self.$http(this.$config.BaseURL1 + '/media/v2/poster/address/list?albumId=' + this.search.albumId + '&page=' + self.page + '&pageSize=' + self.pageSize + '&name=' + self.search.name).then(response => {
                    if (response.data.errno == 10000) {
                        // console.log(response)
                        self.data1 = response.data.data.list;

                        response.data.data.list.forEach(val => {
                            // 1上线，2删除，3下线
                            if (val.status == 1) {
                                val.ISstatus = "上线"
                            } else if (val.status == 2) {
                                val.ISstatus = "删除"
                            } else if (val.status == 3) {
                                val.ISstatus = "下线"
                            }
                            // 1默认，2非默认
                            if (val.default == 1) {
                                val.ISdefault = "是"
                            } else if (val.default == 2) {
                                val.ISdefault = "否"
                            }

                            //时间转换
                            val.Iscreate_time = moment(val.create_time * 1000).format(
                                "YYYY-MM-DD HH:mm:ss"
                            )

                            self.total = response.data.data.total;
                        });
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg);
                    }

                }, response => { })
            },
            //删除
            remove(row) {
                let self = this;
                console.log(row)
                self.$http.post(this.$config.BaseURL1 + '/media/v2/poster/address/delete', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success('删除成功!')
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            //更改默认海报
            default(row) {
                let self = this;
                self.$http.post(this.$config.BaseURL1 + '/media/v2/poster/address/default', {
                    id: row.id
                }).then(response => {
                    if (response.data.errno == 10000) {
                        this.getTableList();
                        this.$Message.success(response.data.errmsg)
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            changeImg() {
                this.option.img = this.lists[~~(Math.random() * this.lists.length)].img
            },
            startCrop() {
                // start
                this.crap = true
                this.$refs.cropper.startCrop()
            },
            stopCrop() {
                //  stop
                this.crap = false
                this.$refs.cropper.stopCrop()
            },
            clearCrop() {
                // clear
                this.$refs.cropper.clearCrop()
            },
            refreshCrop() {
                // clear
                this.$refs.cropper.refresh()
            },
            changeScale(num) {
                num = num || 1
                this.$refs.cropper.changeScale(num)
            },
            rotateLeft() {
                this.$refs.cropper.rotateLeft()
            },
            rotateRight() {
                this.$refs.cropper.rotateRight()
            },
            finish(type) {
                // 输出
                // var test = window.open('about:blank')
                // test.document.body.innerHTML = '图片生成中..'
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        var img = window.URL.createObjectURL(data)
                        this.model = true
                        this.modelSrc = img
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.model = true
                        this.modelSrc = data
                    })
                }
            },
            // // 实时预览函数
            // realTime(data) {
            //     this.previews = data
            //     console.log(data)
            // },

            finish2(type) {
                this.$refs.cropper2.getCropData((data) => {
                    this.model = true
                    this.modelSrc = data
                })
            },
            finish3(type) {
                this.$refs.cropper3.getCropData((data) => {
                    this.model = true
                    this.modelSrc = data
                })
            },
            down(type) {
                // event.preventDefault()
                var aLink = document.createElement('a')
                aLink.download = 'demo'
                // 输出
                if (type === 'blob') {
                    this.$refs.cropper.getCropBlob((data) => {
                        this.downImg = window.URL.createObjectURL(data)
                        aLink.href = window.URL.createObjectURL(data)
                        aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.downImg = data
                        aLink.href = data
                        aLink.click()
                    })
                }
            },

            uploadImg(e, num) {
                if (e.target.value == "") {
                    this.$Message.info('未选择图片');
                    return
                }
                this.modalAddCut = true;
                //上传图片
                // this.option.img
                var file = e.target.files[0]
                if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                    this.$Message.info('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
                    return false
                }
                var reader = new FileReader()
                reader.onload = (e) => {
                    let data
                    if (typeof e.target.result === 'object') {
                        // 把Array Buffer转化为blob 如果是base64不需要
                        data = window.URL.createObjectURL(new Blob([e.target.result]))
                    } else {
                        data = e.target.result
                    }
                    if (num === 1) {
                        this.option.img = data
                    } else if (num === 2) {
                        this.example2.img = data
                    }
                }
                // 转化为base64
                // reader.readAsDataURL(file)
                // 转化为blob
                reader.readAsArrayBuffer(file)
            },
            imgLoad(msg) {
                console.log(msg)
            },
            realTime(data) {
                // var previews = data;
                // var h = 0.5;
                // var w = 0.2;
                this.$refs.cropper.getCropData((data) => {
                    // do something
                    this.modelSrc = data
                    console.log(data)
                })
                // this.$refs.cropper.getCropBlob((data) => {
                //     // do something
                //     console.log(data)
                // })
                // this.previewStyle1 = {
                //     width: previews.w + "px",
                //     height: previews.h + "px",
                //     overflow: "hidden",
                //     margin: "0",
                //     zoom: h
                // };

                // this.previewStyle2 = {
                //     width: previews.w + "px",
                //     height: previews.h + "px",
                //     overflow: "hidden",
                //     margin: "0",
                //     zoom: w
                // };
                // this.previews = data;
            },
            // 选择比例
            changeRatio(ratio) {
                console.log(ratio)
                this.cutSelectRatio = ratio;
                if (ratio == 1) {
                    this.option.fixedNumber = [4, 3];
                    this.option.autoCropHeight = 150;
                    this.option.autoCropWidth = 200;
                } else {
                    this.option.fixedNumber = [2, 3];
                    this.option.autoCropHeight = 300;
                    this.option.autoCropWidth = 200;
                }
            },
            // 裁剪完成，确定按钮事件
            modalCutOnOk() {
                let formdata = new FormData();
                formdata.append('file', this.convertBase64UrlToBlob(this.modelSrc));
                formdata.append('ratio', this.cutSelectRatio);
                this.$http.post(this.$config.BaseURL1 + '/media/v2/poster/scale', formdata, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
                    console.log(response)
                    if (response.data.errno == 10000) {
                        console.log(response)
                        this.cutimgs = response.data.data;
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            /**  
             * 将以base64的图片url数据转换为Blob  
             * @param urlData  
             *            用url方式表示的base64图片数据  
             */
            convertBase64UrlToBlob(urlData) {
                var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte  
                //处理异常,将ascii码小于0的转换为大于0  
                var ab = new ArrayBuffer(bytes.length);
                var ia = new Uint8Array(ab);
                for (var i = 0; i < bytes.length; i++) {
                    ia[i] = bytes.charCodeAt(i);
                }
                return new Blob([ab], { type: 'image/png' });
            },

            // 添加确定按钮
            addOk() {
                this.info.albumId = this.search.albumId;
                this.info.posterUrls = this.cutimgs;
                let formdata = new FormData();
                // formdata.append('albumId',this.search.albumId);
                // formdata.append('posterUrls',JSON.stringify(this.info.posterUrls));
                // formdata.append('name',this.info.name);
                // formdata.append('ratio',this.info.ratio);

                this.$http.post(this.$config.BaseURL1 + '/media/v2/poster/address/modify', this.info).then(response => {
                    if (response.data.errno == 10000) {
                        this.info = {};
                        this.$Message.info('添加成功');
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            // 点击修改按钮
            onModalEdit() {
                this.modalEdit = true;
                // 判断长度是否是有原来列表
                if (typeof this.data1 == 'undefined' || this.data1.length == 0) {
                    this.$Message.info('当前列表为空，请点击添加，不要点击修改');
                    return
                }
                this.cutimgs = [];
                this.edit.ratio = 0;
                this.data1.forEach((val) => {
                    this.cutimgs.push(val.poster_url);
                    if (this.edit.ratio == 0) {
                        this.edit.ratio = val.ratio;
                        this.edit.name = val.name;
                        this.edit.create_time = val.create_time;
                        this.edit.albumId = val.albumId;
                    }
                });
            },

            // 编辑确定
            editOk() {
                this.edit.albumId = typeof this.edit.albumId == 'undefined' ? this.search.albumId : this.edit.albumId;
                this.edit.posterUrls = this.cutimgs;
                // let formdata = new FormData();
                // formdata.append('albumId',this.edit.albumId);
                // formdata.append('posterUrls',JSON.stringify(this.edit.posterUrls));
                // formdata.append('name',this.edit.name);
                // formdata.append('ratio',this.edit.ratio);
                // formdata.append('create_time',this.edit.create_time);

                this.$http.post(this.$config.BaseURL1 + '/media/v2/poster/address/modify', this.edit, { headers: { 'Content-Type': 'multipart/form-data' } }).then(response => {
                    if (response.data.errno == 10000) {
                        this.edit = {};
                        this.$Message.info('编辑成功');
                    } else {
                        // 提示 response.data.errmsg
                        this.$Message.info(response.data.errmsg)
                    }
                }, response => { })
            },
            //分页
            changePage(page) {
                this.page = page;
                this.getTableList();
            },
            //搜索
            query() {
                this.page = 1;
                this.getTableList()
            }


        },
        mounted() {
            this.getTableList();
        },
    }
</script>