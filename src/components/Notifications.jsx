import React from "react";

export default function Notifications({ onClose }) {
  return (
    <div className="fixed inset-0 z-40">
      {/* Invisible backdrop for outside click */}
      <div className="absolute inset-0" onClick={onClose} />
      {/* Dropdown panel under header */}
      <div className="absolute left-1/2 -translate-x-1/2 top-20 w-[95vw] max-w-2xl bg-white rounded shadow border z-50 overflow-hidden">
        {/* Empty mailbox illustration */}
        <div className="px-4 sm:px-6 py-8 sm:py-10 flex items-center justify-center">
          <div className="flex flex-col items-center text-gray-400">
            <svg className="w-24 h-24 text-gray-300" viewBox="0 0 64 64" fill="none" stroke="currentColor">
              <rect x="18" y="22" width="28" height="18" rx="4" strokeWidth="1.5" />
              <path d="M18 28h28M26 26l6 6 6-6" strokeWidth="1.5" />
              <path d="M32 40v6" strokeWidth="1.5" />
              <rect x="22" y="14" width="20" height="10" rx="5" strokeWidth="1.5" />
            </svg>
            <div>No notifications</div>
          </div>
        </div>
      </div>
    </div>
  );
}