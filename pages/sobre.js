import Link from 'next/link'
import { Layout } from 'components/atoms'
import { withApollo } from 'apollo/client'
import Seo from 'containers/Seo'

const About = () => (
  <Layout title="Sobre" description="voluntários.io">
    <Seo title="Sobre" />
    <p>
      Página em construção,{' '}
      <Link href="/">
        <a>voltar</a>
      </Link>
      .
    </p>
  </Layout>
)

export default withApollo({ ssr: false })(About)

