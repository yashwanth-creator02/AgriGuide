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

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-green-600 p-2 rounded-xl transition-transform group-hover:rotate-12">
              <Sprout className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-green-900">AgriGuide</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="gap-1">
            {links.map((link) => (
              <NavigationMenuItem key={link.path}>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'relative h-9 bg-transparent transition-all hover:text-green-700',
                    location.pathname === link.path
                      ? 'text-green-700 font-semibold after:absolute after:bottom-0 after:left-2 after:right-2 after:h-0.5 after:bg-green-600'
                      : 'text-muted-foreground'
                  )}
                >
                  <Link to={link.path}>{link.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            {loggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 border-green-200 hover:bg-green-50 rounded-xl px-4"
                  >
                    <div className="bg-green-600 rounded-full p-1">
                      <User className="h-3.5 w-3.5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
                  <DropdownMenuLabel className="text-xs text-gray-400 font-normal">
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/history" className="flex items-center gap-2 cursor-pointer">
                      <History className="h-4 w-4 text-green-600" />
                      My History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login" className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Log in
                  </Link>
                </Button>
                <Button size="sm" className="bg-green-700 hover:bg-green-800 shadow-md" asChild>
                  <Link to="/signup" className="flex items-center gap-2">
                    <UserPlus className="h-4 w-4" />
                    Get Started
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="md:hidden border-green-200 bg-green-50/50"
              >
                <Menu className="h-5 w-5 text-green-700" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2 text-green-800">
                  <Sprout className="h-6 w-6 text-green-600" /> AgriGuide
                </SheetTitle>
                <SheetDescription>Navigate through AgriGuide</SheetDescription>
              </SheetHeader>
              <Separator className="my-6" />
              <nav className="flex flex-col gap-4">
                {links.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      'flex items-center text-lg font-medium transition-colors hover:text-green-600 py-2',
                      location.pathname === link.path ? 'text-green-700' : 'text-muted-foreground'
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {loggedIn && (
                  <Link
                    to="/history"
                    className={cn(
                      'flex items-center text-lg font-medium transition-colors hover:text-green-600 py-2',
                      location.pathname === '/history' ? 'text-green-700' : 'text-muted-foreground'
                    )}
                  >
                    My History
                  </Link>
                )}
              </nav>
              <div className="mt-auto flex flex-col gap-3 pb-8 pt-8">
                <Separator className="my-4" />
                {loggedIn ? (
                  <Button
                    variant="outline"
                    className="w-full border-red-200 text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </Button>
                ) : (
                  <>
                    <Button className="w-full bg-green-700" asChild>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                    <Button variant="outline" className="w-full border-green-200" asChild>
                      <Link to="/login">Log in</Link>
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
