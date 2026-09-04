import { DecorationPackage, ShowcaseCase } from '../types';
import genderRevealImg from '../assets/images/gender_reveal_setup_1788523164013.jpg';
import artisanCakeImg from '../assets/images/artisan_dessert_pedestals_1788523179617.jpg';
import longevityOriginalImg from '../assets/images/longevity_original_photo_1788526044382.png';
import longevityClassicImg from '../assets/images/longevity_banquet_setup_1788523213541.jpg';

// Automatically detect any image files placed into src/assets/images/
const assetImages = import.meta.glob<{ default: string }>('../assets/images/*.{png,jpg,jpeg,webp}', { eager: true });

function getMatchingAsset(keywords: string[], fallback: string): string {
  for (const [path, mod] of Object.entries(assetImages)) {
    const lower = path.toLowerCase();
    for (const kw of keywords) {
      if (lower.includes(kw.toLowerCase())) {
        return mod.default || (mod as unknown as string);
      }
    }
  }
  return fallback;
}

export const HERO_IMAGE_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1UjfKTitoUL7WSUhRgclKea7YfKQMa9BQ9yDTE88Xcr04Cu-tWI1kWAYjgYcWjv_QM9GYjeCQ1qBWXg3ytQk9u-cooX93BoCDEEGOykLfHxXNXQvYt6ycegWCG-Fifm2qwjg2JqxFZgZoSyfpp-tplNalT2v_W7bZDr0fU1gMrCocdcXdcXUft8RLby16MoZtoWIWHbERbztxbf_L59_6i1EizCbe6ocDehKvF6vVnOMg6YnJdQcUvURME';
export const MAIN_SHOWCASE_IMAGE_URL = 'https://lh3.googleusercontent.com/aida/AEtjO1VYKJYJ2_oh7XWmVfusvMBw1iP_vm3DhV7KGMG0nXOEeYI-rLwq0lqwtKb4uOkOAPBYg5U4t4yudQ0VjV6TpmWafXIphGviLpOPHreKgtTxtFDjtNjqB8OG6Fw2M0nrsZZw7GS82ZrUL6cu0dWmOyaXb7Jccqo7WgwToGbNM9Q_23qPQX0R360Z6fvecszg0Bb8-uq7S4xrPJ4cfjdKlt3YRp15a1_GU9Dig7zLMMnrioT_ZEGbzH_Ch-k';
export const GENDER_REVEAL_IMAGE_URL = genderRevealImg;
export const ARTISAN_CAKE_IMAGE_URL = artisanCakeImg;
export const LONGEVITY_ORIGINAL_IMAGE_URL = longevityOriginalImg;
export const LONGEVITY_CLASSIC_IMAGE_URL = longevityClassicImg;
export const LONGEVITY_IMAGE_URL = LONGEVITY_ORIGINAL_IMAGE_URL;

// Dynamic lookups for the newly added banquet photos
export const LONGEVITY_87TH_MOTHER_IMAGE_URL = getMatchingAsset(
  ['907d4d3a', '87th', 'mother', '妈妈', '八十七', '图片高清化 (1)', '图片高清化_(1)'],
  LONGEVITY_ORIGINAL_IMAGE_URL
);

export const LONGEVITY_70TH_DRAGON_IMAGE_URL = getMatchingAsset(
  ['f17da2e0', 'dragon', '七十', '七十大寿', '图片高清化_f', '图片高清化.'],
  LONGEVITY_ORIGINAL_IMAGE_URL
);

export const LONGEVITY_CRANE_SONGHE_IMAGE_URL = getMatchingAsset(
  ['(3)', 'photo_3', 'crane', '仙鹤', '东海', '南山', '松鹤', '图片高清化 (3)'],
  LONGEVITY_ORIGINAL_IMAGE_URL
);

// Dynamic lookups for the newly added baby 1st birthday photos
export const BABY_SHERWYN_BOSS_BABY_IMAGE_URL = getMatchingAsset(
  ['1788547124153', 'sherwyn', 'boss_baby_blue', 'bossbaby1', 'boss-baby-blue'],
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80'
);

export const BABY_BUNNY_PASTORAL_IMAGE_URL = getMatchingAsset(
  ['1788547086945', 'rabbit', 'bunny', '小兔', '萌兔', 'forest_bunny'],
  'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&auto=format&fit=crop&q=80'
);

