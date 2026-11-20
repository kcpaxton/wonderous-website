import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-content">
        <Link href="/" className="site-footer-brand">
          The Wonderous Storybook
        </Link>
        <nav aria-label="Footer navigation" className="site-footer-nav">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </nav>
        <p>&copy; {new Date().getFullYear()} The Wonderous Storybook</p>
      </div>
    </footer>
  )
}
