import Link from 'next/link'

export default () => (
  <div className="container">
    <p>
      This is a static page goto{' '}
      <Link href="/">
        <a>dynamic</a>
      </Link>{' '}
      page.
    </p>
  </div>
)