export const BABY_MOANA_ISLAND_IMAGE_URL = getMatchingAsset(
  ['1788547747453', 'moana', 'baby_moana', 'object-remover', '178854', '海洋奇缘', '莫阿娜', 'baby-moana'],
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&auto=format&fit=crop&q=80'
);
export const BABY_ANDS_JAYHO_BALLROOM_IMAGE_URL = BABY_MOANA_ISLAND_IMAGE_URL;

export const BABY_ZI_XUAN_PRINCESS_BOW_IMAGE_URL = getMatchingAsset(
  ['1788547011904', 'zi_xuan', 'zixuan', '郭梓璇', 'bow', 'princess_bow'],
  'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=1200&auto=format&fit=crop&q=80'
);

export const BABY_SLEEPING_BEAUTY_CASTLE_IMAGE_URL = getMatchingAsset(
  ['1788546977084', 'castle', 'avantikaa', 'sleeping_beauty', '睡美人', 'princess_castle'],
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80'
);

export const SHOWCASE_CASES: ShowcaseCase[] = [
  {
    id: 'organic-pastel-arch',
    title: 'Organic Pastel Arch & Cake Pedestals',
    subtitle: '莫兰迪柔粉与香槟金渐变气球瀑布',
    category: 'birthday18_21',
    categoryLabel: '18/21岁成人礼 · 签名系列',
    tag: 'FEATURED SIGNATURE SETUP',
    description: '莫兰迪柔粉与香槟金渐变气球瀑布，搭配高端圆柱大理石纹蛋糕台、定制发光霓虹名字背板及温馨星芒仙女灯，全方位打造高质感仪式打卡中心。',
    features: [
      '定制发光霓虹姓名英文背板',
      '三段式高低大理石/法式罗马柱蛋糕台',
      '环保加厚乳胶柔粉与香槟金属气球瀑布',
      '暖色微光星芒仙女灯与氛围地灯组',
      '高级进口真丝绢花与干花点缀'
    ],
    suitableFor: '18/21岁成人礼 · 百日宴 · 闺蜜私享晚宴',
    image: MAIN_SHOWCASE_IMAGE_URL,
    images: [MAIN_SHOWCASE_IMAGE_URL],
    palette: ['#F9D9E2', '#E8C5B9', '#FAF6F0', '#D4AF37'],
    dimensions: '宽 3.6m × 高 2.4m',
    includedItems: [
      '全案3D色彩方案设计',
      '专业团队上门提前搭建与固定',
      '活动结束后免费撤场收纳',
      '现场免费赠送备用气球与打气筒'
    ]
  },
  {
    id: 'gender-reveal-1st-birthday',
    title: 'Gender Reveal & 1st Birthday',
    subtitle: '宝宝周岁与性别揭晓派对',
    category: 'baby',
    categoryLabel: '宝宝百日 · 周岁抓周礼',
    tag: 'POPULAR CHOICE',
    description: '宝宝周岁与性别揭晓派对，定制专属互动盒与立体气球簇，温柔奶油粉与浅蓝梦幻碰撞。',
    features: [
      '4只高透亚克力 BABY 发光互动魔盒',
      '定制宝宝中英文字母立体雕刻牌',
      '柔雾双层加厚气球云朵簇',
      '周岁抓周礼仪区软垫与抓周道具套件'
    ],
    suitableFor: '新生儿满月 · 百日宴 · 1岁宝宝周岁宴',
    image: GENDER_REVEAL_IMAGE_URL,
    images: [GENDER_REVEAL_IMAGE_URL],
    palette: ['#FAD2E1', '#C5E3F6', '#FFF0F5', '#E2ECE9'],
    dimensions: '宽 3.0m × 高 2.2m',
    includedItems: [
      '4只亚克力 BABY 盒',
      '定制字母铭牌一套',
      '抓周红毯或莫兰迪圆毯',
      '专人驻场调光与辅助拍照'
    ]
  },
  {
    id: 'baby-sherwyn-boss-baby',
    title: '宝贝老板 · 浅蓝纯净周岁盛典',
    subtitle: 'Sherwyn Turns 1 · 圆拱背板、罗马褶柱与定制西装立牌',
    category: 'baby',
    categoryLabel: '宝宝百日/周岁 · 男宝定制',
    tag: 'BOSS BABY THEME',
    description: '专为男宝一周岁定制的 Boss Baby 浅蓝纯净主题。以优雅弧形天蓝主拱门为视觉焦点，搭配三座象牙白罗马折纸褶皱展柱、1米立体数字“1”、经典 Boss Baby 人形与宝宝定制Q版西装立牌，丰满的天蓝与纯白双拼气球云朵簇，打造既酷帅萌趣又充满纪念意义的周岁盛典。',
    features: [
      '定制 Sherwyn turns 1 专属英文圆拱天蓝主背板',
      '三段式高低错落象牙白罗马折纸褶皱展柱',
      '经典 Boss Baby 叼奶瓶西装形象与宝宝Q版大头立牌',
      '天蓝 + 纯白双层加厚高光乳胶气球云朵瀑布与高透波波球',
      '1米高实木立体拍照打卡数字“1”与定制地毯'
    ],
    suitableFor: '男宝宝1周岁庆典 · 满月百日宴 · 萌趣西装主题家宴',
    image: BABY_SHERWYN_BOSS_BABY_IMAGE_URL,
    images: [BABY_SHERWYN_BOSS_BABY_IMAGE_URL],
    palette: ['#BCE0F0', '#FFFFFF', '#1B5E9D', '#E2DCD5'],
    dimensions: '宽 3.6m × 高 2.4m',
    includedItems: [
      'Sherwyn 主题圆拱定制主背板',
      '三件套法式罗马折纸展台',
      '双人物西装立牌与1米立体数字“1”',
      '全套加厚气球云朵簇与地面漂浮球'
    ]
  },
  {
    id: 'baby-bunny-pastoral',
    title: '萌兔乐园 · 奶油森林花语周岁',
    subtitle: 'Happy Birthday 柔光霓虹、双立萌兔与粉黄马卡龙气球拱门',
    category: 'baby',
    categoryLabel: '宝宝百日/周岁 · 森系萌兔',
    tag: 'SWEET BUNNY FLORAL',
    description: '温馨治愈的奶油森林系周岁派对。纯白立体背景板镶嵌 Happy Birthday 恒光霓虹灯牌，顶部环绕粉黄白三色柔美气球瀑布拱门，搭配双立手绘风卡通萌兔立牌、立体发光蝴蝶翅膀、繁茂粉红牡丹花艺与三段折柱展台，给宝贝一个如童话绘本般的梦幻生日。',
    features: [
      '全套纯白加宽主背景板与 Happy Birthday 恒光柔光霓虹灯',
      '双侧立体手绘风长耳白兔插画剪影立牌与胡萝卜抱枕道具',
      '三段式法式罗马折纸奶油圆柱蛋糕展台',
      '粉、黄、白马卡龙三色多层次渐变气球瀑布链与地置气球簇',
      '大面积粉樱牡丹绢花花堆与立体发光蝴蝶仙子翅膀'
    ],
    suitableFor: '女宝宝1岁周岁宴 · 满月派对 · 户外草坪/室内客厅',
    image: BABY_BUNNY_PASTORAL_IMAGE_URL,
    images: [BABY_BUNNY_PASTORAL_IMAGE_URL],
    palette: ['#F9C5D1', '#FFF3B0', '#FFFFFF', '#D9AAB7'],
    dimensions: '宽 3.8m × 高 2.5m',
    includedItems: [
      '纯白背板与 Happy Birthday 霓虹灯',
      '双只萌兔造型立牌与发光蝴蝶翅膀',
      '三段式罗马折柱与高档花艺堆',
      '马卡龙三色气球瀑布及打光地灯'
    ]
  },
  {
    id: 'baby-moana-island',
    title: '海洋奇缘 · 莫阿娜粉梦海岛周岁盛典',
    subtitle: 'Baby Moana Island · 茱萸粉三联拱门、双立萌趣莫阿娜与发光花朵立灯',
    category: 'baby',
    categoryLabel: '宝宝百日/周岁 · 海洋奇缘',
    tag: 'BABY MOANA TROPICAL',
    description: '专为女宝一周岁倾心定制的 Baby Moana（海洋奇缘）梦幻海岛派对。以温暖高雅的茱萸粉三联圆拱门背板为视觉中心，精美手绘热带扶桑花与专属定制烫金标语；两侧生动立现萌趣可爱的幼年莫阿娜（Baby Moana）与小美人鱼打卡立牌；环绕樱花粉、暖阳黄、珊瑚橙、薄荷绿四色多层次加厚马卡龙气球云朵瀑布；中央配以高低三段纯白极简圆柱蛋糕展台与深蓝氛围地光，双侧立地发光梦幻花瓣造型灯与海底珊瑚礁造型，将大溪地蔚蓝海岛的欢快活力与女孩童梦完美交融。',
    features: [
      '定制茱萸粉三联式圆拱镂空主背板与热带花语手绘插画',
      '双立萌趣版幼年莫阿娜（Baby Moana）卡通人形与小美人鱼打卡立牌',
      '三段式法式极简高低错落纯白圆柱蛋糕/甜品展台（配底部深蓝氛围地光）',
      '马卡龙粉、暖黄、珊瑚橙、薄荷绿四色多层次加厚气球云朵瀑布',
      '双侧立地梦幻发光花瓣造型灯与海底珊瑚礁气球水草群'
    ],
    suitableFor: '女宝宝1周岁庆典 · 满月百日抓周宴 · 梦幻海岛主题家宴/宴会厅',
    image: BABY_MOANA_ISLAND_IMAGE_URL,
    images: [BABY_MOANA_ISLAND_IMAGE_URL],
    palette: ['#F8B4C4', '#FFD166', '#88D49E', '#FFFFFF'],
    dimensions: '宽 4.5m × 高 2.6m',
    includedItems: [
      '三联式茱萸粉圆拱定制主背板',
      '双立 Baby Moana 与小人鱼造型立牌',
      '三座法式高低错落圆柱展台',
      '双侧立地发光花朵氛围地灯',
      '全套四色马卡龙气球瀑布及地置球簇'
    ]
  },
  {
    id: 'baby-zi-xuan-princess-bow',
    title: '甜心公主 · 蝴蝶结与星光薄纱礼赞',
    subtitle: '郭梓璇 OK Zi Xuan Turns One · 巨型粉红蝴蝶结与仙境薄纱',
    category: 'baby',
    categoryLabel: '宝宝百日/周岁 · 甜美公主',
    tag: 'PRINCESS BOW & TULLE',
    description: '浪漫唯美的甜心公主周岁现场。巨型立体粉红大蝴蝶结跃然于圆形主背板之上，四座覆裹星光薄纱的典雅蛋糕展台轻盈梦幻，配以叠放发光 BABY 礼盒、粉白渐变气球花簇与宝宝萌拍手绘立牌，营造轻盈通透的童话仪式感。',
    features: [
      '定制“郭梓璇 OK Zi Xuan Turns One”圆形烫金主背板',
      '大型 3D 浮雕立体粉红丝带大蝴蝶结造型装饰',
      '四座披挂星芒闪烁仙气薄纱的阶梯圆柱蛋糕展台',
      '4只堆叠式高透白边 BABY 字母积木礼盒',
      '高低漂浮粉白乳胶气球球簇与地置浪漫气球地毯'
    ],
    suitableFor: '女宝宝1周岁庆典 · 百日抓周礼 · 唯美私享家宴',
    image: BABY_ZI_XUAN_PRINCESS_BOW_IMAGE_URL,
    images: [BABY_ZI_XUAN_PRINCESS_BOW_IMAGE_URL],
    palette: ['#FFAAA6', '#FFD3B6', '#FFFFFF', '#E5B869'],
    dimensions: '宽 3.5m × 高 2.4m',
    includedItems: [
      '圆形定制铭牌与巨型 3D 粉红蝴蝶结',
      '四座星光仙气薄纱包裹展台',
      '4只叠放 BABY 积木字母盒',
      '粉白乳胶气球球簇与地置氛围灯'
    ]
  },
  {
    id: 'baby-sleeping-beauty-castle',
    title: '梦幻童话 · 睡美人城堡盛宴',
    subtitle: 'Sai Avantikaa Happy Birthday · 巨幅公主城堡与双拱气球门廊',
    category: 'baby',
    categoryLabel: '宝宝百日/周岁 · 童话城堡',
    tag: 'FAIRYTALE CASTLE',
    description: '令每个小女孩都心醉的梦幻迪士尼城堡主题派对。巨幅手绘粉色睡美人城堡背景板，双立爱洛公主高保真人形牌，环绕饱满柔和的粉白双色气球拱门、云端飞天萌兔、三座象牙白褶皱圆柱与大朵粉嫩牡丹花艺，将童话世界搬入现实。',
    features: [
      '定制 Sai Avantikaa Happy Birthday 巨幅粉色童话城堡剪影背板',
      '迪士尼睡美人爱洛公主（Princess Aurora）高精度人形立牌',
      '双侧饱满环形粉白渐变气球瀑布门廊与高透波波球',
      '三段式法式象牙白罗马折纸圆柱展台',
      '粉色牡丹与玫瑰繁茂花艺地堆，营造皇家花园仙境'
    ],
    suitableFor: '女宝宝周岁生日宴 · 庭院/宴会厅大型庆典 · 梦幻公主主题派对',
    image: BABY_SLEEPING_BEAUTY_CASTLE_IMAGE_URL,
    images: [BABY_SLEEPING_BEAUTY_CASTLE_IMAGE_URL],
    palette: ['#EE5D8E', '#FFC2D1', '#FDFBF7', '#B5E2FA'],
    dimensions: '宽 4.5m × 高 2.8m',
    includedItems: [
      '巨幅手绘粉色童话城堡主背板',
      '爱洛公主高保真人设立牌',
      '双拱粉白梦幻气球门廊',
      '三座罗马展柱与奢华玫瑰牡丹花艺'
    ]
  },
  {
    id: 'longevity-crane-songhe',
    title: '松鹤延年 · 福如东海寿比南山',
    subtitle: '金雕回纹寿徽、双立仙鹤与鎏金宝石红气球瀑布',
    category: 'elder',
    categoryLabel: '长辈寿宴 · 松鹤延年',
    tag: 'AUSPICIOUS CRANE & PINE',
    description: '寓意长青不老与福海绵延的经典祝寿大典。精选水墨竹韵对联拱板（"福如东海长流水 寿比南山不老松"）、古典回纹同心圆金雕大寿徽、双立翻飞吉祥白羽仙鹤、金属高光铜金与深宝石红饱满气球瀑布，搭配三座法式极简白色圆柱展台及双侧珍珠发光树灯，庄重大气，福泽绵长。',
    features: [
      '定制"福如东海长流水 寿比南山不老松"清雅竹韵诗词拱板',
      '中国古典回纹金雕"寿"字同心圆主徽与祥云浮雕',
      '双立翻飞仙鹤吉祥立牌与多层立体山川地峦',
      '金属高光铜金 + 宝石红 + 气泡波波球复合气球瀑布瀑帘',
      '三节高低错落纯白展柱（可陈列寿桃、多层蛋糕及花艺）',
      '双侧立式暖光球形珍珠氛围树灯组与锦簇花堆'
    ],
    suitableFor: '长辈六十/七十/八十/九十大寿 · 宗族千岁家宴 · 豪华酒楼祝寿宴',
    image: LONGEVITY_CRANE_SONGHE_IMAGE_URL,
    images: [
      LONGEVITY_CRANE_SONGHE_IMAGE_URL,
      LONGEVITY_87TH_MOTHER_IMAGE_URL,
      LONGEVITY_70TH_DRAGON_IMAGE_URL,
      LONGEVITY_ORIGINAL_IMAGE_URL
    ],
    palette: ['#9E1B2A', '#D4AF37', '#FAF0E6', '#2E3A34'],
    dimensions: '宽 4.5m × 高 2.6m',
    includedItems: [
      '松鹤延年竹韵回纹大寿全套组合主背景板',
      '双立仙鹤与山川祥云立体剪裁立牌',
      '鎏金与宝石红饱满气球瀑布造型链',
      '三件套纯白极简圆柱展台（大中小各一）',
      '暖白珍珠球形落地氛围灯2组 + 迎宾红毯',
      '全案准时进场搭建、调光陈设与活动后撤场'
    ]
  },
  {
    id: 'longevity-87th-mother',
    title: '八十七大寿 · 水墨竹韵萱堂长春',
    subtitle: '亲爱的妈妈八十七大寿定制雅聚家宴',
    category: 'elder',
    categoryLabel: '长辈寿宴 · 八十七大寿',
    tag: '87TH JUBILEE SIGNATURE',
    description: '专为母亲八十七大寿定制的新中式典雅背景。融入水墨竹韵屏风、定制慈母感怀诗词、古铜金雕"寿"字主徽与红毯舞台，配以暖光珍珠球形树灯与暗红牡丹锦簇，尽显儿孙孝意与家族福寿康宁。',
    features: [
      '定制"亲爱的妈妈 八十七大寿"华丽鎏金背板',
      '水墨清雅竹韵异形弧板与感怀诗词屏风',
      '古铜金雕"寿"字圆形主徽章与立体祥云',
      '大红喜庆舞台地毯与地置暗红牡丹花簇',
      '双侧立式暖光球形珍珠氛围树灯组'
    ],
    suitableFor: '母亲八十/八十七/九十大寿 · 家族感恩寿宴 · 私享祝寿家宴',
    image: LONGEVITY_87TH_MOTHER_IMAGE_URL,
    images: [
      LONGEVITY_87TH_MOTHER_IMAGE_URL,
      LONGEVITY_70TH_DRAGON_IMAGE_URL,
      LONGEVITY_CRANE_SONGHE_IMAGE_URL,
      LONGEVITY_ORIGINAL_IMAGE_URL
    ],
    palette: ['#8A2131', '#F4EDE2', '#2C3E35', '#D4AF37'],
    dimensions: '宽 4.2m × 高 2.5m',
    includedItems: [
      '全套八十七大寿水墨竹韵主背景板',
      '双侧暖白发光珍珠球形树灯2组',
      '舞台暗红牡丹花簇与折纸花球摆件',
      '全案上门搭建、调光与活动后撤场'
    ]
  },
  {
    id: 'longevity-70th-dragon',
    title: '七十大寿 · 祥龙献瑞华堂盛典',
    subtitle: '古雅金龙寿徽、迎宾展示板与罗马折柱',
    category: 'elder',
    categoryLabel: '长辈寿宴 · 七十大寿',
    tag: '70TH JUBILEE SPLENDOR',
    description: '专为长辈七十古稀大寿倾心打造的尊荣宴席布景。以祥云金龙盘绕圆寿主徽为视觉中心，配以经典中式回纹格栅、酒红与香槟金渐变气球瀑布、专属迎宾木画架以及三段式罗马褶皱圆柱，气派尊贵、福禄双全。',
    features: [
      '金龙献瑞大型浮雕金箔与"寿"字同心圆徽',
      '定制"健康长寿 七十大寿"独立迎宾画架展示板',
      '高低错落三段式法式罗马折纸褶皱展示柱',
      '中国红与香槟金饱满双拼气球瀑布簇',
      '双侧高低错落柔光球形落地立灯组'
    ],
    suitableFor: '长辈七十大寿 · 家族祝寿晚宴 · 酒店宴会厅寿辰',
    image: LONGEVITY_70TH_DRAGON_IMAGE_URL,
    images: [
      LONGEVITY_70TH_DRAGON_IMAGE_URL,
      LONGEVITY_87TH_MOTHER_IMAGE_URL,
      LONGEVITY_CRANE_SONGHE_IMAGE_URL,
      LONGEVITY_ORIGINAL_IMAGE_URL
    ],
    palette: ['#B22222', '#D4AF37', '#FAF4ED', '#8B0000'],
    dimensions: '宽 3.8m × 高 2.4m',
    includedItems: [
      '七十大寿金龙祥云主背景板',
      '定制"健康长寿 七十大寿"木质迎宾画架',
      '三段式罗马褶皱白色展示柱组',
      '红毯地垫与现场氛围灯具配套'
    ]
  },
  {
    id: 'longevity-classic-blessings',
    title: '长辈寿宴 · 禧福雅聚 (福寿康宁)',
    subtitle: '福寿康宁长辈祝寿新国风典雅布景',
    category: 'elder',
    categoryLabel: '长辈寿宴 · 禧福雅聚',
    tag: 'CLASSIC ELEGANCE',
    description: '专为长辈祝寿设计的典雅福寿背景，融合国风喜庆元素与现代精致气球点缀，彰显家族孝悌温情。',
    features: [
      '名家手写定制寿字金箔硬板',
      '酒红与香槟金奢华双拼气球拱门',
      'A1 金属独立迎宾画架与签到台',
      '立体仙鹤、寿桃国风摆件与长青松柏花艺'
    ],
    suitableFor: '长辈六十/七十/八十大寿 · 金婚银婚纪念庆典',
    image: LONGEVITY_ORIGINAL_IMAGE_URL,
    images: [
      LONGEVITY_ORIGINAL_IMAGE_URL,
      LONGEVITY_CRANE_SONGHE_IMAGE_URL,
      LONGEVITY_87TH_MOTHER_IMAGE_URL,
      LONGEVITY_70TH_DRAGON_IMAGE_URL
    ],
    palette: ['#8B1E2D', '#D4AF37', '#FAF0E6', '#2F3E46'],
    dimensions: '宽 4.0m × 高 2.5m',
    includedItems: [
      '定制寿诞迎宾背景',
      'A1 金属画架与展示板',
      '国风喜庆摆台与敬茶托盘'
    ]
  }
];

