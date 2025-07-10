"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Coffee } from "lucide-react";
import Link from "next/link";

export default function ContactSection() {
  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:avish.kaushik@gwu.edu",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/avishkaushik",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/avishkaushik",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 px-6 md:px-12 bg-background text-foreground border-t border-white/10"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-12"
      >
        Let&apos;s Connect
      </motion.h2>

      {/* Contact Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex justify-center gap-4 flex-wrap text-sm md:text-base mb-8"
      >
        {contactLinks.map(({ icon, label, href }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all"
            data-cursor="pointer"
          >
            {icon}
            <span>{label}</span>
          </Link>
        ))}
      </motion.div>

      {/* Buy Me A Coffee */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
        className="flex justify-center mb-8"
      >
        <Link
          href="https://www.buymeacoffee.com/avishkaushik"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 rounded-full border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-black transition-all"
          data-cursor="pointer"
        >
          <Coffee className="w-5 h-5" />
          Buy Me a Coffee
        </Link>
      </motion.div>

      {/* Footer Info */}
      <div className="text-center text-sm text-muted-foreground space-y-2">
        <p>
          Made with <span className="text-red-500">❤</span> by Avish Kaushik
        </p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </div>
    </section>
  );
}
