export interface SolarBrand {
  id: string;
  name: string;
  description: string;
  logo: string;
  color: string;
  borderColor: string;
  url: string;
  category: 'premium' | 'standard' | 'budget';
  features: string[];
  serialPrefixes: string[];
}

export const solarBrands: SolarBrand[] = [
  {
    id: 'longi',
    name: 'Longi Solar',
    description: 'High-efficiency monocrystalline solar panels with industry-leading performance',
    logo: '☀️',
    color: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-200',
    url: 'https://share.google/9L1rs4WCAATHNcNEA',
    category: 'premium',
    features: ['High Efficiency', 'Monocrystalline', '25+ Year Warranty'],
    serialPrefixes: ['LR', 'LONGI', 'LONG', 'LN', 'LX', 'LY', 'LZ']
  },
  {
    id: 'canadian-solar',
    name: 'Canadian Solar',
    description: 'Reliable and cost-effective solar solutions for residential and commercial use',
    logo: '🍁',
    color: 'from-red-500 to-red-600',
    borderColor: 'border-red-200',
    url: 'https://share.google/nTyrSIICXcORoGQDY',
    category: 'standard',
    features: ['Cost-Effective', 'Reliable', 'Global Support'],
    serialPrefixes: ['CS', 'CAN', 'CANADIAN', 'CS6P', 'CS6K', 'CS3K', 'CS3U']
  },
  {
    id: 'jinko',
    name: 'Jinko Solar',
    description: 'World-leading solar technology company with innovative panel designs',
    logo: '⚡',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200',
    url: 'https://share.google/S9FQwIhvffEL14fCY',
    category: 'premium',
    features: ['Innovative Technology', 'High Performance', 'Advanced Design'],
    serialPrefixes: ['JKM', 'JKS', 'JKN', 'JK', 'JINKO']
  },
  {
    id: 'trina',
    name: 'Trina Solar',
    description: 'Innovative solar energy solutions with cutting-edge technology',
    logo: '🌍',
    color: 'from-green-500 to-green-600',
    borderColor: 'border-green-200',
    url: 'https://customerservice.trinasolar.com/moduleQuery.html#/',
    category: 'standard',
    features: ['Innovative', 'Sustainable', 'Quality Assured'],
    serialPrefixes: ['TSM', 'TS', 'TRINA', 'TSP', 'TSM-DC', 'TSM-PC']
  },
  {
    id: 'ja-solar',
    name: 'JA Solar',
    description: 'High-performance photovoltaic products with excellent reliability',
    logo: '🔋',
    color: 'from-purple-500 to-purple-600',
    borderColor: 'border-purple-200',
    url: 'https://product.jasolar.com/en.html',
    category: 'standard',
    features: ['High Performance', 'Reliable', 'Cost-Effective'],
    serialPrefixes: ['JA', 'JAS', 'JASOLAR', 'JAM', 'JAM6', 'JAM7']
  },
  {
    id: 'arm-solar',
    name: 'ARM Solar',
    description: 'Quality solar panels and energy solutions from Pakistan',
    logo: '🛡️',
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-200',
    url: 'https://www.armpakpower.com/module-verification.php',
    category: 'budget',
    features: ['Local Support', 'Quality Assured', 'Cost-Effective'],
    serialPrefixes: ['ARM', 'ARMSOLAR', 'ARMP', 'ARMW', 'ARMS']
  }
];

export const getBrandById = (id: string): SolarBrand | undefined => {
  return solarBrands.find(brand => brand.id === id);
};

export const getBrandsByCategory = (category: SolarBrand['category']): SolarBrand[] => {
  return solarBrands.filter(brand => brand.category === category);
};

export const searchBrands = (query: string): SolarBrand[] => {
  const lowercaseQuery = query.toLowerCase();
  return solarBrands.filter(brand => 
    brand.name.toLowerCase().includes(lowercaseQuery) ||
    brand.description.toLowerCase().includes(lowercaseQuery) ||
    brand.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
  );
};

export const detectBrandFromSerial = (serialNumber: string): SolarBrand | null => {
  const upperSerial = serialNumber.toUpperCase().trim();
  
  for (const brand of solarBrands) {
    for (const prefix of brand.serialPrefixes) {
      if (upperSerial.startsWith(prefix.toUpperCase())) {
        return brand;
      }
    }
  }
  
  return null;
};

export const getAllSerialPrefixes = (): { brand: string; prefixes: string[] }[] => {
  return solarBrands.map(brand => ({
    brand: brand.name,
    prefixes: brand.serialPrefixes
  }));
}; 