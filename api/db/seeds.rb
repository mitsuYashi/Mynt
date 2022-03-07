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
        name: 'menta1',
        mail: 'hm20011027@gmail.com',
        birth: '2001-10-17'
    },
    {
        uuid: 'imJWbfJdYlWO2DnOudLdN1QXpbn2',
        name: 'client1',
        mail: 'waonpad@gmail.com',
        birth: '2001-04-07'
    },
    {
        uuid: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        name: 'menta2',
        mail: 'ryuichi19633811@gmail.com',
        birth: '1997-01-24'
    },
    {
        uuid: 'qUHkEWAUioTMU57TuCyDVJ9pj1l2',
        name: 'client2',
        mail: 'gotori.21.25@gmail.com',
        birth: '2000-12-05'
    },
    {
        uuid: 'WIDb0GUn44YzQnoSqwuhNBaCw6o2',
        name: 'client3',
        mail: 'karubonaraoisiiyone@gmail.com',
        birth: '2001-01-01'
    }
])


Mentum.create!([
    {
        user_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        profile: '# 誰でも簡単にピアノを弾ける！もしくはプログラミング
## 私について
ピアノ歴18年。コンサート入賞経歴あり。

現在はアプリ制作会社勤務中。

## 詳細
初心者を抜け出すサポートをします！

契約は一か月ごと、週一回を目安に課題を出します。

契約後も課題を出し、自主的に進められるようにします！

プログラミングについては言語の兼ね合いもあり、応相談です。

実績、その他活躍については下記の動画を参照してください。
## 予算
月一のzoom面談で一か月 1万 を目安に受け付けています。
',
        url: 'ZRo8aN8GjwI',
        status: true
    },
    {
        user_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        profile: '# なんでもできます。整体、画像処理、動画編集、ブログ運営。あらゆることお任せください。
## 詳細
### 整体
### 簡単に体の調子を整えましょう。
実際に整体で働く私がお教えします。

一回あたり¥1000~を想定しています

## 画像処理
### Photoshopを用いた画像処理
使い方がよくわからない……、難しいと感じる方必見！

初歩の初歩から上級テクまでお教えできます。

### 動画編集
### Aftereffectを用いた動画編集
イケてる動画を作りたい方！

ぜひ相談してください。

Aftereffectの使い方から、どうすればかっこよくなるのか相談に乗ります！

## 料金
応相談です。',
url: 'mY3KApEk7zQ',
status: true
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
    },
    {
        user_id: 'WIDb0GUn44YzQnoSqwuhNBaCw6o2', 
        profile: '# ピアノのMENTAを探しています
○○を弾けるようになりましたが、これ以上の独学は厳しいと感じMENTAを探し始めました。
## 予算
月2万までの方にお願いしたいです。
## 目標
トルコ行進曲を弾けるようになりたいです。脱初心者を目指しています。

その他詳細については話し合っていきたいです。'
    }
])

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
    '社会',
    '動画編集',
    '画像処理',
    '整体'
]

tags.length.times do |i|
    uuid = SecureRandom.uuid
    Tag.create!(
        name: tags[i]
    )
    User.create!(
        uuid: uuid,
        name: 'menta' << tags[i],
        mail: 'mail' << tags[i] << '@gmail.com',
        birth: '1999-03-07' 
    )
    Mentum.create!(
        user_id: uuid,
        profile: '# ' << tags[i] << '教えます
## 予算
月¥3000が目安です。
詳細についてはchatで。',
        url: 'V9E_qsUeT9Y',
        status: true
    )
    MentaTag.create!(
        menta_id: uuid,
        tag_id: i + 1
    )
end

MentaTag.create!([
    {
        menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        tag_id: 1
    },
    {
        menta_id: 'tIIermrOnEaqrKLjbsxKQUGGBC33',
        tag_id: 3
    },
    {
        menta_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        tag_id: 1
    },
    {
        menta_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        tag_id: 13
    },
    {
        menta_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        tag_id: 14
    },
    {
        menta_id: 'QyvvxGrvEoWnncTU5E9M4pbSCCI3',
        tag_id: 15
    }
])

Like.create!(menta_id: "tIIermrOnEaqrKLjbsxKQUGGBC33", client_id: "imJWbfJdYlWO2DnOudLdN1QXpbn2", status: true)