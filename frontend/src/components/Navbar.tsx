// frontend/src/components/Navbar.tsx

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  Sprout,
  LogIn,
  UserPlus,
  User,
  History,
  LogOut,
  ChevronDown,
  Bell,
  Leaf,
} from 'lucide-react';

// Shadcn UI Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Utilities & Services
import { cn } from '@/lib/utils';
import { getUser, isLoggedIn, logout } from '@/services/authService';

const links = [
  { label: 'Home', path: '/' },
  { label: 'Crop Guide', path: '/crop-info' },
  { label: 'Market Prices', path: '/market-prices' },
  { label: 'Pest Alerts', path: '/pest-alerts' },
];

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getUser();
  const loggedIn = isLoggedIn();

  // State for the "floating" hover effect
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100/50 bg-white/70 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Section: Uses motion and Sprout icon */}
        <Link to="/" className="group flex items-center gap-3 relative">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            className="relative z-10 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 p-2.5 shadow-lg shadow-emerald-200"
          >
            <Sprout className="h-6 w-6 text-white" />
          </motion.div>
          <div className="leading-tight">
            <span className="block text-xl font-black tracking-tight text-slate-900">
              Agri<span className="text-emerald-600">Guide</span>
            </span>
            <span className="hidden text-[10px] font-bold uppercase tracking-widest text-slate-400 sm:block">
              Precision Farming
            </span>
          </div>
        </Link>

        {/* Desktop Navigation: Uses NavigationMenu, motion, and hoveredPath */}
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList className="flex items-center gap-1">
            {links.map((link) => (
              <NavigationMenuItem key={link.path} className="relative">
                <Link
                  to={link.path}
                  onMouseEnter={() => setHoveredPath(link.path)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={cn(
                    'relative z-10 px-4 py-2 text-sm font-semibold transition-colors duration-300',
                    isActive(link.path) ? 'text-emerald-700' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <NavigationMenuLink asChild>
                    <span>{link.label}</span>
                  </NavigationMenuLink>

                  {/* Active Tab Indicator */}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 z-[-1] rounded-full bg-emerald-50"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  {/* Hover Tab Indicator (AnimatePresence used here) */}
                  <AnimatePresence>
                    {hoveredPath === link.path && !isActive(link.path) && (
                      <motion.div
                        layoutId="hoverTab"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="absolute inset-0 z-[-2] rounded-full bg-slate-100/50"
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions: Uses Bell, DropdownMenu, Button, and User icons */}
        <div className="hidden items-center gap-4 md:flex">
          {loggedIn ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-emerald-600 rounded-full transition-colors"
              >
                <Bell className="h-5 w-5" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="group h-12 gap-3 rounded-2xl border border-transparent bg-slate-50 px-3 hover:bg-white hover:border-emerald-100 transition-all"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 font-bold text-xs group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      {user?.name?.[0].toUpperCase() || <User className="h-4 w-4" />}
                    </div>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-xs font-bold text-slate-900 leading-none">
                        {user?.name || 'Account'}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-3xl p-2 shadow-2xl border-emerald-50 bg-white opacity-100 animate-in fade-in zoom-in duration-200"
                >
                  <DropdownMenuLabel className="p-4">
                    <p className="text-sm font-bold text-slate-900">{user?.name}</p>
                    <p className="text-xs font-medium text-slate-500">{user?.email}</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-emerald-50" />

                  <DropdownMenuItem
                    asChild
                    className="rounded-2xl py-3 focus:bg-emerald-50 cursor-pointer"
                  >
                    <Link to="/profile" className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100/50 text-emerald-600">
                        <User className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-slate-700">My Farm Profile</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    asChild
                    className="rounded-2xl py-3 focus:bg-emerald-50 cursor-pointer"
                  >
                    <Link to="/history" className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-100/50 text-emerald-600">
                        <History className="h-4 w-4" />
                      </div>
                      <span className="font-semibold text-slate-700">Soil History</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-emerald-50" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="rounded-2xl py-3 text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer font-semibold flex items-center gap-3"
                  >
                    <div className="p-2 rounded-lg bg-red-100/50 text-red-600">
                      <LogOut className="h-4 w-4" />
                    </div>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="font-bold text-slate-600 rounded-xl px-6" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
              <Button
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6 shadow-lg shadow-emerald-200 transition-all active:scale-95"
                asChild
              >
                <Link to="/signup">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Join Community
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle: Uses Sheet and Menu icon */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-2xl border-slate-100 text-slate-600 md:hidden hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="flex w-full sm:w-[400px] flex-col border-none bg-white p-0 overflow-y-auto"
          >
            {/* Header with Sprout icon */}
            <div className="p-8 bg-emerald-900 text-white">
              <SheetHeader className="text-left">
                <SheetTitle className="flex items-center gap-3 text-2xl font-bold text-white">
                  <Sprout className="h-8 w-8 text-emerald-400" />
                  AgriGuide
                </SheetTitle>
                <SheetDescription className="text-emerald-100/60 font-medium">
                  Sustainable farming at your fingertips.
                </SheetDescription>
              </SheetHeader>
            </div>

            {/* Mobile Nav Links: Uses Leaf icon */}
            <nav className="flex-1 px-4 py-8">
              <div className="grid gap-2">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'flex items-center gap-4 rounded-2xl px-6 py-4 text-lg font-bold transition-all',
                      isActive(link.path)
                        ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    )}
                  >
                    <Leaf
                      className={cn(
                        'h-5 w-5',
                        isActive(link.path) ? 'text-emerald-600' : 'text-slate-300'
                      )}
                    />
                    {link.label}
                  </Link>
                ))}
              </div>

              <Separator className="my-8 bg-slate-100" />

              {/* Mobile Auth/Profile: Uses User, History, LogOut icons */}
              {loggedIn ? (
                <div className="grid gap-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-4 px-6 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    <User className="h-5 w-5 text-slate-400" /> My Profile
                  </Link>
                  <Link
                    to="/history"
                    className="flex items-center gap-4 px-6 py-4 text-slate-600 font-bold hover:bg-slate-50 rounded-2xl transition-all"
                  >
                    <History className="h-5 w-5 text-slate-400" /> Farming History
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="mt-4 flex h-14 w-full items-center justify-start gap-4 rounded-2xl px-6 font-bold text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <LogOut className="h-5 w-5" /> Logout
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 px-2">
                  <Button
                    variant="outline"
                    className="h-14 rounded-2xl font-bold border-slate-200"
                    asChild
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    className="h-14 rounded-2xl font-bold bg-emerald-600 hover:bg-emerald-700"
                    asChild
                  >
                    <Link to="/signup">Join Now</Link>
                  </Button>
                </div>
              )}
            </nav>

            {/* Footer */}
            <div className="p-8 mt-auto bg-slate-50 border-t border-slate-100">
              <p className="text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                AgriGuide v2.0
              </p>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
