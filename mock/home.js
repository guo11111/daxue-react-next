module.exports = {
    'GET /api/home/hot-course': {
        status: 0,
        message: '',
        data: {
            entryList: [
                {
                    entryName: 'sunt',
                    jumpUrl: 'dolor'
                },
                {
                    entryName: 'exercitation',
                    jumpUrl: 'aliqua ut laboris eu'
                },
                {
                    entryName: 'in',
                    jumpUrl: 'sunt reprehenderit aliquip dolor tempor'
                },
                {
                    entryName: 'nulla',
                    jumpUrl: 'dolor ea ullamco commodo'
                },
                {
                    entryName: 'voluptatenon',
                    jumpUrl: 'Excepteur Lorem'
                }
            ],
            bannerList: [
                {
                    bannerName: 'ea elit cillum',
                    jumpUrl: 'culpa aute eu',
                    banner_url: 'https://file.koolearn.com/2020/1203/20201203105739651.png'
                },
                {
                    bannerName: 'exercitation et velit officia sunt',
                    jumpUrl: 'consectetur dolor sit in',
                    banner_url: 'https://file.koolearn.com/2020/1125/20201125043014865.jpg'
                },
                {
                    bannerName: 'non',
                    jumpUrl: 'Lorem tempor',
                    banner_url: 'https://file.koolearn.com/2020/1125/20201125043221683.jpg'
                }
            ],
            productList: [
                {
                    jumpUrl: 'abc',
                    productLine: 24224414.39821382,
                    productLineName: 'Duis sit',
                    productId: 38452759.712169826,
                    productName: 'enim',
                    sellingPointIntro: 'velit Lorem incididunt aute enim',
                    teacherList: [
                        {
                            teacherName: 'consectetur culpa Lorem labore',
                            photoUrl: 'velit Ut'
                        },
                        {
                            teacherName: 'ipsum aliqua ea anim',
                            photoUrl: 'in reprehenderit'
                        },
                        {
                            teacherName: 'nisi est',
                            photoUrl: 'pariatur'
                        }
                    ],
                    buyNumber: 52867,
                    promotionPrice: -15741167.02082558
                },
                {
                    productLine: -60524749.84062459,
                    productLineName: 'Excepteur',
                    productId: 91257413.90709257,
                    productName: 'pariatur in ex nostrud sit',
                    sellingPointIntro: 'occaecat non aliquip tempor quis',
                    teacherList: [
                        {
                            teacherName: 'commodo',
                            photoUrl: 'voluptate ex quis qui commodo'
                        },
                        {
                            teacherName: 'incididunt ut magna id',
                            photoUrl: 'occaecat dolore aute'
                        }
                    ],
                    buyNumber: 77008,
                    promotionPrice: -42978201.77215832
                },
                {
                    productLine: 24224414.39821382,
                    productLineName: 'Duis sit',
                    productId: 38452759.712169826,
                    productName: 'enim',
                    sellingPointIntro: 'velit Lorem incididunt aute enim',
                    teacherList: [
                        {
                            teacherName: 'consectetur culpa Lorem labore',
                            photoUrl: 'velit Ut'
                        },
                        {
                            teacherName: 'ipsum aliqua ea anim',
                            photoUrl: 'in reprehenderit'
                        },
                        {
                            teacherName: 'nisi est',
                            photoUrl: 'pariatur'
                        }
                    ],
                    buyNumber: 52867,
                    promotionPrice: -15741167.02082558
                },
                {
                    productLine: -60524749.84062459,
                    productLineName: 'Excepteur',
                    productId: 91257413.90709257,
                    productName: 'pariatur in ex nostrud sit',
                    sellingPointIntro: 'occaecat non aliquip tempor quis',
                    teacherList: [
                        {
                            teacherName: 'commodo',
                            photoUrl: 'voluptate ex quis qui commodo'
                        },
                        {
                            teacherName: 'incididunt ut magna id',
                            photoUrl: 'occaecat dolore aute'
                        }
                    ],
                    buyNumber: 77008,
                    promotionPrice: 15832
                }
            ]
        }
    },
    'GET /api/home/open-class': (req, res) => {
        const { typeCode } = req.query;
        // console.log('+++++++++++', typeCode);
        return res.json({
            status: 0,
            message: '',
            data: typeCode == 0 ? coursesList1 : coursesList2
        });
    },
    'GET /api/home/type': {
        status: 0,
        message: '',
        data: [
            { typeName: '????????????', typeCode: 2 },
            { typeName: '???????????????', typeCode: 3 },
            { typeName: '??????', typeCode: 4 },
            { typeName: '?????????', typeCode: 5 },
            { typeName: '????????????', typeCode: 6 },
            { typeName: '?????????', typeCode: 7 }
        ]
    },
    'GET /api/home/navigate/banner': {
        status: 0,
        message: '',
        data: [
            {
                bannerName: 'ullamco ut anim',
                bannerUrl: 'https://file.koolearn.com/2020/1203/20201203105739651.png',
                jumpUrl: 'ut dolor'
            },
            {
                bannerName: 'laboris ea culpa nisi aliqua',
                bannerUrl: 'https://file.koolearn.com/2020/1125/20201125043014865.jpg',
                jumpUrl: 'ad'
            },
            {
                bannerName: 'Lorem veniam',
                bannerUrl: 'https://file.koolearn.com/2020/1125/20201125043051791.jpg',
                jumpUrl: 'laboris aliqua minim aute qui'
            },
            {
                bannerName: 'aliquip in nostrud',
                bannerUrl: 'https://file.koolearn.com/2020/1125/20201125043221683.jpg',
                jumpUrl: 'adipisicing ipsum'
            }
        ]
    },
    'GET /api/home/top/navigate': {
        status: 0,
        message: '',
        data: [
            {
                mainTitle: '????????????',
                mainTitleUrl: 'quis minim nisi amet',
                promotion: 'veniam in sint aliqua magna',
                promotionUrl: 'laborum sed',
                subTitleList: [
                    {
                        title: 'qui',
                        link: 'reprehenderit'
                    }
                ],
                htmlBlock: '<div>tempor ipsum voluptate irure</div>'
            },
            {
                mainTitle: '????????????2',
                mainTitleUrl: 'sed et laborum ex tempor',
                promotion: 'nostrud enim ad cupidatat',
                promotionUrl: 'reprehenderit elit dolor',
                subTitleList: [
                    {
                        title: 'doloreu',
                        link: 'cillum mollit dolore'
                    }
                ],
                htmlBlock: '<div>sed</div>'
            }
        ]
    }
};

