import React from "react";
import { useLocation } from "react-router-dom";

export const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    // Sử dụng location.pathname làm key.
    // Mỗi khi URL đổi, React sẽ hủy div cũ và render div mới, kích hoạt lại animation.
    <div key={location.pathname} className="animate-fade-in-up w-full">
      {children}
    </div>
  );
};
