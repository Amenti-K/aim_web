import Link from "next/link";
import {
  LayoutDashboard,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

export const PublicFooter = () => {
  return (
    <footer className="bg-foreground text-background dark:bg-card dark:text-foreground border-t dark:border-border transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                <LayoutDashboard size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-white dark:text-foreground">
                AIM <span className="text-primary">Stock</span>
              </span>
            </Link>
            <p className="text-muted-foreground leading-relaxed max-w-xs">
              AIM Stock is a modern ERP solution designed to streamline your
              business operations through powerful inventory, sales, and
              warehouse management tools.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="p-2 bg-white/10 dark:bg-muted rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/10 dark:bg-muted rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/10 dark:bg-muted rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 bg-white/10 dark:bg-muted rounded-full hover:bg-primary hover:text-white transition-all"
              >
                <Linkedin size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">
              Product
            </h4>
            <ul className="space-y-4">
              {["Features", "Services", "Pricing", "About Us"].map((link) => (
                <li key={link}>
                  <Link
                    href={`/${link.toLowerCase().replace(" ", "-")}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">
              Support
            </h4>
            <ul className="space-y-4">
              {["Documentation", "Help Center", "Community"].map((link) => (
                <li key={link}>
                  <Link
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-white dark:text-foreground">
              Contact Us
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-muted-foreground">
                <Mail size={18} className="mt-1 flex-shrink-0 text-primary" />
                <span>support@aimstock.com</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <Phone size={18} className="mt-1 flex-shrink-0 text-primary" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-start space-x-3 text-muted-foreground">
                <MapPin size={18} className="mt-1 flex-shrink-0 text-primary" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 dark:border-border text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} AIM Stock. All rights reserved. Built
            for enterprises.
          </p>
        </div>
      </div>
    </footer>
  );
};
