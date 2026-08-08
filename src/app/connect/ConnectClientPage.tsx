'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  PhoneCall,
  MessageCircle,
  Globe,
  Mail,
  FileText,
  MapPin,
  Clock,
  Zap,
  Menu,
  X,
  ArrowRight
} from 'lucide-react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>;
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>;
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>;

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function ConnectClientPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#2dbfbb] selection:text-white flex flex-col">
      
      {/* ---------------- NAVBAR ---------------- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-white py-6 shadow-sm'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src="https://unidus.co.in/assets/logo2.png" alt="UNIDUS Logo" className="h-10 md:h-12 object-contain" />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 font-medium">
            <a href="#" className="text-slate-600 hover:text-[#2dbfbb] transition-colors">Home</a>
            <a href="#" className="text-slate-600 hover:text-[#2dbfbb] transition-colors">Services</a>
            <a href="#" className="text-slate-600 hover:text-[#2dbfbb] transition-colors">About Us</a>
            <a href="#" className="text-slate-600 hover:text-[#2dbfbb] transition-colors">Projects</a>
            <a href="/go/call" className="bg-[#2dbfbb] text-white px-6 py-2.5 rounded-full hover:bg-[#25a3a0] transition-colors shadow-lg shadow-[#2dbfbb]/30">Contact Us</a>
          </div>

          {/* Mobile Toggle */}
          <button className="lg:hidden text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 flex flex-col gap-4 px-6 border-t border-slate-100">
            <a href="#" className="text-slate-700 font-medium py-2">Home</a>
            <a href="#" className="text-slate-700 font-medium py-2">Services</a>
            <a href="#" className="text-slate-700 font-medium py-2">About Us</a>
            <a href="#" className="text-slate-700 font-medium py-2">Projects</a>
            <a href="/go/call" className="bg-[#2dbfbb] text-center text-white px-6 py-3 rounded-xl font-medium mt-2">Contact Us</a>
          </div>
        )}
      </nav>

      {/* ---------------- MAIN CONTACT SECTION ---------------- */}
      <main className="flex-grow pt-32 pb-20">
        {/* Header / Intro & Primary Buttons */}
        <div className="container mx-auto px-6 mb-20 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.div variants={fadeInUp} className="inline-block bg-[#2dbfbb]/10 text-[#2dbfbb] px-4 py-1.5 rounded-full text-sm font-semibold mb-6">
              Connect With Us
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-slate-900 leading-tight">
              We're Here To Help Your Business Grow
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 mb-12">
              Reach out to UNIDUS for any software, hardware, or automation inquiries. Choose your preferred method below and our team will get back to you instantly.
            </motion.p>
            
            {/* PRIMARY BUTTONS - Centered & Highly Prominent */}
            <motion.div variants={fadeInUp} className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
              <ContactActionButton 
                href="/go/whatsapp" 
                icon={<MessageCircle />} 
                title="Chat on WhatsApp" 
                subtitle="Fastest response time"
                color="border-transparent bg-green-500 hover:bg-green-600 shadow-[0_10px_30px_rgba(34,197,94,0.3)] hover:-translate-y-1" 
                primary={true}
              />
              <ContactActionButton 
                href="/go/form" 
                icon={<FileText />} 
                title="Are you intrested? Fill Enquiry Form" 
                subtitle="Tell us about your project requirements"
                color="border-transparent bg-[#2dbfbb] hover:bg-[#25a3a0] shadow-[0_10px_30px_rgba(45,191,187,0.3)] hover:-translate-y-1" 
                primary={true}
              />
            </motion.div>
          </motion.div>
        </div>

        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto items-start">
            
            {/* Left side: Secondary Action Buttons */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="flex flex-col gap-4"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Other Options</h3>
              <p className="text-slate-500 mb-6">Additional ways to connect with our team.</p>

              <ContactActionButton 
                href="/go/email" 
                icon={<Mail />} 
                title="Email Us" 
                subtitle="info@unidus.in"
                color="border-slate-200 bg-white hover:border-[#2dbfbb] hover:shadow-md" 
                primary={false}
                iconColor="text-indigo-500"
              />
              <ContactActionButton 
                href="/go/website" 
                icon={<Globe />} 
                title="Visit Main Website" 
                subtitle="unidus.co.in"
                color="border-slate-200 bg-white hover:border-[#2dbfbb] hover:shadow-md" 
                primary={false}
                iconColor="text-slate-700"
              />
            </motion.div>

            {/* Right side: Office Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Office Information</h3>
              
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2dbfbb]/10 text-[#2dbfbb] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Head Office</h4>
                    <p className="text-slate-600 mt-1">123 Tech Park, Innovation Valley<br />City, State, 123456</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#2dbfbb]/10 text-[#2dbfbb] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-slate-900">Business Hours</h4>
                    <p className="text-slate-600 mt-1">Mon - Fri, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bg-slate-100 rounded-2xl h-[250px] border border-slate-200 flex items-center justify-center overflow-hidden relative">
                 <div className="absolute inset-0 opacity-20 bg-[url('/images/grid.svg')]"></div>
                 <div className="text-center z-10">
                   <MapPin className="w-10 h-10 text-[#2dbfbb] mx-auto mb-3" />
                   <span className="font-medium text-slate-500">Google Maps Embedded</span>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-[#1e293b] text-white pt-20 pb-10 border-t-4 border-[#2dbfbb] mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="mb-6">
                <img src="https://unidus.co.in/assets/logo2.png" alt="UNIDUS Logo" className="h-10 md:h-12 object-contain" />
              </div>
              <p className="text-slate-400 leading-relaxed mb-6">
                One Partner For Every Digital Need. Providing complete Software + Hardware solutions.
              </p>
              <div className="flex gap-4">
                <SocialLink href="#" icon={<FacebookIcon />} />
                <SocialLink href="#" icon={<InstagramIcon />} />
                <SocialLink href="#" icon={<LinkedinIcon />} />
                <SocialLink href="#" icon={<TwitterIcon />} />
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Home</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> About Us</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Services</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Projects</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Contact</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Our Services</h4>
              <ul className="space-y-3 text-slate-400">
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors">Software Development</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors">Mobile Applications</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors">IoT Solutions</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors">Embedded Systems</a></li>
                <li><a href="#" className="hover:text-[#2dbfbb] transition-colors">Cloud & AI</a></li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Newsletter</h4>
              <p className="text-slate-400 mb-4">Subscribe to get the latest updates and tech insights.</p>
              <div className="flex flex-col gap-3">
                <input type="email" placeholder="Your Email Address" className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-[#2dbfbb]" />
                <button className="bg-[#2dbfbb] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#25a3a0] transition-colors">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; {new Date().getFullYear()} UNIDUS. All rights reserved.</p>
            <div className="flex gap-6">
               <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </footer>

      {/* ---------------- FLOATING BUTTONS ---------------- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        <a
          href="/go/form"
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
          aria-label="Enquiry Form"
        >
          <FileText className="w-5 h-5" />
        </a>
        <a
          href="/go/whatsapp"
          className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform"
          aria-label="WhatsApp Us"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </div>
  );
}

/* Sub-components */

function ContactActionButton({ href, icon, title, subtitle, color, primary = true, iconColor = "" }: { href: string, icon: React.ReactNode, title: string, subtitle: string, color: string, primary?: boolean, iconColor?: string }) {
  return (
    <motion.a
      variants={fadeInUp}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      href={href}
      className={`group flex items-center p-4 md:p-5 rounded-2xl border transition-all duration-300 ${color}`}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-inner transition-colors ${primary ? 'bg-white/20 text-white' : `bg-slate-100 ${iconColor}`}`}>
        {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
      </div>
      <div className="ml-5">
        <h4 className={`font-bold text-lg ${primary ? 'text-white' : 'text-slate-800'}`}>{title}</h4>
        <p className={`text-sm ${primary ? 'text-white/80' : 'text-slate-500'}`}>{subtitle}</p>
      </div>
      <ArrowRight className={`w-5 h-5 ml-auto transition-all ${primary ? 'text-white/50 group-hover:text-white' : 'text-slate-400 group-hover:text-[#2dbfbb]'} group-hover:translate-x-1`} />
    </motion.a>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  return (
    <a
      href={href}
      className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#2dbfbb] hover:text-white transition-all duration-300 hover:scale-110"
    >
      {React.cloneElement(icon as React.ReactElement<any>, { className: 'w-4 h-4' })}
    </a>
  );
}
