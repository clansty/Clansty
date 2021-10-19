import path from 'path'
import * as fs from 'fs'

export default function getPostContent(slug: string) {
    const contentPath = path.join('posts', slug, 'content.md')
    return fs.readFileSync(contentPath, 'utf-8')
}
