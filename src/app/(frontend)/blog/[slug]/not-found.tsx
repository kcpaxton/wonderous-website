import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="blog-page blog-not-found">
      <span aria-hidden="true">✦</span>
      <p className="blog-eyebrow">A page out of place</p>
      <h1>That story is still hidden in the library.</h1>
      <p>The post may have moved, or the chapter has not been published yet.</p>
      <Link href="/blog">Return to the blog</Link>
    </div>
  )
}
