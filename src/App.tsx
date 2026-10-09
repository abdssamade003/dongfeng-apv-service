import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Circle } from "lucide-react";
import MobileShell from "./components/MobileShell";
import HomeScreen from "./screens/HomeScreen";
import VehicleScreen from "./screens/VehicleScreen";
import PartsScreen from "./screens/PartsScreen";
import ProductScreen from "./screens/ProductScreen";
import ContactScreen from "./screens/ContactScreen";
import Logo from "./components/Logo";
import { defaultVehicle } from "./data/mockData";
import type { VinModelName } from "./data/vinModels";
import { loadPartsData, stockCities, type PartsData } from "./data/googleSheets";
import type { City, Product, ScreenId, SelectedVehicle } from "./types";

const steps: { id: ScreenId; title: string; hint: string }[] = [
  { id: "home", title: "Page d’accueil", hint: "Noter ou rechercher une pièce" },
  { id: "vehicle", title: "Identifier le véhicule", hint: "Modèle, année ou VIN" },
  { id: "parts", title: "Recherche de pièces", hint: "Catégories et mots-clés" },
  { id: "product", title: "Disponibilité", hint: "Stock et agences" },
  { id: "contact", title: "Sur commande / Contact", hint: "Assistance directe" },
];

const stepIndex = (id: ScreenId) => steps.findIndex((s) => s.id === id);

