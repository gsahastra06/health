import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { Activity, Users, Video, LogOut, Stethoscope, Home } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { type ReactNode } from "react";

const NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/patients", label: "Patients", icon: Users },
  { to: "/check", label: "New Check", icon: Stethoscope },
  { to: "/consult", label: "Teleconsult", icon: Video },
] as const;

const DOCTOR_NAV = [
  { to: "/home", label: "Home", icon: Home },
  { to: "/consult", label: "Teleconsult", icon: Video },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navItems = role === "doctor" ? DOCTOR_NAV : NAV;

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between gap-4">
          <Link to="/home" className="flex items-center gap-2 font-display font-bold text-navy">
            <span className="size-8 rounded-lg bg-[var(--gradient-hero)] grid place-items-center text-primary-foreground">
              <Activity className="size-4" />
            </span>
            <span className="hidden sm:inline">ASHA Assistant</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((n) => {
              const active = pathname.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-xs text-muted-foreground truncate max-w-[140px]">
              {user?.email}
            </span>
            <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label="Sign out">
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="md:hidden sticky bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
        <div className="grid grid-cols-4">
          {navItems.map((n) => {
            const active = pathname.startsWith(n.to);
            const Icon = n.icon;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex flex-col items-center gap-1 py-3 text-xs ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="size-5" />
                {n.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
