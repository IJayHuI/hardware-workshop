// Admin Account
if (localStorage.getItem('users') == null) {
  localStorage.setItem(
    'users',
    JSON.stringify([
      ['admin', '123456', false, []],
      ['lockAccount', 'lockAccount', false, []]
    ])
  )
} else if (localStorage.getItem('users') == '[["admin","123456",false,[]]]') {
  localStorage.setItem(
    'users',
    JSON.stringify([
      ['admin', '123456', false, []],
      ['lockAccount', 'lockAccount', false, []]
    ])
  )
}
// 用户名 密码 登录状态 购物车

// 轮播图数据
const slideShowImgs = [
  ['/source/hardware/slideShow/img0.jpg', '/source/hardware/slideShow/img1.jpg'], // CPU
  ['/source/hardware/slideShow/img2.jpg'], // 主板
  ['/source/hardware/slideShow/img6.jpg'], // 内存
  ['/source/hardware/slideShow/img8.jpg'], // 显卡
  ['/source/hardware/slideShow/img10.jpg'], // 电源
  ['/source/hardware/slideShow/img15.jpg'], // 机箱
  ['/source/hardware/slideShow/img9.jpg'], // 散热器
  ['/source/hardware/slideShow/img17.jpg'], //硬盘
  ['/source/hardware/slideShow/img13.jpg'] // 配件
]
localStorage.setItem('slideShowImgs', JSON.stringify(slideShowImgs))

