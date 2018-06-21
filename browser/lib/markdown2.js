import unified from 'unified'
import remarkParse from 'remark-parse'
import remark2rehype from 'remark-rehype'
import rehypeStringify from '@enyaxu/rehype-stringify'
import rehypeHighlight from 'rehype-highlight'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeFlowChart from 'rehype-flowchart'

import _ from 'lodash'

class Markdown {
  constructor (options = {}) {
    this.md = unified()
                  .use(remarkParse)
                  .use(remarkMath)
                  .use(remark2rehype)
                  .use(rehypeKatex, {
                    throwOnError: true,
                    errorColor: '#FF0000',
                    inlineDoubleDisplay: true
                  })
                  .use(rehypeFlowChart)
                  .use(rehypeHighlight, {
                    ignoreMissing: true
                  })
                  .use(rehypeStringify)
    window.md = this.md
  }

  render (content, cb) {
    if (!_.isString(content)) content = ''
    this.md.process(content)
           .then(
             function (file) {
               cb(String(file))
               console.log(String(file))
             },
             function (error) {
               console.error(error)
             }
           )
  }
}

export default Markdown