const coursesList1 = [
    {
        productLine: -32858602.382027462,
        productLineName: 'aliquip mollit sint',
        productId: -14576299.172398195,
        productName: 'amet sit sed aliqua officia',
        nearLiveTime: 'in nisi officia do',
        teacherList: [
            {
                teacherName: 'cupidatat culpa Duis aliquip proident',
                photoUrl: 'cupidatat'
            },
            {
                teacherName: 'incididunt',
                photoUrl: 'ea dolore non eu'
            },
            {
                teacherName: 'adipisicing',
                photoUrl: 'eu'
            },
            {
                teacherName: 'laboris',
                photoUrl: 'minim culpa'
            }
        ],
        buyNumber: 702,
        promotionInfo: '??????',
        promotionPrice: 63998,
        jumpUrl: 'amet'
    },
    {
        productLine: 74150184.78062505,
        productLineName: 'occaecat adipisicing qui ullamco',
        productId: -32225309.119646758,
        productName: 'elit',
        nearLiveTime: 'amet nostrud consectetur in aliqua',
        teacherList: [
            {
                teacherName: 'do',
                photoUrl: 'ex irure'
            }
        ],
        buyNumber: 0,
        promotionPrice: 0,
        jumpUrl: 'in dolor anim'
    },
    {
        productLine: 5845970.542393044,
        productLineName: 'reprehenderit ad occaecat Ut',
        productId: 74344584.29245368,
        productName: 'cupidatat',
        nearLiveTime: 'consectetur',
        teacherList: [
            {
                teacherName: 'consectetur sit et',
                photoUrl: 'reprehenderit cillum sed'
            },
            {
                teacherName: 'proident magna',
                photoUrl: 'Duis'
            }
        ],
        buyNumber: 33547,
        promotionPrice: 8076,
        jumpUrl: 'Lorem id sunt esse dolor'
    },
    {
        productLine: 25987297.545268044,
        productLineName: 'dolor reprehenderit cillum',
        productId: -27727391.983010992,
        productName: 'nisi et commodo occaecat',
        nearLiveTime: 'sed aliqua',
        teacherList: [
            {
                teacherName: 'do labore',
                photoUrl: 'consectetur dolor proident'
            },
            {
                teacherName: 'aliqua',
                photoUrl: 'officia non'
            }
        ],
        buyNumber: 1818,
        promotionPrice: 5165,
        jumpUrl: 'pariatur enim'
    }
];

