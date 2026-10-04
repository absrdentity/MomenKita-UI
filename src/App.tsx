/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TemplateGallery } from './components/TemplateGallery';
import { PricingSection } from './components/PricingSection';
import { GuestLinkGenerator } from './components/GuestLinkGenerator';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { LiveInvitationModal } from './components/LiveInvitationModal';
import { OrderWizardModal } from './components/OrderWizardModal';
import { Template } from './types';
import { TEMPLATES_DATA, PRICING_PACKAGES } from './data/mockData';

export default function App() {
  // Order Wizard Modal state
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [orderTemplateId, setOrderTemplateId] = useState<string>(TEMPLATES_DATA[0].id);
  const [orderPackageId, setOrderPackageId] = useState<string>(PRICING_PACKAGES[1].id);
  const [orderAddOns, setOrderAddOns] = useState<string[]>(['addon-qr-checkin']);

  // Live Invitation Preview Modal state
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(TEMPLATES_DATA[0]);

  // Guest Link Generator state
  const [guestSlug, setGuestSlug] = useState('budi-ayu');

  const handleOpenOrder = (templateId?: string, packageId?: string, addOns?: string[]) => {
    if (templateId) setOrderTemplateId(templateId);
    if (packageId) setOrderPackageId(packageId);
    if (addOns) setOrderAddOns(addOns);
    setIsOrderOpen(true);
  };

  const handleExploreTemplates = () => {
    const el = document.getElementById('katalog-template');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePreviewTemplate = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleLivePreviewSample = () => {
    setPreviewTemplate(TEMPLATES_DATA[0]);
    setIsPreviewOpen(true);
  };

  const handleSelectTemplateFromPreview = (templateId: string) => {
    setIsPreviewOpen(false);
    handleOpenOrder(templateId);
  };

  const handleSelectPackageFromPricing = (packageId: string, addOns: string[]) => {
    handleOpenOrder(undefined, packageId, addOns);
  };

  const handleOpenGuestGenerator = (bride: string, groom: string) => {
    const safeSlug = `${groom.toLowerCase().replace(/[^a-z0-9]/g, '')}-${bride.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
    setGuestSlug(safeSlug || 'budi-ayu');
    const el = document.getElementById('generator-tamu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-stone-900 selection:bg-amber-200 selection:text-stone-900 flex flex-col">
      {/* 3-Zone Navigation Header */}
      <Navbar onOpenOrder={() => handleOpenOrder()} />

      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onExploreTemplates={handleExploreTemplates}
          onOpenOrder={() => handleOpenOrder()}
          onLivePreviewSample={handleLivePreviewSample}
        />

        {/* Template Catalog & Interactive Filter */}
        <TemplateGallery
          onSelectTemplate={(templateId) => handleOpenOrder(templateId)}
          onPreviewTemplate={handlePreviewTemplate}
        />

        {/* Pricing Tiers & Add-on Customizer */}
        <PricingSection onSelectPackage={handleSelectPackageFromPricing} />

        {/* Guest Link & WhatsApp Broadcast Generator Tool */}
        <GuestLinkGenerator customSlug={guestSlug} />

        {/* Testimonials from Real Couples */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onOpenOrder={() => handleOpenOrder()} />

      {/* Interactive Mobile Invitation Simulator Modal */}
      <LiveInvitationModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        template={previewTemplate}
        onSelectTemplate={handleSelectTemplateFromPreview}
      />

      {/* 4-Step Order Wizard & Automated Payment Modal */}
      <OrderWizardModal
        isOpen={isOrderOpen}
        onClose={() => setIsOrderOpen(false)}
        initialTemplateId={orderTemplateId}
        initialPackageId={orderPackageId}
        initialAddOns={orderAddOns}
        onOpenGuestGenerator={handleOpenGuestGenerator}
      />
    </div>
  );
}
