type ReceiptEmailInput = {
  fullName: string;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function buildMetaDayReceiptEmail(input: ReceiptEmailInput) {
  const firstName = input.fullName.trim().split(/\s+/)[0] || "participante";
  const safeFirstName = escapeHtml(firstName);
  const subject = "Recebemos sua inscrição | PARETO + META DAY";
  const text = [
    `Olá, ${firstName}!`,
    "",
    "Recebemos sua solicitação de inscrição para o PARETO + META DAY.",
    "O encontro acontece em 13 de outubro de 2026, das 13h30 às 18h, e é exclusivo para clientes e convidados Pareto.",
    "Este e-mail confirma apenas o recebimento dos seus dados. O preenchimento do formulário não garante reserva de convite para o evento.",
    "",
    "Após o encerramento do prazo de inscrições, os participantes confirmados receberão por e-mail o RSVP de confirmação.",
    "No dia do evento, será necessário apresentar um documento com o mesmo CPF informado na inscrição para acesso ao edifício da Meta Brasil.",
    "",
    "Em caso de dúvidas, fale com Tom Queiroz:",
    "tom.queiroz@pareto.plus | WhatsApp (11) 91551-3210",
    "",
    "PARETO + META DAY"
  ].join("\n");

  const html = `
    <div style="margin:0;background:#f8f6f3;padding:32px 16px;font-family:Arial,sans-serif;color:#241f1a">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #ddd7cf;border-radius:16px;overflow:hidden">
        <div style="background:#13100c;padding:28px 32px;color:#ffffff">
          <div style="font-size:12px;letter-spacing:.14em;color:#cbec2e;font-weight:700">PARETO + META DAY</div>
          <h1 style="margin:10px 0 0;font-size:28px;line-height:1.15">Recebemos sua inscrição.</h1>
        </div>
        <div style="padding:32px">
          <p style="margin:0 0 18px">Olá, ${safeFirstName}!</p>
          <p style="margin:0 0 18px;line-height:1.65">Recebemos sua solicitação de inscrição para o <strong>PARETO + META DAY</strong>.</p>
          <p style="margin:0 0 18px;line-height:1.65">O encontro acontece em <strong>13 de outubro de 2026</strong>, das <strong>13h30 às 18h</strong>, e é exclusivo para clientes e convidados Pareto.</p>
          <div style="margin:22px 0;padding:18px;border-left:4px solid #cbec2e;background:#f8f6f3;line-height:1.6">
            Este e-mail confirma apenas o recebimento dos seus dados. O preenchimento do formulário não garante reserva de convite para o evento.
          </div>
          <p style="margin:0 0 18px;line-height:1.65">Após o encerramento do prazo de inscrições, os participantes confirmados receberão por e-mail o RSVP de confirmação.</p>
          <p style="margin:0 0 24px;line-height:1.65">No dia do evento, será necessário apresentar um documento com o mesmo CPF informado na inscrição para acesso ao edifício da Meta Brasil.</p>
          <p style="margin:0;line-height:1.65"><strong>Dúvidas?</strong><br>Tom Queiroz<br>tom.queiroz@pareto.plus<br>WhatsApp (11) 91551-3210</p>
        </div>
      </div>
    </div>
  `.trim();

  return { subject, text, html };
}
