import { PrismaClient } from "@prisma/client";
import * as bcypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main(){
    // クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    const hashedPassword = await bcypt.hash('password123', 12)


    // ダミー画像URL
    const dummyImages = [
        'https://picsum.photos/seed/post1/600/400',
        'https://picsum.photos/seed/post2/600/400'
    ]

    // ユーザー作成
const user = await prisma.user.create({
    data: {
        email: 'text@example.com',
        name: 'Text User',
        password: hashedPassword,
        posts: {
            create: [
                {
                    title: '初めてのブログ投稿',
                    content: 'これは最初のブログ投稿です。',
                    topImage: dummyImages[0],
                    published: true
                },{
                    title: '2番目のブログ投稿',
                    content: 'これは2つ目のブログ投稿です。',
                    topImage: dummyImages[1],
                    published: true
                }
            ]
        }
    }
})

console.log( { user } )
}

main()
.catch((e)=>{
    console.error(e)
    process.exit(1)
})
.finally(async ()=> {
    await prisma.$disconnect()
})