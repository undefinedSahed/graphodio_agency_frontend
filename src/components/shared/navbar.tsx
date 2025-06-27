"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import { Button } from "../ui/button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constant";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Input } from "../ui/input";
import { ComputerIcon, Mail, MessageCircle, User, X } from "lucide-react";

export const contactFormSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    service: z.enum(["design", "website", "seo", "other"], {
        required_error: "Please select a service",
    }),
    message: z.string().min(10, {
        message: "Please enter a message with at least 10 characters",
    }),
});

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef(null);
    const contactFormRef = useRef(null);
    const contactTimeline = useRef<gsap.core.Timeline | null>(null);

    // Animate nav links
    useGSAP(() => {
        gsap.fromTo(
            ".element",
            {
                y: -100,
                opacity: 0,
                visibility: "hidden",
            },
            {
                y: 0,
                opacity: 1,
                visibility: "visible",
                delay: 1.5,
                duration: 1,
                ease: "power3.out",
                stagger: { amount: 0.5, from: "start" },
            }
        );
    }, { scope: navRef });



    useGSAP(() => {
        contactTimeline.current = gsap.timeline({ paused: true }).to(
            contactFormRef.current,
            {
                x: 0,
                duration: 0.8,
                ease: "power3.out",
            }
        );
    }, []);

    const handleOpenContactForm = () => {
        contactTimeline.current?.play();
    };

    const handleCloseContactForm = () => {
        contactTimeline.current?.reverse();
    };

    const contactForm = useForm<z.infer<typeof contactFormSchema>>({
        resolver: zodResolver(contactFormSchema),
        defaultValues: {
            name: "",
            email: "",
            service: "website",
            message: "",
        },
    });

    const serviceOptions = [
        { value: "design", label: "Design" },
        { value: "website", label: "Website" },
        { value: "seo", label: "SEO" },
        { value: "other", label: "Other" },
    ];

    const onSubmitContact = (data: z.infer<typeof contactFormSchema>) => {
        console.log(data);
    };

    return (
        <header className="overflow-x-hidden">
            <nav className="py-3">
                <div className="container text-white/40 text-lg">
                    <div
                        className="nav-wrapper flex justify-between items-center"
                        ref={navRef}
                    >

                        <div className="element invisible">
                            <Image
                                src="/images/logo-full.png"
                                alt="logo"
                                width={500}
                                height={300}
                                className="w-40 h-16 object-contain"
                            />
                        </div>

                        {/* Nav Links */}
                        <div className="element uppercase invisible lg:-ml-16">
                            <ul className="flex gap-8 items-center">
                                {navLinks.map((link) => {
                                    const isActive = pathname === link.link;
                                    return (
                                        <li key={link.link} className={`${isActive ? "text-white" : ""}`}>
                                            <Link href={link.link}>{link.name}</Link>
                                        </li>
                                    );
                                })}
                                <li onClick={handleOpenContactForm} className="cursor-pointer">
                                    Contact
                                </li>
                            </ul>
                        </div>


                        <div>
                            <Button
                                onClick={handleOpenContactForm}
                                className="uppercase border border-white/20 text-lg cursor-pointer"
                            >
                                Contact
                            </Button>
                        </div>

                        {/* Contact Part */}
                        <div
                            ref={contactFormRef}
                            className="fixed h-svh translate-x-full right-0 top-0 w-[40%] bg-transparent z-50 backdrop-blur-2xl pt-20 pl-20 pr-5 contact_form"
                        >
                            <h2 className="text-6xl font-bold text-white">Get In Touch</h2>
                            <div
                                className="absolute top-[5%] right-[10%]"
                                onClick={handleCloseContactForm}
                            >
                                <X className="h-8 w-8 p-1 rounded-full bg-white/60 text-black cursor-pointer z-50" />
                            </div>

                            <Form {...contactForm}>
                                <form
                                    onSubmit={contactForm.handleSubmit(onSubmitContact)}
                                    className="space-y-6 mt-10"
                                >

                                    <div className="flex items-center gap-3 w-full justify-between">
                                        <FormField
                                            control={contactForm.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white text-lg flex items-center gap-2">
                                                        <User className="w-5 h-5" />
                                                        Name*
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Full Name"
                                                            {...field}
                                                            className="bg-[#121212] h-12 border border-white/20 text-white placeholder:text-white/40 w-60 rounded-none"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={contactForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-white text-lg flex items-center gap-2">
                                                        <Mail className="w-5 h-5" />
                                                        Email*
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="example@mail.com"
                                                            {...field}
                                                            className="bg-[#121212] h-12 border border-white/20 text-white placeholder:text-white/40 w-60 rounded-none"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>


                                    <FormField
                                        control={contactForm.control}
                                        name="service"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white text-lg flex items-center gap-2">
                                                    <ComputerIcon className="w-5 h-5" />
                                                    Services Needed*
                                                </FormLabel>
                                                <FormControl>
                                                    <RadioGroup
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                        className="grid grid-cols-2 gap-3"
                                                    >
                                                        {serviceOptions.map((option) => (
                                                            <FormItem key={option.value}>
                                                                <div className="border border-white/20 rounded-md p-4 flex items-center gap-3 hover:border-white/40 transition-colors text-white text-lg cursor-pointer">
                                                                    <RadioGroupItem
                                                                        value={option.value}
                                                                        id={option.value}
                                                                        className="w-5 h-5 border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
                                                                    />
                                                                    <FormLabel
                                                                        htmlFor={option.value}
                                                                        className="text-white capitalize cursor-pointer"
                                                                    >
                                                                        {option.label}
                                                                    </FormLabel>
                                                                </div>
                                                            </FormItem>
                                                        ))}
                                                    </RadioGroup>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <FormField
                                        control={contactForm.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-white text-lg flex items-center gap-2">
                                                    <MessageCircle className="w-5 h-5" />
                                                    Message*
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Tell me more about your project. Don’t hesitate to include links if necessary."
                                                        {...field}
                                                        className="bg-[#121212] border border-white/20 text-white placeholder:text-white/40 min-h-[150px] rounded-none"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />


                                    <div>
                                        <Button
                                            variant="outline"
                                            type="submit"
                                            className="text-white px-6 py-3 rounded-md uppercase font-bold hover:bg-transparent hover:text-white transition cursor-pointer"
                                        >
                                            Send Message
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
