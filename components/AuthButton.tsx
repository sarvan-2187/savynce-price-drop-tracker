"use client";

import React from 'react'
import { Button } from './ui/button'
import { LockIcon, LogOut } from 'lucide-react'
import { AuthModal } from './AuthModal';
import { signOut } from '@/app/actions';

const AuthButton = ({user}) => {
    const [showAuthModal, setShowAuthModal] = React.useState(false);
    if (user) {
        return (
            <form action={signOut}>
                <Button variant="ghost" size="sm" type="submit" className="gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </Button>
            </form>
        )
    }
    return (
        <>
            <Button onClick={() => setShowAuthModal(true)} variant="default" className="cursor-pointer bg-blue-600 hover:bg-blue-700 gap-2" size="default">
                <LockIcon className="w-4 h-4" />
                Sign In
            </Button> 
            <AuthModal isOpen={showAuthModal} onClose={setShowAuthModal} />
        </>
    )
}

export default AuthButton