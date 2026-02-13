import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";

import { Button } from "./button";
import Image from "next/image";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full border-b bg-background/80 backdrop-blur-md z-50 shadow-sm">
      <nav className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center">
          <Image
            src="/logo-single.png"
            alt="Medimeet logo"
            width={160}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* When User is Logged Out */}
          <SignedOut>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="rounded-full px-6 transition-all duration-300 hover:scale-105">
                Sign In
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="rounded-full px-6 transition-all duration-300 hover:scale-105">
                Sign Up
              </Button>
            </Link>
          </SignedOut>

          {/* When User is Logged In */}
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 ring-2 ring-primary ring-offset-2 ring-offset-background transition-all duration-300 hover:scale-105",
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};
