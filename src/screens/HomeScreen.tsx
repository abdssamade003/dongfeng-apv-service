import { useEffect, useState } from "react";
import { BadgeCheck, Check, Copy, ExternalLink, MapPin, Settings, ShieldCheck, Star, Users, Wifi, Wrench } from "lucide-react";
import Header from "../components/Header";
import PrimaryButton from "../components/PrimaryButton";
import Sheet from "../components/Sheet";
import { vehicles } from "../data/mockData";
import { MODEL_IMAGES, type VinModelName } from "../data/vinModels";

interface Props {
  detectedVinModel: VinModelName | "unknown" | null;
  autoOpenRating: boolean;
  onCloseAutoRating: () => void;
  onSearch: () => void;
  onNotify: (msg: string) => void;
}

const reassurance = [
  { icon: ShieldCheck, label: "Service de confiance" },
  { icon: Users, label: "Pièces d’origine" },
  { icon: Wrench, label: "Un réseau à vos côtés" },
];

const ratingLabels = ["Décevant", "Moyen", "Correct", "Très bien", "Excellent"];
const wifiPassword = "L@*by_2025***";
const googleReviewUrl = "https://g.page/r/CWHB6a_pUaSZECE/review";
const showroomMapsUrl =
  "https://www.google.com/maps/place//@33.6134181,-7.5553639,17z/data=!3m1!4b1!4m3!3m2!1s0xda7cd001c61db17:0x99a451e9afe9c161!12e1?entry=ttu&g_ep=EgoyMDI2MTAwNi4wIKXMDSoASAFQAw%3D%3D";
const vehicleImageScales: Record<string, number> = {
  "/vehicles/bus.png": 1.55,
  "/vehicles/captain-3400.png": 1.65,
  "/vehicles/captain-3500.png": 1.36,
  "/vehicles/captain-7500.png": 1.17,
  "/vehicles/captain-w.png": 1.4,
  "/vehicles/mage.png": 1.25,
  "/vehicles/shine.png": 1.16,
  "/vehicles/shine-max.png": 1.1,
  "/vehicles/uvan.png": 1.21,
};

function RatingSheet({ onClose }: { onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const shown = hover || rating;

  const send = () => {
    window.location.assign(showroomMapsUrl);
  };

  return (
    <Sheet title="Noter mon expérience" onClose={onClose}>
      <p className="mb-4 text-sm text-muted">Comment s’est passée votre visite au service après-vente ?</p>
      <a
        href={showroomMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-4 flex items-center gap-3 rounded-xl bg-surface p-3 text-left transition hover:bg-brand-soft"
      >
        <MapPin className="h-5 w-5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-ink">Dongfeng Maroc - Global Chinese Motors</span>
          <span className="block text-xs text-muted">Voir la localisation sur Google Maps</span>
        </span>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted" />
      </a>
      <div className="mb-1 flex justify-center gap-2" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            aria-label={`${n} sur 5`}
            onMouseEnter={() => setHover(n)}
            onClick={() => setRating(n)}
            className="p-1 transition active:scale-90"
          >
            <Star className={`h-10 w-10 transition ${n <= shown ? "fill-brand text-brand" : "text-line"}`} strokeWidth={1.6} />
          </button>
        ))}
      </div>
      <p className="mb-4 h-5 text-center text-sm font-semibold text-brand">{shown ? ratingLabels[shown - 1] : ""}</p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Un commentaire ? (facultatif)"
        className="mb-4 h-24 w-full resize-none rounded-xl border border-line px-4 py-3 text-sm outline-none transition focus:border-brand focus:ring-4 focus:ring-brand/10"
      />
      <PrimaryButton disabled={!rating} onClick={send} chevron>
        Envoyer mon avis
      </PrimaryButton>
    </Sheet>
  );
}

