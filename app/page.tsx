import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SiFusionauth, SiNextdotjs, SiPrisma, SiTailwindcss, SiTypescript } from 'react-icons/si';
import { FaDatabase } from 'react-icons/fa';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black flex flex-col items-center px-6 py-20">
      <HeroSection />
      <TechLogos />
      <FeaturesSection />
    </main>
  );
}


function HeroSection() {
  return (
    <section className="text-center max-w-2xl mb-20">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">AI Resume Reviewer</h1>
      <p className="text-neutral-700 text-lg mb-8">
        Improve your resume instantly with AI-powered feedback, scoring, and job-matching insights.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/sign-up">
          <Button variant="default" className="px-6 py-2 text-white bg-black hover:bg-gray-800">
            Sign Up
          </Button>
        </Link>
        {/* <Link href="/sign-in">
          <Button variant="outline" className="px-6 py-2 border-black text-black hover:bg-gray-200">
            Sign In
          </Button>
        </Link> */}
      </div>
    </section>
  );
}

function TechLogos() {
  const logos = [
    { icon: <SiNextdotjs size={25} />, alt: "Next.js" },
    { icon: <SiFusionauth className="text-green-600" size={25} />, alt: "Better Auth" },
    { icon: <SiPrisma size={25} />, alt: "Prisma" },
    { icon: <FaDatabase size={25} className="text-gray-500" />, alt: "Neon DB" },
    { icon: <SiTypescript className="text-blue-500" size={25} />, alt: "TypeScript" },
    { icon: <SiTailwindcss className="text-blue-300" size={25} />, alt: "Tailwind CSS" }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-10 mb-20 text-black">
      {logos.map((logo, idx) => (
        <div key={idx} title={logo.alt} className="hover:text-gray-500 transition-colors">
          {logo.icon}
        </div>
      ))}
    </div>
  );
}

function FeaturesSection() {
  const features = [
    {
      title: "AI Resume Scoring",
      desc: "Get instant feedback and a skill-based score for your resume.",
    },
    {
      title: "Job Match Analysis",
      desc: "Upload a job description and see how well your resume matches.",
    },
    {
      title: "ATS Optimization",
      desc: "Improve your resume for Applicant Tracking Systems.",
    },
    {
      title: "Skill Gap Detection",
      desc: "Identify missing skills required for your target roles.",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
      {features.map((feature, idx) => (
        <Card key={idx} className="bg-gray-100 border-gray-300 text-black rounded-2xl hover:-translate-y-1 hover:shadow-lg transition-all">
          <CardHeader>
            <CardTitle>{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-gray-700 text-sm">
            {feature.desc}
          </CardContent>
        </Card>
      ))}
    </section>
  );
}