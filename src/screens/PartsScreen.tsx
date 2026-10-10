import { useEffect, useMemo, useRef, useState } from "react";
import { Camera, Loader2, ScanLine, SearchX, X } from "lucide-react";
import Header from "../components/Header";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";
import PrimaryButton from "../components/PrimaryButton";
import Sheet from "../components/Sheet";
import { catalogueData, normalizeCatalogueModel } from "../data/catalogueData";
import { normalizeItemCode } from "../data/googleSheets";
import type { Category, CityAvailability, Product, SelectedVehicle } from "../types";

interface Props {
  vehicle: SelectedVehicle;
  onBack: () => void;
  onModify: () => void;
  onSelectProduct: (p: Product) => void;
  onNotify: (msg: string) => void;
  availability: Record<string, Record<string, CityAvailability>>;
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
  availability,
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
  const modelParts = useMemo(() => {
    const seenCodes = new Set<string>();
    return catalogueData.filter((part) => {
      if (normalizeCatalogueModel(part.model) !== normalizeCatalogueModel(vehicle.name)) return false;
      const itemCode = normalizeItemCode(part.itemCode);
      if (!itemCode || seenCodes.has(itemCode)) return false;
      seenCodes.add(itemCode);
      return true;
    });
  }, [vehicle.name]);
  const categories = useMemo<Category[]>(
    () => [...new Set(modelParts.map((part) => part.category))].map((category) => ({
      id: category,
      label: category,
      icon: "other",
    })),
    [modelParts],
  );
  const category = categories.find((item) => item.id === categoryId);
  const compatibleProducts = useMemo<Product[]>(
    () => modelParts.map((part) => ({
      id: normalizeItemCode(part.itemCode),
      itemCode: part.itemCode,
      name: part.itemShortName,
      ref: part.itemCode,
      categoryId: part.category,
      subType: part.subType,
      tags: [],
      position: part.position,
      note: "",
    })),
    [modelParts],
  );
  const results = useMemo(() => {
    const categoryParts = categoryId
      ? compatibleProducts.filter((part) => part.categoryId === categoryId)
      : compatibleProducts;
    if (!q) return categoryId ? categoryParts : [];
    const normalizedQuery = norm(q);
    return categoryParts.filter((part) =>
      [part.itemCode ?? part.ref, part.name].some((value) => norm(value).includes(normalizedQuery)),
    );
  }, [q, categoryId, compatibleProducts]);

  const showResults = !!q || !!categoryId;
  const reset = () => { setQuery(""); setCategoryId(null); };
  const startScan = () => {
    setScanning(true);
    window.setTimeout(() => {
      setScanning(false);
      setCategoryId(null);
      setQuery("Plaquettes");
      onNotify("Pièce reconnue : plaquettes de frein");
    }, 1800);
  };