function SearchReviewSheet({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  const [openedMaps, setOpenedMaps] = useState(false);

  return (
    <Sheet title="Avant de rechercher une pièce" onClose={onClose}>
      <p className="mb-4 text-sm text-muted">
        Merci de noter votre expérience DONGFENG sur Google Maps avant de continuer.
      </p>
      <a
        href={googleReviewUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setOpenedMaps(true)}
        className="mb-4 flex items-center gap-3 rounded-xl bg-surface p-3 text-left transition hover:bg-brand-soft"
      >
        <MapPin className="h-5 w-5 shrink-0 text-brand" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-ink">Noter DONGFENG sur Google Maps</span>
          <span className="block text-xs text-muted">Dongfeng Maroc - Global Chinese Motors</span>
        </span>
        <ExternalLink className="h-4 w-4 shrink-0 text-muted" />
      </a>
      <PrimaryButton disabled={!openedMaps} onClick={onContinue} chevron>
        J’ai laissé mon avis — continuer
      </PrimaryButton>
    </Sheet>
  );
}

export default function HomeScreen({ detectedVinModel, autoOpenRating, onCloseAutoRating, onSearch, onNotify }: Props) {
  const [rating, setRating] = useState(false);
  const [searchReview, setSearchReview] = useState(false);
  const [showWifiPassword, setShowWifiPassword] = useState(false);
  const [wifiPasswordCopied, setWifiPasswordCopied] = useState(false);
  const [vehicleIndex, setVehicleIndex] = useState(0);
  const detectedImage = detectedVinModel && detectedVinModel !== "unknown"
    ? MODEL_IMAGES[detectedVinModel]
    : undefined;
  const featuredVehicle = detectedVinModel
    ? detectedImage
      ? { id: detectedVinModel, name: `DONGFENG ${detectedVinModel}`, image: detectedImage }
      : vehicles[0]
    : vehicles[vehicleIndex];

  const copyWifiPassword = async () => {
    try {
      await navigator.clipboard.writeText(wifiPassword);
      setWifiPasswordCopied(true);
    } catch {
      onNotify("Impossible de copier le mot de passe. Vérifiez les autorisations du navigateur.");
    }
  };

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVehicleIndex((current) => (current + 1) % vehicles.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="screen-page no-scrollbar flex h-full flex-col overflow-y-auto bg-white">
      <Header onNotify={onNotify} />

      <main className="mx-auto grid w-full max-w-[1160px] flex-1 lg:grid-cols-[1.08fr_.92fr] lg:items-stretch lg:px-6 lg:pb-6 xl:px-8 xl:pb-8">
        <section className="relative h-[230px] shrink-0 overflow-hidden bg-gradient-to-br from-white via-surface to-brand-soft lg:h-auto lg:min-h-[560px] lg:rounded-[26px]">
          <div className="absolute -left-12 bottom-0 h-24 w-[75%] -skew-x-[28deg] bg-gradient-to-r from-brand/15 to-brand/80 lg:h-40" />
          <img
            key={featuredVehicle.id}
            src={featuredVehicle.image}
            alt={featuredVehicle.name}
            className="anim-fade relative h-full w-full object-contain p-5 pb-10 lg:p-10 lg:pb-16"
            style={{ transform: `scale(${vehicleImageScales[featuredVehicle.image] ?? 1})` }}
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-ink shadow-sm backdrop-blur lg:left-7 lg:top-7 lg:px-4 lg:py-2 lg:text-xs" aria-live="polite">
            {featuredVehicle.name}
          </div>
          <div className="absolute bottom-5 left-5 flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold shadow-sm backdrop-blur lg:bottom-7 lg:left-7 lg:px-4 lg:py-2 lg:text-xs">
            <BadgeCheck className="h-3.5 w-3.5 text-brand" />
            Réseau officiel DONGFENG Maroc
          </div>
        </section>

        <section className="flex flex-col px-5 pb-6 pt-5 lg:justify-center lg:px-10 lg:py-10 xl:px-14">
          <p className="mb-3 hidden text-xs font-extrabold uppercase tracking-[0.18em] text-brand lg:block">Service après-vente & pièces</p>
          <h1 className="text-[28px] font-extrabold leading-[1.1] tracking-tight sm:text-3xl lg:text-[42px] lg:leading-[1.06]">
            Bienvenue chez
            <br />
            DONGFENG Service
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted lg:mt-5 lg:text-[15px]">
            Trouvez rapidement la pièce compatible avec votre véhicule, consultez sa disponibilité par agence et contactez directement le magasinier si nécessaire.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:max-w-md lg:mt-7">
            <PrimaryButton icon={<Star className="h-5 w-5 fill-white" />} chevron onClick={() => setRating(true)}>
              Noter mon expérience
            </PrimaryButton>
            <PrimaryButton variant="outline" icon={<Settings className="h-5 w-5" />} chevron onClick={() => setSearchReview(true)}>
              Rechercher une pièce
            </PrimaryButton>
            <PrimaryButton
              variant="outline"
              icon={<Wifi className="h-5 w-5" />}
              chevron
              aria-expanded={showWifiPassword}
              onClick={() => {
                setShowWifiPassword((visible) => !visible);
                setWifiPasswordCopied(false);
              }}
            >
              WiFi Visitors
            </PrimaryButton>
            {showWifiPassword && (
              <button
                type="button"
                onClick={copyWifiPassword}
                aria-label={wifiPasswordCopied ? "Mot de passe WiFi copié" : "Copier le mot de passe WiFi"}
                className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-left text-sm text-ink transition hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="min-w-0 break-all font-mono">Mot de passe : {wifiPassword}</span>
                <span className="flex shrink-0 items-center gap-1.5 font-sans text-xs font-semibold text-muted">
                  {wifiPasswordCopied ? <Check className="h-4 w-4 text-emerald-700" /> : <Copy className="h-4 w-4" />}
                  {wifiPasswordCopied ? "Copié" : "Copier"}
                </span>
              </button>
            )}
          </div>

          <ul className="mt-8 grid grid-cols-3 gap-3 border-t border-line pt-6 lg:mt-10 lg:gap-5">
            {reassurance.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
                <Icon className="h-7 w-7" strokeWidth={1.6} />
                <span className="text-[11px] font-medium leading-tight text-ink/80 lg:text-xs">{label}</span>
              </li>
            ))}
          </ul>

        </section>
      </main>

      {(rating || autoOpenRating) && (
        <RatingSheet onClose={() => {
          setRating(false);
          onCloseAutoRating();
        }} />
      )}
      {searchReview && (
        <SearchReviewSheet
          onClose={() => setSearchReview(false)}
          onContinue={() => {
            setSearchReview(false);
            onSearch();
          }}
        />
      )}
    </div>
  );
}
