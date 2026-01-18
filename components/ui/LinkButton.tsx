import React from 'react'
import { Button } from './button';
import Link from 'next/link';
import { JSX } from 'react/jsx-runtime';
import { Ghost } from 'lucide-react';

export interface LinkButtonProps {
    href: string;
    text: string;
    className?: string;
}

const LinkButton = ({ href, text, className }: LinkButtonProps) => {
  return <Button variant={"ghost"} asChild>
    <Link href={href} className={`${className}`}>{text}</Link>
  </Button>
}

export default LinkButton