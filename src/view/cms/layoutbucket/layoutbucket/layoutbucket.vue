<style>
    .layout-layoutbucket-list {
        margin: 10px;
    }

    .template p {
        float: left;
        border: 5px solid #eeeeee;
        background-color: #fff;
    }

    .template2 {
        display: none;
    }
</style>
<template>
    <div class="layout-layoutbucket">
        <div class="layout-layoutbucket-list">
            <Card style="width:100%;background-color: #eeeeee;margin: 10px;" v-for="item in list">
                <Row>
                    <Col span="2">
                    <Row>
                        <Col span="24">
                        <p>ID:{{item._index}}</p>
                        </Col>
                        <Col span="24">
                        <p>名称:{{item._name}}</p>
                        </Col>
                    </Row>
                    </Col>
                    <Col span="22">
                    <div class="template">
                        <!-- 模版1 -->
                        <div class="template1" v-if="item._index == 1">
                            <p style="width:275px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版2 -->
                        <div class="template2" v-if="item._index == 2">
                            <p style="width:275px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版3 -->
                        <div class="template3" v-if="item._index == 3">
                            <p style="width:132px;height: 82.5px;"></p>
                            <p style="width:132px;height: 82.5px;"></p>
                            <p style="width:132px;height: 82.5px;"></p>
                            <p style="width:132px;height: 82.5px;"></p>
                            <p style="width:132px;height: 82.5px;"></p>
                            <p style="width:132px;height: 82.5px;"></p>
                        </div>
                        <!-- 模版4 -->
                        <!-- 模版5 -->
                        <div class="template5" v-if="item._index == 5">
                            <p style="width:275px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版6 -->
                        <div class="template6" v-if="item._index == 6">
                            <p style="width:266px;height: 180px;"></p>
                            <p style="width:266px;height: 180px;"></p>
                            <p style="width:266px;height: 180px;"></p>
                        </div>
                        <!-- 模版7 -->
                        <div class="template7" v-if="item._index == 7">
                            <p style="width:268px;height: 180px;"></p>
                            <p style="width:268px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版8 -->
                        <div class="template8" v-if="item._index == 8">
                            <p style="width:275px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:85px;"></p>
                            <p style="width: 130px;height:85px;margin-top: 8px;"></p>
                        </div>
                        <!-- 模版9 -->
                        <div class="template9" v-if="item._index == 9">
                            <p style="width: 133px;height:180px;"></p>
                            <p style="width: 133px;height:180px;"></p>
                            <p style="width: 133px;height:180px;"></p>
                            <p style="width: 133px;height:180px;"></p>
                            <p style="width: 133px;height:180px;"></p>
                            <p style="width: 133px;height:180px;"></p>
                        </div>
                        <!-- 模版10 -->
                        <div class="template10" v-if="item._index == 10">
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width:275px;height: 180px;"></p>
                        </div>
                        <!-- 模版11 -->
                        <div class="template11" v-if="item._index == 11">
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width:275px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                        </div>
                        <!-- 模版12 -->
                        <div class="template12" v-if="item._index ==12">
                            <p style="width:268px;height: 180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width: 130px;height:180px;"></p>
                            <p style="width:268px;height: 180px;"></p>
                        </div>
                        <!-- 模版13 -->
                        <div v-if="item._index ==13">
                            <p style="width: 133px;height:120px;"></p>
                            <p style="width: 133px;height:120px;"></p>
                            <p style="width: 133px;height:120px;"></p>
                            <p style="width: 133px;height:120px;"></p>
                            <p style="width: 133px;height:120px;"></p>
                            <p style="width: 133px;height:120px;"></p>
                        </div>
                        <!-- 模版14 -->
                        <div v-if="item._index ==14">
                            <p style="width: 202.5px;height:110px;"></p>
                            <p style="width: 202.5px;height:110px;"></p>
                            <p style="width: 202.5px;height:110px;"></p>
                            <p style="width: 202.5px;height:110px;"></p>
                        </div>
                        <!-- 模版14 -->
                        <div v-if="item._index ==15">
                            <p style="width:134px;height: 180px;"></p>
                            <p style="width: 134px;height:180px;"></p>
                            <p style="width: 134px;height:180px;"></p>
                            <p style="width:134px;height: 180px;"></p>
                            <p style="width: 134px;height:180px;"></p>
                            <p style="width:134px;height: 180px;"></p>
                        </div>
                        <!-- 模板16 -->
                        <div v-if="item._index == 16">
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                        </div>
                        <!-- 模板17 -->
                        <div v-if="item._index == 17">
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                          <p style="width:370px;height: 150px;"></p>
                        </div>
                         <!-- 模板18 -->
                        <div v-if="item._index == 18" style='display:flex;'>
                          <Icon type="ios-search-outline"  style='font-size:40px;color:#fff;height:74px;line-height:74px;position:absolute;left:20px;z-index:99;'/>
                          <div><input style='width:637px;height:74px;border-radius:41px;border:0;position:relative;background:#ccc;padding-left:60px;font-size:26px;' type="text" placeholder="搜索应用"></div>
                          <Icon type="ios-mic-outline" style='font-size:46px;color:#fff;background:#ccc;width:74px;height:74px;line-height:74px;
                          border-radius:100px;text-align:center;margin-left:10px;margin-top:5px;'/>
                        </div>
                    </div>
                    </Col>
                </Row>
            </Card>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                list: [],
            }
        },
        methods: {
            getList() {
                // /staticpromotion/layoutbucket/list
                let self = this;
                self.$http(this.$config.BaseURL + '/staticpromotion/layoutbucket/list').then(response => {
                    if (response.data.errno == 10000) {
                        console.log(response)
                        self.list = response.data.data;

                    }
                }, response => { })
            }
        },
        mounted() {
            this.getList()
        }
    }
</script>