"use client"

import { useState, useEffect } from 'react';
import { auth, db, doc, getDoc } from "@/app/firebase";
import { useUser } from "@/components/UserContext"
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { AuthBackground } from '@/components/AuthBackground'
import { BackToHomeButton } from '@/components/BackToHomeButton';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorText, setErrorText] = useState("");
    const router = useRouter();
    const { user, setUser } = useUser();

    const Header = () => {
        return(
            <div>
                <h2 className="text-3xl font-bold">Sign in to your account</h2>

                <p className="mt-2 text-sm text-gray-600">
                    Dont have an account?
                    {' '} <Link href="/signup" className="font-medium text-green-600 hover:text-green-500"> Sign up </Link> {' '}
                    for a free trial.
                </p>
            </div>
        )
    }

    const InteractiveFields = () => {
        return (
            <div className="mt-8">
                <form onSubmit={handleSignIn} className="space-y-6">
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
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    
                    {errorText && (
                        <div className="text-red-500 text-sm">
                            {errorText}
                        </div>
                    )}

                    <div> 
                        <Button type="submit" variant="solid" color="blue" className="w-full flex justify-center bg-green-600 hover:bg-green-700"> 
                            Sign in → 
                        </Button> 
                    </div>
                </form>
            </div>
        )
    }

    // Handle auth state changes
    useEffect(() => {
        console.log("Current user in effect:", user);
        if (user) {
            if (user.type === "teacher") {
                router.replace("/user/teacher");
            } else if (user.type === "student") {
                router.replace("/user/student");
            }
        }
    }, [user, router]);

    const handleSignIn = async (e) => {
        e.preventDefault(); // Prevent form submission
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log('Sign-in successful:', userCredential.user.uid);
            
            // Get user data from Firestore
            const docRef = doc(db, "users", userCredential.user.uid);
            const docSnap = await getDoc(docRef);
            
            if (!docSnap.exists()) {
                setErrorText("User data not found");
                return;
            }

            const userData = docSnap.data();
            
            // If user is a teacher, fetch availability
            let availability = null;
            if (userData.type === "teacher") {
                const availabilityRef = doc(db, "availability", userCredential.user.uid);
                const availabilitySnap = await getDoc(availabilityRef);
                if (availabilitySnap.exists()) {
                    availability = availabilitySnap.data();
                }
            }

            setUser({email: userCredential.user.email, uid: userCredential.user.uid, type: userData.type, availability: availability});
            
        } catch (error) {
            setErrorText(error.message || "Sign in failed");
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-1/2 flex flex-col px-8 lg:px-12 xl:px-16">

                <BackToHomeButton/>

                <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full">
                    <Header />
                    <InteractiveFields />
                </div>
            </div>

            <AuthBackground text1={"Welcome Back!"} text2={"Connect with the best tutors and continue your learning journey today."}/>
        </div>
    );
}

