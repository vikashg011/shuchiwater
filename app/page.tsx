'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Phone, Droplets, Wrench, Filter, Clock, Award, Users, Star, MessageCircle, Menu, X, Mail, Facebook, Instagram, Twitter } from 'lucide-react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    service: '',
    address: '',
  })

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (response.ok) {
        alert('Service booking request submitted! We will contact you soon.')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
    }
    
    const message = `Booking Request: Name: ${formData.name}, Mobile: ${formData.mobile}, Service: ${formData.service}, Address: ${formData.address}`
    window.open(`https://wa.me/919911585627?text=${encodeURIComponent(message)}`, '_blank')
    
    setFormData({
      name: '',
      mobile: '',
      service: '',
      address: '',
    })
  }

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        {/* Top Bar - Contact Info */}
        <div className="bg-primary/5 border-b border-primary/10 py-2">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
              {/* Left - Contact Info */}
              <div className="flex flex-wrap gap-4 items-center">
                <a href="tel:+919911585627" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition">
                  <Phone size={16} className="text-primary" />
                  <span className="font-semibold">9911585627</span>
                </a>
                <a href="mailto:shuchiwater@gmail.com" className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition">
                  <Mail size={16} className="text-primary" />
                  <span className="font-semibold">shuchiwater@gmail.com</span>
                </a>
              </div>

              {/* Right - Social Media */}
              <div className="flex gap-4 items-center">
                <span className="text-sm text-foreground/70 hidden md:inline">Follow us:</span>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/70 transition">
                  <Facebook size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/70 transition">
                  <Instagram size={18} />
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/70 transition">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Shuchi Water" className="h-12 w-auto" />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="text-foreground hover:text-primary transition">
              Services
            </button>
            <button onClick={() => scrollToSection('why-us')} className="text-foreground hover:text-primary transition">
              Why Us
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="text-foreground hover:text-primary transition">
              Testimonials
            </button>
            <a href="tel:+919911585627" className="bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2">
              <Phone size={18} />
              9911585627
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border p-4 space-y-3">
            <button onClick={() => scrollToSection('services')} className="block w-full text-left py-2 text-foreground hover:text-primary">
              Services
            </button>
            <button onClick={() => scrollToSection('why-us')} className="block w-full text-left py-2 text-foreground hover:text-primary">
              Why Us
            </button>
            <button onClick={() => scrollToSection('testimonials')} className="block w-full text-left py-2 text-foreground hover:text-primary">
              Testimonials
            </button>
            <a href="tel:+919911585627" className="block w-full bg-primary text-white px-4 py-2 rounded-lg font-semibold text-center hover:opacity-90">
              Call: 9911585627
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(/water-hero.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        
        <div className="relative container mx-auto px-4 z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Pure Water, Professional Care
              </h2>
              <p className="text-lg md:text-xl opacity-90 mb-6 text-balance">
                Expert RO repair, maintenance, and installation services at your doorstep. Genuine parts, affordable prices, and 24/7 support.
              </p>
              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="bg-white text-primary px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                >
                  Book Service Now
                </button>
                <a
                  href="https://wa.me/919911585627?text=Hi%20Shuchi%20RO%20Services,%20I%20need%20service"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-600 transition flex items-center gap-2"
                >
                  <MessageCircle size={20} />
                  WhatsApp
                </a>
              </div>
              
              <div className="bg-primary text-white p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <Phone size={28} />
                  <div>
                    <p className="text-sm opacity-90">Call Now</p>
                    <p className="text-2xl font-bold">+91 9911585627</p>
                  </div>
                </div>
                <p className="text-sm opacity-80">Available 24/7 for emergency services</p>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="bg-white rounded-lg shadow-xl p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6">Get Free Service Estimate</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    required
                    placeholder="10-digit mobile number"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Service Needed</label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a service</option>
                    <option value="RO Repair">RO Repair</option>
                    <option value="Filter Change">Filter Change</option>
                    <option value="Installation">New Installation</option>
                    <option value="AMC Plan">AMC Plan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    placeholder="Your Address"
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:opacity-90 transition"
                >
                  Submit & Get Service
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">Our Services</h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">Complete RO water purifier solutions for your home</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { image: '/ro-repair.jpg', title: 'RO Repair', description: 'Expert repair service for all RO models' },
              { image: '/filter-change.jpg', title: 'Filter Change', description: 'Regular filter maintenance and replacement' },
              { image: '/ro-installation.jpg', title: 'Installation', description: 'Professional RO system installation' },
              { image: '/amc-plan.jpg', title: 'AMC Plans', description: 'Annual maintenance contracts available' },
            ].map((service, i) => (
              <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <div className="relative h-48 w-full bg-primary/10">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover hover:scale-110 transition duration-300" />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">Why Choose Shuchi RO?</h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">Excellence in water purification services</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Award, title: 'Genuine Parts', description: 'Only original RO filters and parts used' },
              { icon: Users, title: 'Expert Team', description: 'Highly trained and certified technicians' },
              { icon: Clock, title: 'Quick Service', description: 'Fast response and on-time service delivery' },
              { icon: Droplets, title: 'Best Prices', description: 'Affordable and transparent pricing' },
            ].map((reason, i) => (
              <div key={i} className="bg-primary/5 rounded-lg border border-primary/20 p-6 text-center hover:border-primary transition">
                <reason.icon size={40} className="text-primary mx-auto mb-4" />
                <h3 className="font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-balance">Customer Testimonials</h2>
          <p className="text-center text-muted-foreground mb-12 text-balance">What our customers say about us</p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Rajesh Kumar', rating: 5, text: 'Excellent service! The technician was professional and fixed my RO in no time.' },
              { name: 'Priya Sharma', rating: 5, text: 'Very affordable and genuine parts used. Highly recommended for RO services.' },
              { name: 'Amit Patel', rating: 5, text: 'Best RO service provider in the area. Quick response and quality work guaranteed.' },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-lg shadow hover:shadow-lg transition p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} size={18} fill="gold" className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">{testimonial.text}</p>
                <p className="font-bold text-foreground">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-4">About Shuchi RO</h4>
              <p className="text-white/80 text-sm">Your trusted partner for clean, pure drinking water. Expert RO services since 2015.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition">RO Repair</a></li>
                <li><a href="#" className="hover:text-white transition">Filter Change</a></li>
                <li><a href="#" className="hover:text-white transition">Installation</a></li>
                <li><a href="#" className="hover:text-white transition">AMC Plans</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-white/80 text-sm">
                <li><a href="#" className="hover:text-white transition">Home</a></li>
                <li><a href="#services" className="hover:text-white transition">Services</a></li>
                <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-white/80 mb-2">
                <span className="font-semibold">Phone:</span> +91 9911585627
              </p>
              <p className="text-white/80 mb-2">
                <span className="font-semibold">Email:</span> shuchiwater@gmail.com
              </p>
              <p className="text-white/80 mb-2">
                <span className="font-semibold">Service Area:</span> Across your city
              </p>
              <p className="text-white/80">
                <span className="font-semibold">Hours:</span> 24/7 Available
              </p>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center text-white/80 text-sm">
            <p>&copy; 2024 Shuchi RO Services. All rights reserved. | Pure Water, Professional Care.</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919911585627?text=Hi%20Shuchi%20RO%20Services,%20I%20need%20service"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition z-40 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  )
}