const coursesList2 = [
    {
        productLine: -32858602.382027462,
        productLineName: 'aliquip mollit sint',
        productId: -14576299.172398195,
        productName: 'amet sit sed aliqua officia',
        nearLiveTime: 'in nisi officia do',
        teacherList: [
            {
                teacherName: 'cupidatat culpa Duis aliquip proident',
                photoUrl: 'cupidatat'
            },
            {
                teacherName: 'incididunt',
                photoUrl: 'ea dolore non eu'
            },
            {
                teacherName: 'laboris',
                photoUrl: 'minim culpa'
            },
            {
                teacherName: 'minim do sint nisi enim',
                photoUrl: 'do'
            }
        ],
        buyNumber: 702,
        promotionPrice: 3998,
        jumpUrl: 'amet'
    },
    {
        productLine: 74150184.78062505,
        productLineName: 'occaecat adipisicing qui ullamco',
        productId: -32225309.119646758,
        productName: 'elit',
        nearLiveTime: 'amet nostrud consectetur in aliqua',
        teacherList: [
            {
                teacherName: 'do',
                photoUrl: 'ex irure'
            }
        ],
        buyNumber: 55907,
        promotionPrice: 5048,
        jumpUrl: 'in dolor anim'
    },
    {
        productLine: 5845970.542393044,
        productLineName: 'reprehenderit ad occaecat Ut',
        productId: 74344584.29245368,
        productName: 'cupidatat',
        nearLiveTime: 'consectetur',
        teacherList: [
            {
                teacherName: 'consectetur sit et',
                photoUrl: 'reprehenderit cillum sed'
            },
            {
                teacherName: 'proident magna',
                photoUrl: 'Duis'
            }
        ],
        buyNumber: 33547,
        promotionPrice: 8076,
        jumpUrl: 'Lorem id sunt esse dolor'
    },
    {
        productLine: 25987297.545268044,
        productLineName: 'dolor reprehenderit cillum',
        productId: -27727391.983010992,
        productName: 'nisi et commodo occaecat',
        nearLiveTime: 'sed aliqua',
        teacherList: [
            {
                teacherName: 'do labore',
                photoUrl: 'consectetur dolor proident'
            },
            {
                teacherName: 'aliqua',
                photoUrl: 'officia non'
            }
        ],
        buyNumber: 1818,
        promotionPrice: 65,
        jumpUrl: 'pariatur enim'
    },
    {
        productLine: 25987297.545268044,
        productLineName: 'dolor reprehenderit cillum',
        productId: -27727391.983010992,
        productName: 'nisi et commodo occaecat',
        nearLiveTime: 'sed aliqua',
        teacherList: [
            {
                teacherName: 'do labore',
                photoUrl: 'consectetur dolor proident'
            },
            {
                teacherName: 'aliqua',
                photoUrl: 'officia non'
            }
        ],
        buyNumber: 61818,
        promotionPrice: 5165,
        jumpUrl: 'pariatur enim'
    }
];
