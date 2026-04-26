// frontend/src/components/Navbar.tsx

import { Link, useLocation } from 'react-router-dom';
import { Menu, Sprout, LogIn, UserPlus, User, History, LogOut, ChevronDown } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
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
  const user = getUser();
  const loggedIn = isLoggedIn();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="rounded-2xl bg-emerald-700 p-2.5 shadow-sm transition-transform duration-200 group-hover:rotate-6">
            <Sprout className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-bold tracking-tight text-gray-900">AgriGuide</span>
            <span className="hidden text-xs text-gray-500 sm:block">Smart farming assistant</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'h-10 bg-transparent px-4 text-sm font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700',
                    isActive(link.path) ? 'bg-emerald-50 text-emerald-700' : 'text-gray-600'
                  )}
                >
                  <Link to={link.path}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {loggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="h-11 rounded-2xl border-emerald-200 bg-white px-4 text-gray-700 shadow-sm hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <div className="mr-2 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-700">
                    <User className="h-3.5 w-3.5 text-white" />
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium">
                    {user?.name || 'Account'}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-lg">
                <DropdownMenuLabel className="px-3 py-2 text-xs font-normal text-gray-400">
                  {user?.email || 'Signed in'}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 cursor-pointer">
                  <Link to="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-emerald-600" />
                    My Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-xl px-3 py-2 cursor-pointer">
                  <Link to="/history" className="flex items-center gap-2">
                    <History className="h-4 w-4 text-emerald-600" />
                    My History
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="rounded-xl px-3 py-2 text-red-500 focus:bg-red-50 focus:text-red-600 cursor-pointer"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                className="h-11 rounded-2xl px-4 text-gray-700 hover:bg-emerald-50 hover:text-emerald-700"
                asChild
              >
                <Link to="/login" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Log in
                </Link>
              </Button>

              <Button
                className="h-11 rounded-2xl bg-emerald-700 px-5 font-semibold text-white shadow-sm hover:bg-emerald-800"
                asChild
              >
                <Link to="/signup" className="flex items-center gap-2">
                  <UserPlus className="h-4 w-4" />
                  Get Started
                </Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-11 w-11 rounded-2xl border-emerald-200 bg-white text-emerald-700 shadow-sm md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="flex w-[320px] flex-col rounded-l-3xl px-5 py-6">
            <SheetHeader className="text-left">
              <SheetTitle className="flex items-center gap-3 text-gray-900">
                <div className="rounded-2xl bg-emerald-700 p-2">
                  <Sprout className="h-5 w-5 text-white" />
                </div>
                AgriGuide
              </SheetTitle>
              <SheetDescription>Navigate through the app and manage your account.</SheetDescription>
            </SheetHeader>

            <Separator className="my-5" />

            <nav className="flex flex-1 flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    'flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive(link.path)
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {link.label}
                </Link>
              ))}

              {loggedIn && (
                <>
                  <Separator className="my-3" />
                  <Link
                    to="/profile"
                    className={cn(
                      'flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                      isActive('/profile')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <User className="h-4 w-4" />
                    My Profile
                  </Link>
                  <Link
                    to="/history"
                    className={cn(
                      'flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition-colors',
                      isActive('/history')
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <History className="h-4 w-4" />
                    My History
                  </Link>
                </>
              )}
            </nav>

            <div className="mt-auto pt-4">
              <Separator className="mb-4" />
              {loggedIn ? (
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="h-11 w-full rounded-2xl border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              ) : (
                <div className="grid gap-3">
                  <Button
                    className="h-11 w-full rounded-2xl bg-emerald-700 text-white hover:bg-emerald-800"
                    asChild
                  >
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-2xl border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                    asChild
                  >
                    <Link to="/login">Log in</Link>
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
