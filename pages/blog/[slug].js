import { useMemo } from 'react'
import { Layout } from 'components/atoms'
import { withApollo } from 'apollo/client'
import Seo from 'containers/Seo'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
const glob = require('glob')
import { parse, format } from 'date-fns'
import { pt } from 'date-fns/locale'
import { Spacer, Note, Display, Image } from '@zeit-ui/react'

const dateFormat = 'y-MM-dd'

const Posts = ({ frontmatter, markdownBody }) => {
  const postDate = useMemo(() => {
    const date = parse(frontmatter.date, dateFormat, new Date())
    const dayOfWeek = format(date, 'EEEE', { locale: pt })
    const day = format(date, 'd', { locale: pt })
    const month = format(date, 'MMMM', { locale: pt })
    const year = format(date, 'Y', { locale: pt })

    return `${dayOfWeek}, ${day} de ${month} de ${year}`

  }, [frontmatter])

  return (
    <Layout title={frontmatter.title} description={frontmatter.description}>
      <Seo title={frontmatter.title} description={frontmatter.description} />
      <article>
          <ReactMarkdown
            source={markdownBody}
            renderers={
              {
                image: ({ alt, src }) => (
                    <Display shadow caption={alt}>
                      <Image src={src} />
                    </Display>
                  ),
              }
            }
          />
          <Spacer y={5}/>
        <Note label={false}>
          Atualizado {postDate}
        </Note>
        <Spacer y={5}/>
      </article>
      <style jsx>{`
        article {
          max-width: 680px;
          margin-right: auto;
          margin-left: auto;
        }
      `}</style>
    </Layout>
  )
}

export async function getStaticPaths() {
  //get all .md files in the posts dir
  const pages = glob.sync('assets/posts/**/*.md')

  //remove path and extension to leave filename only
  const pageSlugs = pages.map(file =>
    file
      .split('/')[2]
      .replace(/ /g, '-')
      .slice(0, -3)
      .trim(),
  )

  // create paths with `slug` param
  const paths = pageSlugs.map(slug => `/blog/${slug}`)

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(ctx) {
  const { slug } = ctx.params
  const content = await import(`../../assets/posts/${slug}.md`)

  const data = matter(content.default)

  return {
    props: {
      slug,
      frontmatter: data.data,
      markdownBody: data.content,
    },
  }
}


export default withApollo({ ssr: false })(Posts)

