import React from 'react';
import * as Icons from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  size?: number;
  strokeWidth?: number;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ 
  name, 
  className = '', 
  size = 24, 
  strokeWidth = 2 
}) => {
  // Access the icon component dynamically from lucide-react exports
  const IconComponent = (Icons as any)[name];
  
  if (!IconComponent) {
    // Return a default fallback icon if the specified name doesn't exist
    return <Icons.HelpCircle className={className} size={size} strokeWidth={strokeWidth} />;
  }
  
  return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
};
