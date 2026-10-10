import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Loader2, ScanLine, SearchX, X } from "lucide-react";
import Header from "../components/Header";
import VehicleCard from "../components/VehicleCard";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import PrimaryButton from "../components/PrimaryButton";
import Sheet from "../components/Sheet";
import { categories, vehicles } from "../data/mockData";
import type { Product, SelectedVehicle } from "../types";

interface Props {
  vehicle: SelectedVehicle;
  onBack: () => void;
  onModify: () => void;
  onSelectProduct: (p: Product) => void;
  onNotify: (msg: string) => void;
  products: Product[];
  dataReady: boolean;
  dataLoading: boolean;
  dataError: string | null;
  onRetry: () => void;
}

const norm = (s: string) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

function Skeletons() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" aria-busy="true">
      {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="skeleton h-[92px] rounded-2xl" />)}
    </div>
  );
}

export default function PartsScreen({
  vehicle,
  onBack,
  onModify,
  onSelectProduct,
  onNotify,
  products,
  dataReady,
  dataLoading,
  dataError,
  onRetry,
}: Props) {
  const [query, setQuery] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const timer = useRef<number>(0);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    setLoading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setLoading(false), 380);
    return () => window.clearTimeout(timer.current);
  }, [query, categoryId]);

  const q = query.trim();
  const category = categories.find((c) => c.id === categoryId);
  const selectedModel = vehicles.find((model) => model.name === vehicle.name);
  const compatibleProducts = useMemo(
    () => products.filter((product) => selectedModel && product.applicableVehicleIds?.includes(selectedModel.id)),
    [products, selectedModel],
  );
  const results = useMemo(() => {
    if (q) {
      const n = norm(q);
      return compatibleProducts.filter((p) => {
        const cat = categories.find((c) => c.id === p.categoryId);
        return [p.name, p.ref, ...(p.inventoryRefs ?? []), cat?.label ?? ""].some((f) => norm(f).includes(n));
      });
    }
    return categoryId ? compatibleProducts.filter((p) => p.categoryId === categoryId) : [];
  }, [q, categoryId, compatibleProducts]);

  const showResults = !!q || !!categoryId;
  const startScan = () => {
    setScanning(true);
    window.setTimeout(() => {
      setScanning(false);
      setCategoryId(null);
      setQuery("Plaquettes");
      onNotify("Pièce reconnue : plaquettes de frein");
    }, 1800);
  };
  const reset = () => { setQuery(""); setCategoryId(null); };

  return (
    <div className="screen-page no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <Header onBack={onBack} onNotify={onNotify} />

      <main className="mx-auto w-full max-w-[1180px] px-5 pb-8 pt-3 lg:px-8 lg:pt-6">
        {(dataError || (dataLoading && !products.length)) && (
          <div className={`mb-4 rounded-2xl p-4 text-sm ${dataError ? "bg-red-50 text-red-700" : "bg-surface text-muted"}`} role={dataError ? "alert" : "status"}>
            {dataError ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p>Impossible de synchroniser les données Google Sheets : {dataError}</p>
                <button type="button" onClick={onRetry} className="shrink-0 font-semibold underline">Réessayer</button>
              </div>
            ) : "Chargement du catalogue et du stock depuis Google Sheets…"}
          </div>
        )}
        {!dataError && dataReady && !dataLoading && !compatibleProducts.length && (
          <p className="mb-4 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900" role="status">
            Aucune référence d’applicabilité n’a été trouvée pour {vehicle.name} dans la feuille Google Sheets. Vérifiez que ce modèle est renseigné dans les colonnes APP1 à APP6.
          </p>
        )}
        <div className="grid gap-5 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-7">
          <aside className="flex flex-col gap-4">
            <VehicleCard vehicle={vehicle} onModify={onModify} />
            <div className="flex h-12 items-center gap-2 rounded-2xl border border-line bg-surface px-4 transition focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une pièce…"
                aria-label="Rechercher une pièce"
                className="h-full min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
              />
              {query && <button type="button" aria-label="Effacer" onClick={() => setQuery("")} className="text-muted"><X className="h-4 w-4" /></button>}
              <button type="button" aria-label="Scanner une pièce" onClick={startScan} className="flex h-8 w-8 items-center justify-center rounded-lg text-ink transition hover:bg-line/60 active:scale-90"><ScanLine className="h-5 w-5" /></button>
            </div>
            <div className="hidden rounded-2xl bg-surface p-4 text-sm leading-relaxed text-muted lg:block">
              <strong className="block text-ink">Conseil</strong>
              Recherchez par désignation, référence ou choisissez une catégorie pour filtrer rapidement le catalogue.
            </div>
          </aside>

          <section className="min-w-0">
            {!showResults ? (
              <div>
                <div className="mb-4">
                  <p className="hidden text-xs font-extrabold uppercase tracking-[0.18em] text-brand lg:block">Étape 3 · Catalogue</p>
                  <h1 className="mt-1 text-[22px] font-extrabold lg:text-3xl">Catégories de pièces</h1>
                  <p className="mt-1 text-sm text-muted">Choisissez une famille pour afficher les pièces compatibles.</p>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {categories.map((c) => <CategoryCard key={c.id} category={c} selected={categoryId === c.id} onClick={() => setCategoryId(c.id)} />)}
                </div>
              </div>
            ) : (
              <div className="anim-fade">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="hidden text-xs font-extrabold uppercase tracking-[0.18em] text-brand lg:block">Résultats compatibles</p>
                    <h1 className="mt-1 text-[22px] font-extrabold lg:text-3xl">
                      {q ? "Résultats" : category?.label}
                      {!loading && <span className="ml-2 text-sm font-medium text-muted">{results.length} pièce{results.length > 1 ? "s" : ""}</span>}
                    </h1>
                  </div>
                  <button type="button" onClick={reset} className="text-[13px] font-semibold text-brand hover:underline">Toutes les catégories</button>
                </div>

                {loading ? <Skeletons /> : results.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {results.map((p) => <ProductCard key={p.id} product={p} onClick={() => onSelectProduct(p)} />)}
                  </div>
                ) : (
                  <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-2xl bg-surface px-6 py-8 text-center">
                    <SearchX className="h-10 w-10 text-muted" strokeWidth={1.5} />
                    <p className="text-sm font-semibold">{q ? `Aucune pièce trouvée pour « ${q} »` : `Aucune pièce compatible dans « ${category?.label} »`}</p>
                    <p className="max-w-md text-xs text-muted">Essayez un autre mot-clé ou une référence, par exemple « plaquettes » ou « DF-BP ».</p>
                    <div className="mt-1 w-full max-w-xs"><PrimaryButton variant="outline" onClick={reset}>Voir les catégories</PrimaryButton></div>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {scanning && (
        <Sheet title="Scanner une pièce" onClose={() => setScanning(false)}>
          <div className="flex flex-col items-center gap-3 pb-4">
            <div className="relative flex h-52 w-full items-center justify-center overflow-hidden rounded-2xl bg-ink">
              <Camera className="h-12 w-12 text-white/40" />
              <span className="absolute inset-x-6 top-1/2 h-0.5 animate-pulse bg-brand shadow-[0_0_16px_3px_rgba(227,6,19,0.8)]" />
            </div>
            <p className="flex items-center gap-2 text-sm text-muted"><Loader2 className="h-4 w-4 animate-spin" />Analyse de la pièce en cours…</p>
          </div>
        </Sheet>
      )}
    </div>
  );
}
