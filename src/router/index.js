import Vue from 'vue'
import Router from 'vue-router'
import index from '@/view/index'
import main from '@/view/main'
import musicPlay from '@/view/else/musicPlay'
import mvPlay from '@/view/else/mvPlay'

import findMusic from '@/view/Recommend/findMusic'
import anchorsRadio from '@/view/Recommend/find/anchorsRadio'
import newMusic from '@/view/Recommend/find/newMusic'
import personRecommend from '@/view/Recommend/find/personRecommend'
import rankingList from '@/view/Recommend/find/rankingList'
import singer from '@/view/Recommend/find/singer'
import songSheet from '@/view/Recommend/find/songSheet'
import fineSong from '@/view/Recommend/find/fineSong'
import songDet from '@/view/Recommend/songDet'

import dailyRec from '@/view/else/dailyRec'

import userIndex from '@/view/user/userIndex'
import dynamic from '@/view/user/userDet/dynamic'
import follow from '@/view/user/userDet/follow'
import fans from '@/view/user/userDet/fans'
import userInfo from '@/view/user/userDet/userInfo'
import listenRec from '@/view/user/userDet/listenRec'

import singerInfo from '@/view/else/singerInfo'
import albumDet from '@/view/else/albumDet'
import djDet from '@/view/else/djDet'

import privateFM from '@/view/Recommend/privateFM'
import mv from '@/view/Recommend/mv'
import friend from '@/view/Recommend/friend'

import cloudMusic from '@/view/MyMusic/cloudMusic'
import download from '@/view/MyMusic/download'
import localMusic from '@/view/MyMusic/localMusic'
import myCollect from '@/view/MyMusic/myCollect'
import radioSet from '@/view/MyMusic/radioSet'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/mvPlay',
          name: 'mvPlay',
          component: mvPlay
        },
        {
          path: '/musicPlay',
          name: 'musicPlay',
          component: musicPlay
        },
        {
          path: '/main',
          name: 'main',
          component: main,
          children: [
            {
              path: '/cloudMusic',
              name: 'cloudMusic',
              component: cloudMusic
            },
            {
              path: '/download',
              name: 'download',
              component: download
            },
            {
              path: '/localMusic',
              name: 'localMusic',
              component: localMusic
            },
            {
              path: '/myCollect',
              name: 'myCollect',
              component: myCollect
            },
            {
              path: '/radioSet',
              name: 'radioSet',
              component: radioSet
            },
            {
              path: '/findMusic',
              name: 'findMusic',
              component: findMusic,
              children: [
                {
                  path: '/find/personRecommend',
                  name: 'personRecommend',
                  component: personRecommend
                },
                {
                  path: '/find/anchorsRadio',
                  name: 'anchorsRadio',
                  component: anchorsRadio
                },
                {
                  path: '/find/newMusic',
                  name: 'newMusic',
                  component: newMusic
                },
                {
                  path: '/find/rankingList',
                  name: 'rankingList',
                  component: rankingList
                },
                {
                  path: '/find/singer',
                  name: 'singer',
                  component: singer
                },
                {
                  path: '/find/fineSong',
                  name: 'fineSong',
                  component: fineSong
                },
                {
                  path: '/find/songSheet',
                  name: 'songSheet',
                  component: songSheet
                }
              ]
            },
            {
              path: '/songDet',
              name: 'songDet',
              component: songDet
            },
            {
              path: '/djDet',
              name: 'djDet',
              component: djDet
            },
            {
              path: '/dailyRec',
              name: 'dailyRec',
              component: dailyRec
            },
            {
              path: '/userIndex',
              name: 'userIndex',
              component: userIndex,
              children: [
                {
                  path: '/userIndex/dynamic',
                  name: 'dynamic',
                  component: dynamic
                },
                {
                  path: '/userIndex/follow',
                  name: 'follow',
                  component: follow
                },
                {
                  path: '/userIndex/userInfo',
                  name: 'userInfo',
                  component: userInfo
                },
                {
                  path: '/userIndex/listenRec',
                  name: 'listenRec',
                  component: listenRec
                },
                {
                  path: '/userIndex/fans',
                  name: 'fans',
                  component: fans
                }
              ]
            },
            {
              path: '/albumDet',
              name: 'albumDet',
              component: albumDet
            },
            {
              path: '/singerInfo',
              name: 'singerInfo',
              component: singerInfo
            },
            {
              path: '/privateFM',
              name: 'privateFM',
              component: privateFM
            },
            {
              path: '/mv',
              name: 'mv',
              component: mv
            },
            {
              path: '/friend',
              name: 'friend',
              component: friend
            }
          ]
        }
      ]
    }
  ]
})
