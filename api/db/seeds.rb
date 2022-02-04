# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create!([
    {
        uuid: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        name: 'みつき',
        mail: 'hm20011027@gmail.com',
        birth: '2001-10-17'
    },
    {
        uuid: 'imJWbfJdYlWO2DnOudLdN1QXpbn2',
        name: '和音',
        mail: 'waonpad@gmail.com',
        birth: '2001-04-07'
    },
    {
        uuid: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        name: 'りゅうちゃん',
        mail: 'ryuichi19633811@gmail.com',
        birth: '1997-01-24'
    },
    {
        uuid: 'qUHkEWAUioTMU57TuCyDVJ9pj1l2',
        name: 'goto',
        mail: 'gotori.21.25@gmail.com',
        birth: '2000-12-05'
    }
])

Client.create!([
    {
        user_id: 'qUHkEWAUioTMU57TuCyDVJ9pj1l2',
        status: true
    },
    {
        user_id: 'imJWbfJdYlWO2DnOudLdN1QXpbn2',
        status: true
    }
])

Mentum.create!([
    {
        user_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        profile: '実務経験ありません！教えるのが好きです！地雷ですがぜひ',
        status: true
    },
    {
        user_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        profile: 'なんでもできます。整体、画像処理、ブログ運営。',
        status: true
    }
])

Tag.create!([
    {name: 'プログラミング'},
    {name: 'ブログ'},
    {name: 'ピアノ'},
    {name: 'ギター'},
    {name: 'その他楽器'},
    {name: '経営学'},
    {name: '勉強方法'},
    {name: '国語'},
    {name: '数学'},
    {name: '英語'},
    {name: '理科'},
    {name: '社会'}
])

# MentaTag.create!([
#     {
#         menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
#         tag_id: 1
#     },
#     {
#         menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
#         tag_id: 2
#     },
#     {
#         menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
#         tag_id: 3
#     },
#     {
#         menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
#         tag_id: 4
#     },
# ])