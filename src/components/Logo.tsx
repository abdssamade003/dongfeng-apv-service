import logo from "../imports/dongfeng_logo-freelogovectors.net_.png";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="DONGFENG"
      className={`aspect-[1280/176] w-[196px] shrink-0 overflow-hidden ${className}`}
    >
      <img src={logo} alt="" draggable={false} className="h-full w-full scale-[1.05] object-cover" />
    </div>
  );
}
