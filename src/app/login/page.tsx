'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'

export default function LoginPage() {
    const router = useRouter()

    useEffect(() => {
        router.replace('/pitch')
    }, [router])

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <h1 className="text-xl font-bold text-white mb-2">Entering the War Room...</h1>
            <p className="text-zinc-400 text-sm mb-6">Direct access enabled. Taking you straight to your pitch session.</p>
            <Link href="/pitch">
                <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                    Enter War Room <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </Link>
        </div>
    )
}
