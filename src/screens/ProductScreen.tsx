import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, MessageCircle } from "lucide-react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import AvailabilityRow from "../components/AvailabilityRow";
import { ProductThumb } from "../components/ProductCard";
import { contact } from "../data/mockData";
import type { City, CityAvailability, Product, SelectedVehicle } from "../types";

interface Props {
  product: Product;
  vehicle: SelectedVehicle;
  cities: City[];
  availability: Record<string, Record<string, CityAvailability>>;
  dataError: string | null;
  dataLoading: boolean;
  onBack: () => void;
  onOtherProduct: () => void;
  onUnavailable: (city: City) => void;
  onNotify: (msg: string) => void;
}

export default function ProductScreen({ product, vehicle, cities, availability, dataError, dataLoading, onBack, onOtherProduct, onUnavailable, onNotify }: Props) {
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  useEffect(() => { const t = window.setTimeout(() => setLoading(false), 700); return () => window.clearTimeout(t); }, []);

  const stock = dataError || dataLoading
    ? undefined
    : availability[product.itemCode?.trim().toUpperCase() ?? product.id]
      ?? Object.fromEntries(cities.map((city) => [city.id, { qty: 0, status: "out" as const }]));
  const pick = (city: City) => {
    if (dataError || dataLoading) {
      onNotify(dataError ? "Disponibilité temporairement indisponible" : "Chargement des disponibilités en cours.");
      return;
    }
    const a = stock?.[city.id];
    if (!a) {
      onNotify("Le stock de cette pièce n’est pas disponible pour cette agence.");
      return;
    }
    setSelected(city.id);
    if (a.status === "available") return;
    setBusy(city.id);
    window.setTimeout(() => { setBusy(null); onUnavailable(city); }, 450);
  };
  const selectedCity = cities.find((c) => c.id === selected);
  const selectedStock = selectedCity ? stock?.[selectedCity.id] : undefined;
  const selectedQuantity = selectedStock?.qty === undefined
    ? null
    : new Intl.NumberFormat("fr-MA", { maximumFractionDigits: 2 }).format(selectedStock.qty);
  const selectedUnit = selectedStock?.unit === "LTR"
    ? "L"
    : selectedStock?.unit === "KLG"
      ? "kg"
      : selectedStock?.unit === "PCS"
        ? selectedStock.qty === 1 ? "pc" : "pcs"
        : selectedStock?.unit;
  return (
    <div className="screen-page no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <Header onBack={onBack} onNotify={onNotify} />

      <main className="mx-auto grid w-full max-w-[1180px] gap-6 px-5 pb-8 pt-3 lg:grid-cols-[minmax(0,.9fr)_minmax(430px,1.1fr)] lg:px-8 lg:pt-6 xl:gap-9">
        <section className="min-w-0">
          <ProductThumb product={product} className="h-56 w-full rounded-[24px] lg:h-[330px]" />
          <div className="mt-5">
            <p className="hidden text-xs font-extrabold uppercase tracking-[0.18em] text-brand lg:block">Fiche pièce</p>
            <h1 className="mt-1 text-[22px] font-extrabold leading-tight tracking-tight lg:text-3xl">{product.name}</h1>
            <p className="mt-1 text-[13px] text-muted">Réf. {product.ref}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tags.map((t, i) => <span key={t} className={`rounded-full px-3 py-1 text-xs font-semibold ${i === 0 ? "bg-brand-soft text-brand" : "bg-surface text-ink/80"}`}>{t}</span>)}
            </div>
          </div>

          <section className="mt-6 rounded-2xl border border-line p-4 lg:p-5">
            <h2 className="mb-2 text-[15px] font-bold">Compatibilité</h2>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-emerald-500" strokeWidth={1.8} />
              <div><p className="text-sm font-semibold">{vehicle.name} {vehicle.year}</p><p className="text-xs text-muted">{vehicle.engine}</p></div>
            </div>
            {(product.position || product.note) && (
              <>
                <button type="button" onClick={() => setDetails((d) => !d)} aria-expanded={details} className="mt-3 inline-flex items-center gap-1 rounded-full bg-brand-soft px-3 py-1 text-xs font-semibold text-brand transition active:scale-95">
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${details ? "rotate-180" : ""}`} />
                  {details ? "Masquer les détails" : "Voir plus de détails"}
                </button>
                {details && (
                  <dl className="anim-fade mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 rounded-xl bg-surface p-3 text-xs">
                    {product.position && <><dt className="text-muted">Position</dt><dd className="font-medium">{product.position}</dd></>}
                    {product.note && <><dt className="text-muted">Caractéristiques</dt><dd className="font-medium">{product.note}</dd></>}
                  </dl>
                )}
              </>
            )}
          </section>
        </section>

        <section className="flex min-w-0 flex-col rounded-[24px] bg-surface/70 p-4 lg:p-6">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">Étape 4 · Stock agence</p>
            <h2 className="mt-1 text-xl font-extrabold lg:text-2xl">Disponibilité par ville</h2>
            <p className="mt-1 text-sm text-muted">Stock supérieur à 1 : disponible. À 1 ou moins : sélectionnez l’agence pour contacter le magasinier.</p>
            {(dataError || dataLoading) && (
              <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm text-amber-900" role="status">
                {dataError ? "Disponibilité temporairement indisponible" : "Chargement des disponibilités…"}
              </p>
            )}
          </div>

          <div className="mt-5 rounded-2xl bg-white p-2 shadow-sm">
            {loading || dataLoading ? (
              <div className="flex flex-col gap-2 p-1" aria-busy="true">{cities.map((c) => <div key={c.id} className="skeleton h-[56px] rounded-xl" />)}</div>
            ) : (
              <div className="anim-fade flex flex-col divide-y divide-line/70">
                {cities.map((c) => (
                  <div key={c.id} className="py-0.5">
                    {dataError ? (
                      <p className="px-3 py-3 text-sm text-amber-800">Disponibilité temporairement indisponible</p>
                    ) : stock?.[c.id] ? (
                      <AvailabilityRow city={c} availability={stock[c.id]} selected={selected === c.id} busy={busy === c.id} onClick={() => pick(c)} />
                    ) : (
                      <p className="px-3 py-3 text-sm text-red-700" role="alert">Stock indisponible pour l’agence {c.name}.</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedCity && selectedStock?.status === "available" && (
            <div className="anim-fade mt-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4">
              <p className="text-sm font-semibold">{selectedCity.agency}</p>
              <p className="mt-0.5 text-xs text-muted">{selectedCity.address}</p>
              <p className="text-xs text-muted">{selectedCity.hours}</p>
              {selectedQuantity !== null && (
                <p className="mt-2 text-xs font-semibold text-emerald-700">
                  {selectedQuantity}{selectedUnit ? ` ${selectedUnit}` : " unités"} indiquées dans la feuille
                </p>
              )}
              <div className="mt-3 max-w-sm">
                <PrimaryButton
                  icon={<MessageCircle className="h-5 w-5" />}
                  href={contact.whatsappHref}
                  external
                >
                  Vérifier sur WhatsApp
                </PrimaryButton>
              </div>
            </div>
          )}

          <div className="mt-auto pt-5"><PrimaryButton chevron onClick={onOtherProduct}>Choisir un autre produit</PrimaryButton></div>
        </section>
      </main>
    </div>
  );
}
