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
        title: blog.slug,
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
                <div className="max-w-6xl mx-auto space-y-7 tracking-wider">
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
                        <div className="absolute flex gap-20 bottom-16 left-20 z-20 text-white border-b pb-4">
                            <div className="space-y-3">
                                <h1 className="text-4xl font-bold">{blog.slug}</h1>
                                <div className="text-sm flex items-center gap-5">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={blog.author.image} />
                                        <AvatarFallback>{blog.author.name}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p>By {blog.author.name}</p>
                                        <p>{blog.author.date}</p>
                                    </div>
                                </div>
                            </div>
                            <ShareButton title={blog.slug} url={`http://localhost:3000/blog/${blog.slug}`} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold">{blog.secondTitle}</h2>
                    <p>{blog.firstPara}</p>
                    <p>{blog.secondPara}</p>

                    <h3 className="text-xl font-semibold">{blog.thirdTitle}</h3>
                    <p>{blog.thirdPara}</p>
                    <p>{blog.fourthPara}</p>

                    <Image
                        src={blog.secondImage}
                        alt={blog.secondImgDes}
                        width={1000}
                        height={600}
                        className="w-full rounded-md"
                    />
                    <p className="text-sm italic">{blog.secondImgDes}</p>

                    <h3 className="text-xl font-semibold">{blog.fourthTitle}</h3>
                    <p>{blog.fifthPara}</p>
                    <p>{blog.sixthPara}</p>

                    <Image
                        src={blog.thirdImage}
                        alt={blog.thirdImgDes}
                        width={1000}
                        height={600}
                        className="w-full rounded-md"
                    />
                    <p className="text-sm italic">{blog.thirdImgDes}</p>

                    <h3 className="text-xl font-semibold">{blog.fifthTitle}</h3>
                    <p>{blog.seventhPara}</p>
                    <p>{blog.eighthPara}</p>
                    <p>{blog.ninethPara}</p>
                    <p>{blog.endingPara}</p>

                    <Link href="/blog">
                        <Button className="cursor-pointer w-40 h-12 text-lg">Back To Blog</Button>
                    </Link>
                </div>
            </section>
        </main>
    );
}
