import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div>
      <h1>Post not found</h1>
      <Link href="/blog">Back to blog</Link>
    </div>
  )
}
