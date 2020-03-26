import Link from 'next/link'
import { Layout } from 'components/atoms'
import { withApollo } from 'apollo/client'

const About = () => (
  <Layout title="Sobre" description="voluntários.io">
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

