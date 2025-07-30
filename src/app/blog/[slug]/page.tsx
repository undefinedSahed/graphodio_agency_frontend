// File: app/blog/[slug]/page.tsx

import ShareButton from '@/components/blog/share-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { blogs } from '@/lib/constant';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const blog = blogs.find(b => b.slug === decodeURIComponent(resolvedParams.slug));

    if (!blog) return {};

    return {
        title: blog.title,
        description: blog.secondTitle,
        openGraph: {
            images: [blog.thumbnail],
        },
    };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params
    const blog = blogs.find(b => b.slug === decodeURIComponent(resolvedParams.slug));

    if (!blog) return null;

    return (
        <main>
            <section className="pb-8 lg:pb-20">
                <div className="max-w-6xl mx-auto lg:space-y-7 space-y-4 tracking-wider px-2 lg:px-0">
                    <div className="relative">
                        <Image
                            src={blog.thumbnail}
                            alt={blog.slug}
                            width={1000}
                            height={600}
                            className="w-full max-h-screen object-cover rounded-md"
                        />

                        {/* Shadow layer */}
                        <div className="absolute inset-0 rounded-md shadow-[inset_0_-170px_57px_32px_rgba(0,0,0,0.4)] z-10"></div>

                        {/* Text content */}
                        <div className="absolute flex lg:gap-20 lg:bottom-16 bottom-1 lg:left-20 left-4 z-20 text-white border-b lg:pb-4 mr-5 lg:mr-0">
                            <div className="lg:space-y-3 space-y-1">
                                <h1 className="lg:text-4xl text-base font-bold">{blog.title}</h1>
                                <div className="text-sm flex items-center lg:gap-5 gap-2">
                                    <Avatar className="lg:h-12 h-7 w-7 lg:w-12">
                                        <AvatarImage src={blog.author.image} />
                                        <AvatarFallback>{blog.author.name}</AvatarFallback>
                                    </Avatar>
                                    <div className='text-xs lg:text-base'>
                                        <p>By {blog.author.name}</p>
                                        <p>{blog.author.date}</p>
                                    </div>
                                </div>
                            </div>
                            <ShareButton title={blog.slug} url={`http://localhost:3000/blog/${blog.slug}`} />
                        </div>
                    </div>

                    <h2 className="lg:text-2xl text-base font-semibold">{blog.secondTitle}</h2>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.firstPara}</p>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.secondPara}</p>

                    <h3 className="lg:text-xl text-base font-semibold">{blog.thirdTitle}</h3>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.thirdPara}</p>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.fourthPara}</p>

                    <Image
                        src={blog.secondImage}
                        alt={blog.secondImgDes}
                        width={1000}
                        height={600}
                        className="w-full rounded-md"
                    />
                    <p className="text-sm italic">{blog.secondImgDes}</p>

                    <h3 className="lg:text-xl text-base font-semibold">{blog.fourthTitle}</h3>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.fifthPara}</p>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.sixthPara}</p>

                    <Image
                        src={blog.thirdImage}
                        alt={blog.thirdImgDes}
                        width={1000}
                        height={600}
                        className="w-full rounded-md"
                    />
                    <p className="text-sm italic">{blog.thirdImgDes}</p>

                    <h3 className="lg:text-xl text-base font-semibold">{blog.fifthTitle}</h3>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.seventhPara}</p>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.eighthPara}</p>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.ninethPara}</p>
                    <p className='text-xs lg:text-base text-justify lg:text-start'>{blog.endingPara}</p>

                    <Link href="/blog">
                        <Button className="cursor-pointer w-40 h-12 text-lg">Back To Blog</Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
