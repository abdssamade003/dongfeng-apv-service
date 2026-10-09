import { Mail, Phone, TriangleAlert } from "lucide-react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import ContactActions from "../components/ContactActions";
import PrimaryButton from "../components/PrimaryButton";
import { StatusPill } from "../components/AvailabilityRow";
import { contact } from "../data/mockData";
import type { City, CityAvailability, Product } from "../types";

interface Props {
  product: Product;
  city: City;
  availability: Record<string, Record<string, CityAvailability>>;
  onBack: () => void;
  onOtherProduct: () => void;
  onNotify: (msg: string) => void;
}

export default function ContactScreen({ product, city, availability, onBack, onOtherProduct, onNotify }: Props) {
  const stock = availability[product.id]?.[city.id];
  const stockQuantity = stock?.qty === undefined
    ? null
    : new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(stock.qty);
  const stockUnit = stock?.unit === "LTR"
    ? "L"
    : stock?.unit === "KLG"
      ? "kg"
      : stock?.unit === "PCS"
        ? stock.qty === 1 ? "pc" : "pcs"
        : stock?.unit;

  return (
    <div className="screen-page no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <Header onBack={onBack} onNotify={onNotify} />

      <main className="mx-auto grid w-full max-w-[1120px] gap-6 px-5 pb-8 pt-3 lg:grid-cols-[minmax(0,.95fr)_minmax(390px,1.05fr)] lg:px-8 lg:pt-6 xl:gap-9">
        <section className="flex flex-col gap-5">
          <div className="rounded-[24px] bg-brand-soft p-5 lg:p-7" role="alert">
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              <TriangleAlert className="h-11 w-11 fill-brand text-white" strokeWidth={1.6} />
              <p className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Agence de {city.name}</p>
            <h1 className="mt-1 text-xl font-extrabold text-brand lg:text-3xl">Sur commande</h1>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-ink/75 lg:text-sm">
            Cette pièce n’est pas disponible immédiatement dans cette agence. Contactez le magasinier pour vérifier le délai ou obtenir une alternative.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 text-xs">
              <span className="font-medium">Statut local</span>{stock ? <StatusPill status={stock.status} /> : <span className="text-brand">Stock inconnu</span>}
            </div>
            {stockQuantity !== null && <p className="mt-2 text-xs text-ink/70">Quantité actuelle : {stockQuantity}{stockUnit ? ` ${stockUnit}` : ""}</p>}
          </div>

          <ProductCard product={product} compact />
          <PrimaryButton variant="outline" onClick={onOtherProduct}>Chercher une autre pièce</PrimaryButton>
        </section>

        <section className="rounded-[24px] border border-line bg-white p-5 shadow-[0_18px_44px_-30px_rgba(15,23,42,.4)] lg:p-7">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Étape 5 · Assistance</p>
          <h2 className="mt-1 text-xl font-extrabold lg:text-2xl">Besoin d’aide ?</h2>
          <p className="mb-5 mt-2 text-[13px] leading-relaxed text-muted lg:text-sm">Contactez directement notre magasinier pour connaître la disponibilité ou passer commande.</p>
          <ContactActions product={product} cityName={city.name} />
        </section>

        <div className="flex items-center gap-4 rounded-2xl bg-surface p-4 md:gap-6 md:rounded-[28px] md:p-6 xl:gap-10 xl:p-8 lg:col-span-2">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center md:h-36 md:w-36 xl:h-56 xl:w-56">
            <img src="/support-agent.png" alt="Support client" className="h-full w-full scale-[1.7] object-contain mix-blend-multiply" />
          </div>
          <div className="min-w-0 text-[13px] leading-relaxed md:text-xl md:leading-snug xl:text-3xl">
            <p className="font-bold">{contact.name}</p>
            <a href={contact.phoneHref} className="flex items-center gap-1.5 hover:text-brand md:gap-3 xl:gap-4"><Phone className="h-3 w-3 shrink-0 md:h-5 md:w-5 xl:h-8 xl:w-8" />{contact.phone}</a>
            <a href={`mailto:${contact.email}`} className="flex items-center gap-1.5 hover:text-brand md:gap-3 xl:gap-4"><Mail className="h-3 w-3 shrink-0 md:h-5 md:w-5 xl:h-8 xl:w-8" />{contact.email}</a>
          </div>
        </div>
      </main>
    </div>
  );
}
