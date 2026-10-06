import { useState, type FormEvent } from "react";
import { CheckCircle2, MessageCircle, MessagesSquare, Phone } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import Sheet from "./Sheet";
import { contact } from "../data/mockData";
import type { Product } from "../types";

interface Props {
  product: Product;
  cityName?: string;
}

const field =
  "h-12 w-full rounded-xl border border-line bg-white px-4 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10";

export default function ContactActions({ product, cityName }: Props) {
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(
    `Bonjour, je souhaite connaître le délai pour « ${product.name} » (Réf. ${product.ref})${
      cityName ? ` à ${cityName}` : ""
    }.`,
  );

  const close = () => {
    setOpen(false);
    setSent(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
    }, 1100);
  };

  const waText = encodeURIComponent(
    `Bonjour, je souhaite des informations sur « ${product.name} » (Réf. ${product.ref}).`,
  );

  return (
    <>
      <div className="flex flex-col gap-3">
        <PrimaryButton icon={<MessagesSquare className="h-5 w-5" />} onClick={() => setOpen(true)}>
          Contacter le magasinier
        </PrimaryButton>
        <PrimaryButton
          variant="danger-outline"
          icon={<Phone className="h-5 w-5" />}
          href={contact.phoneHref}
        >
          Appeler
        </PrimaryButton>
        <PrimaryButton
          variant="success-outline"
          icon={<MessageCircle className="h-5 w-5" />}
          href={`${contact.whatsappHref}?text=${waText}`}
          external
        >
          WhatsApp
        </PrimaryButton>
      </div>

      {open && (
        <Sheet title={sent ? "Demande envoyée" : "Contacter le magasinier"} onClose={close}>
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <CheckCircle2 className="h-14 w-14 text-emerald-500" />
              <p className="text-sm text-muted">
                Merci {name || ""}. Notre magasinier vous rappelle sous 2 heures ouvrées pour
                confirmer le délai d’approvisionnement.
              </p>
              <div className="mt-2 w-full">
                <PrimaryButton onClick={close}>Fermer</PrimaryButton>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3">
              <input
                className={field}
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
              />
              <input
                className={field}
                placeholder="Téléphone (ex : 06 12 34 56 78)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                required
                autoComplete="tel"
              />
              <textarea
                className={`${field} h-28 resize-none py-3`}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <PrimaryButton loading={sending} chevron>
                Envoyer ma demande
              </PrimaryButton>
            </form>
          )}
        </Sheet>
      )}
    </>
  );
}
