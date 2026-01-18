import Link from 'next/link'
import React from 'react'
import LinkButton from './ui/LinkButton'

const Navigation = () => {
    const links = [
        { href: '/', text: 'Home' },
        { href: '/about', text: 'About' },
        { href: '/contact', text: 'Contact' },
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
        </div>
    </nav>
  )
}

export default Navigation