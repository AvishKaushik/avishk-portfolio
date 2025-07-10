export default function cat({ args }: { args: string[] }) {
    const [file] = args;
    const contentMap: Record<string, string> = {
      "about.txt": "Hi! I'm Avish Kaushik — software engineer and builder of cool things.",
      "contact.txt": "Email: avish@example.com | GitHub: github.com/avishkaushik | LinkedIn: linkedin.com/in/avishkaushik",
      "education/school.txt": "St. Theresa School — 12th Grade — 84.8%",
      "education/college.txt": "VIT Bhopal — B.Tech CSE — 9.06 CGPA",
      "education/masters.txt": "George Washington University — MS CS — GPA 3.9",
      "experience/societe.txt": "Societe Generale — Software Engineer — Jul 2021 to Jul 2024",
      "experience/personal.txt": "Built GenAI pipelines, Phaser game, and more",
      "projects/eduhub.txt": "EduHub: Learning platform for universities.",
      "projects/docuguard.txt": "DocuGuard: AI-secure doc pipeline using Claude + S3 + Lambda.",
      "projects/intelliview.txt": "Intelliview: Mock interview platform with skill analytics.",
    };
    return contentMap[file] || `cat: cannot read file: ${file}`;
  }
  