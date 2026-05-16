/**
 * Welcome notifications. Dev mode = log to console.
 * To wire a real provider later, replace the bodies of sendWelcomeEmail / sendWelcomeSms.
 */

interface WelcomeTarget {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

const banner = (lines: string[]) => {
  const width = Math.max(60, ...lines.map((l) => l.length));
  const bar = "═".repeat(width);
  console.log("\n" + bar);
  for (const l of lines) console.log(l);
  console.log(bar + "\n");
};

export async function sendWelcomeEmail(user: WelcomeTarget): Promise<void> {
  if (!user.email) return;
  const greeting = user.name ? `Bonjour ${user.name}` : "Bonjour";
  banner([
    `[WELCOME EMAIL] To: ${user.email}`,
    `Subject: Bienvenue sur Lekajio Software 🎉`,
    "",
    `${greeting},`,
    "",
    `Bienvenue sur Lekajio Software. Votre compte est créé.`,
    `Découvrez nos VPN, logiciels, outils et IA sur http://localhost:3000`,
    "",
    `À très vite,`,
    `L'équipe Lekajio`,
  ]);
  // TODO: branch a real provider (Resend, SendGrid, SMTP) here.
}

export async function sendWelcomeSms(user: WelcomeTarget): Promise<void> {
  if (!user.phone) return;
  const greeting = user.name ? user.name : "à toi";
  banner([
    `[WELCOME SMS] To: ${user.phone}`,
    `Bienvenue sur Lekajio Software, ${greeting} ! Ton compte est actif.`,
    `Logiciels, VPN, outils & IA → http://localhost:3000`,
  ]);
  // TODO: branch Twilio/Vonage/etc here.
}

export async function sendWelcome(user: WelcomeTarget): Promise<void> {
  await Promise.allSettled([sendWelcomeEmail(user), sendWelcomeSms(user)]);
}
