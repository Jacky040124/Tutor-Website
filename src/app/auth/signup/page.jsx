"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/common/Button";
import { TextField } from "@/components/common/Fields";
import { useError } from "@/components/providers/ErrorContext";
import { signUpStudent } from "@/services/auth.service";
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const { showError } = useError();
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      if (!email || !password || !nickname) {
        throw new Error("All fields are required");
      }

      await signUpStudent(email, password, nickname);
      showError("Sign Up Successful! Please sign in.");
      setTimeout(() => router.push('/auth/signin'), 2000);
      
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage = {
        'auth/email-already-in-use': 'An account with this email already exists',
        'auth/invalid-email': 'Invalid email format',
        'auth/weak-password': 'Password should be at least 6 characters',
      }[error.code] || error.message;
      
      showError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <div className="absolute top-4 left-4">
          <Link href="/" aria-label="Home">
            <Button variant="outline" color="slate" className="overlay-button-secondary">
              ← Back to home
            </Button>
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
          <div>
            <h2 className="text-3xl font-bold">Create your account</h2>
            <p className="mt-2 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/signin" className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </Link>
            </p>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSignup} className="space-y-6">
              <TextField
                label="Nickname"
                name="nickname"
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                required
              />
              <TextField
                label="Email address"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="space-y-4">
                <Button
                  type="submit"
                  variant="solid"
                  color="blue"
                  className="w-full flex justify-center bg-green-600 hover:bg-green-700"
                >
                  Sign up
                </Button>
                <Link
                  href="/auth/signupteacher"
                  className="block text-center text-sm text-gray-600 hover:text-gray-900"
                >
                  Sign up as a teacher instead
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden lg:block w-1/2 bg-green-600 relative">
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
          <h1 className="text-4xl font-bold mb-6">Start Learning Today</h1>
          <p className="text-xl text-center max-w-md">Join our community and learn from the best.</p>
        </div>
      </div>
    </div>
  );
}
