import Link from 'next/link'
import { Layout } from 'components/atoms'

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

export default About

