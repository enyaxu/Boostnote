import unified from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import _ from 'lodash'

class Markdown {
  constructor (options = {}) {
    this.md = unified()
                  .use(remarkParse)
                  .use(remark2rehype)
                  .use(rehypeStringify)
    window.md = this.md
  }

  render (content, cb) {
    if (!_.isString(content)) content = ''
    this.md.process(content)
           .then(
             function (file) {
               cb(file)
             },
             function (error) {
               console.error(error)
             }
           )
  }
}

export default Markdown
