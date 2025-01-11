import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Image
              src={"/phil-iri-logo.png"}
              alt={"logo"}
              width={30}
              height={30}
              className={"object-contain"}
            />
            <p className="text-blue-100 text-sm md:text-base">
              AI-powered reading assessment platform revolutionizing education
              in the Philippines.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <Link
                  href="/practice"
                  className="text-blue-100 hover:text-white"
                >
                  Practice
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-blue-100 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-100 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm md:text-base text-blue-100">
              <li>Email: contact@phil-iri.com</li>
              <li>Phone: +63 XXX XXX XXXX</li>
              <li>Location: Manila, Philippines</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Follow Us</h4>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/phil.iri.printables"
                target="_blank"
                className="text-blue-100 hover:text-white"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="https://x.com/?mx=2"
                target="_blank"
                className="text-blue-100 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                className="text-blue-100 hover:text-white"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 mt-8 pt-8 text-center text-sm md:text-base text-blue-100">
          <p>
            &copy; {new Date().getFullYear()} Phil-IRI+. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
