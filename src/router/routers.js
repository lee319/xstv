import Main from '@/view/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面不会缓存
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 * }
 */

export default [{
  path: '/login',
  name: 'login',
  meta: {
    title: 'Login - 登录',
    hideInMenu: true
  },
  component: () =>
    import('@/view/login/login.vue')
},
{
  path: '/',
  name: 'home',
  redirect: '/home',
  component: Main,
  meta: {
    hideInMenu: true,
    notCache: true
  },
  children: [{
    path: 'home',
    name: 'home',
    meta: {
      hideInMenu: true,
      notCache: true
    },
    component: () =>
      import('@/view/single-page/home')
  }]
},
// cms
{
  path: '/cms',
  name: 'cms',
  meta: {
    icon: 'logo-buffer',
    title: 'cms'
  },
  component: Main,
  children: [
    {
      path: 'category_pahe',
      name: 'category_pahe',
      meta: {
        icon: 'md-trending-up',
        title: '手工推荐位管理(老版)'
      },
      component: () =>
        import('@/view/cms/category/category/category.vue')
    },
    {
      path: '/recommendTwo',
      name: 'topic管理（老版）',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/recommendTwo/recommendTwo.vue')
    },
    {
      path: 'staticTemplateList',
      name: '基础模版桌面管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/staticTemplateList/staticTemplateList/staticTemplateList.vue')
    },
    // customTemplateList
    {
      path: 'customTemplateList',
      name: ' 拓展模版桌面管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/customTemplateList/customTemplateList/customTemplateList.vue')
    },
    {
      path: 'screensaver',
      name: '屏保广告',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/screensaver/screensaver/screensaver.vue')
    },
    {
      path: 'bootvideo',
      name: '开机视频',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/bootvideo/bootvideo/bootvideo.vue')
    },
    {
      path: 'bootanimation',
      name: '开机动画',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/bootanimation/bootanimation/bootanimation.vue')
    },
    {
      path: 'template',
      name: '基础模板管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/template/template/template.vue')
    },
    {
      path: 'desktop',
      name: '桌面管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/desktop/desktop/desktop.vue')
    },
    {
      path: 'action',
      name: '内部Action跳转',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/action/action/action.vue')
    },
    {
      path: 'custompromotion',
      name: '拓展模版管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/custompromotion/custompromotion/custompromotion.vue')
    },
    {
      path: 'layoutbucket',
      name: '布局模块管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/layoutbucket/layoutbucket/layoutbucket.vue')
    },
    // {
    //   path: 'special',
    //   name: '专题列表',
    //   meta: {
    //     icon: 'ios-add-circle-outline'
    //   },
    //   component: () =>
    //     import('@/view/cms/special/special.vue')
    // },
    // {
    //   path: 'theme',
    //   name: '主题管理',
    //   meta: {
    //     icon: 'ios-add-circle-outline'
    //   },
    //   component: () =>
    //     import('@/view/cms/theme/theme.vue')
    // },
    {
      path: 'scene',
      name: '场景管理',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/scene/scene.vue')
    },
    {
      path: 'config',
      name: '终端场景配置',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/config/config.vue')
    },
    {
      path: 'audio',
      name: 'audio',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '音频电台'
      },
      component: parentView,
      children: [
        {
          path: 'manage',
          name: 'manage',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '音频电台管理'
          },
          component: () =>
            import('@/view/cms/audio/manage/manage.vue')
        },
        {
          path: '/radioIfication',
          name: 'radioIfication',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '电台分类管理'
          },
          component: () =>
            import('@/view/cms/audio/radioIfication/radioIfication.vue')
        }
      ]
    },
    {
      path: 'priority',
      name: 'priority',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '播放优先级'
      },
      component: parentView,
      children: [
        {
          path: 'default',
          name: 'default',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '视频播放优先级'
          },
          component: () =>
            import('@/view/cms/priority/default/default.vue')
        },
        {
          path: 'search',
          name: 'search',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '搜索播放优先级'
          },
          component: () =>
            import('@/view/cms/priority/search/search.vue')
        }
      ]
    },
    {
      path: 'classification',
      name: 'classification',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '分类管理'
      },
      component: parentView,
      children: [
        {
          path: 'virtual',
          name: '分类管理',
          meta: {
            icon: 'ios-add-circle-outline'
          },
          component: () =>
            import('@/view/cms/classification/virtual/virtual.vue')
        },
        {
          path: 'filter',
          name: '分类筛选',
          meta: {
            icon: 'ios-add-circle-outline',
            hideInMenu: true
          },
          component: () =>
            import('@/view/cms/classification/filter/filter.vue')
        },
        {
          path: 'recommend',
          name: 'topic管理',
          meta: {
            icon: 'ios-add-circle-outline'
          },
          component: () =>
            import('@/view/cms/classification/recommend/recommend/recommend.vue')
        }
      ]
    },
    {
      path: 'mediaSearch',
      name: '节目查询列表',
      meta: {
        icon: 'ios-add-circle-outline'
      },
      component: () =>
        import('@/view/cms/mediaSearch/mediaSearch.vue')
    },
    // {
    //   path: 'recommendationList',
    //   name: 'recommendationList',
    //   meta: {
    //     icon: 'md-trending-up',
    //     title: '手工推荐列表'
    //   },
    //   component: () =>
    //     import('@/view/cms/manual/recommendationList/recommendationList.vue')
    // },
  ]
},
// cms2.0
{
  path: '/cms2',
  name: 'cms2',
  meta: {
    icon: 'logo-buffer',
    title: 'CMS-学习机'
  },
  component: Main,
  children: [
    {
      path: 'basics',
      name: 'basics',
      meta: {
        title: '基础管理'
      },
      component: parentView,
      children: [
        {
          path: 'template2',
          name: 'template2',
          meta: {
            title: '基础模板管理'
          },
          component: () =>
            import('@/view/cms2/basics/template2/template2.vue')
        },
        {
          path: 'custompromotion2',
          name: 'custompromotion2',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '拓展模板管理'
          },
          component: () =>
            import('@/view/cms2/basics/custompromotion2/custompromotion2.vue')
        }
      ]
    },
    {
      path: 'applicationDesktop',
      name: 'applicationDesktop',
      meta: {
        title: '应用桌面管理'
      },
      component: parentView,
      children: [
        {
          path: 'basicManagement',
          name: 'basicManagement',
          meta: {
            title: '基础桌面'
          },
          component: () =>
            import('@/view/cms2/applicationDesktop/basicManagement/basicManagement.vue')
        },
        {
          path: 'expansionManagement',
          name: 'expansionManagement',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '拓展桌面'
          },
          component: () =>
            import('@/view/cms2/applicationDesktop/expansionManagement/expansionManagement.vue')
        }
      ]
    },
    {
      path: 'bootanimation2',
      name: 'bootanimation2',
      meta: {
        icon: 'md-trending-up',
        title: '开机动画2.0'
      },
      component: () =>
        import('@/view/cms2/bootanimation2/bootanimation2.vue')
    },
    {
      path: 'bootvideo2',
      name: 'bootvideo2',
      meta: {
        icon: 'md-trending-up',
        title: '开机视频2.0'
      },
      component: () =>
        import('@/view/cms2/bootvideo2/bootvideo2.vue')
    },
    // {
    //   path: 'display',
    //   name: 'display',
    //   meta: {
    //     icon: 'md-trending-up',
    //     title: '终端显示配置'
    //   },
    //   component: () =>
    //     import('@/view/cms2/display/display.vue')
    // },
    // {
    //   path: 'wheelchannel',
    //   name: 'wheelchannel',
    //   meta: {
    //     icon: 'md-trending-up',
    //     title: '频道管理'
    //   },
    //   component: () =>
    //     import('@/view/cms2/wheelchannel/wheelchannel.vue')
    // }
  ]
},
//手工推荐应用管理
{
  path: '/manualRecommended',
  name: 'manualRecommended',
  meta: {
    icon: 'logo-buffer',
    title: '手工推荐应用管理'
  },
  component: Main,
  children: [
    {
      path: 'recommendedApplication',
      name: 'recommendedApplication',
      meta: {
        icon: 'logo-buffer',
        title: '手工推荐应用管理'
      },
      component: () =>
        import('@/view/manualRecommended/recommendedApplication/recommendedApplication.vue')
    }]
},
// 媒资-学习机
{
  path: '/learnMachine',
  name: 'learnMachine',
  meta: {
    icon: 'logo-buffer',
    title: '媒资-学习机'
  },
  component: Main,
  children: [
    {
      path: 'programInformation',
      name: 'programInformation',
      meta: {
        icon: 'md-trending-up',
        title: '节目信息管理'
      },
      component: () =>
        import('@/view/learnMachine/programInformation/programInformation.vue')
    }]
},
// 终端管理
{
  path: '/Terminal',
  name: 'Terminal',
  meta: {
    icon: 'md-menu',
    title: '终端管理'
  },
  component: Main,
  children: [
    {
      path: 'translate',
      name: 'translate',
      meta: {
        title: '基础管理'
      },
      component: parentView,
      children: [
        {
          path: 'type',
          name: 'type',
          meta: {
            title: '终端类型管理'
          },
          component: () =>
            import('@/view/Terminal/translate/type/type.vue')
        },
        {
          path: 'customer',
          name: 'customer',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '终端厂商管理'
          },
          component: () =>
            import('@/view/Terminal/translate/customer/customer.vue')
        },
        {
          path: 'commercialmodel',
          name: 'commercialmodel',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '商用型号管理'
          },
          component: () =>
            import('@/view/Terminal/translate/commercialmodel/commercialmodel.vue')
        },
        {
          path: 'insidemodel',
          name: 'insidemodel',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '内部型号管理'
          },
          component: () =>
            import('@/view/Terminal/translate/insidemodel/insidemodel.vue')
        },
        {
          path: 'group',
          name: 'group',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '分组管理'
          },
          component: () =>
            import('@/view/Terminal/translate/group/group.vue')
        },
        {
          path: 'channel',
          name: 'channel',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '渠道管理'
          },
          component: () =>
            import('@/view/Terminal/translate/channel/channel.vue')
        }
      ]
    },
    {
      path: '/production',
      name: 'production',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '终端量产管理'
      },
      component: parentView,
      children: [
        {
          path: 'terminal1',
          name: 'terminal1',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '量产终端管理'
          },
          component: () =>
            import('@/view/Terminal/production/terminal1/terminal1.vue')
        },
        {
          path: 'activationLog',
          name: 'activationLog',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '板卡激活日志'
          },
          component: () =>
            import('@/view/Terminal/production/activationLog/activationLog.vue')
        },
        {
          path: 'machineLog',
          name: 'machineLog',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '整机激活日志'
          },
          component: () =>
            import('@/view/Terminal/production/machineLog/machineLog.vue')
        },
      ]
    },
    {
      path: '/mac',
      name: 'mac',
      meta: {
        // title: 'mac库管理'
      },
      component: parentView,
      children: [
        {
          path: 'mac-1',
          name: 'mac-1',
          meta: {
            title: 'mac领用管理'
          },
          component: () =>
            import('@/view/Terminal/mac/mac/mac.vue')
        }
      ]
    },
    {
      path: '/device',
      name: 'device',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '终端设备管理'
      },
      component: parentView,
      children: [
        {
          path: 'abnormal',
          name: 'abnormal',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '终端异常管理'
          },
          component: () =>
            import('@/view/Terminal/device/abnormal/abnormal.vue')
        },
        {
          path: 'reportLog',
          name: 'reportLog',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '终端上报日志'
          },
          component: () =>
            import('@/view/Terminal/device/reportLog/reportLog.vue')
        },
        // 终端导入任务
        {
          path: 'task',
          name: 'task',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '终端导入任务'
          },
          component: () =>
            import('@/view/Terminal/device/task/task.vue')
        },
        // deviceNews
        {
          path: 'deviceNews',
          name: 'deviceNews',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '终端信息管理'
          },
          component: () =>
            import('@/view/Terminal/device/deviceNews/deviceNews.vue')
        },
        {
          path: 'change',
          name: 'change',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '终端变更管理'
          },
          component: () =>
            import('@/view/Terminal/device/change/change.vue')
        }
      ]
    },
  ]
},
// 媒资管理
{
  path: '/media',
  name: 'media',
  meta: {
    icon: 'logo-buffer',
    title: '媒资管理'
  },
  component: Main,
  children: [
    // 基础管理
    {
      path: 'management',
      name: 'management',
      meta: {
        title: '基础管理'
      },
      component: parentView,
      children: [
        {
          path: 'categoryList',
          name: 'categoryList',
          meta: {
            title: '分类管理'
          },
          component: () =>
            import('@/view/media/management/categoryList/categoryList.vue')
        },
        {
          path: 'tag',
          name: 'tag',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '类型标签管理'
          },
          component: () =>
            import('@/view/media/management/tag/tag.vue')
        },
        {
          path: 'area',
          name: 'area',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '国家地区管理'
          },
          component: () =>
            import('@/view/media/management/area/area.vue')
        },
        {
          path: 'origin',
          name: 'origin',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '来源管理'
          },
          component: () =>
            import('@/view/media/management/origin/origin.vue')
        },
        {
          path: 'language',
          name: 'language',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '语言信息管理'
          },
          component: () =>
            import('@/view/media/management/language/language.vue')
        },
        {
          path: 'cp',
          name: 'cp',
          meta: {
            icon: 'arrow-graph-up-right',
            title: 'cp管理'
          },
          component: () =>
            import('@/view/media/management/cp/cp.vue')
        },
        {
          path: 'poster',
          name: 'poster',
          meta: {
            icon: 'arrow-graph-up-right',
            title: '海报尺寸管理'
          },
          component: () =>
            import('@/view/media/management/poster/poster.vue')
        },
      ]
    },
    {
      path: 'label',
      name: 'label',
      meta: {
        title: '标签体系管理'
      },
      component: parentView,
      children: [
        {
          path: 'xstag',
          name: 'xstag',
          meta: {
            title: '标签体系管理'
          },
          component: () =>
            import('@/view/media/label/xstag/xstaga.vue')
        },
      ]
    },
    {
      path: 'program',
      name: 'program',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '媒资管理(老版)'
      },
      component: parentView,
      children: [{
        path: 'program-1',
        name: 'program-1',
        meta: {
          icon: 'md-trending-up',
          title: '媒资管理(老版)'
        },
        component: () =>
          import('@/view/media/program/program/program.vue')
      }]
    },
    //成品媒资管理
    {
      path: '/capital',
      name: 'capital',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '成品媒资管理'
      },
      component: parentView,
      children: [
        {
          path: 'repository',
          name: 'repository',
          meta: {
            icon: 'md-trending-up',
            title: '成品媒资库'
          },
          component: parentView,
          children: [
            {
              path: '/product',
              name: 'product',
              meta: {
                icon: 'md-trending-up',
                title: '点播媒资库'
              },
              component: () =>
                import('@/view/media/capital/repository/product/product.vue')
            },
            {
              path: '/qqq',
              name: 'qqq',
              meta: {
                icon: 'md-trending-up',
                title: '详情页',
                hideInMenu: true
              },
              component: () =>
                import('@/view/media/capital/repository/qqq/qqq.vue')
            }
          ]
        },
        {
          path: 'address',
          name: 'address',
          meta: {
            icon: 'md-trending-up',
            title: '海报管理',
            hideInMenu: true
          },
          component: () =>
            import('@/view/media/capital/address/address.vue')
        },
        {
          path: 'polymer',
          name: 'polymer',
          meta: {
            icon: 'md-trending-up',
            title: '待聚合节目集管理'
          },
          component: () =>
            import('@/view/media/capital/polymer/polymer.vue')
        },
        {
          path: 'person',
          name: 'person',
          meta: {
            icon: 'md-trending-up',
            title: '人物库管理'
          },
          component: () =>
            import('@/view/media/capital/person/person.vue')
        }
      ]
    },
    // 第三方媒资管理
    {
      path: 'ThirdManagement',
      name: 'ThirdManagement',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '第三方媒资管理'
      },
      component: parentView,
      children: [
        {
          path: 'thirdParty',
          name: 'thirdParty',
          meta: {
            icon: 'md-trending-up',
            title: '第三方媒资库'
          },
          component: parentView,
          children: [
            {
              path: 'iqiyi',
              name: 'iqiyi',
              meta: {
                icon: 'md-trending-up',
                title: '爱奇艺媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/thirdParty/iqiyi/iqiyi.vue')
            },
            {
              path: 'youku',
              name: 'youku',
              meta: {
                icon: 'md-trending-up',
                title: '优酷媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/thirdParty/youku/youku.vue')
            },
            {
              path: 'moretv',
              name: 'moretv',
              meta: {
                icon: 'md-trending-up',
                title: '电视猫媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/thirdParty/moretv/moretv.vue')
            },
            {
              path: 'pumpkin',
              name: 'pumpkin',
              meta: {
                icon: 'md-trending-up',
                title: '南瓜媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/thirdParty/pumpkin/pumpkin.vue')
            },
            {
              path: 'bilibili',
              name: 'bilibili',
              meta: {
                icon: 'md-trending-up',
                title: 'B站媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/thirdParty/bilibili/bilibili.vue')
            },
            {
              path: '1905media',
              name: '1905media',
              meta: {
                icon: 'md-trending-up',
                title: '1905媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/thirdParty/1905media/1905media.vue')
            },
          ]
        },
        {
          path: 'threeStandard',
          name: 'threeStandard',
          meta: {
            icon: 'md-trending-up',
            title: '第三方标准媒资库'
          },
          component: parentView,
          children: [
            {
              path: 'medialist',
              name: 'medialist',
              meta: {
                icon: 'md-trending-up',
                title: '第三方标准媒资库'
              },
              component: () =>
                import('@/view/media/ThirdManagement/threeStandard/medialist/medialist.vue')
            },
          ]
        },
        {
          path: 'anomaly-1',
          name: 'anomaly-1',
          meta: {
            icon: 'md-trending-up',
            title: '媒资清洗异常管理'
          },
          component: () =>
            import('@/view/media/ThirdManagement/anomaly/anomaly.vue')
        }
      ]
    },
    {
      path: 'Distribution',
      name: 'Distribution',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '媒资内容下发'
      },
      component: parentView,
      children: [{
        path: 'distribute',
        name: 'distribute',
        meta: {
          icon: 'md-trending-up',
          title: '媒资分发业务管理'
        },
        component: () =>
          import('@/view/media/Distribution/distribute/distribute.vue')
      }]
    },
    {
      path: 'series',
      name: 'series',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '专辑系列管理'
      },
      component: parentView,
      children: [{
        path: 'series-1',
        name: 'series-1',
        meta: {
          icon: 'md-trending-up',
          title: '系列管理'
        },
        component: () =>
          import('@/view/media/series/series.vue')
      }]
    },
    {
      path: 'import',
      name: 'import',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '批量节目查询'
      },
      component: parentView,
      children: [{
        path: 'import-1',
        name: 'import-1',
        meta: {
          icon: 'md-trending-up',
          title: '批量节目查询'
        },
        component: () =>
          import('@/view/media/import/import.vue')
      }]
    },
    {
      path: 'movieInformation',
      name: 'movieInformation',
      meta: {
        icon: 'arrow-graph-up-right',
        title: '电影节管理'
      },
      component: parentView,
      children: [{
        path: 'awardsInformation',
        name: 'awardsInformation',
        meta: {
          icon: 'md-trending-up',
          title: '奖项信息'
        },
        component: () =>
          import('@/view/media/movieInformation/awardsInformation/awardsInformation.vue')
      }]
    }
  ]
},
//音频媒资
{
  path: '/audioMedia',
  name: 'audioMedia',
  meta: {
    icon: 'logo-buffer',
    title: '音频媒资'
  },
  component: Main,
  children: [{
    path: 'classifiedManagement',
    name: 'classifiedManagement',
    meta: {
      icon: 'md-treanding-up',
      title: '分类管理'
    },
    component: () =>
      import('@/view/audioMedia/classifiedManagement/classifiedManagement.vue')
  }]
},
// 系统管理
{
  path: '/system',
  name: 'system',
  meta: {
    icon: 'logo-buffer',
    title: '系统管理'
  },
  component: Main,
  children: [{
    path: 'user-1',
    name: 'user-1',
    meta: {
      icon: 'md-treanding-up',
      title: '系统管理'
    },
    component: () =>
      import('@/view/system/user/user/user.vue')
  },
  {
    path: 'loglist-1',
    name: 'loglist-1',
    meta: {
      icon: 'md-trending-up',
      title: '日志列表'
    },
    component: () =>
      import('@/view/system/loglist/loglist/loglist.vue')
  }]
},
// 会员中心
{
  path: '/member',
  name: 'member',
  meta: {
    icon: 'logo-buffer',
    title: '会员中心'
  },
  component: Main,
  children: [{
    path: 'order',
    name: 'order',
    meta: {
      icon: 'md-trending-up',
      title: '订单信息'
    },
    component: () =>
      import('@/view/member/order/order.vue')
  },
  {
    path: 'vodlist',
    name: 'vodlist',
    meta: {
      icon: 'md-trending-up',
      title: '单片订购信息'
    },
    component: () =>
      import('@/view/member/vodlist/vodlist.vue')
  },
  {
    path: 'statis',
    name: 'statis',
    meta: {
      icon: 'md-trending-up',
      title: '会员信息'
    },
    component: () =>
      import('@/view/member/statis/statis.vue')
  },
  {
    path: 'Receiving',
    name: 'Receiving',
    meta: {
      icon: 'md-trending-up',
      title: '会员领取管理'
    },
    component: parentView,
    children: [
      {
        path: 'membersLogs',
        name: 'membersLogs',
        meta: {
          icon: 'md-trending-up',
          title: '会员领取日志'
        },
        component: () =>
          import('@/view/member/Receiving/membersLogs/membersLogs.vue')
      },
      {
        path: 'receivingStatus',
        name: 'receivingStatus',
        meta: {
          icon: 'md-trending-up',
          title: '会员领取状态'
        },
        component: () =>
          import('@/view/member/Receiving/receivingStatus/receivingStatus.vue')
      }
    ]
  }
  ]
},
// 应用商店
{
  path: '/application',
  name: 'application',
  meta: {
    icon: 'logo-buffer',
    title: '应用商店管理后台'
  },
  component: Main,
  children: [

    // 基础
    {
      path: 'basicMana',
      name: 'basicMana',
      meta: {
        icon: 'md-trending-up',
        title: '基础管理'
      },
      component: parentView,
      children: [
        {
          path: 'firstClassification',
          name: 'firstClassification',
          meta: {
            icon: 'md-trending-up',
            title: '一级分类管理'
          },
          component: () =>
            import('@/view/application/basicMana/firstClassification/firstClassification.vue')
        },
        {
          path: 'twoClassification',
          name: 'twoClassification',
          meta: {
            icon: 'md-trending-up',
            title: '二级分类管理'
          },
          component: () =>
            import('@/view/application/basicMana/twoClassification/twoClassification.vue')
        },
        {
          path: 'labelManagement',
          name: 'labelManagement',
          meta: {
            icon: 'md-trending-up',
            title: '标签管理'
          },
          component: () =>
            import('@/view/application/basicMana/labelManagement/labelManagement.vue')
        }
      ]
    },
    {
      path: 'recommendation',
      name: 'recommendation',
      meta: {
        icon: 'md-trending-up',
        title: '手工推荐应用管理'
      },
      component: () =>
        import('@/view/application/recommendation/recommendation.vue')
    },
    {
      path: 'administration',
      name: 'administration',
      meta: {
        icon: 'md-trending-up',
        title: '应用信息管理'
      },
      component: () =>
        import('@/view/application/administration/administration.vue')
    },
    {
      path: 'wrap',
      name: 'wrap',
      meta: {
        icon: 'md-trending-up',
        title: '专题管理'
      },
      component: () =>
        import('@/view/application/wrap/wrap.vue')
    }
  ]
},
//学习机终端管理
{
  path: '/studymachine',
  name: 'studymachine',
  meta: {
    icon: 'logo-buffer',
    title: '学习机终端管理'
  },
  component: Main,
  children: [

    {
      path: 'studydevice',
      name: 'studydevice',
      meta: {
        icon: 'md-trending-up',
        title: '学习机终端管理'
      },
      component: () =>
        import('@/view/studymachine/studydevice/studydevice.vue')
    },
    {
      path: 'rest',
      name: 'rest',
      meta: {
        icon: 'md-trending-up',
        title: '定时休息管理'
      },
      component: () =>
        import('@/view/studymachine/rest/rest.vue')
    },
    {
      path: 'students',
      name: 'students',
      meta: {
        icon: 'md-trending-up',
        title: '学生信息管理'
      },
      component: () =>
        import('@/view/studymachine/students/students.vue')
    }]
},
// // 客服
{
  path: '/service',
  name: 'service',
  meta: {
    icon: 'logo-buffer',
    title: '客服管理'
  },
  component: Main,
  children: [
    {
      path: 'Information',
      name: 'Information',
      meta: {
        icon: 'md-trending-up',
        title: '终端信息查询'
      },
      component: () =>
        import('@/view/service/Information/Information.vue')
    },
    {
      path: 'serviceUser',
      name: 'serviceUser',
      meta: {
        icon: 'md-trending-up',
        title: '用户信息查询'
      },
      component: () =>
        import('@/view/service/serviceUser/serviceUser.vue')
    }]
},
  //R1-CMS
  // {
  //   path: '/R1-CMS',
  //   name: 'R1-CMS',
  //   meta: {
  //     icon: 'logo-buffer',
  //     title: 'R1-CMS'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'scenario',
  //       name: 'scenario',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '场景管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/scenario/scenario.vue')
  //     }, {
  //       path: 'configuration',
  //       name: 'configuration',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '终端场景配置'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/configuration/configuration.vue')
  //     },
  //     {
  //       path: 'templateManagement',
  //       name: 'tempManagement',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '模板管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/templateManagement/tempManagement.vue')
  //     },
  //     {
  //       path: 'desktopManagement',
  //       name: 'deskManagement',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '桌面管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/desktopManagement/deskManagement.vue')
  //     },
  //     {
  //       path: 'basicTemplate',
  //       name: 'basicTemplate',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '基础模板桌面管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/basicTemplate/basicTemplate.vue')
  //     },
  //     {
  //       path: 'expanding',
  //       name: 'expanding',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '拓展模板管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/expanding/expanding.vue')
  //     },
  //     {
  //       path: 'expandDesktop',
  //       name: 'expandDesktop',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '拓展模板桌面管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/expandDesktop/expandDesktop.vue')
  //     },
  //     {
  //       path: 'jump',
  //       name: 'jump',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '内部Action跳转'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/jump/jump.vue')
  //     },
  //     {
  //       path: 'layoutModule',
  //       name: 'layoutModuleManagement',
  //       meta: {
  //         icon: 'md-trending-up',
  //         title: '布局模块管理'
  //       },
  //       component: () =>
  //         import('@/view/R1-CMS/layoutModule/layoutModuleManagement.vue')
  //     },]
  // }
]
