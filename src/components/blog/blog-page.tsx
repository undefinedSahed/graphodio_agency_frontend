import { blogs } from '@/lib/constant'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ShareButton from './share-button'

export default function BlogPage() {
  return (
    <section className="py-8 lg:py-32">
      <div className='container'>
        <ul className='space-y-9'>
          {
            blogs.map((blog, idx) => (
              <li key={idx} className='group relative'>
                <Link href={`/blog/${blog.slug}`} className='grid grid-cols-3 gap-5 items-center'>
                  <div className="col-span-2 flex justify-between relative after:absolute after:content-[''] after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#646464] after:z-10 before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 group-hover:before:w-full before:duration-500 before:h-0.5 before:bg-blue-500 pb-4 before:z-20">
                    <div className="w-[10%]">
                      <h4>{idx + 1}</h4>
                    </div>
                    <div className="w-[70%] space-y-5">
                      <h1 className='text-3xl'>{blog.slug}</h1>
                      <div className="">
                        <h2>{blog.author.name}</h2>
                        <p>{blog.author.date}</p>
                      </div>
                    </div>
                    <div className="w-[10%]">
                      <ShareButton title={blog.slug} url={`http://localhost:3000/blog/${blog.slug}`} />
                    </div>
                  </div>
                  <div className="col-span-1 flex-1 absolute top-1/2 right-0 -translate-y-1/2 max-w-md">
                    <Image
                      src={blog.thumbnail}
                      alt={blog.slug}
                      height={1000}
                      width={1000}
                      className="w-full aspect-video object-cover rounded-md scale-0 group-hover:scale-100 duration-500"
                    />
                  </div>
                </Link>
              </li>
            ))
          }
        </ul>
      </div>
    </section>
  )
}
