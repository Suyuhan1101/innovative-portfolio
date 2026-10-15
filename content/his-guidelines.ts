import manifest from "@/public/media/projects/clinic/guidelines/manifest.json";

const captions: Record<string, { title: string; description: string }> = {
  "keyboard-login": {
    title: "Keyboard navigation at login",
    description: "Move from username to password with Enter, then press Enter to sign in with fewer mouse interactions.",
  },
  "physician-dashboard": {
    title: "A focused physician dashboard",
    description: "Prioritize the waiting queue, patient calls and consultation shortcuts, with access to completed visits and prescription editing.",
  },
  "consultation-record": {
    title: "More complete consultation records",
    description: "Add the four TCM examinations, physical and supplementary examinations, and a diagnosis certificate with clinical advice.",
  },
  "prescription-entry": {
    title: "Faster prescription entry",
    description: "Use mnemonic search and keyboard dosage entry, display pricing, and add review and save actions. Combine patent and Western medicines on one sheet with a five-item limit.",
  },
  "prescription-templates": {
    title: "Reusable prescription templates",
    description: "Make common prescriptions editable, including ingredients, instructions, precautions and indications, with support for creating new templates.",
  },
  "booking-intervals": {
    title: "Booking intervals for each physician",
    description: "Move appointment intervals into each physician's schedule settings and keep queue numbers aligned with appointment order.",
  },
  "appointment-list": {
    title: "Appointments and physician schedules",
    description: "Browse a physician's upcoming month of availability and make appointment lists easier to search and review.",
  },
  "patient-selection": {
    title: "Clearer patient identification",
    description: "Show identifying information when selecting a patient for an appointment to help distinguish records with similar names.",
  },
  "time-slots": {
    title: "Time slots and queue numbers",
    description: "Clarify available appointment times and queue positions, and determine initial or follow-up visits from the patient's history with that physician.",
  },
  "physician-profile": {
    title: "Physician profile terminology",
    description: "Update the professional-title option from resident physician to physician.",
  },
  "prescription-billing": {
    title: "Pricing handwritten and repeat prescriptions",
    description: "Add prescription pricing and billing with historical prescription lookup, using the same clinical documentation and review requirements as physician entry.",
  },
  "fees-and-commissions": {
    title: "Consultation fees and commissions",
    description: "Add a separate registration fee, retain initial and follow-up fees, remove the special consultation category, and include billable services in financial reporting.",
  },
  "pharmacy-workflow": {
    title: "Prescription handling in the pharmacy",
    description: "Connect review, withdrawal, preparation and dispensing, with preparation options for self-decoction, clinic decoction, pills and herbal pastes.",
  },
  "herbal-inventory": {
    title: "Herbal inventory and mnemonic search",
    description: "Address missing retail prices, prioritize exact mnemonic matches, and place frequently used inventory actions within easier reach.",
  },
  "printer-settings": {
    title: "Printers and editable print formats",
    description: "Configure prescription, receipt and label printers by work area, with editable layouts for each document type.",
  },
  "finance-reports": {
    title: "Financial details and workload reports",
    description: "Extend reporting for income and expenses, physician workload, medicine movements and supplier payments.",
  },
};

export const hisGuidelines = manifest.images.map((image) => ({
  ...image,
  ...captions[image.id],
  alt: `Annotated HIS 2.0 guideline ${image.code}: ${captions[image.id].title}`,
}));
