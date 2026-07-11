import React from 'react';
import { Phone } from 'lucide-react';

export const FloatingActions: React.FC = () => {
  const phoneNumber = '+919999999999';
  const whatsappMessage = encodeURIComponent(
    'Hello Ratna Coaching Centre, I would like to enquire about admissions for the upcoming batch.'
  );
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3.5 sm:bottom-8 sm:right-8">
      
      {/* Click to Call Floating Button */}
      <a
        href={`tel:${phoneNumber}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-dark shadow-lg shadow-accent/20 hover:scale-110 active:scale-95 transition-all hover:brightness-105 group relative"
        title="Call Center Office"
      >
        <span className="absolute right-14 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Call Office
        </span>
        <Phone size={22} className="stroke-[2.5]" />
        {/* Subtle pulse effect */}
        <span className="absolute -inset-0.5 rounded-full bg-accent opacity-30 animate-ping -z-10"></span>
      </a>

      {/* WhatsApp Chat Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20 hover:scale-110 active:scale-95 transition-all hover:brightness-105 group relative"
        title="Chat on WhatsApp"
      >
        <span className="absolute right-14 bg-primary text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          WhatsApp Chat
        </span>
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.588 1.97 14.118.945 11.997.945c-5.442 0-9.87 4.372-9.874 9.802-.002 2.016.529 3.987 1.538 5.734l-.993 3.626 3.73-.974.249.148z" />
        </svg>
        {/* Subtle pulse effect */}
        <span className="absolute -inset-0.5 rounded-full bg-emerald-500 opacity-25 animate-ping -z-10 delay-300"></span>
      </a>
      
    </div>
  );
};
