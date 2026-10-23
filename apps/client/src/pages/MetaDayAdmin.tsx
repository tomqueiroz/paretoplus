import { useCallback, useEffect, useMemo, useState } from "react";
import { Eye, EyeOff, MailCheck, RefreshCw, Search, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { RequireAdmin } from "@/components/auth/AdminGuard";
import { RequireVerifiedEmail } from "@/components/auth/route-guards";
import { apiFetch } from "@/lib/api";
import { ROUTE_PATHS } from "@/lib/index";

type Rsvp = {
  id: string;
  fullName: string;
  maskedCpf: string;
  company: string;
  jobTitle: string;
  email: string;
  whatsapp: string;
  institutionalPartner: string;
  submittedAt: string;
  receiptEmailStatus: string;
  adminNotificationStatus: string;
};

type ClaimState = "claiming" | "ready" | "denied" | "error";

function readEnvelope<T>(value: unknown): T | null {
  const envelope = value as { ok?: boolean; data?: T } | null;
  return envelope?.ok && envelope.data ? envelope.data : null;
}

function formatCpf(cpf: string) {
  return cpf
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}

function formatWhatsapp(value: string) {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11) {
    return digits.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  }
  return digits.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
}

function formatSubmittedAt(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    dateStyle: "short",
    timeStyle: "short"
  }).format(new Date(value));
}

function statusLabel(status: string) {
  if (status === "sent") return "Enviado";
  if (status === "failed") return "Falhou";
  if (status === "provider_unavailable") return "Aguardando provedor";
  return "Pendente";
}

