"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNotification } from "@/hooks/useNotification";
import { signUpTeacher } from "@/services/auth.service";
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export default function SignUpTeacher() {
  const t = useTranslations('Auth.SignUp.Teacher');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [description, setDescription] = useState("");
  const [passcode, setPasscode] = useState("");
  const { showSuccess } = useNotification();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password || !nickname || !description || !passcode) {
        throw new Error("All fields are required");
      }

      if (passcode !== "david2025") {
        throw new Error("Invalid teacher registration code");
      }

      await signUpTeacher(email, password, nickname, description);
      showSuccess("Sign Up Successful! Please sign in.");
      setTimeout(() => router.push('/auth/signin'), 2000);
    } catch (error) {
      console.error("Teacher signup error:", error);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold">
            {t('title')}
          </h2>
          <p className="text-sm text-gray-600">
            {t('subtitle')}{' '}
            <Link href="/auth/signin" className="font-medium text-green-600 hover:text-green-500">
              {t('signInLink')}
            </Link>
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nickname">{t('nickname')}</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">{t('description')}</Label>
            <Input
              id="description"
              name="description"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{t('email')}</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{t('password')}</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passcode">{t('signupCode')}</Label>
            <Input
              id="passcode"
              name="passcode"
              type="password"
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <Button type="submit" className="w-full">
              {t('button')}
            </Button>
            <Link
              href="/auth/signup"
              className="block text-center text-sm text-gray-600 hover:text-gray-900"
            >
              {t('studentLink')}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
