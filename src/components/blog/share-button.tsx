'use client' // needed because this uses a browser-only API

import { Share2 } from 'lucide-react'
import { Button } from '../ui/button';

export default function ShareButton({ title, url }: { title: string, url: string }) {
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    url: url,
                });
            } catch (error) {
                console.error('Share failed:', error);
            }
        } else {
            alert('Sharing is not supported in your browser.');
        }
    }

    return (
        <div className="flex items-end cursor-pointer">
            <Button
                onClick={handleShare}
                className="h-10 w-10 rounded-full border flex justify-center items-center cursor-pointer"
                title="Share this post"
            >
                <Share2 />
            </Button>
        </div>
    );
}
