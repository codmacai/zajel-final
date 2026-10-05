'use client';

import { Box, Clock, FileText, MessageSquare, Phone, Send, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { InputField, SelectField, SidebarAction } from './fields';

const EASE = [0.2, 0.8, 0.2, 1] as const;

export default function SupportTicketForm() {
  return (
    <section className="w-full bg-[#FDFDFD] px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(1rem,3vw,2rem)] pb-[clamp(3rem,6vw,5rem)] font-sans">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, ease: EASE }}
        className="mx-auto flex max-w-[1300px] flex-col items-start gap-[clamp(1.5rem,4vw,3rem)] lg:flex-row"
      >
        {/* Main form */}
        <div className="w-full flex-1 rounded-[clamp(1.5rem,3vw,2.5rem)] border border-[#0A4D26]/8 bg-white p-[clamp(1.5rem,4vw,3.5rem)] shadow-[0_4px_20px_rgba(6,68,35,0.03)]">
          <form className="space-y-[clamp(1.5rem,4vw,3rem)]" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-[clamp(1rem,2vw,1.5rem)]">
              <h2 className="text-lg font-medium tracking-tight text-[#0A4D26]">Service Information</h2>
              <div className="grid grid-cols-1 gap-[clamp(1rem,2vw,1.5rem)]">
                <SelectField label="Product" hint="Choose the service related to your issue" />
                <SelectField label="Ticket Type" hint="This helps us route your request faster" />
                <SelectField label="Issue Related To" hint="Select the closest match to your concern" />
              </div>
            </div>

            <div className="space-y-[clamp(1rem,2vw,1.5rem)] pt-2">
              <h2 className="text-lg font-medium tracking-tight text-[#0A4D26]">Personal Details</h2>
              <div className="grid grid-cols-1 gap-x-[clamp(1rem,2vw,1.5rem)] gap-y-[clamp(1rem,2vw,1.5rem)] md:grid-cols-2">
                <InputField label="First Name" placeholder="Enter your first name" />
                <InputField label="Last Name" placeholder="Enter your last name" />
                <InputField
                  label="Email Address"
                  placeholder="Enter your email address"
                  hint="Ticket updates will be sent to this email"
                />
                <InputField
                  label="Phone Number"
                  placeholder="Enter your mobile number"
                  hint="Used only if urgent clarification is required"
                />
              </div>
            </div>

            <div className="space-y-[clamp(1rem,2vw,1.5rem)] pt-2">
              <h2 className="text-lg font-medium tracking-tight text-[#0A4D26]">Shipment Identifier</h2>
              <InputField
                label="AWB / Application Number"
                placeholder="Enter AWB or application number (if available)"
                hint="Providing this helps us resolve your issue faster"
              />
            </div>

            <div className="space-y-[clamp(1rem,2vw,1.5rem)] pt-2">
              <h2 className="text-lg font-medium tracking-tight text-[#0A4D26]">Issue Details</h2>
              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-medium text-[#0A4D26]/90">
                  Message <span className="text-[#36B936]">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Please describe your issue in detail. Include shipment status, dates, locations, or any relevant information."
                  className="w-full resize-none rounded-xl border border-[#0A4D26]/10 bg-[#FAFBF8] p-4 text-[13px] text-[#0A4D26] outline-none placeholder:text-[#0A4D26]/30 focus:border-[#36B936]/40"
                />
                <p className="text-[11px] font-light text-[#0A4D26]/40">
                  The more details you provide, the faster we can assist you.
                </p>
              </div>
            </div>

            <div className="space-y-[clamp(1rem,2vw,1.5rem)] pt-2">
              <h2 className="text-lg font-medium tracking-tight text-[#0A4D26]">Verification</h2>
              <div className="flex flex-col gap-3">
                <label className="text-[13px] font-medium text-[#0A4D26]/90">
                  Enter the code shown below <span className="text-[#36B936]">*</span>
                </label>
                <div className="flex flex-wrap items-stretch gap-3">
                  <div className="flex select-none items-center justify-center rounded-xl border border-[#36B936]/20 bg-[#36B936]/5 px-8 py-3 text-[18px] font-semibold tracking-[0.3em] text-[#36B936]">
                    TJ35LT
                  </div>
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="min-w-[160px] flex-1 rounded-xl border border-[#0A4D26]/10 bg-[#FAFBF8] p-4 text-[13px] text-[#0A4D26] outline-none focus:border-[#36B936]/40"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-[11px] font-light text-[#0A4D26]/40">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#36B936]" />
                <span>Your information is secure and will only be used to assist with your request.</span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#36B936] px-[clamp(1.5rem,3vw,3rem)] py-[clamp(0.75rem,1.5vw,1rem)] text-[14px] font-medium tracking-wide text-white shadow-sm transition-all hover:bg-[#0A4D26] active:scale-95 sm:w-auto"
              >
                Submit Ticket
                <Send className="h-3.5 w-3.5" />
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:sticky lg:top-10 lg:w-[clamp(280px,25vw,360px)]">
          <div className="rounded-[clamp(1.5rem,3vw,2.5rem)] border border-[#0A4D26]/8 bg-white p-[clamp(1.5rem,3vw,2.5rem)] shadow-[0_8px_30px_rgba(6,68,35,0.03)]">
            <div className="mb-1.5 flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#36B936]/10">
                <MessageSquare className="h-4 w-4 text-[#0A4D26]" />
              </div>
              <h3 className="text-[clamp(15px,1.5vw,18px)] font-medium leading-tight text-[#0A4D26]">
                Need Quick Help?
              </h3>
            </div>
            <p className="mb-8 text-[clamp(11px,1.2vw,13px)] font-light text-[#0A4D26]/40">
              Before raising a ticket, you may try:
            </p>

            <div className="mb-8 space-y-3">
              <SidebarAction
                icon={<Box className="h-[clamp(14px,1.5vw,18px)] w-[clamp(14px,1.5vw,18px)]" />}
                label="Track Your Shipment"
              />
              <SidebarAction
                icon={<FileText className="h-[clamp(14px,1.5vw,18px)] w-[clamp(14px,1.5vw,18px)]" />}
                label="View FAQs"
              />
              <SidebarAction
                icon={<Phone className="h-[clamp(14px,1.5vw,18px)] w-[clamp(14px,1.5vw,18px)]" />}
                label="Contact Support"
              />
            </div>

            <button className="flex h-[clamp(40px,4vw,48px)] w-full items-center justify-center rounded-full bg-[#0A4D26] text-[clamp(12px,1.1vw,14px)] font-medium tracking-wide text-[#36B936] transition-colors hover:bg-[#0A4D26]/90">
              Submit
            </button>

            <div className="mt-[clamp(1.5rem,3vw,2rem)] space-y-[clamp(1rem,2vw,1.5rem)] border-t border-[#0A4D26]/8 pt-[clamp(1.5rem,3vw,2rem)]">
              <div>
                <h4 className="mb-[clamp(0.75rem,1.5vw,1.25rem)] flex items-center gap-1.5 text-[clamp(12px,1.2vw,14px)] font-medium text-[#0A4D26]">
                  <Clock className="h-4 w-4 text-[#36B936]" />
                  Support Hours
                </h4>
                <div className="space-y-2 text-[clamp(11px,1.1vw,13px)] font-light text-[#0A4D26]/60">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-[#0A4D26]">8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="text-[#0A4D26]">9:00 AM - 2:00 PM</span>
                  </div>
                  <p className="opacity-60">Sunday: Closed</p>
                </div>
              </div>
              <div className="pt-2">
                <h4 className="mb-1.5 flex items-center gap-1.5 text-[clamp(12px,1.2vw,14px)] font-medium text-[#0A4D26]">
                  <Phone className="h-4 w-4 text-[#36B936]" />
                  Emergency Support
                </h4>
                <p className="text-[clamp(14px,1.5vw,17px)] font-semibold tracking-tight text-[#0A4D26]">
                  600 53 11 11
                </p>
              </div>
            </div>
          </div>
        </aside>
      </motion.div>
    </section>
  );
}