export const DECORATION_PACKAGES: DecorationPackage[] = [
  {
    id: 'type-1-board',
    code: 'Type 1',
    name: 'Board Type (单板派对背景)',
    chineseTitle: '单板派对背景',
    highlight: '4x8ft 主题板面，配备 2 组落地花组、2 组站立花束与 2 条缤纷气球簇。',
    basePrice: 399,
    tag: '基础推荐 · 高性价比',
    popular: true,
    specs: [
      '4x8ft 主题背板',
      '透明 Baby 盒 (加购 RM30)',
      '32寸发光数字 (加购 RM20)'
    ],
    includedList: [
      '4x8ft 定制高精喷绘硬质主题背景板',
      '2 组高仿真艺术落地花艺花簇',
      '2 组轻奢立式花束支架',
      '2 条莫兰迪多色有机渐变气球簇 (共约100+球)',
      '现场专人安装与活动后标准撤场'
    ],
    addons: [
      { id: 'baby-box', name: '透明 Baby 盒套件', price: 30, unit: '套', description: '高透亚克力4盒装，内置微光串灯' },
      { id: 'light-number-32', name: '32寸暖光发光数字', price: 20, unit: '个', maxQuantity: 4, description: '32寸立体发光阿拉伯数字灯' },
      { id: 'cake-stand-paper', name: '纸质折叠蛋糕台 (3件套)', price: 15, unit: '套', description: '法式圆柱纸柱蛋糕台' },
      { id: 'cake-stand-steel', name: '户外三件套钢制蛋糕架', price: 45, unit: '套', description: '加厚烤漆金属防水抗风蛋糕架' },
      { id: 'helium-balloon', name: '安全氦气飘空气球', price: 6, unit: '个', maxQuantity: 50, description: '纯氦气充气，持久飘空12小时' }
    ]
  },
  {
    id: 'type-9-castle',
    code: 'Type 9',
    name: 'Castle Type (城堡梦幻背板)',
    chineseTitle: '城堡梦幻背板',
    highlight: '专为童话梦想打造的大型异形城堡背板，配有立体卡通人物与充气气球海。',
    basePrice: 699,
    tag: '童话城堡 · 视觉震撼',
    popular: true,
    specs: [
      '异形立体城堡背板',
      '80cm 卡通立牌 (加购 RM60)',
      '大熊公仔摆设 (RM20)'
    ],
    includedList: [
      '异形双层立体激光精雕城堡主题主背板 (跨度超3.5米)',
      '立体童话尖顶与浮雕梦幻层次',
      '巨型梦幻渐变充气立体气球海 (200+气球)',
      '全套暖调 LED 氛围边缘投光灯',
      '专属主题迎宾水牌一套'
    ],
    addons: [
      { id: 'cartoon-standee', name: '80cm 卡通人物精印立牌', price: 60, unit: '个', maxQuantity: 3, description: '可根据宝宝喜爱动漫/定制肖像' },
      { id: 'giant-bear', name: '1.2米毛绒大熊公仔摆设', price: 20, unit: '只', maxQuantity: 2, description: '温润软萌泰迪大熊拍照道具' },
      { id: 'light-number-32', name: '32寸暖光发光数字', price: 20, unit: '个', maxQuantity: 4, description: '立体发光数字' },
      { id: 'cake-stand-steel', name: '户外三件套钢制蛋糕架', price: 45, unit: '套', description: '稳固抗风' },
      { id: 'helium-balloon', name: '安全氦气飘空气球', price: 6, unit: '个', maxQuantity: 50, description: '纯氦气飘球' }
    ]
  },
  {
    id: 'aged-deco',
    code: 'Aged Deco',
    name: 'Aged Deco (福寿康宁长辈祝寿)',
    chineseTitle: '福寿康宁长辈祝寿',
    highlight: '专为长辈祝寿设计的典雅福寿背景，融合国风喜庆元素与精致气球点缀。',
    basePrice: 580,
    tag: '尊贵典雅 · 孝亲长寿',
    popular: false,
    specs: [
      '定制祝寿书法字',
      'A1 迎宾架 (加购 RM100)',
      '红金气球拱门'
    ],
    includedList: [
      '名师题字定制【福寿康宁/松柏长青】书法字烫金背板',
      '富贵红金双色饱满有机气球半拱门 (150+气球)',
      '吉祥国风迎宾寿宴红地毯 (4米)',
      '精美寿桃与仙鹤吉祥桌面摆台道具',
      '现场敬茶礼仪协助与专业音响配乐建议'
    ],
    addons: [
      { id: 'a1-easel', name: 'A1 金属迎宾水牌与画架', price: 100, unit: '套', description: '含定制老寿星生平烫金展示牌' },
      { id: 'cake-stand-steel', name: '高档户外钢制蛋糕架 (3件套)', price: 45, unit: '套', description: '可承载多层寿桃大蛋糕' },
      { id: 'helium-balloon', name: '金色/中国红氦气球', price: 6, unit: '个', maxQuantity: 50, description: '氦气飘球' }
    ]
  },
  {
    id: 'add-ons-hub',
    code: 'Add-Ons',
    name: 'Add-Ons (甜品台与蛋糕架加购)',
    chineseTitle: '甜品台与蛋糕架加购',
    highlight: '提供户外三件套钢制蛋糕架、纸质蛋糕架、氦气球及多灯效摆件。',
    basePrice: 0,
    tag: '自由搭配 · 灵活升级',
    popular: false,
    specs: [
      '纸质蛋糕架 x3',
      '户外钢架 RM45',
      '氦气球 RM6/个'
    ],
    includedList: [
      '所有加购项目均支持搭配任意套餐一同上门配送与布置',
      '均采用食品级接触面/加固防风防摔设计',
      '提供现场试摆与位置调整服务'
    ],
    addons: [
      { id: 'cake-stand-paper', name: '纸质蛋糕架 x3', price: 15, unit: '套', description: '白色/粉色法式褶皱纸质柱台' },
      { id: 'cake-stand-steel', name: '户外三件套钢制蛋糕架', price: 45, unit: '套', description: '承重强，适合多层大蛋糕' },
      { id: 'helium-balloon', name: '氦气球 (纯氦安全气体)', price: 6, unit: '个', maxQuantity: 100, description: '每只单价 RM 6，多色可选' },
      { id: 'baby-box', name: '透明 Baby 盒 (4件套)', price: 30, unit: '套', description: '加购优惠价 RM 30' },
      { id: 'light-number-32', name: '32寸发光数字', price: 20, unit: '个', maxQuantity: 6, description: '加购优惠价 RM 20/个' },
      { id: 'cartoon-standee', name: '80cm 卡通立牌', price: 60, unit: '个', maxQuantity: 4, description: '加购 RM 60' },
      { id: 'giant-bear', name: '大熊公仔摆设', price: 20, unit: '只', maxQuantity: 2, description: '单只 RM 20' },
      { id: 'a1-easel', name: 'A1 迎宾架与定制水牌', price: 100, unit: '套', description: '加购 RM 100' }
    ]
  }
];

