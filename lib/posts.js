import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDir = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
    //Get file names under /posts
    const fileNames = fs.readdirSync(postsDir)
    const allPostsData = fileNames.map(fileName => {
        //remove ".md" from file name to get id
        const id = fileName.replace(/\.md$/, '')

        // Read markdown fil as string
        const fullPath = path.join(postsDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        //Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        //Combine the data with the id
        return {
            id,
            ...matterResult.data
        }
    })

    //sort posts by date
    return allPostsData.sort(({data: a}, {data: b}) => {
        if (a < b) {
            return 1
        } else if (a > b) {
            return -1
        } else {
            return 0
        }
    })
}

export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDir)

    // Returns an array that looks like this:
    // [
    //   {
    //     params: {
    //       id: 'ssg-ssr'
    //     }
    //   },
    //   {
    //     params: {
    //       id: 'pre-rendering'
    //     }
    //   }
    // ]
    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export function getPostData(id) {
    const fullPath = path.join(postsDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
        id,
        ...matterResult.data
    }
}