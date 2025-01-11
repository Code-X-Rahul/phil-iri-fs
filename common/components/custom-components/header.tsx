"use client";

import Link from "next/link";

import { Phone, User, Menu, X } from "lucide-react";

import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { Button } from "../button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
} from "../sheet";
import Image from "next/image";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="flex gap-2 items-center text-2xl font-bold text-[#0052CC]"
        >
          <Image src="/phil-iri-logo.png" alt="logo" width={30} height={30} />
          <span className="text-[#0052CC]">Phil-IRI</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-[#0052CC]">
            Home
          </Link>
          <Link href="/practice" className="text-gray-600 hover:text-[#0052CC]">
            Practice
          </Link>
          <Link href="/about" className="text-gray-600 hover:text-[#0052CC]">
            About Us
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:text-[#0052CC]"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/login" className="w-full">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/register" className="w-full">
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:text-[#0052CC]"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <Link href="/login" className="w-full">
                  Login
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/register" className="w-full">
                  Register
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-left">Navigation Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-6">
                <Link
                  href="/"
                  className="text-lg font-medium hover:text-[#0052CC]"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/practice"
                  className="text-lg font-medium hover:text-[#0052CC]"
                  onClick={() => setIsOpen(false)}
                >
                  Practice
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium hover:text-[#0052CC]"
                  onClick={() => setIsOpen(false)}
                >
                  About Us
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