export interface AddonItemDefinition {
  id: string;
  name: string;
  price: number;
  unit: string;
  note: string;
}

export const MASTER_ADDONS: AddonItemDefinition[] = [
  { id: 'baby-box', name: '透明 Baby 盒 (4件套)', price: 30, unit: '套', note: '内置微光串灯' },
  { id: 'light-number-32', name: '32寸暖光发光数字', price: 20, unit: '个', note: '年龄数字' },
  { id: 'cartoon-standee', name: '80cm 卡通立牌', price: 60, unit: '个', note: '定制卡通人物' },
  { id: 'giant-bear', name: '1.2m 大熊公仔摆设', price: 20, unit: '只', note: '合影道具' },
  { id: 'a1-easel', name: 'A1 迎宾架与水牌', price: 100, unit: '套', note: '定制迎宾板' },
  { id: 'cake-stand-steel', name: '户外三件套钢制蛋糕架', price: 45, unit: '套', note: '加厚防水抗风' },
  { id: 'cake-stand-paper', name: '纸质折叠蛋糕台 (3件套)', price: 15, unit: '套', note: '法式圆柱台' },
  { id: 'helium-balloon', name: '安全纯氦气飘空气球', price: 6, unit: '个', note: '纯氦气安全飘空' }
];

export const NAV_LINKS = [
  { id: 'home', label: '主页', href: '#home' },
  { id: 'wedding', label: '婚礼', href: '#wedding' },
  { id: 'corporate', label: '公司', href: '#corporate' },
  { id: 'birthday', label: '生日', href: '#birthday', active: true },
  { id: 'proposal', label: '求婚', href: '#proposal' }
];

export const BRAND_STATS = [
  { number: '500+', label: '场次高端派对全案' },
  { number: '100%', label: '好评与客照回传' },
  { number: '1v1', label: '专属驻场美学督导' },
  { number: '3D', label: '出图定制与材质预览' }
];

export const SERVICE_PROCESS = [
  { step: '01', title: '咨询沟通', desc: '选定心仪套餐或定制主题，确定派对日期、场地及预算' },
  { step: '02', title: '方案出图', desc: '设计师根据场地实景出具 3D 色卡与布局效果图' },
  { step: '03', title: '现场搭建', desc: '活动当天提前 3-4 小时进场精细搭建，灯光与气球试调' },
  { step: '04', title: '无忧撤场', desc: '欢聚结束后专人负责清场整理，无损场地，轻松省心' }
];
