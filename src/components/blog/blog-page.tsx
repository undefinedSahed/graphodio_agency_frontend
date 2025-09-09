import { blogs } from '@/lib/constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ShareButton from './share-button'
import { slugify } from '@/lib/utils'

export default function BlogPage() {
  return (
    <section className="py-8 lg:py-32">
      <div className='container'>
        <ul className='space-y-9'>
          {
            blogs.map((blog, idx) => (
              <li key={idx} className='group relative'>
                <div className='grid lg:grid-cols-3 grid-cols-1 lg:gap-5 gap-y-4 items-center'>
                  <div className="col-span-2 order-2 lg:order-1 flex justify-between relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#646464] after:z-10 before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 group-hover:before:w-full before:duration-500 before:h-0.5 before:bg-blue-500 pb-4 before:z-20">
                    <Link href={`/blog/${slugify(blog.slug)}`}>
                      <div className="lg:w-[10%]">
                        <h4>{idx + 1}.</h4>
                      </div>
                    </Link>
                    <Link href={`/blog/${slugify(blog.slug)}`}>
                      <div className="lg:w-[70%] w-[80%] lg:space-y-5 space-y-2">
                        <h1 className='lg:text-3xl text-base font-[Roboto]'>{blog.title}</h1>
                        <div className="text-xs lg:text-base">
                          <h2>{blog.author.name}</h2>
                          <p>{blog.author.date}</p>
                        </div>
                      </div>
                    </Link>
                    <div className="w-[10%]">
                      <ShareButton title={blog.slug} url={`http://localhost:3000/blog/${blog.slug}`} />
                    </div>
                  </div>
                  <div className="col-span-1 order-1 lg:order-2 flex-1 lg:absolute top-1/2 right-0 lg:-translate-y-1/2 max-w-md font-[Roboto] ">
                    <Link href={`/blog/${slugify(blog.slug)}`}>
                      <Image
                        src={blog.thumbnail}
                        alt={blog.slug}
                        height={1000}
                        width={1000}
                        className="w-full aspect-video object-cover rounded-md lg:scale-0 lg:group-hover:scale-100 duration-500"
                      />
                    </Link>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}
