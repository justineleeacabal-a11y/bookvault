"use client";

import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

import Logo from "@/assets/image.png";
import LogoLight from "@/assets/image.png";
import RightImage from "@/assets/left-image.png";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  // New State for Names
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = createClient();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${window.location.origin}/protected`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border-none shadow-xl">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* --- Left Side (Form) --- */}
          <div className="p-6 md:p-8 flex flex-col justify-center">
            <CardHeader className="flex flex-col items-center space-y-2 text-center p-0 mb-6">
              <Link href={"/"} className="mb-2">
                <Image src={LogoLight} alt="Book Vault" width={800} height={800} className="block dark:hidden" />
                <Image src={Logo} alt="Book Vault" width={800} height={800} className="hidden dark:block" />
              </Link>
              <CardTitle className="text-2xl font-bold tracking-tight">
                Create an Account
              </CardTitle>
              <CardDescription>
                Join the Book Vault and start your collection
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSignUp} className="space-y-4">
              {/* --- First & Last Name Grid --- */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    required
                    className="pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="repeat-password">Confirm Password</Label>
                <Input
                  id="repeat-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className="text-sm font-medium text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* --- Right Side (Image) --- */}
          <div className="bg-muted relative hidden md:block">
            <Image
              src={RightImage}
              alt="Cozy reading nook"
              fill
              className="object-cover dark:brightness-[0.3] grayscale-[0.5]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <p className="text-white text-sm italic font-light">
                "Every secret of a writer's soul, every experience of his life, every quality of his mind, is written large in his works."
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}