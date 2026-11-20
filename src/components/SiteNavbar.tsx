import Link from 'next/link'

export function SiteNavbar() {
  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <Link href="/" className="site-navbar-link">
        Home
      </Link>
      <Link href="/blog" className="site-navbar-link">
        Blog
      </Link>
    </nav>
  )
}
