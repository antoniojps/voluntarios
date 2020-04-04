import React from 'react';
import { withApollo } from '../apollo/client';
import Seo from 'containers/Seo'
import { Layout } from 'components/atoms'
import Link from 'next/link'

const Description = () => (
  <p>
    Não encontramos nada aqui.
    {' '}
    <Link href="/">
      <a>
        Voltar à página inicial.
      </a>
    </Link>
  </p>
)

function NotFound() {
  return (
    <Layout title="Mhm..." description={<Description />}>
      <Seo title="404" />
      <div className="nope">
        <img src="/404.gif" alt="Man in black extends his hand as saying, where are we, reference to movie Pulp Fiction" />
      </div>
      <style jsx>{`
        .nope {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          img {
            border-radius: 20px;
          }
        }
      `}</style>
    </Layout>
  );
}

export default withApollo({ ssr: false })(NotFound);
