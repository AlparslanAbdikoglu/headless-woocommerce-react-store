import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { CartDrawer } from "./CartDrawer";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useTranslation } from 'react-i18next';

export const Navbar = ({ cartItem = [], isAuthenticated, setUserLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-xl font-bold text-primary">Webshop</div>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Desktop navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-primary hover:text-secondary transition-colors">
              {t('navbar.home') || 'Home'}
            </Link>
            <Link to="/products" className="text-primary hover:text-secondary transition-colors">
              {t('navbar.products') || 'Products'}
            </Link>
            <Link to="/about" className="text-primary hover:text-secondary transition-colors">
              {t('navbar.about') || 'About'}
            </Link>
            <Link to="/contact" className="text-primary hover:text-secondary transition-colors">
              {t('navbar.contact') || 'Contact'}
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/my-account" className="text-primary hover:text-secondary transition-colors">
                  {t('navbar.myAccount') || 'My Account'}
                </Link>
                <Link to="/my-orders" className="text-primary hover:text-secondary transition-colors">
                  {t('navbar.myOrders') || 'My Orders'}
                </Link>
                <button
                  onClick={setUserLogout}
                  className="text-primary hover:text-red-500 transition-colors"
                >
                  {t('navbar.logout') || 'Logout'}
                </button>
              </>
            ) : (
              <Link to="/login" className="text-primary hover:text-secondary transition-colors">
                {t('navbar.loginSignup') || 'Login / Signup'}
              </Link>
            )}
          </div>

          {/* Right-side buttons */}
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />

            {/* Cart Drawer and Badge */}
            <div className="relative">
              <CartDrawer />
              {cartItem.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartItem.length}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" onClick={toggleMenu}>{t('navbar.home') || 'Home'}</Link>
              <Link to="/products" onClick={toggleMenu}>{t('navbar.products') || 'Products'}</Link>
              <Link to="/about" onClick={toggleMenu}>{t('navbar.about') || 'About'}</Link>
              <Link to="/contact" onClick={toggleMenu}>{t('navbar.contact') || 'Contact'}</Link>

              {isAuthenticated ? (
                <>
                  <Link to="/my-account" onClick={toggleMenu}>{t('navbar.myAccount') || 'My Account'}</Link>
                  <Link to="/my-orders" onClick={toggleMenu}>{t('navbar.myOrders') || 'My Orders'}</Link>
                  <button
                    onClick={() => {
                      setUserLogout();
                      toggleMenu();
                    }}
                    className="text-left text-red-500"
                  >
                    {t('navbar.logout') || 'Logout'}
                  </button>
                </>
              ) : (
                <Link to="/login" onClick={toggleMenu}>{t('navbar.loginSignup') || 'Login / Signup'}</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
