"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Coffee, Send, Heart } from "lucide-react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RevealText } from "@/components/ui/reveal-text";

export default function ContactSection() {
  const contactLinks = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      href: "mailto:avish.kaushik@gwu.edu",
      color: "hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: "LinkedIn",
      href: "https://linkedin.com/in/avishkaushik",
      color: "hover:border-blue-600 hover:text-blue-500 hover:bg-blue-600/10",
      gradient: "from-blue-600 to-blue-700",
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: "GitHub",
      href: "https://github.com/avishkaushik",
      color: "hover:border-stone-50 hover:text-stone-50 hover:bg-stone-950/10",
      gradient: "from-stone-950 to-stone-950",
    },
  ];

  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-background via-background/95 to-background/50 text-foreground overflow-hidden"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/8 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-2xl animate-pulse delay-1000" />
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-20">
        {/* Enhanced Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <RevealText 
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground/70 bg-clip-text text-transparent"
          >
            Let&apos;s Build Something Amazing
          </RevealText>
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Ready to collaborate on your next project? I&apos;m always excited to work on innovative solutions.
          </motion.p>
        </motion.div>

        {/* Enhanced Contact Buttons with Magnetic Effect */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex justify-center gap-6 flex-wrap"
        >
          {contactLinks.map(({ icon, label, href, color, gradient }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.1 * index,
                ease: [0.16, 1, 0.3, 1]
              }}
              viewport={{ once: true }}
            >
              <MagneticButton
                href={href}
                className={`group relative flex items-center gap-3 px-8 py-5 bg-muted/10 backdrop-blur-md rounded-2xl border border-border/50 transition-all duration-500 hover:shadow-xl hover:shadow-primary/20 ${color} overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <motion.div 
                  className="relative z-10 transition-transform group-hover:scale-110"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {icon}
                </motion.div>
                <span className="relative z-10 font-medium">{label}</span>
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <MagneticButton
              href="mailto:avish.kaushik@gwu.edu"
              className="group relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-medium shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 group-hover:from-primary/90 group-hover:to-primary transition-all duration-300" />
              <motion.div
                className="relative z-10"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">Start a Conversation</span>
            </MagneticButton>
            
            <MagneticButton
              href="https://www.buymeacoffee.com/avishkaushik"
              className="group relative inline-flex items-center justify-center gap-3 border-2 border-yellow-500/50 text-yellow-400 px-10 py-5 rounded-2xl font-medium hover:bg-yellow-500/10 hover:border-yellow-500 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 to-yellow-500/0 group-hover:from-yellow-500/5 group-hover:to-yellow-500/10 transition-all duration-300" />
              <motion.div
                className="relative z-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coffee className="w-5 h-5" />
              </motion.div>
              <span className="relative z-10">Buy Me a Coffee</span>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Enhanced Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="pt-20 border-t border-border/30 space-y-6"
        >
          <motion.p 
            className="text-muted-foreground flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.span>
            by Avish Kaushik
          </motion.p>
          <p className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} All rights reserved. Built with Next.js, Tailwind CSS, and lots of coffee.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
