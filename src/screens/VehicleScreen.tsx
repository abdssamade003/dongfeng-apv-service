import { useEffect, useRef, useState, type ChangeEvent } from "react";
import { AlertCircle, ArrowRight, Barcode, CalendarDays, Camera, Car, HelpCircle, Images, ScanLine, Settings2 } from "lucide-react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import Sheet from "../components/Sheet";
import SelectField from "../components/SelectField";
import { defaultVehicle, vehicles } from "../data/mockData";
import {
  detectVinModel,
  detectVinModelPreview,
  MODEL_IMAGES,
  normalizeVin,
  VIN_MODEL_CATALOG_IDS,
  type VinModelName,
} from "../data/vinModels";
import { scanVin as readVinFromImage } from "../utils/vinOcr";
import type { SelectedVehicle } from "../types";

interface Props {
  initial: SelectedVehicle | null;
  onBack: () => void;
  onSubmit: (v: SelectedVehicle) => void;
  onNotify: (msg: string) => void;
  onVinDetection: (model: VinModelName | "unknown" | null) => void;
}

const EXAMPLE_VIN = "LGDTE31C6SA603024";
const VIN_RE = /^[A-HJ-NPR-Z0-9]{17}$/;

export default function VehicleScreen({ initial, onBack, onSubmit, onNotify, onVinDetection }: Props) {
  const start = initial ?? defaultVehicle;
  const initialCatalogModelId = Object.entries(VIN_MODEL_CATALOG_IDS)
    .find(([vinModel]) => vinModel === start.name)?.[1];
  const initialModel = vehicles.find((item) => item.name === start.name)
    ?? vehicles.find((item) => item.id === initialCatalogModelId);
  const [modelName, setModelName] = useState(initialModel?.name ?? start.name);
  const [year, setYear] = useState(String(start.year));
  const [engine, setEngine] = useState(start.engine);
  const [vin, setVin] = useState(start.vin ?? "");
  const [mode, setMode] = useState<"model" | "vin">(start.vin ? "vin" : "model");
  const [error, setError] = useState("");
  const [help, setHelp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [scanOpen, setScanOpen] = useState(false);
  const cameraInput = useRef<HTMLInputElement>(null);
  const galleryInput = useRef<HTMLInputElement>(null);

  const model = vehicles.find((v) => v.name === modelName) ?? vehicles[0];
  const normalizedVin = normalizeVin(vin);
  const detectedVinModel = mode === "vin" ? detectVinModelPreview(vin) : null;
  const exactVinModel = mode === "vin" ? detectVinModel(vin) : null;
  const vinUnknown = mode === "vin" && normalizedVin.length === 17 && !exactVinModel;
  const previewImage = detectedVinModel ? MODEL_IMAGES[detectedVinModel] ?? model.image : model.image;

  useEffect(() => {
    onVinDetection(mode === "vin" ? detectedVinModel ?? (vinUnknown ? "unknown" : null) : null);
  }, [detectedVinModel, mode, onVinDetection, vinUnknown]);

  const changeModel = (name: string) => {
    const m = vehicles.find((v) => v.name === name) ?? vehicles[0];
    setModelName(name);
    if (!m.years.includes(Number(year))) setYear(String(m.years[0]));
    if (!m.engines.includes(engine)) setEngine(m.engines[0]);
    setMode("model");
    setError("");
  };

  const submit = () => {
    let result: SelectedVehicle;
    if (mode === "vin") {
      const clean = normalizeVin(vin);
      if (!clean) {
        setError("Veuillez saisir votre numéro VIN (17 caractères).");
        return;
      }
      if (!VIN_RE.test(clean)) {
        setError("VIN invalide : 17 caractères, sans les lettres I, O et Q.");
        return;
      }
      const matchedVinModel = detectVinModel(clean);
      const matchedCatalogVehicle = matchedVinModel
        ? vehicles.find((item) => item.id === VIN_MODEL_CATALOG_IDS[matchedVinModel])
        : undefined;
      result = matchedVinModel
        ? {
            name: matchedVinModel,
            year: Number(year),
            engine: matchedCatalogVehicle?.engines[0] ?? "Motorisation à confirmer",
            image: MODEL_IMAGES[matchedVinModel] ?? defaultVehicle.image,
            vin: clean,
          }
        : { ...defaultVehicle, vin: clean };
    } else {
      result = { name: model.name, year: Number(year), engine, image: model.image };
    }
    setError("");
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      onSubmit(result);
    }, 900);
  };

  const continueWithDetectedModel = () => {
    if (!detectedVinModel) {
      setError("Veuillez saisir un VIN reconnu.");
      return;
    }

    const catalogVehicle = vehicles.find((item) => item.id === VIN_MODEL_CATALOG_IDS[detectedVinModel]);
    onSubmit({
      name: detectedVinModel,
      year: Number(year),
      engine: catalogVehicle?.engines[0] ?? "Motorisation à confirmer",
      image: MODEL_IMAGES[detectedVinModel] ?? defaultVehicle.image,
      vin: normalizedVin,
    });
  };

  const scanVin = async (event: ChangeEvent<HTMLInputElement>) => {
    const image = event.currentTarget.files?.[0];
    event.currentTarget.value = "";
    if (!image) return;

    setScanOpen(false);
    setMode("vin");
    setError("");
    setScanning(true);
    try {
      const scannedVin = await readVinFromImage(image);
      if (!scannedVin) {
        setError("VIN non détecté. Veuillez prendre une photo plus nette.");
        return;
      }
      setVin(scannedVin);
    } catch (scanError) {
      setError(scanError instanceof Error
        ? `La lecture du VIN a échoué : ${scanError.message}`
        : "La lecture du VIN a échoué. Veuillez réessayer.");
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="screen-page no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <Header onBack={onBack} onNotify={onNotify} />

      <div className="mx-auto w-full max-w-[1160px] px-5 pt-4 lg:px-8 lg:pt-6">
        <div className="relative h-40 overflow-hidden rounded-2xl bg-surface sm:h-48 lg:h-56 lg:rounded-[26px]">
          <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-rose-200 to-brand [clip-path:polygon(0_0,100%_0,75%_100%,0_100%)]" />
          <img
            key={previewImage}
            src={previewImage}
            alt={detectedVinModel ?? modelName}
            className="anim-fade relative h-full w-full object-contain object-center"
          />
          <div className="absolute bottom-3 left-3 rounded-xl bg-white/90 px-3 py-2 shadow-lg backdrop-blur sm:bottom-4 sm:left-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand">Sélection actuelle</p>
            <p className="mt-0.5 text-xs font-bold">{year} · {engine}</p>
          </div>
        </div>
      </div>

      <main className="mx-auto w-full max-w-[1160px] flex-1 px-5 pb-8 lg:px-8">
        <section className="max-w-3xl pt-3 lg:pt-5">
          <p className="hidden text-xs font-extrabold uppercase tracking-[0.18em] text-brand lg:block">Étape 2 · Véhicule</p>
          <h1 className="text-2xl font-extrabold tracking-tight lg:mt-2 lg:text-3xl">Identifier votre véhicule</h1>
          <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted lg:text-sm">
            Sélectionnez les informations de votre véhicule pour trouver les pièces compatibles.
          </p>

          <div className="mt-6 flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center"><Barcode className="h-7 w-7" strokeWidth={1.6} /></div>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="vin" className="text-xs font-medium text-muted">Entrer le N° du châssis (VIN)</label>
                <button type="button" aria-label="Où trouver mon VIN ?" onClick={() => setHelp((h) => !h)} className="text-muted transition hover:text-ink"><HelpCircle className="h-4 w-4" /></button>
              </div>
              <div className="relative">
                <input
                  id="vin"
                  value={vin}
                  maxLength={17}
                  autoCapitalize="characters"
                  spellCheck={false}
                  placeholder="Ex : LGDTE31C6SA603024"
                  aria-invalid={!!error}
                  onFocus={() => setMode("vin")}
                  onChange={(e) => { setVin(normalizeVin(e.target.value)); setMode("vin"); setError(""); }}
                  className={`h-12 w-full rounded-xl border bg-white px-4 pr-12 font-mono text-sm tracking-wider outline-none transition placeholder:font-sans placeholder:tracking-normal ${error ? "border-brand ring-4 ring-brand/10" : "border-line shadow-sm focus:border-brand focus:ring-4 focus:ring-brand/10"}`}
                />
                <input
                  ref={cameraInput}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  aria-label="Photographier la carte grise pour lire le N° du châssis"
                  onChange={scanVin}
                  className="sr-only"
                  tabIndex={-1}
                />
                <input
                  ref={galleryInput}
                  type="file"
                  accept="image/*"
                  aria-label="Choisir une photo de la carte grise dans la galerie"
                  onChange={scanVin}
                  className="sr-only"
                  tabIndex={-1}
                />
                <button
                  type="button"
                  aria-label="Continuer avec le véhicule détecté"
                  title={detectedVinModel ? `Continuer avec ${detectedVinModel}` : "Saisissez un VIN reconnu"}
                  disabled={!detectedVinModel}
                  onClick={continueWithDetectedModel}
                  className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-emerald-700 transition hover:bg-emerald-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowRight aria-hidden="true" className="h-5 w-5" strokeWidth={2.5} />
                </button>
              </div>
              <button
                type="button"
                onClick={() => setScanOpen(true)}
                disabled={scanning}
                className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-brand font-semibold text-brand transition hover:bg-brand-soft active:scale-[0.99] disabled:cursor-wait disabled:opacity-60"
              >
                <ScanLine aria-hidden="true" className="h-5 w-5 text-brand" strokeWidth={2} />
                {scanning ? "Analyse en cours..." : "Scanner le N° du châssis"}
              </button>
              <div className="mt-1.5 flex items-start justify-between gap-2 text-xs">
                {error ? (
                  <p className="flex items-start gap-1 font-medium text-brand" role="alert"><AlertCircle className="mt-px h-3.5 w-3.5 shrink-0" />{error}</p>
                ) : vinUnknown ? (
                  <p className="font-medium text-brand" role="status">Veuillez saisir un VIN reconnu.</p>
                ) : detectedVinModel ? (
                  <p className="font-medium text-emerald-700" role="status">Modèle détecté : {detectedVinModel}</p>
                ) : (
                  <button type="button" onClick={() => { setVin(EXAMPLE_VIN); setMode("vin"); }} className="font-medium text-brand hover:underline">Utiliser l’exemple</button>
                )}
                <span className="shrink-0 tabular-nums text-muted">{normalizedVin.length}/17</span>
              </div>
              {help && <p className="anim-fade mt-2 rounded-xl bg-surface p-3 text-xs leading-relaxed text-muted">Le VIN figure sur votre carte grise (rubrique E) et à la base du pare-brise, côté conducteur.</p>}
            </div>
          </div>

          <div className="my-5 flex items-center gap-4 text-sm text-muted lg:my-6"><span className="h-px flex-1 bg-line" />Ou<span className="h-px flex-1 bg-line" /></div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <div className="lg:col-span-2">
              <SelectField label="Modèle" icon={<Car className="h-7 w-7" strokeWidth={1.6} />} value={modelName} options={vehicles.map((v) => v.name)} onChange={changeModel} dimmed={mode === "vin"} />
            </div>
            <SelectField label="Année" icon={<CalendarDays className="h-7 w-7" strokeWidth={1.6} />} value={year} options={model.years.map(String)} onChange={(v) => { setYear(v); setMode("model"); setError(""); }} dimmed={mode === "vin"} />
            <SelectField label="Motorisation" icon={<Settings2 className="h-7 w-7" strokeWidth={1.6} />} value={engine} options={model.engines} onChange={(v) => { setEngine(v); setMode("model"); setError(""); }} dimmed={mode === "vin"} />
          </div>

          <div className="mt-6 max-w-md lg:mt-8"><PrimaryButton chevron loading={loading} onClick={submit}>Voir les pièces compatibles</PrimaryButton></div>
        </section>
      </main>
      {scanOpen && (
        <Sheet title="Scanner le N° du châssis" onClose={() => setScanOpen(false)} hideScrollbar>
          <p className="mb-4 text-sm text-muted">
            Cadrez uniquement la rubrique « N° du châssis » (17 caractères) sur votre carte grise. Les autres numéros ne seront pas utilisés.
          </p>
          <div className="mt-5 flex flex-col gap-3">
            <PrimaryButton
              variant="danger-outline"
              icon={<Camera className="h-5 w-5 text-brand" />}
              onClick={() => cameraInput.current?.click()}
            >
              Ouvrir la caméra
            </PrimaryButton>
            <PrimaryButton
              variant="outline"
              icon={<Images className="h-5 w-5 text-brand" />}
              onClick={() => galleryInput.current?.click()}
            >
              Choisir depuis la galerie
            </PrimaryButton>
          </div>
        </Sheet>
      )}
    </div>
  );
}
