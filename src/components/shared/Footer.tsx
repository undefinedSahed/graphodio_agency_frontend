'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { FaLinkedin, FaFacebook, FaInstagram, FaWhatsapp, FaTwitter } from 'react-icons/fa';
import { useContact } from "@/lib/contact-context"

interface SocialLinkProps {
    href: string;
    label: string;
    Icon: React.ElementType;
}
const SocialLink: React.FC<SocialLinkProps> = ({ href, label, Icon }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="hover:text-gray-800"
    >
        <Icon size={20} />
    </a>
);

const Footer: React.FC = () => {
    const { setIsContactOpen } = useContact();

    useEffect(() => {
        const noiseStyle = document.createElement('style');
        noiseStyle.innerHTML = `
            .noise-effect::before {
                content: "";
                position: absolute;
                opacity: 0.04;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: url('https://cdn.prod.website-files.com/677fb4d34764579513f06df6/678a4ca6053fb371ef1a243a_pf_noise.png');
                pointer-events: none;
                animation: noise-animation 0.4s infinite;
                mix-blend-mode: overlay;
            }

            @keyframes noise-animation {
                0%, 100% { transform: translate(0,0); }
                25% { transform: translate(-5%, 5%); }
                50% { transform: translate(5%, -5%); }
                75% { transform: translate(-5%, -5%); }
            }
        `;
        document.head.appendChild(noiseStyle);
        return () => {
            document.head.removeChild(noiseStyle);
        };
    }, []);

    return (
        <footer className="relative w-full overflow-hidden">
            <div className="noise-effect absolute inset-0 z-0" />
            <div className="relative z-10 text-black flex flex-col bg-white justify-between px-4 md:px-6 py-12 md:py-20 max-w-8xl w-full mx-auto rounded-3xl">
                {/* Top Section */}
                <div className="relative flex flex-col md:flex-row w-full items-center md:h-48 max-md:space-y-10">
                    <div className="flex-1 flex flex-col justify-center max-md:items-center max-md:text-center">
                        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight uppercase whitespace-nowrap max-md:whitespace-normal ">
                            Have a project in mind?
                        </h1>
                        <h1 className="text-6xl md:text-8xl font-extrabold leading-tight uppercase ">
                            Let&apos;s get in touch!
                        </h1>
                    </div>

                    <div className="hidden md:block w-[1px] h-full bg-gray-300 mx-6" />

                    <div className="flex-1 flex flex-col justify-center items-end mt-12 md:mt-0 text-right max-md:items-center max-md:text-center font-[Roboto]">
                        <div className="uppercase text-xs tracking-widest mb-2">Next Page</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">Works</h2>
                        <Link
                            href="/portfolio"
                            className="inline-flex items-center border border-black px-4 py-2 hover:bg-black hover:text-white transition font-[Impact]"
                        >
                            • Discover
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-grey my-6 w-full" />

                {/* Bottom Section */}
                <div className="flex flex-col md:flex-row justify-between w-full items-end gap-8 max-md:items-center">
                    <div className="flex flex-col md:flex-row flex-1 justify-between w-full gap-10 max-md:items-center">
                        {/* Sitemap & Copyright */}
                        <div className="flex flex-col space-y-6 max-md:items-center max-md:text-center font-[Roboto]">
                            <div className="flex flex-col">
                                <span className="uppercase text-gray-500 tracking-widest mb-2">Sitemap</span>
                                <Link href="/" className="hover:underline">Home</Link>
                                <Link href="/portfolio" className="hover:underline">Works</Link>
                                <Link href="/policy" className="hover:underline">Privacy Policy</Link>
                                <Link href="/terms" className="hover:underline">Terms and Conditions</Link>

                                <Link href="/about" className="hover:underline">About</Link>
                                <p className="cursor-pointer hover:underline" onClick={() => setIsContactOpen(true)}>Contact</p>
                            </div>
                            <p className="text-gray-500 text-xs">Graphodio © 2025</p>
                        </div>

                        {/* Social Links & Infos */}
                        <div className="flex flex-col items-end max-md:items-center max-md:text-center">
                            <div className="flex items-center space-x-4 mb-4">
                                <SocialLink href="https://www.linkedin.com/company/graphodio360/ " label="LinkedIn" Icon={FaLinkedin} />
                                <SocialLink href="https://www.facebook.com/Graphodio360" label="Facebook" Icon={FaFacebook} />
                                <SocialLink href="https://www.instagram.com/graphodio360/" label="Instagram" Icon={FaInstagram} />
                                <SocialLink href="https://api.whatsapp.com/send/?phone=8801782060008&text&type=phone_number&app_absent=0" label="whatsapp" Icon={FaWhatsapp} />
                                <SocialLink href="https://www.instagram.com/graphodio360/" label="Twitter" Icon={FaTwitter} />
                            </div>
                            <Link href="/infos" className="hover:underline text-xs font-[Roboto]">
                                Infos & Credits
                            </Link>
                        </div>
                    </div>

                    {/* Logo with interactive animation */}
                    <div className="flex-1 flex justify-end ml-6 mt-6 md:mt-0 max-md:justify-center max-md:ml-0">
                        <div className="w-32 md:w-48 h-32 md:h-48 relative group">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain transform transition duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:animate-bounce"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