// 商品数据
// title 商品名字
// model 商品唯一指定名
// link 商品详情页链接
// price 商品价格
// img 商品首个大图
// description 商品图文详情
const commodities = [
  // CPU
  [
    {
      title: 'Intel i9 14900KF',
      model: 'intel-14900kf',
      link: '/pages/commodityInfo.html?type=0&model=intel-14900kf',
      price: 3999,
      img: '/source/hardware/commodities/CPU/intel-14900kf/img1.avif',
      informationImgs: ['/source/hardware/commodities/CPU/intel-14900kf/img1.avif', '/source/hardware/commodities/CPU/intel-14900kf/img2.avif'],
      description: [
        '/source/hardware/commodities/图文介绍/intel/detail1.jpeg',
        '/source/hardware/commodities/图文介绍/intel/detail2.jpeg',
        '/source/hardware/commodities/图文介绍/intel/detail3.jpeg',
        '/source/hardware/commodities/图文介绍/intel/detail4.jpeg'
      ]
    },
    {
      title: 'AMD Ryzen9 7950X',
      model: 'amd-ryzen9-7950x',
      link: '/pages/commodityInfo.html?type=0&model=amd-ryzen9-7950x',
      price: 3799,
      img: '/source/hardware/commodities/CPU/amd-ryzen9-7950x/img1.jpeg',
      informationImgs: ['/source/hardware/commodities/CPU/amd-ryzen9-7950x/img1.jpeg', '/source/hardware/commodities/CPU/amd-ryzen9-7950x/img2.avif', '/source/hardware/commodities/CPU/amd-ryzen9-7950x/img3.avif'],
      description: ['/source/hardware/commodities/图文介绍/amd/detail1.png', '/source/hardware/commodities/图文介绍/amd/detail2.png', '/source/hardware/commodities/图文介绍/amd/detail3.jpeg', '/source/hardware/commodities/图文介绍/amd/detail4.jpeg']
    }
  ],
  // 主板
  [
    {
      title: '华硕 ROG MAXIMUS Z790 HERO',
      model: 'asus-rog-maximus-z790-hero',
      link: '/pages/commodityInfo.html?type=1&model=asus-rog-maximus-z790-hero',
      price: 3888,
      img: '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/img1.jpg',
      informationImgs: [
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/img1.jpg',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/img2.jpg',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/img3.jpg',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/img4.jpg',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/img5.jpg'
      ],
      description: [
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/detail1.png',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/detail2.png',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/detail3.png',
        '/source/hardware/commodities/主板/asus-rog-maximus-z790-hero/detail4.png'
      ]
    }
  ],
  // 内存
  [
    {
      title: '芝奇 DDR5 幻锋戟',
      model: 'gskill-ddr5-feng',
      link: '/pages/commodityInfo.html?type=2&model=gskill-ddr5-feng',
      price: 699,
      img: '/source/hardware/commodities/内存/gskill-ddr5-feng/img1.avif',
      informationImgs: ['/source/hardware/commodities/内存/gskill-ddr5-feng/img1.avif', '/source/hardware/commodities/内存/gskill-ddr5-feng/img2.avif'],
      description: [
        '/source/hardware/commodities/内存/gskill-ddr5-feng/detail1.avif',
        '/source/hardware/commodities/内存/gskill-ddr5-feng/detail2.avif',
        '/source/hardware/commodities/内存/gskill-ddr5-feng/detail3.avif',
        '/source/hardware/commodities/内存/gskill-ddr5-feng/detail4.avif'
      ]
    }
  ],
  // 显卡
  [
    {
      title: '华硕 ROG STRIX RTX 4090 D BTF',
      model: 'rog-strix-rtx4090-d-btf',
      link: '/pages/commodityInfo.html?type=3&model=rog-strix-rtx4090-d-btf',
      price: 17999,
      img: '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/img1.jpg',
      informationImgs: [
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/img1.jpg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/img4.jpg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/img5.jpg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/img6.jpg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/img7.jpg'
      ],
      description: [
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/detail1.jpeg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/detail2.jpeg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/detail3.jpeg',
        '/source/hardware/commodities/显卡/rog-strix-rtx4090-d-btf/detail4.jpeg'
      ]
    }
  ],
  // 电源
  [
    {
      title: 'SEASONICFOCUS GX-1000',
      model: 'seasonicfocus-gx-1000',
      link: '/pages/commodityInfo.html?type=4&model=seasonicfocus-gx-1000',
      price: 999,
      img: '/source/hardware/commodities/电源/seasonicfocus-gx-1000/img1.avif',
      informationImgs: ['/source/hardware/commodities/电源/seasonicfocus-gx-1000/img1.avif', '/source/hardware/commodities/电源/seasonicfocus-gx-1000/img2.avif'],
      description: [
        '/source/hardware/commodities/图文介绍/power/seasonicfocus/detail1.jpeg',
        '/source/hardware/commodities/图文介绍/power/seasonicfocus/detail2.jpeg',
        '/source/hardware/commodities/图文介绍/power/seasonicfocus/detail3.jpeg',
        '/source/hardware/commodities/图文介绍/power/seasonicfocus/detail4.jpeg'
      ]
    },
    {
      title: '华硕 ROG THOR 2代 1600W',
      model: 'asusrog-thor-1600',
      link: '/pages/commodityInfo.html?type=4&model=asusrog-thor-1600',
      price: 4399,
      img: '/source/hardware/commodities/电源/asusrog-thor-1600/img1.avif',
      informationImgs: ['/source/hardware/commodities/电源/asusrog-thor-1600/img1.avif', '/source/hardware/commodities/电源/asusrog-thor-1600/img2.avif'],
      description: [
        '/source/hardware/commodities/电源/asusrog-thor-1600/detail1.jpeg',
        '/source/hardware/commodities/电源/asusrog-thor-1600/detail2.jpeg',
        '/source/hardware/commodities/电源/asusrog-thor-1600/detail3.jpeg',
        '/source/hardware/commodities/电源/asusrog-thor-1600/detail4.jpeg'
      ]
    }
  ],
  // 机箱
  [
    {
      title: '微星 MEG MAESTRO 700L PZ',
      model: 'msi-maestro-700l-pz',
      link: '/pages/commodityInfo.html?type=5&model=msi-maestro-700l-pz',
      price: 1499,
      img: '/source/hardware/commodities/机箱/msi-maestro-700l-pz/img1.jpg',
      informationImgs: ['/source/hardware/commodities/机箱/msi-maestro-700l-pz/img1.jpg', '/source/hardware/commodities/机箱/msi-maestro-700l-pz/img2.jpg', '/source/hardware/commodities/机箱/msi-maestro-700l-pz/img3.jpg'],
      description: ['/source/hardware/commodities/机箱/msi-maestro-700l-pz/detail1.jpg', '/source/hardware/commodities/机箱/msi-maestro-700l-pz/detail2.jpg', '/source/hardware/commodities/机箱/msi-maestro-700l-pz/detail3.png']
    }
  ],
  // 散热器
  [
    {
      title: '华硕 ROG 龙神3代',
      model: 'asusrog-ryujin-lll',
      link: '/pages/commodityInfo.html?type=6&model=asusrog-ryujin-lll',
      price: 2499,
      img: '/source/hardware/commodities/散热器/asusrog-ryujin-lll/img1.jpg',
      informationImgs: ['/source/hardware/commodities/散热器/asusrog-ryujin-lll/img1.jpg', '/source/hardware/commodities/散热器/asusrog-ryujin-lll/img2.avif'],
      description: [
        '/source/hardware/commodities/散热器/asusrog-ryujin-lll/detail1.jpeg',
        '/source/hardware/commodities/散热器/asusrog-ryujin-lll/detail2.jpeg',
        '/source/hardware/commodities/散热器/asusrog-ryujin-lll/detail3.jpeg',
        '/source/hardware/commodities/散热器/asusrog-ryujin-lll/detail4.jpeg'
      ]
    }
  ],
  // 硬盘
  [
    {
      title: '西部数据 SN580',
      model: 'wd-sn580',
      link: '/pages/commodityInfo.html?type=7&model=wd-sn580',
      price: 399,
      img: '/source/hardware/commodities/硬盘/wd-sn580/img1.jpg',
      informationImgs: ['/source/hardware/commodities/硬盘/wd-sn580/img1.jpg', '/source/hardware/commodities/硬盘/wd-sn580/img2.jpg'],
      description: [
        '/source/hardware/commodities/图文介绍/ssd/wd/detail1.jpeg',
        '/source/hardware/commodities/图文介绍/ssd/wd/detail2.jpeg',
        '/source/hardware/commodities/图文介绍/ssd/wd/detail3.jpeg',
        '/source/hardware/commodities/图文介绍/ssd/wd/detail4.jpeg'
      ]
    },
    {
      title: '西部数据 SN850X',
      model: 'wd-sn850x',
      link: '/pages/commodityInfo.html?type=7&model=wd-sn850x',
      price: 799,
      img: '/source/hardware/commodities/硬盘/wd-sn850x/img1.jpg',
      informationImgs: ['/source/hardware/commodities/硬盘/wd-sn850x/img1.jpg', '/source/hardware/commodities/硬盘/wd-sn850x/img2.jpg'],
      description: [
        '/source/hardware/commodities/硬盘/wd-sn850x/detail1.jpeg',
        '/source/hardware/commodities/硬盘/wd-sn850x/detail2.jpeg',
        '/source/hardware/commodities/硬盘/wd-sn850x/detail3.jpeg',
        '/source/hardware/commodities/硬盘/wd-sn850x/detail4.jpeg'
      ]
    },
    {
      title: '三星 990 PRO',
      model: 'samsung-990-pro',
      link: '/pages/commodityInfo.html?type=7&model=samsung-990-pro',
      price: 999,
      img: '/source/hardware/commodities/硬盘/samsung-990-pro/img1.jpg',
      informationImgs: [
        '/source/hardware/commodities/硬盘/samsung-990-pro/img1.jpg',
        '/source/hardware/commodities/硬盘/samsung-990-pro/img2.jpg',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail1.avif',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail2.avif',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail3.jpeg',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail4.png'
      ],
      description: [
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail1.avif',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail2.avif',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail3.jpeg',
        '/source/hardware/commodities/硬盘/samsung-990-pro/detail4.png'
      ]
    }
  ],
  // 配件
  [
    {
      title: '罗技 GPW3',
      model: 'gpw3',
      link: '/pages/commodityInfo.html?type=8&model=gpw3',
      price: 1299,
      img: '/source/hardware/commodities/配件/gpw3/img1.jpg',
      informationImgs: ['/source/hardware/commodities/配件/gpw3/img1.jpg', '/source/hardware/commodities/配件/gpw3/img2.jpg'],
      description: ['/source/hardware/commodities/配件/gpw3/detail1.jpg', '/source/hardware/commodities/配件/gpw3/detail2.jpg', '/source/hardware/commodities/配件/gpw3/detail3.jpg']
    }
  ]
]
localStorage.setItem('commodities', JSON.stringify(commodities))