export default function App() {
  const [stack, setStack] = useState<ScreenId[]>(["home"]);
  const [dir, setDir] = useState<"forward" | "back">("forward");
  const [vehicle, setVehicle] = useState<SelectedVehicle | null>(null);
  const [headerVinModel, setHeaderVinModel] = useState<VinModelName | "unknown" | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [partsData, setPartsData] = useState<PartsData | null>(null);
  const [dataError, setDataError] = useState<string | null>(null);
  const [dataLoading, setDataLoading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [autoOpenRating, setAutoOpenRating] = useState(false);
  const toastTimer = useRef<number>(0);

  const screen = stack[stack.length - 1];
  const activeIndex = stepIndex(screen);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const updateHeaderVinModel = useCallback((model: VinModelName | "unknown" | null) => {
    setHeaderVinModel(model);
  }, []);

  const refreshPartsData = useCallback(async () => {
    setDataLoading(true);
    try {
      const data = await loadPartsData();
      setPartsData(data);
      setDataError(null);
    } catch (error) {
      setDataError(error instanceof Error ? error.message : String(error));
    } finally {
      setDataLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshPartsData();
    const interval = window.setInterval(() => void refreshPartsData(), 5 * 60 * 1000);
    return () => window.clearInterval(interval);
  }, [refreshPartsData]);

  useEffect(() => () => window.clearTimeout(toastTimer.current), []);
  useEffect(() => {
    const timer = window.setTimeout(() => setAutoOpenRating(true), 2000);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const next = `#/${screen}`;
    if (window.location.hash !== next) window.history.replaceState(null, "", next);
  }, [screen]);

  const go = (s: ScreenId) => {
    setDir("forward");
    setStack((st) => [...st, s]);
  };

  const back = () => {
    setDir("back");
    setStack((st) => (st.length > 1 ? st.slice(0, -1) : st));
  };

  const popTo = (s: ScreenId) => {
    setDir("back");
    setStack((st) => {
      const i = st.lastIndexOf(s);
      return i >= 0 ? st.slice(0, i + 1) : [...st, s];
    });
  };

  const jump = (id: ScreenId) => {
    if ((id === "product" || id === "contact") && !product) {
      notify("Choisissez une pièce avant de consulter sa disponibilité.");
      return;
    }
    if (id === "contact" && !city) {
      notify("Choisissez une agence avant de contacter le magasinier.");
      return;
    }
    const idx = stepIndex(id);
    const target = steps.slice(0, idx + 1).map((s) => s.id);
    setDir(idx >= activeIndex ? "forward" : "back");
    if (idx >= 2 && !vehicle) setVehicle(defaultVehicle);
    setStack(target);
  };

  const activeVehicle = vehicle ?? defaultVehicle;

  const sidebar = (
    <aside className="hidden w-[286px] shrink-0 flex-col rounded-[28px] border border-black/[0.05] bg-white/72 p-5 shadow-[0_24px_60px_-38px_rgba(15,23,42,0.45)] backdrop-blur-xl lg:flex xl:w-[304px] xl:p-6">
      <div className="mb-8 flex items-center justify-between">
        <Logo />
      </div>
      <div className="mb-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand">Parcours pièces</p>
        <h2 className="mt-1 text-xl font-extrabold tracking-tight">DONGFENG Service</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">Identifiez le véhicule, trouvez la pièce et vérifiez le stock agence.</p>
      </div>
      <nav aria-label="Étapes de recherche" className="flex-1">
        <ol className="flex flex-col gap-1.5">
          {steps.map((s, i) => {
            const active = s.id === screen;
            const done = i < activeIndex;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => jump(s.id)}
                  className={`group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                    active ? "bg-white shadow-[0_8px_24px_-16px_rgba(15,23,42,.35)] ring-1 ring-black/[0.04]" : "hover:bg-white/80"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                      active
                        ? "bg-brand text-white"
                        : done
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-ink/[0.06] text-ink/50"
                    }`}
                  >
                    {done ? <Check className="h-4 w-4" /> : i + 1}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-[13px] font-semibold leading-tight ${active ? "text-ink" : "text-ink/80"}`}>{s.title}</span>
                    <span className="mt-0.5 block truncate text-xs text-muted">{s.hint}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
      <div className="mt-6 rounded-2xl bg-ink px-4 py-4 text-white">
        <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
          <Circle className="h-2.5 w-2.5 fill-emerald-400 text-emerald-400" />
          Prototype web responsive
        </div>
        <p className="mt-2 text-xs leading-relaxed text-white/60">Optimisé pour ordinateur, tablette et mobile.</p>
      </div>
    </aside>
  );

  return (
    <MobileShell toast={toast} sidebar={sidebar}>
      <div key={`${stack.length}-${screen}`} className={`h-full ${dir === "forward" ? "anim-forward" : "anim-back"}`}>
        {screen === "home" && (
          <HomeScreen
            detectedVinModel={headerVinModel}
            autoOpenRating={autoOpenRating}
            onCloseAutoRating={() => setAutoOpenRating(false)}
            onSearch={() => go("vehicle")}
            onNotify={notify}
          />
        )}

        {screen === "vehicle" && (
          <VehicleScreen
            initial={vehicle}
            onBack={back}
            onNotify={notify}
            onVinDetection={updateHeaderVinModel}
            onSubmit={(v) => {
              setVehicle(v);
              go("parts");
            }}
          />
        )}

        {screen === "parts" && (
          <PartsScreen
            vehicle={activeVehicle}
            onBack={back}
            onNotify={notify}
            onModify={() => popTo("vehicle")}
            availability={partsData?.availability ?? {}}
            dataLoading={dataLoading}
            dataError={dataError}
            onRetry={() => void refreshPartsData()}
            onSelectProduct={(p) => {
              setProduct(p);
              go("product");
            }}
          />
        )}

        {screen === "product" && product && (
          <ProductScreen
            product={product}
            vehicle={activeVehicle}
            cities={partsData?.cities ?? stockCities}
            availability={partsData?.availability ?? {}}
            dataError={dataError}
            dataLoading={dataLoading}
            onBack={back}
            onNotify={notify}
            onOtherProduct={() => popTo("parts")}
            onUnavailable={(c) => {
              setCity(c);
              go("contact");
            }}
          />
        )}

        {screen === "contact" && product && city && partsData && (
          <ContactScreen
            product={product}
            city={city}
            availability={partsData.availability}
            onBack={back}
            onNotify={notify}
            onOtherProduct={() => popTo("parts")}
          />
        )}
      </div>
    </MobileShell>
  );
}
