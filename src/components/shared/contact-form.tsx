"use client";

import React, { useRef, useEffect, useState } from "react";
import { useContact } from "@/lib/contact-context";
import { X } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

import { User, Mail, ComputerIcon, MessageCircle } from "lucide-react";
import { toast } from "sonner";

const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  service: z.enum(["design", "website", "seo", "other"], {
    required_error: "Please select a service",
  }),
  message: z.string().min(10, { message: "Minimum 10 characters required" }),
});

export default function ContactForm() {
  const { isContactOpen, setIsContactOpen } = useContact();
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactTimeline = useRef<gsap.core.Timeline | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);

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

  const onSubmit = async (data: z.infer<typeof contactFormSchema>) => {
    setIsSendingMessage(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        contactForm.reset();
      } else {
        toast.error("Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setIsSendingMessage(false);
      setIsContactOpen(false);
    }
  };

  useGSAP(() => {
    contactTimeline.current = gsap
      .timeline({ paused: true })
      .to(contactFormRef.current, {
        x: -100,
        duration: 0.8,
        ease: "power3.out",
        visibility: "visible",
      });
  }, []);

  useEffect(() => {
    if (isContactOpen) {
      gsap.to(contactFormRef.current, {
        x: 0,
        autoAlpha: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(contactFormRef.current, {
        x: "-100%",
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.in",
      });
    }
  }, [isContactOpen]);

  return (
    <div
      ref={contactFormRef}
      className="fixed py-10 lg:py-0 md:h-screen place-content-center right-0 top-0 w-full lg:w-[40%] bg-black z-[999] backdrop-blur-2xl pt-20 px-5 lg:pl-14 lg:pr-5 contact_form invisible"
    >
      <h2 className="text-4xl lg:text-6xl font-bold text-white">
        Get In Touch
      </h2>
      <div
        className="absolute top-[5%] right-[5%] lg:right-[10%]"
        onClick={() => setIsContactOpen(false)}
      >
        <X className="h-8 w-8 p-1 rounded-full bg-white/60 text-black cursor-pointer z-50" />
      </div>

      <Form {...contactForm}>
        <form
          onSubmit={contactForm.handleSubmit(onSubmit)}
          className="space-y-6 mt-10 bg-black"
        >
          <div className="flex flex-col lg:flex-row items-center gap-3 w-full justify-between">
            <FormField
              control={contactForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-white text-lg flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Name*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      className="bg-[#121212] tracking-wider h-12 border border-white/20 text-white placeholder:text-white/40 w-full rounded-xs"
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
                <FormItem className="w-full ">
                  <FormLabel className="text-white text-lg flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email*
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@mail.com"
                      {...field}
                      className="bg-[#121212] tracking-wider !lowercase h-12 border border-white/20 text-white placeholder:text-white/40 w-full rounded-xs"
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
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3"
                  >
                    {serviceOptions.map((option) => (
                      <FormItem key={option.value}>
                        <FormLabel
                          htmlFor={option.value}
                          className="border border-white/20 rounded-md p-4 flex items-center gap-3 hover:border-white/40 transition-colors text-white text-lg cursor-pointer"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="w-5 h-5 cursor-pointer border-white/20 data-[state=checked]:bg-white data-[state=checked]:text-black data-[state=checked]:border-white"
                          />
                          <span className="capitalize">{option.label}</span>
                        </FormLabel>
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
                    placeholder="Tell me more about your project. Don't hesitate to include links if necessary."
                    {...field}
                    className="border tracking-wider bg-[#121212] border-white/20 text-white placeholder:text-white/40 min-h-[150px] rounded-none"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="">
            <Button
              variant="outline"
              type="submit"
              disabled={isSendingMessage}
              className="text-white px-6 py-3 rounded-md uppercase font-bold hover:bg-transparent hover:text-white transition cursor-pointer w-full lg:w-auto"
            >
              {isSendingMessage ? "Sending" : "Send Message"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