function MetaDayRsvpList() {
  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [revealedCpfs, setRevealedCpfs] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadRsvps = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await apiFetch("/meta-day-rsvps");
      const body = await response.json().catch((): null => null);
      const data = readEnvelope<{ rsvps: Rsvp[] }>(body);
      if (!response.ok || !data) {
        throw new Error("Não foi possível carregar as inscrições.");
      }
      setRsvps(data.rsvps);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível carregar as inscrições.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadRsvps();
  }, [loadRsvps]);

  const filteredRsvps = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    if (!normalized) return rsvps;
    return rsvps.filter((rsvp) =>
      [rsvp.fullName, rsvp.company, rsvp.jobTitle, rsvp.email, rsvp.institutionalPartner]
        .some((value) => value.toLocaleLowerCase("pt-BR").includes(normalized))
    );
  }, [query, rsvps]);

  const toggleCpf = async (rsvp: Rsvp) => {
    if (revealedCpfs[rsvp.id]) {
      setRevealedCpfs((current) => {
        const next = { ...current };
        delete next[rsvp.id];
        return next;
      });
      return;
    }

    const response = await apiFetch(`/meta-day-rsvps/${rsvp.id}/cpf`);
    const body = await response.json().catch((): null => null);
    const data = readEnvelope<{ cpf: string }>(body);
    if (response.ok && data?.cpf) {
      setRevealedCpfs((current) => ({ ...current, [rsvp.id]: data.cpf }));
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f6f3] px-4 pb-20 pt-28 text-[#241f1a] sm:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-8 flex flex-col gap-5 rounded-2xl bg-[#13100c] p-6 text-white shadow-xl sm:p-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-[#cbec2e]">
              <ShieldCheck size={16} />
              Área administrativa protegida
            </div>
            <h1 className="font-['Space_Grotesk'] text-3xl font-semibold tracking-tight sm:text-4xl">
              Inscritos — PARETO + META DAY
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/65">
              Dados restritos à organização do evento. O CPF permanece mascarado até a consulta individual.
            </p>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <Users className="text-[#cbec2e]" size={22} />
            <div>
              <div className="text-2xl font-bold">{rsvps.length}</div>
              <div className="text-xs text-white/55">solicitações recebidas</div>
            </div>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8a8278]" size={18} />
            <span className="sr-only">Buscar inscrições</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nome, empresa, cargo, e-mail ou entidade"
              className="h-12 w-full rounded-xl border border-[#ddd7cf] bg-white pl-11 pr-4 text-sm outline-none transition focus:border-[#8a8278] focus:ring-2 focus:ring-[#cbec2e]/40"
            />
          </label>
          <button
            type="button"
            onClick={() => void loadRsvps()}
            disabled={loading}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#13100c] px-5 text-sm font-semibold text-[#cbec2e] transition hover:bg-[#241f1a] disabled:cursor-wait disabled:opacity-60"
          >
            <RefreshCw size={17} className={loading ? "animate-spin" : ""} />
            Atualizar
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-[#ddd7cf] bg-white shadow-sm">
          {loading ? (
            <div className="flex min-h-64 items-center justify-center text-sm text-[#8a8278]">
              Carregando inscrições…
            </div>
          ) : filteredRsvps.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-6 text-center">
              <MailCheck className="mb-4 text-[#8a8278]" size={34} />
              <h2 className="text-lg font-semibold">Nenhuma inscrição encontrada</h2>
              <p className="mt-2 text-sm text-[#8a8278]">
                {rsvps.length === 0
                  ? "As novas solicitações aparecerão aqui assim que forem enviadas."
                  : "Ajuste os termos da busca para localizar o participante."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1180px] border-collapse text-left text-sm">
                <thead className="bg-[#f8f6f3] text-xs uppercase tracking-wide text-[#6b645c]">
                  <tr>
                    <th className="px-5 py-4">Participante</th>
                    <th className="px-5 py-4">Empresa / cargo</th>
                    <th className="px-5 py-4">Contato</th>
                    <th className="px-5 py-4">Entidade</th>
                    <th className="px-5 py-4">CPF</th>
                    <th className="px-5 py-4">Recebida em</th>
                    <th className="px-5 py-4">Notificações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eee9e2]">
                  {filteredRsvps.map((rsvp) => {
                    const revealedCpf = revealedCpfs[rsvp.id];
                    return (
                      <tr key={rsvp.id} className="align-top hover:bg-[#fcfbf9]">
                        <td className="px-5 py-5 font-semibold text-[#13100c]">{rsvp.fullName}</td>
                        <td className="px-5 py-5">
                          <div className="font-medium">{rsvp.company}</div>
                          <div className="mt-1 text-xs text-[#8a8278]">{rsvp.jobTitle}</div>
                        </td>
                        <td className="px-5 py-5">
                          <a className="block text-[#241f1a] underline-offset-2 hover:underline" href={`mailto:${rsvp.email}`}>
                            {rsvp.email}
                          </a>
                          <a
                            className="mt-1 block text-xs text-[#6b645c] underline-offset-2 hover:underline"
                            href={`https://wa.me/55${rsvp.whatsapp}`}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {formatWhatsapp(rsvp.whatsapp)}
                          </a>
                        </td>
                        <td className="px-5 py-5">{rsvp.institutionalPartner}</td>
                        <td className="px-5 py-5">
                          <div className="font-mono text-xs">{revealedCpf ? formatCpf(revealedCpf) : rsvp.maskedCpf}</div>
                          <button
                            type="button"
                            onClick={() => void toggleCpf(rsvp)}
                            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#4a4540] hover:text-[#13100c]"
                            aria-label={revealedCpf ? `Ocultar CPF de ${rsvp.fullName}` : `Mostrar CPF de ${rsvp.fullName}`}
                          >
                            {revealedCpf ? <EyeOff size={14} /> : <Eye size={14} />}
                            {revealedCpf ? "Ocultar" : "Mostrar"}
                          </button>
                        </td>
                        <td className="px-5 py-5 text-xs text-[#6b645c]">{formatSubmittedAt(rsvp.submittedAt)}</td>
                        <td className="px-5 py-5 text-xs">
                          <div>
                            Organização: <strong>{statusLabel(rsvp.adminNotificationStatus)}</strong>
                          </div>
                          <div className="mt-1">
                            Participante: <strong>{statusLabel(rsvp.receiptEmailStatus)}</strong>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="mt-5 text-xs leading-5 text-[#8a8278]">
          O acesso é restrito à conta administrativa autorizada. Não compartilhe ou exporte estes dados sem necessidade operacional.
        </div>
      </div>
    </main>
  );
}

function AdminClaim() {
  const [state, setState] = useState<ClaimState>("claiming");

  const claimAccess = useCallback(async () => {
    setState("claiming");
    try {
      const response = await apiFetch("/admin-access/claim", {
        method: "POST",
        silent: true
      });
      if (response.ok) {
        setState("ready");
        return;
      }
      setState(response.status === 403 ? "denied" : "error");
    } catch {
      setState("error");
    }
  }, []);

  useEffect(() => {
    void claimAccess();
  }, [claimAccess]);

  if (state === "claiming") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f6f3] pt-20">
        <div className="h-9 w-9 animate-spin rounded-full border-2 border-[#13100c] border-t-[#cbec2e]" />
      </div>
    );
  }

  if (state !== "ready") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8f6f3] px-6 pt-20">
        <div className="w-full max-w-lg rounded-2xl border border-[#ddd7cf] bg-white p-8 text-center shadow-lg">
          <ShieldCheck className="mx-auto text-[#8a8278]" size={38} />
          <h1 className="mt-4 text-2xl font-semibold text-[#13100c]">
            {state === "denied" ? "Acesso não autorizado" : "Não foi possível validar o acesso"}
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#6b645c]">
            {state === "denied"
              ? "Esta área é exclusiva para a conta administrativa autorizada do evento."
              : "Tente novamente. Se o problema persistir, entre em contato com o suporte do site."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {state === "error" && (
              <button
                type="button"
                onClick={() => void claimAccess()}
                className="rounded-lg bg-[#13100c] px-5 py-3 text-sm font-semibold text-[#cbec2e]"
              >
                Tentar novamente
              </button>
            )}
            <Link
              to={ROUTE_PATHS.HOME}
              className="rounded-lg border border-[#ddd7cf] px-5 py-3 text-sm font-semibold text-[#241f1a]"
            >
              Voltar ao site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <RequireAdmin>
      <MetaDayRsvpList />
    </RequireAdmin>
  );
}

export default function MetaDayAdmin() {
  return (
    <RequireVerifiedEmail>
      <AdminClaim />
    </RequireVerifiedEmail>
  );
}
