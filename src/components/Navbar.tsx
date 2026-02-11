import { Link, useLocation } from "react-router-dom";
import { Users, UserPlus } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();

  const link = (path: string, label: string, Icon: typeof Users) => (
    <Link
      to={path}
      className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
        pathname === path
          ? "bg-primary/15 text-primary"
          : "text-muted-foreground hover:text-foreground"
      }`}
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
        <Link to="/" className="font-display text-sm font-bold tracking-wider text-foreground">
          CUBOX
        </Link>
        <div className="flex items-center gap-1">
          {link("/players", "Players", Users)}
          {link("/join", "Join", UserPlus)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
