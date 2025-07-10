// utils/commandProcessor.ts
export function processCommand(cmd: string): string[] {
    switch (cmd) {
      case '':
        return [];
      case 'help':
        return [
          'Available commands:',
          '  whoami       → about me',
          '  projects     → list projects',
          '  resume       → download résumé',
          '  contact      → email / links',
          '  clear        → clear screen',
          '  sudo hire_me → 🚀',
        ];
  
      case 'whoami':
        return [
          'Avish Kaushik – full‑stack engineer (Java, Spring Boot, React, AWS) and MS‑CS candidate at George Washington University.',
        ];
  
      case 'projects':
        return [
          '1. IntelliView      – AI‑proctored interview platform',
          '2. DocuGuard AI     – secure document red‑teaming pipeline',
          '3. EduHub          – collaborative study platform',
          'Type `cd <name>` for details (coming soon)',
        ];
  
      case 'resume':
        return [
          'Opening résumé …',
          '[Download](/resume.pdf)',
        ];
  
      case 'contact':
        return [
          '📧  avish@example.com',
          '🔗  linkedin.com/in/avish',
          '🐙  github.com/avish‐portfolio',
        ];
  
      case 'clear':
        return ['__CLEAR__']; // handled in TerminalShell later if you like
  
      case 'sudo hire_me':
        return ['Permission granted. HR portal launching… 🚀'];
  
      default:
        return [`command not found: ${cmd}`, 'Type `help` to list commands.'];
    }
  }
  