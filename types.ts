
import React from 'react';

export interface LeadData {
  name: string;
  whatsapp: string;
  location: string;
  guests: number;
  date: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
  icon: React.ReactNode;
}