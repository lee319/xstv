<style scoped>
    #jsmind_container {
        width: 100%;
        height: 100%;
    }
</style>


<template>
    <div style="width: 100%;height: 100%;">
        <!-- v-model="" -->
        <Tabs type="card" @on-click="tabChange">
            <TabPane label="电影"></TabPane>
            <TabPane label="电视剧"></TabPane>
            <TabPane label="综艺"></TabPane>
            <TabPane label="动漫"></TabPane>
            <TabPane label="纪录片"></TabPane>
        </Tabs>
        <Dropdown ref="menu" trigger="contextMenu" placement="right" @on-click="rightMenuClick">
            <dropdown-menu slot="list">
                <dropdown-item name="addNode">添加子标签</dropdown-item>
                <dropdown-item name="synonym" v-if="nodeType != 'category'">同义词</dropdown-item>
                <!-- <dropdown-item name="topList">top排行</dropdown-item> -->
                <dropdown-item name="upNode" v-if="nodeType != 'category'">修改标签</dropdown-item>
                <dropdown-item name="delNode" v-if="nodeType != 'category'">删除标签</dropdown-item>
            </dropdown-menu>
        </Dropdown>

        <div id="jsmind_container" @contextmenu.prevent="rightClick">
        </div>
        <!-- 添加子标签 -->
        <Modal v-model="addNodeModel" title="添加子标签" @on-ok="okAddNode">
            <Form :model="addNodeInfo" label-position="right" :label-width="100">
                <FormItem label="标签名称:">
                    <Input v-model="addNodeInfo.name" placeholder="请输入标签名称..."></Input>
                </FormItem>
                <FormItem label="上级标签:">
                    <Input v-model="addNodeInfo.parent" readonly></Input>
                </FormItem>
                <FormItem label="标签描述:">
                    <Input type="textarea" :rows="4" v-model="addNodeInfo.desc" placeholder="请输入标签描述..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改同义词 -->
        <Modal v-model="synonymModel" title="修改同义词" @on-ok="okSynonym">
            <Form :model="synonymEdit" label-position="right" :label-width="100">
                <FormItem label="标签名称:">
                    <Input v-model="synonymEdit.name" placeholder="请输入标签名称..." disabled></Input>
                </FormItem>
                <FormItem label="同义词:">
                    <Input type="textarea" :rows="4" v-model="synonymEdit.tag_alias" placeholder="请输入同义词..."></Input>
                </FormItem>
            </Form>
        </Modal>
        <!-- 修改标签 -->
        <Modal v-model="upNodeModel" title="修改标签" @on-ok="okUpNode">
            <Form :model="upNodeEdit" label-position="right" :label-width="100">
                <FormItem label="标签名称:">
                    <Input v-model="upNodeEdit.name"></Input>
                </FormItem>
                <FormItem label="上级标签:">
                    <Input v-model="upNodeEdit.parent" readonly></Input>
                </FormItem>
                <FormItem label="标签描述:">
                    <Input type="textarea" :rows="4" v-model="upNodeEdit.desc"></Input>
                </FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
    import "jsmind/style/jsmind.css";
    import jsMind from "jsmind";
    export default {
        data: function () {
            return {
                addNodeModel: false,
                addNodeInfo: {},//添加子节点
                synonymModel: false,
                synonymEdit: {},//修改同义词
                upNodeModel: false,
                upNodeEdit: {},//修改标签
                tabId: 1,//tab页id
                nodeType: '', // 右键菜单时，父级类型
                selectdNode: null, // 选中的节点
                // 全局拓扑对象
                jm: {},
                mind: {
                    // 3 data formats were supported ...
                    // see Documents for more information
                    meta: {
                        "name": "test",
                        "author": "vivi",
                        "version": 'v1.0.0'
                    },
                    format: "node_tree",
                    data: {
                        id: "root", topic: "电影", children: []
                    }
                },
                options: {
                    container: 'jsmind_container',
                    theme: 'orange',
                    editable: true,
                    default_event_handle: { enable_dblclick_handle: false }
                }
            }
        },

        methods: {
            //tab切换
            tabChange(name) {
                let self = this;
                if (name == 0) {
                    self.tabId = 1;
                } else if (name == 1) {
                    self.tabId = 2;
                } else if (name == 2) {
                    self.tabId = 6;
                } else if (name == 3) {
                    self.tabId = 4
                } else if (name == 4) {
                    self.tabId = 3;
                }
                this.getjsMindList()
            },
            rightClick: function (event) {
                let selectdNode = this.jm.get_selected_node();
                if (!selectdNode) {
                    return;
                }
                console.log(selectdNode)
                console.log(event)
                this.nodeType = selectdNode.data.type;
                // console.log(this.nodeType)
                //每次展开前重置visible状态测试无效，但控制台直接调用却有效
                //_this.$refs.menu.currentVisible = false;
                this.$refs.menu.$refs.reference = event.target;
                this.$refs.menu.currentVisible = true;
            },
            // 右键菜单点击
            rightMenuClick(name) {
                let selectdNode = this.jm.get_selected_node();
                if (!selectdNode) {
                    return;
                }
                this.selectdNode = selectdNode; // 保存右键选择节点

                switch (name) {
                    case 'addNode':
                        this.addNodeModel = true;
                        this.addNode();
                        break;
                    case 'synonym':
                        this.synonymModel = true;
                        this.synonym()
                        break;
                    case 'upNode':
                        this.upNodeModel = true;
                        this.upNode()
                        break;
                    case 'delNode':
                        this.delNode()
                        break;
                    default:
                        break;
                }

            },
            // 添加节点
            addNode() {
                this.addNodeInfo = {
                    name: '',
                    parent: this.selectdNode.topic,
                    desc: ''
                };
                console.log(this.selectdNode);
            },
            // 修改同义词
            synonym() {
                this.synonymEdit = {
                    tag_id: this.selectdNode.data.aid,
                    name: this.selectdNode.topic,
                    tag_alias: '',
                };
                console.log(this.selectdNode);
            },
            // 修改标签
            upNode() {
                this.upNodeEdit = {
                    name: this.selectdNode.topic,
                    desc: this.selectdNode.data.desc,
                    cid: this.selectdNode.data.cid,
                    parrent_id: this.selectdNode.data.parrent_id,
                    id: this.selectdNode.data.aid,
                    parent: this.selectdNode.parent.topic
                };
                console.log(this.selectdNode);
            },
            // 添加弹框确定按钮事件
            okAddNode() {
                if (this.addNodeInfo.name == '') {
                    this.$Message.info('节点名不能为空');
                    return;
                }

                this.addNodeInfo.cid = this.selectdNode.data.cid;
                this.addNodeInfo.parrent_id = this.selectdNode.data.aid;
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/modify', this.addNodeInfo).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('添加成功！')
                    }
                })
            },
            // 修改同义词确定按钮
            okSynonym() {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/synonym', this.synonymEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            // 修改标签确定按钮
            okUpNode() {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/modify', this.upNodeEdit).then(response => {
                    if (response.data.errno == 10000) {
                        this.getjsMindList();
                        this.$Message.success('修改成功！')
                    }
                })
            },
            // 拓扑图数据
            getjsMindList() {
                let self = this;
                self.$http(this.$config.BaseURL7 + '/media/v2/xstag/list?category_id=' + self.tabId).then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.mind.data = response.data.data[0];
                        console.log(self.mind.data.children)
                        this.mind.data.children.forEach((v, k) => {
                            v.direction = k % 2 == 0 ? "right" : "left";
                            this.mind.data.children[k] = v;
                        });
                        this.jm.show(this.mind);
                        // console.log(this.mind.data)
                    }
                })
            },
            //删除
            delNode() {
                this.$http.post(this.$config.BaseURL7 + '/media/v2/xstag/delete',
                    {
                        id: this.selectdNode.data.aid
                    }).then(response => {
                        if (response.data.errno == 10000) {
                            this.getjsMindList();
                            this.$Message.success('删除成功！')
                        }
                    })
            }
        },
        mounted() {
            this.jm = new jsMind(this.options);
            this.getjsMindList();
        }
    }
</script>