  return (
    <div className="screen-page no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <Header onBack={onBack} onNotify={onNotify} />

      <main className="mx-auto w-full max-w-[1180px] px-4 pb-8 pt-4 sm:px-5 lg:px-8 lg:pt-5">
        <div className="flex h-14 items-center gap-2 rounded-2xl border border-line bg-surface px-4 transition focus-within:border-brand focus-within:bg-white focus-within:ring-4 focus-within:ring-brand/10">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une pièce…"
            aria-label="Rechercher une pièce"
            className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted [&::-webkit-search-cancel-button]:hidden"
          />
          {query && <button type="button" aria-label="Effacer" onClick={() => setQuery("")} className="text-muted"><X className="h-4 w-4" /></button>}
          <button type="button" aria-label="Scanner une pièce" onClick={startScan} className="flex h-9 w-9 items-center justify-center rounded-lg text-ink transition hover:bg-line/60 active:scale-90"><ScanLine className="h-5 w-5" /></button>
        </div>

        <section aria-label={`Véhicule sélectionné : ${vehicle.name}`} className="relative mt-4 h-[230px] overflow-hidden rounded-2xl bg-ink shadow-sm sm:h-[300px] lg:h-[360px]">
          <img src="/parts-warehouse.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-black/10" />
          <div className="absolute inset-x-0 bottom-0 grid min-h-[96px] grid-cols-[36%_minmax(0,1fr)_auto] items-center gap-2 px-3 py-2 sm:min-h-[108px] sm:px-5 sm:py-3">
            <img
              src={vehicle.image}
              alt=""
              className="absolute -bottom-2 left-1 h-[125px] w-[36%] object-contain drop-shadow-[0_8px_10px_rgba(0,0,0,0.3)] sm:left-3 sm:h-[150px] sm:w-[36%] lg:h-[180px]"
            />
            <div className="col-start-2 min-w-0 text-white [text-shadow:0_1px_5px_rgba(0,0,0,0.9)]">
              <p className="break-words text-base font-extrabold leading-tight sm:text-2xl">
                {vehicle.name.replace(/^DONGFENG\s*/i, "")}
              </p>
              <p className="mt-1 flex min-w-0 flex-wrap items-center gap-x-1 text-xs font-medium sm:text-base">
                <span>{vehicle.engine}</span>
                <span aria-hidden="true">·</span>
                <span className="whitespace-nowrap">{vehicle.year}</span>
              </p>
            </div>
            <button
              type="button"
              onClick={onModify}
              className="col-start-3 shrink-0 rounded-full border border-white/80 bg-black/20 px-2 py-2 text-[10px] font-semibold text-white shadow-sm backdrop-blur-sm transition hover:bg-black/40 sm:px-4 sm:text-sm"
            >
              Modifier
            </button>
          </div>
        </section>

        {(dataError || dataLoading) && (
          <div className={`mt-4 rounded-2xl p-4 text-sm ${dataError ? "bg-amber-50 text-amber-900" : "bg-surface text-muted"}`} role="status">
            {dataError ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p>Disponibilité temporairement indisponible</p>
                <button type="button" onClick={onRetry} className="shrink-0 font-semibold underline">Réessayer</button>
              </div>
            ) : "Chargement des disponibilités depuis Google Sheets…"}
          </div>
        )}
        {!modelParts.length && (
          <p className="mt-4 rounded-2xl bg-surface p-4 text-sm text-muted" role="status">
            Aucune pièce référencée pour ce modèle.
          </p>
        )}
        <section className="mt-6 min-w-0">
            {!showResults ? (
              <div>
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand">Pièces compatibles · {vehicle.name}</p>
                    <h1 className="mt-1 text-[22px] font-extrabold lg:text-3xl">Catégories de pièces</h1>
                  </div>
                  <span className="text-sm text-muted">{modelParts.length} pièce{modelParts.length > 1 ? "s" : ""}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                  {categories.map((c) => <CategoryCard key={c.id} category={c} selected={categoryId === c.id} onClick={() => setCategoryId(c.id)} />)}
                </div>
              </div>
            ) : (
              <div className="anim-fade">
                <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-brand">{vehicle.name} · Pièces compatibles</p>
                    <h1 className="mt-1 text-[22px] font-extrabold lg:text-3xl">
                      {q ? "Résultats" : category?.label ?? "Pièces compatibles"}
                      {!loading && <span className="ml-2 text-sm font-medium text-muted">{results.length} pièce{results.length > 1 ? "s" : ""}</span>}
                    </h1>
                  </div>
                  <button type="button" onClick={vehicle.vin ? onModify : reset} className="text-[13px] font-semibold text-brand hover:underline">
                    {vehicle.vin ? "Modifier le véhicule" : "Toutes les catégories"}
                  </button>
                </div>

                {loading ? <Skeletons /> : results.length > 0 ? (
                  <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {results.map((part) => {
                      const cityStock = availability[part.id];
                      const availabilityLabel = dataError
                        ? "Disponibilité temporairement indisponible"
                        : dataLoading
                          ? "Chargement de la disponibilité…"
                        : Object.values(cityStock ?? {}).some((stock) => (stock.qty ?? 0) > 1)
                          ? "Disponible"
                          : "Sur commande";
                      return (
                        <ProductCard
                          key={`${normalizeCatalogueModel(vehicle.name)}-${part.id}`}
                          product={part}
                          availabilityLabel={availabilityLabel}
                          onClick={() => onSelectProduct(part)}
                        />
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex min-h-72 flex-col items-center justify-center gap-3 rounded-2xl bg-surface px-6 py-8 text-center">
                    <SearchX className="h-10 w-10 text-muted" strokeWidth={1.5} />
                    <p className="text-sm font-semibold">
                      {q
                        ? `Aucune pièce trouvée pour « ${q} »`
                        : category
                          ? `Aucune pièce compatible dans « ${category.label} »`
                          : `Aucune pièce compatible pour ${vehicle.name}`}
                    </p>
                    <p className="max-w-md text-xs text-muted">Essayez un autre mot-clé ou une référence, par exemple « plaquettes » ou « DF-BP ».</p>
                    <div className="mt-1 w-full max-w-xs">
                      <PrimaryButton variant="outline" onClick={vehicle.vin ? onModify : reset}>
                        {vehicle.vin ? "Modifier le véhicule" : "Voir les catégories"}
                      </PrimaryButton>
                    </div>
                  </div>
                )}
              </div>
            )}
        </section>
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
