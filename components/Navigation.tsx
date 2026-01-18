"use client"
import LinkButton from './ui/LinkButton'
import { session } from '@/lib/server'
import LogoutButton from './ui/LogoutButton'
import { useSession } from '@/lib/auth-client'

const Navigation = () => {
    const {data:session,isPending} = useSession()
    const links = [
        { href: '/', text: 'Home' },
        // { href: '/about', text: 'About' },
        // { href: '/contact', text: 'Contact' },
    ] 
  return (
    <nav className='flex items-center justify-between px-6 py-4 border-b border-gray-200'>
        <h1 className='text-2xl font-bold'>Reviewer.ai</h1>
        <div className='flex gap-3 md:gap-4 items-center'>
            {
                links.map((link,i)=>(
                    <LinkButton key={i} href={link.href} text={link.text} />
                ))
            }
            {
                session?.user && <LogoutButton/>
            }
            {
                isPending && <p className='w-16 h-8 rounded-md bg-gray-100 animate-pulset'></p>
            }
        </div>
    </nav>
  )
}

export default Navigation