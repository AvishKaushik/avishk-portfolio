"use client";

import { motion } from "framer-motion";
import { CheckCircle, Award, ShieldCheck } from "lucide-react";

type Item = {
  title: string;
  description: string;
  icon?: React.ReactNode;
};

const achievements: Item[] = [
  {
    title: "Reply Code Challenge 2021",
    description: "Global Rank 363, India Rank 73",
    icon: <Award className="text-yellow-400" />,
  },
  {
    title: "Google HashCode 2021",
    description: "International Rank 2282, India Rank 495",
    icon: <Award className="text-blue-400" />,
  },
  {
    title: "DeCipher IEM 2019",
    description: "International Rank 39",
    icon: <Award className="text-green-400" />,
  },
  {
    title: "Quicky Sudoku Quiz 2016",
    description: "National Rank 1 (Aakash Institute)",
    icon: <Award className="text-pink-400" />,
  },
];

const certifications: Item[] = [
  {
    title: "AWS Cloud Practitioner",
    description: "Amazon Web Services",
    icon: <ShieldCheck className="text-orange-400" />,
  },
  {
    title: "Docker & Kubernetes Essentials",
    description: "Udemy / Coursera",
    icon: <ShieldCheck className="text-blue-300" />,
  },
  {
    title: "Machine Learning",
    description: "Stanford by Andrew Ng (Coursera)",
    icon: <ShieldCheck className="text-teal-300" />,
  },
];

export default function AchievementsSection() {
  return (
    <section
      id="achievements"
      className="py-24 px-6 md:px-12 bg-background text-foreground"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-3xl md:text-5xl font-bold text-center mb-16"
      >
        Achievements & Certifications
      </motion.h2>

      {/* Achievements Grid */}
      <div className="mb-16">
        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold mb-6"
        >
          🏆 Achievements
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-6">
          {achievements.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-4 p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition"
            >
              {item.icon || <CheckCircle className="text-primary" />}
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certifications Grid */}
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-xl font-semibold mb-6"
      >
        📜 Certifications
      </motion.h3>

      <div className="grid md:grid-cols-2 gap-6">
        {certifications.map((cert, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4 p-5 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            {cert.icon || <CheckCircle className="text-primary" />}
            <div>
              <p className="font-medium">{cert.title}</p>
              <p className="text-sm text-muted-foreground">
                {cert.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
