const connecttoDB = require("./mongodbConnect");

const sampleuserdata = [
  {
    username: "網站管理員",
    email: "root@caseDesign.com",
    password: "123456",
    phonenumber: "0912345678",
    address: "台北市信義區市民大道六段288號5樓",
    birthday: "1999/9/9",
    nickname: "root",
    order: [],
    admin: true,
  },
  {
    username: "AjaxLiu",
    email: "ajaxliu@systexfintech.com",
    password: "123456",
    phonenumber: "0927972235",
    address: "台北市信義區市民大道六段288號6樓",
    birthday: "1999/9/9",
    nickname: "Ajax",
    order: [],
    admin: false,
  },
];
//真實的商品檔案資料應該是由系統根據產檔案時的時間來設定
const samplemerchantdisedata = [
  {
    _id: 1001,
    name: "經典蝙蝠俠",
    price: 1350,
    filename: "batman.png",
    description:
      "復古蝙蝠俠卡通造型手機殼,因為他不是個英雄。他是沉默的守護天使、警戒的保護者...他是黑暗騎士。",
  },
  {
    _id: 1002,
    name: "經典蝙蝠俠",
    price: 1350,
    filename: "batman2.png",
    description:
      "黑白蝙蝠俠手機殼,我的外表底下是誰並不重要，我的所作所為才是關鍵。",
  },
  {
    _id: 1003,
    name: "惡棍與蝙蝠俠",
    price: 1200,
    filename: "batman3.png",
    description:
      "惡棍與蝙蝠俠Logo手機殼,生活在這個世界上唯一理智的方式就是不要規則，今晚你就要打破你的規則。",
  },
  {
    _id: 1004,
    name: "哈莉奎茵",
    price: 1100,
    filename: "batman4.png",
    description: "哈莉奎茵手機殼,為愛瘋狂，為自己堅強。",
  },
  {
    _id: 1005,
    name: "經典蝙蝠俠",
    price: 1100,
    filename: "batman5.png",
    description: "經典蝙蝠俠Logo手機殼,高譚市。",
  },
  {
    _id: 1006,
    name: "Joker",
    price: 1100,
    filename: "batman6.png",
    description:
      "小丑造型手機殼,你要知道，瘋狂就像地心引力，有時候需要做的不過是輕輕一推。",
  },
  {
    _id: 1007,
    name: "宿命-蝙蝠俠與小丑",
    price: 1200,
    filename: "batman7.png",
    description:
      "蝙蝠俠與小丑造型手機殼,有時候真話並不夠好，人們須要的更多，人們須要他們的信仰被證實。",
  },
  {
    _id: 1008,
    name: "Joker",
    price: 1200,
    filename: "batman8.png",
    description:
      "小丑造型手機殼殼,你要知道，瘋狂就像地心引力，有時候需要做的不過是輕輕一推。",
  },
  {
    _id: 1009,
    name: "哈莉奎茵",
    price: 1200,
    filename: "batman9.png",
    description: "哈莉奎茵手機殼,為愛瘋狂，為自己堅強。",
  },
  {
    _id: 1010,
    name: "哈莉奎茵",
    price: 1200,
    filename: "batman10.png",
    description: "哈莉奎茵手機殼,為愛瘋狂，為自己堅強。",
  },
  {
    _id: 1011,
    name: "小丑與哈莉奎茵",
    price: 1200,
    filename: "batman11.png",
    description:
      "小丑與哈莉奎茵手機殼,俗語說，每個成功男人的背後，都有個不好惹的女人！",
  },
  {
    _id: 1012,
    name: "經典蝙蝠俠",
    price: 1100,
    filename: "batman12.png",
    description: "黑暗騎士手機殼,高譚市。",
  },
  {
    _id: 1013,
    name: "命運中的宿敵系列",
    price: 1250,
    filename: "batman13.png",
    description: "蝙蝠俠手機殼,命運中的宿敵系列-蝙蝠俠。",
  },
  {
    _id: 1014,
    name: "命運中的宿敵系列",
    price: 1250,
    filename: "batman14.png",
    description: "蝙蝠俠手機殼,命運中的宿敵系列-小丑。",
  },
  {
    _id: 1015,
    name: "經典蝙蝠俠",
    price: 1100,
    filename: "batman15.png",
    description: "經典蝙蝠俠Logo手機殼,卡通復古版。",
  },
  {
    _id: 1016,
    name: "迪士尼系列-小飛象",
    price: 1200,
    filename: "disney.png",
    description: "迪士尼卡通系列手機殼,小飛象與彩色氣球。",
  },
  {
    _id: 1017,
    name: "迪士尼系列-101忠狗",
    price: 1200,
    filename: "disney2.png",
    description: "迪士尼卡通系列手機殼,Pongo與Lucky斑點造型。",
  },
  {
    _id: 1018,
    name: "海底總動員系列",
    price: 1350,
    filename: "disney3.png",
    description: "海底總動員系列手機殼,雪梨瓦勒比路42號的皮雪曼。",
  },
  {
    _id: 1019,
    name: "海底總動員系列",
    price: 1350,
    filename: "disney4.png",
    description: "海底總動員系列手機殼,海底世界的小夥伴。",
  },
  {
    _id: 1020,
    name: "迪士尼系列",
    price: 1100,
    filename: "disney5.png",
    description: "迪士尼系列手機殼,經典可愛電影貼紙造型。",
  },
  {
    _id: 1021,
    name: "迪士尼系列-小熊維尼",
    price: 1350,
    filename: "disney6.png",
    description: "迪士尼系列手機殼,貪吃的維尼,滿滿的蜂蜜。",
  },
  {
    _id: 1022,
    name: "米奇系列",
    price: 1350,
    filename: "disney7.png",
    description: "米奇系列手機殼,情侶對殼-米奇摀嘴。",
  },
  {
    _id: 1023,
    name: "米奇系列",
    price: 1350,
    filename: "disney8.png",
    description: "米奇系列手機殼,情侶對殼-米妮摀嘴。",
  },
  {
    _id: 1024,
    name: "米奇系列",
    price: 1350,
    filename: "disney9.png",
    description: "米奇系列手機殼,經典米奇衣服造型。",
  },
  {
    _id: 1025,
    name: "米奇系列",
    price: 1200,
    filename: "disney10.png",
    description: "米奇系列手機殼,XXOO米奇連連看。",
  },
  {
    _id: 1026,
    name: "怪獸電力公司系列",
    price: 1350,
    filename: "disney11.png",
    description: "怪獸電力公司系列手機殼,Ahhhhh!-麥克華斯基。",
  },
  {
    _id: 1027,
    name: "怪獸電力公司系列",
    price: 1350,
    filename: "disney12.png",
    description: "怪獸電力公司系列手機殼,Ahhhhh!-毛怪。",
  },
  {
    _id: 1028,
    name: "怪獸電力公司系列",
    price: 1250,
    filename: "disney13.png",
    description: "怪獸電力公司系列手機殼,可愛貼紙造型,怪獸電力公司逃走中。",
  },
  {
    _id: 1029,
    name: "怪獸電力公司系列",
    price: 1350,
    filename: "disney14.png",
    description: "怪獸電力公司系列手機殼,LET ME HEAR YOUR SCREAM!!!",
  },
  {
    _id: 1030,
    name: "迪士尼系列",
    price: 1100,
    filename: "disney15.png",
    description: "迪士尼系列手機殼,經典可愛電影主角貼紙造型。",
  },
  {
    _id: 1031,
    name: "哆啦A夢系列",
    price: 1350,
    filename: "doraemon.png",
    description: "經典哆啦A夢大頭藍色手機殼。",
  },
  {
    _id: 1032,
    name: "哆啦A夢系列",
    price: 1200,
    filename: "doraemon2.png",
    description: "哆啦A夢手機殼, 哆啦A夢經典道具大集合!!!。",
  },
  {
    _id: 1033,
    name: "哆啦A夢系列",
    price: 1200,
    filename: "doraemon3.png",
    description: "哆啦A夢手機殼, 放大燈就該用在這裡。",
  },
  {
    _id: 1034,
    name: "哆啦A夢系列",
    price: 1200,
    filename: "doraemon4.png",
    description: "哆啦A夢手機殼, 燈燈燈燈燈~記憶吐司~。",
  },
  {
    _id: 1035,
    name: "哆啦A夢系列",
    price: 1350,
    filename: "doraemon5.png",
    description: "哆啦A夢手機殼, 是老鼠!!!!!!!。",
  },
  {
    _id: 1036,
    name: "小王子系列",
    price: 1250,
    filename: "littleprince.png",
    description: "小王子系列手機殼, 每個大人都曾經是小孩，但只有少數人記得。",
  },
  {
    _id: 1037,
    name: "小王子系列",
    price: 1250,
    filename: "littleprince2.png",
    description:
      "小王子系列手機殼, 如果你馴養了我，我們就彼此需要了。對我，你就是世界上獨一無二的；對你，我也是世界上獨一無二的。",
  },
  {
    _id: 1038,
    name: "小王子系列",
    price: 1250,
    filename: "littleprince3.png",
    description:
      "小王子系列手機殼, 這是一頂帽子？還是一隻吞了大象的蟒蛇？大人們總是需要清楚的解釋，他們才會明白其中的趣味。",
  },
  {
    _id: 1039,
    name: "小王子系列",
    price: 1250,
    filename: "littleprince4.png",
    description:
      "小王子系列手機殼, 你晚上仰望天空時，因為我住在其中的一顆星星上，因為我會在其中的一顆星星上笑，你會覺得所有的星星都在笑。",
  },
  {
    _id: 1040,
    name: "小王子系列",
    price: 1100,
    filename: "littleprince5.png",
    description:
      "小王子系列手機殼, 如果一個人在幾百萬顆星星當中，愛上獨一無二的一朵花，那麼他只要望著，就會很快樂。",
  },
  {
    _id: 1041,
    name: "小王子系列",
    price: 1250,
    filename: "littleprince6.png",
    description:
      "小王子系列手機殼, 你再去看看那些玫瑰吧。你會明白，你的玫瑰確實是世界上獨一無二的。",
  },
  {
    _id: 1042,
    name: "小王子系列",
    price: 1350,
    filename: "littleprince7.png",
    description: "小王子系列手機殼, 每個大人都曾經是小孩，但只有少數人記得。",
  },
  {
    _id: 1043,
    name: "小王子系列",
    price: 1350,
    filename: "littleprince8.png",
    description:
      "小王子系列手機殼, 你再去看看那些玫瑰吧。你會明白，你的玫瑰確實是世界上獨一無二的。",
  },
  {
    _id: 1044,
    name: "小王子系列",
    price: 1350,
    filename: "littleprince9.png",
    description:
      "小王子系列手機殼, 這就是我的秘密。它很簡單：只有用心看，才能看清楚。重要的東西是眼睛看不見的。",
  },
  {
    _id: 1045,
    name: "小王子系列",
    price: 1350,
    filename: "littleprince10.png",
    description:
      "小王子系列手機殼, 人類再沒有時間去了解其他事物了，他們總是到商店買現成的東西，不過世界上還沒有可以購買朋友的商店。",
  },
  {
    _id: 1046,
    name: "航海王系列",
    price: 1200,
    filename: "onepiece.png",
    description: "航海王系列手機殼, 魯夫與夥伴們骷髏旗幟。",
  },
  {
    _id: 1047,
    name: "航海王系列",
    price: 1100,
    filename: "onepiece2.png",
    description: "航海王系列手機殼, 經典草帽魯夫骷髏旗幟。",
  },
  {
    _id: 1048,
    name: "航海王系列",
    price: 1100,
    filename: "onepiece3.png",
    description: "航海王系列手機殼, TO BE CONTINUDE。",
  },
  {
    _id: 1049,
    name: "航海王系列",
    price: 1250,
    filename: "onepiece4.png",
    description: "航海王系列手機殼, 五檔!!!貼紙造型。",
  },
  {
    _id: 1050,
    name: "航海王系列",
    price: 1150,
    filename: "onepiece5.png",
    description: "航海王系列手機殼, 草帽海賊團偉大的航道-和之國。",
  },
  {
    _id: 1051,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece6.png",
    description: "航海王系列手機殼, 懸賞單-Monkey D. Luffy。",
  },
  {
    _id: 1052,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece7.png",
    description: "航海王系列手機殼, 懸賞單-Vinsmoke Sanji。",
  },
  {
    _id: 1053,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece8.png",
    description: "航海王系列手機殼, 懸賞單-Chopper。",
  },
  {
    _id: 1054,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece9.png",
    description: "航海王系列手機殼, 懸賞單-Franky",
  },
  {
    _id: 1055,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece10.png",
    description: "航海王系列手機殼, 懸賞單-Nami",
  },
  {
    _id: 1056,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece11.png",
    description: "航海王系列手機殼, 懸賞單-Nico Robin",
  },
  {
    _id: 1057,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece12.png",
    description: "航海王系列手機殼, 懸賞單-Roronoa Zoro",
  },
  {
    _id: 1058,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece13.png",
    description: "航海王系列手機殼, 懸賞單-God Usopp",
  },
  {
    _id: 1059,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece14.png",
    description: "航海王系列手機殼, 懸賞單-The Soul King Brook",
  },
  {
    _id: 1060,
    name: "航海王系列",
    price: 1350,
    filename: "onepiece15.png",
    description: "航海王系列手機殼, 懸賞單 For All",
  },
  {
    _id: 1061,
    name: "史努比系列",
    price: 1350,
    filename: "snoopy.png",
    description: "史努比藝術家系列手機殼, 孟克-吶喊",
  },
  {
    _id: 1062,
    name: "史努比系列",
    price: 1350,
    filename: "snoopy2.png",
    description: "史努比藝術家系列手機殼, 梵谷-The Starry Night",
  },
  {
    _id: 1063,
    name: "史努比系列",
    price: 1350,
    filename: "snoopy3.png",
    description: "史努比藝術家系列手機殼, 梵谷-The Starry Night",
  },
  {
    _id: 1064,
    name: "史努比系列",
    price: 1350,
    filename: "snoopy4.png",
    description: "史努比藝術家系列手機殼, 梵谷-向日葵",
  },
  {
    _id: 1065,
    name: "史努比系列",
    price: 1350,
    filename: "snoopy5.png",
    description: "史努比藝術家系列手機殼, 葛飾北齋-神奈川沖浪裏",
  },
  {
    _id: 1066,
    name: "史努比系列",
    price: 1350,
    filename: "snoopy6.png",
    description: "史努比藝術家系列手機殼, 葛飾北齋-武州玉川",
  },
  {
    _id: 1067,
    name: "史努比系列",
    price: 1150,
    filename: "snoopy7.png",
    description: "史努比系列手機殼, 史努比與查理·布朗拍立得",
  },
  {
    _id: 1068,
    name: "史努比系列",
    price: 1250,
    filename: "snoopy8.png",
    description: "史努比系列手機殼, 史努比睡懶覺",
  },
  {
    _id: 1069,
    name: "史努比系列",
    price: 1100,
    filename: "snoopy9.png",
    description: "史努比系列手機殼, Have A Nice Day",
  },
  {
    _id: 1070,
    name: "史努比系列",
    price: 1200,
    filename: "snoopy10.png",
    description: "史努比系列手機殼, 腳色集合貼紙造型",
  },
  {
    _id: 1071,
    name: "史努比系列",
    price: 1150,
    filename: "snoopy11.png",
    description: "史努比系列手機殼, Snoopy Ice Cream",
  },
  {
    _id: 1072,
    name: "史努比系列",
    price: 1150,
    filename: "snoopy12.png",
    description: "史努比系列手機殼, Snoopy and Woodstock 溜滑梯",
  },
  {
    _id: 1073,
    name: "史努比系列",
    price: 1250,
    filename: "snoopy13.png",
    description: "史努比系列手機殼, 史努比王牌飛行員",
  },
  {
    _id: 1074,
    name: "史努比系列",
    price: 1100,
    filename: "snoopy14.png",
    description: "史努比系列手機殼, 史努比大廚",
  },
  {
    _id: 1075,
    name: "史努比系列",
    price: 1100,
    filename: "snoopy15.png",
    description: "史努比系列手機殼, 史努比表情包貼紙造型",
  },
];
/*[
  {
    _id: 20241007001, 
    type: "手機顏色",
    name: "Iphone 16 Pro 黑",
    color: "黑",
    description: "暗黑色",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007002,
    type: "手機顏色",
    name: "Iphone 16 Pro 金",
    color: "金",
    description: "亮金色",
    filename: "i16pro-gold.png",
    price: 400,
    available: true,
  },
  {
    _id: 20241007003,
    type: "手機顏色",
    name: "Iphone 16 Pro 白",
    color: "白",
    description: "往生白",
    filename: "i16pro-white.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007004,
    type: "手機顏色",
    name: "Iphone 16 Pro 銀",
    color: "銀",
    description: "鈦銀",
    filename: "i16pro-titanium-silver.png",
    price: 500,
    available: true,
  },
  {
    _id: 20241007006, 
    type: "外框顏色",
    name: "透明背板",
    color: "透明",
    description: "透明背板",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007008, 
    type: "鏡頭顏色",
    name: "鏡頭造型-沙漠鈦金",
    color: "沙漠鈦金",
    description: "沙漠鈦金/斜面款",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007009, 
    type: "鏡頭顏色",
    name: "鏡頭造型-鈦藍",
    color: "鈦藍",
    description: "鈦藍/斜面款",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007010, 
    type: "鏡頭顏色",
    name: "鏡頭造型-鈦原色",
    color: "鈦原色",
    description: "鈦原色/斜面款",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007011, 
    type: "背板",
    name: "透明背板",
    color: "透明",
    description: "透明背板",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007012, 
    type: "背板",
    name: "白爛貓背板",
    color: "透明",
    description: "草泥馬款",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007013, 
    type: "背板",
    name: "白爛貓背板",
    color: "藍",
    description: "宇宙款",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007014, 
    type: "按鍵組",
    name: "按鍵組",
    color: "黑色",
    description: "按鍵組/黑色",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007015, 
    type: "按鍵組",
    name: "按鍵組",
    color: "深紫色",
    description: "按鍵組/深紫色",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007016, 
    type: "按鍵組",
    name: "按鍵組",
    color: "可可色",
    description: "按鍵組/可可色",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007017, 
    type: "動作按鍵",
    name: "動作按鍵",
    color: "可可色",
    description: "動作按鍵/可可色",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007018, 
    type: "動作按鍵",
    name: "動作按鍵",
    color: "櫻花粉",
    description: "動作按鍵/櫻花粉",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
  {
    _id: 20241007019, 
    type: "動作按鍵",
    name: "動作按鍵",
    color: "烈日紅",
    description: "動作按鍵/烈日紅",
    filename: "i16pro-black.png",
    price: 300,
    available: true,
  },
];*/
//訂單編號也是根據產生訂單的當下時間來編碼
const sampleorderdata = [
  {
    _id: 0,
    explain: "this is the initial order",
  },
];