// 主页数据
const topDatas = [
  {
    title: 'Intel Core i9',
    content: '酣畅淋漓的游戏玩法和多任务处理性能',
    img: '/source/indexImg/CPU.jpg',
    link: '/pages/commodityInfo.html?type=0&model=intel-14900kf',
    fontColor: 'white'
  },
  {
    title: 'ROG STRIX RTX 4090 D',
    content: '焕然一新的性能巨无霸',
    img: '/source/indexImg/griphicsCard.jpg',
    link: '/pages/commodityInfo.html?type=3&model=rog-strix-rtx4090-d-btf',
    fontColor: 'white'
  },
  {
    title: 'MEG MAESTRO 700L PZ',
    content: '曲尽奇巧',
    img: '/source/indexImg/crate.jpg',
    link: '/pages/commodityInfo.html?type=5&model=msi-maestro-700l-pz',
    fontColor: 'white'
  }
]
const productDatas = [
  {
    title: '罗技 GPW 3',
    content: '飙越边界 释放潜能',
    img: '/source/indexImg/mouse.jpg',
    link: '/pages/commodityInfo.html?type=8&model=gpw3',
    fontColor: 'black'
  },
  {
    title: 'ROG MAXIMUS Z790 HERO BTF',
    content: '「无线」清爽，「背」显简约',
    img: '/source/indexImg/mainBoard.jpg',
    link: '',
    fontColor: 'white'
  },
  {
    title: '芝奇 幻锋戟 DDR5',
    content: '演绎 DDR5 极致效能',
    img: '/source/indexImg/ram.jpg',
    link: '/pages/commodityInfo.html?type=2&model=gskill-ddr5-feng',
    fontColor: 'white'
  },
  {
    title: 'RAZER 毒蝰 V3 专业版',
    content: '为专业而生',
    img: '/source/indexImg/mouse2.jpg',
    link: '/pages/commodityInfo.html?type=8&model=razer-v3',
    fontColor: 'white'
  }
]
localStorage.setItem('topDatas', JSON.stringify(topDatas))
localStorage.setItem('productDatas', JSON.stringify(productDatas))
