// ===========================================
// ARQUIVO: mockDistricts.ts (NOVO)
// ===========================================

interface District {
  id: number;
  province_id: number;
  name: string;
}

export const DISTRICTS: District[] = [
  // Province ID 1 (Maputo Cidade)

  { id: 1, province_id: 1, name: "KaMpfumo" },

  { id: 2, province_id: 1, name: "Nlhamankulu" },

  { id: 3, province_id: 1, name: "KaMaxaquene" },

  { id: 4, province_id: 1, name: "KaMavota" },

  { id: 5, province_id: 1, name: "KaMubukwana" },

  { id: 6, province_id: 1, name: "KaTembe" },

  { id: 7, province_id: 1, name: "KaNyaka" },

  // Province ID 2 (Maputo Província)

  { id: 1, province_id: 2, name: "Boane" },

  { id: 2, province_id: 2, name: "Magude" },

  { id: 3, province_id: 2, name: "Manhiça" },

  { id: 4, province_id: 2, name: "Marracuene" },

  { id: 5, province_id: 2, name: "Matola" },

  { id: 6, province_id: 2, name: "Matutuíne" },

  { id: 7, province_id: 2, name: "Moamba" },

  { id: 8, province_id: 2, name: "Namaacha" },

  // Province ID 3 (Gaza)

  { id: 1, province_id: 3, name: "Bilene Macia" },

  { id: 2, province_id: 3, name: "Chibuto" },

  { id: 3, province_id: 3, name: "Chicualacuala" },

  { id: 4, province_id: 3, name: "Chigubo" },

  { id: 5, province_id: 3, name: "Chókwè" },

  { id: 6, province_id: 3, name: "Chongoene" },

  { id: 7, province_id: 3, name: "Guijá" },

  { id: 8, province_id: 3, name: "Limpopo" }, // Usando o Limpopo (8-2)

  { id: 9, province_id: 3, name: "Mabalane" },

  { id: 10, province_id: 3, name: "Manjacaze" },

  // Province ID 4 (Inhambane)

  { id: 1, province_id: 4, name: "Funhalouro" },

  { id: 2, province_id: 4, name: "Govuro" },

  { id: 3, province_id: 4, name: "Homoíne" },

  { id: 4, province_id: 4, name: "Inhambane" },

  { id: 5, province_id: 4, name: "Inharrime" },

  { id: 6, province_id: 4, name: "Inhassoro" },

  { id: 7, province_id: 4, name: "Jangamo" },

  { id: 8, province_id: 4, name: "Mabote" },

  { id: 9, province_id: 4, name: "Massinga" },

  { id: 10, province_id: 4, name: "Maxixe" },

  // Province ID 5 (Manica)

  { id: 1, province_id: 5, name: "Bárue" },

  { id: 2, province_id: 5, name: "Chimoio" },

  { id: 3, province_id: 5, name: "Gondola" },

  { id: 4, province_id: 5, name: "Guro" },

  { id: 5, province_id: 5, name: "Macate" },

  { id: 6, province_id: 5, name: "Machaze" },

  { id: 7, province_id: 5, name: "Macossa" },

  { id: 8, province_id: 5, name: "Manica" },

  { id: 9, province_id: 5, name: "Mossurize" },

  { id: 10, province_id: 5, name: "Sussundenga" },

  // Province ID 6 (Sofala)

  { id: 1, province_id: 6, name: "Beira" },

  { id: 2, province_id: 6, name: "Búzi" },

  { id: 3, province_id: 6, name: "Caia" },

  { id: 4, province_id: 6, name: "Chemba" },

  { id: 5, province_id: 6, name: "Cheringoma" },

  { id: 6, province_id: 6, name: "Chibabava" },

  { id: 7, province_id: 6, name: "Dôa" },

  { id: 8, province_id: 6, name: "Gorongosa" },

  { id: 9, province_id: 6, name: "Machanga" },

  { id: 10, province_id: 6, name: "Maringué" },
];