async function initialUsers() {
  try {
    const handle = await connecttoDB();
    if (handle === null) {
      console.log("Handle null!");
      throw new Error("Database connect fail!");
    }
    let dbInited = false;
    const database = handle.db("caseDesign");
    const collection = database.collection("users");
    // const collection = handle.collection("users");
    await collection
      .find()
      .toArray()
      .then((result) => {
        dbInited = result.length > 0;
      })
      .catch((err) => {
        throw new Error("verify error");
      });
    if (dbInited === false) {
      console.log("創建使用者檔!");
      await collection.insertMany(sampleuserdata);
    } else {
      console.log("UserDB已存在!");
    }
    await handle.close();
  } catch (err) {
    console.log("initialUsers fail!");
    console.log(err);
  }
}

async function initialmerchantdisedata() {
  try {
    const handle = await connecttoDB();
    if (handle === null) {
      console.log("Handle null!");
      throw new Error("Database connect fail!");
    }
    const db = handle.db("caseDesign");
    const collection = db.collection("merchantdise");
    let dbInited = false;
    await collection
      .find()
      .toArray()
      .then((result) => {
        dbInited = result.length > 0;
      });
    if (dbInited === false) {
      console.log("創建商品檔!");
      await collection.insertMany(samplemerchantdisedata);
    } else console.log("商品檔已存在!");
    await handle.close();
  } catch (err) {
    console.log("initialmerchantdisedata fail!");
    console.log(err);
    // await handle.close();
  }
}

async function initialorderdata() {
  try {
    const handle = await connecttoDB();
    if (handle === null) {
      console.log("Handle null!");
      throw new Error("initialorderdata connect fail!");
    }
    const db = handle.db("caseDesign");
    let dbInited = false;
    const collection = db.collection("orders");
    await collection
      .find()
      .toArray()
      .then((result) => {
        dbInited = result.length > 0;
      });
    if (dbInited === false) {
      console.log("創建訂單檔!");
      await collection.insertMany(sampleorderdata);
    } else console.log("訂單檔已存在!");
    await handle.close();
  } catch (err) {
    console.log("initialorderdata fail!");
    console.log(err);
  }
}
module.exports = { initialUsers, initialmerchantdisedata, initialorderdata };
