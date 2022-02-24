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
        profile: '# プログラミングをメインで教えています。',
        status: true
    },
    {
        user_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        profile: 'なんでもできます。整体、画像処理、ブログ運営。',
        status: true
    }
])

Client.create!(user_id: 'WIDb0GUn44YzQnoSqwuhNBaCw6o2', profile: '# ピアノのMENTAを探しています\n○○を弾けるようになりましたが、これ以上の独学は厳しいと感じMENTAを探し始めました。\n\n## 予算\n月2万までの方にお願いしたいです。\n\n## 目標\nトルコ行進曲を弾けるようになりたいです。脱初心者を目指しています。\n\nその他詳細については話し合っていきたいです。')

tags = [
    'プログラミング',
    'ブログ',
    'ピアノ',
    'ギター',
    'その他楽器',
    '経営学',
    '勉強方法',
    '国語',
    '数学',
    '英語',
    '理科',
    '社会'
]

tags.length.times do |i|
    Tag.create!(
        name: tags[i]
    )
end

MentaTag.create!([
    {
        menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        tag_id: 1
    },
    {
        menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        tag_id: 2
    },
    {
        menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        tag_id: 3
    },
    {
        menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        tag_id: 4
    },
])

Like.create!(menta_id: "tIIermrOnEaqrKLjbsxKQUGGBC33", client_id: "WIDb0GUn44YzQnoSqwuhNBaCw6o2")
Like.create!(menta_id: "tIIermrOnEaqrKLjbsxKQUGGBC33", client_id: "qUHkEWAUioTMU57TuCyDVJ9pj1l2")