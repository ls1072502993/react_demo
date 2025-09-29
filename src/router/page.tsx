import { LayoutWarp, Pipe, Redirect } from './system'

export const baseRouter = [
  {
    path: '/',
    element: Redirect('/home'),
  },
  {
    path: '/login',
    element: Pipe(() => import('@/pages/Login/Index')),
  },
]

export const pageRouter = [
  {
    title: '首页',
    path: '/home',
    element: LayoutWarp(),
    icon: 'HomeOutlined',
    children: [
      { index: true, element: Redirect('/home/index') },
      {
        title: '首页',
        path: '/home/index',
        element: Pipe(() => import('@/pages/home/Index')),
      },
    ],
  },
  {
    title: '刮刮乐管理',
    path: '/lotterySetting',
    element: LayoutWarp(),
    icon: 'AppstoreOutlined',
    children: [
      { index: true, element: Redirect('/lotterySetting/lotterySetting') },
      {
        title: '刮刮乐设置',
        path: '/lotterySetting/lotterySetting',
        element: Pipe(() => import('@/pages/lotterySetting/lotterySetting/Index')),
      },
      {
        title: '蛇年大吉记录',
        path: '/lotterySetting/lotteryRecords',
        element: Pipe(() => import('@/pages/lotterySetting/lotteryRecords/Index')),
      },
      {
        title: '黄金矿工记录',
        path: '/lotterySetting/goldLotteryRecords',
        element: Pipe(() => import('@/pages/lotterySetting/goldLotteryRecords/Index')),
      },
      {
        title: '金字塔记录',
        path: '/lotterySetting/pyramid',
        element: Pipe(() => import('@/pages/lotterySetting/pyramid/Index')),
      },
      {
        title: '牛气冲天记录',
        path: '/lotterySetting/bullRecords',
        element: Pipe(() => import('@/pages/lotterySetting/bullRecords/Index')),
      },
      {
        title: '扑克牌记录',
        path: '/lotterySetting/pokerRecords',
        element: Pipe(() => import('@/pages/lotterySetting/pokerRecords/Index')),
      },
    ],
  },
  {
    title: '娃娃机管理',
    path: '/ufoCatcher',
    element: LayoutWarp(),
    icon: 'AppstoreOutlined',
    children: [
      { index: true, element: Redirect('/ufoCatcher/luckyTwistEggSetting') },
      {
        title: '幸运扭蛋配置',
        path: '/ufoCatcher/luckyTwistEggSetting',
        element: Pipe(() => import('@/pages/ufoCatcher/luckyTwistEggSetting/Index')),
      },
      {
        title: '会员钻石日志',
        path: '/ufoCatcher/diamondDiary',
        element: Pipe(() => import('@/pages/ufoCatcher/diamondDiary/Index')),
      },
    ],
  },
  {
    title: '游戏管理',
    path: '/game',
    element: LayoutWarp(),
    icon: 'AppstoreOutlined',
    children: [
      { index: true, element: Redirect('/game/onlineManagement') },
      {
        title: '在线管理',
        path: '/game/onlineManagement',
        element: Pipe(() => import('@/pages/game/onlineManagement/Index')),
      },
    ],
  },
]
