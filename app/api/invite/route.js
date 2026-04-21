import { Resend } from 'resend';

export async function POST(req) {
  try {
    if (!process.env.RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined in environment variables.");
    }
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { toEmail, fromEmail } = await req.json();

    const { data, error } = await resend.emails.send({
      from: 'Nexus Finance <onboarding@resend.dev>',
      to: [toEmail],
      subject: '[Nexus Finance] Você foi convidado para o Elo Familiar 💎',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #000; color: #fff; padding: 40px; border-radius: 20px;">
          <h1 style="color: #adff2f; font-size: 24px; text-transform: uppercase;">Nexus Finance | Elo Familiar</h1>
          <p style="font-size: 16px; line-height: 1.5;">Olá!</p>
          <p style="font-size: 16px; line-height: 1.5;">O usuário <strong>${fromEmail}</strong> convidou você para unir forças no controle financeiro soberano do Nexus Finance.</p>
          <div style="margin: 30px 0;">
            <a href="https://nexus-family-finance.vercel.app/" style="background-color: #adff2f; color: #000; padding: 15px 25px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 14px; text-transform: uppercase;">Aceitar Convite & Acessar Dashboard</a>
          </div>
          <p style="font-size: 12px; color: #666; margin-top: 40px;">Se você não esperava por este convite, pode ignorar este e-mail.</p>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
          <p style="font-size: 10px; color: #444; text-align: center; text-transform: uppercase;">Nexus v1.6.5 Sovereign Edition</p>
        </div>
      `,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
