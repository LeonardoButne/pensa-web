// =========================================================
// ARQUIVO: HealthCenters.tsx (NOVO)
// =========================================================
import { useState, useMemo, useEffect } from "react";
import {
  Container,
  Title,
  Text,
  Box,
  Paper,
  Group,
  Divider,
  Button,
  Center,
  TextInput,
  Select,
  SimpleGrid,
  Card,
  Badge,
  ScrollArea,
  Pagination,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconSearch,
  IconMapPin,
  IconBuildingHospital,
  IconPhone,
  IconMail,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDebouncedValue } from "@mantine/hooks";

// ===========================================
// 1. ESTRUTURAS DE DADOS
// ===========================================

interface Province {
  id: number;
  name: string;
}

interface District {
  id: number;
  province_id: number;
  name: string;
}

interface HealthCenter {
  id: number;
  province_id: number;
  district_id: number;
  name: string;
  address: string;
  telephone: string;
  email: string;
}

// MOCK: Lista de Províncias (Apenas as principais para o filtro)
const PROVINCES: Province[] = [
  { id: 1, name: "Maputo Cidade" },
  { id: 2, name: "Maputo Província" },
  { id: 3, name: "Gaza" },
  { id: 4, name: "Inhambane" },
  { id: 5, name: "Manica" },
  { id: 6, name: "Sofala" },
  // A lista completa seria muito longa, usamos os IDs presentes nos dados dos Centros de Saúde
];

// MOCK: Lista de Distritos (Baseado na primeira tabela que você forneceu - id/province_id/name)
// ===========================================
// MOCK: Lista COMPLETA de Distritos
// ===========================================
const DISTRICTS: District[] = [
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

// ===========================================
// MOCK: Lista COMPLETA de Centros de Saúde (100 Itens)
// ===========================================
const CENTERS: HealthCenter[] = [
  {
    id: 1,
    province_id: 1,
    district_id: 1,
    name: "Centro de Saúde Alto Maé",
    address: "Av Eduardo Mondlane nº 2848, Bairro Alto Maé A",
    telephone: "824624590",
    email: "",
  },
  {
    id: 2,
    province_id: 1,
    district_id: 1,
    name: "Centro de Saúde Porto",
    address: "Av Martires de Inhaminga, Bairro Central C",
    telephone: "842097991",
    email: "",
  },
  {
    id: 3,
    province_id: 1,
    district_id: 1,
    name: "Centro de Saúde Maxaquene",
    address: "AV Patrice Lumumba nº 421, Bairro Central A",
    telephone: "827144869",
    email: "",
  },
  {
    id: 4,
    province_id: 1,
    district_id: 1,
    name: "Centro de Saúde nr 2 Tribumal",
    address: "Av Zedequias Manganhela nº 54, Bairro Central A",
    telephone: "827144869",
    email: "",
  },
  {
    id: 5,
    province_id: 1,
    district_id: 1,
    name: "Centro de Saúde Polana Cimento",
    address: "Av Kim Ill Sung nº 596, Bairro Polana Cimento A",
    telephone: "840654453",
    email: "",
  },
  {
    id: 6,
    province_id: 1,
    district_id: 1,
    name: "Centro de Saúde Malhangalene",
    address: "Rua de Setubal nº 26, Bairro Malhangalene A",
    telephone: "824039651",
    email: "",
  },
  {
    id: 7,
    province_id: 1,
    district_id: 1,
    name: "Hospital Militar",
    address: "Rua Samuel Nkumbula nº 592, Bairro Someerchield",
    telephone: "21472860",
    email: "",
  },
  {
    id: 8,
    province_id: 1,
    district_id: 1,
    name: "Hospital Central",
    address: "Av. Agostinho Neto, Bairro Central A",
    telephone: "821325002",
    email: "",
  },
  {
    id: 9,
    province_id: 1,
    district_id: 2,
    name: "Centro de Saúde Jose Macamo",
    address: "Av da OUA nº, Bairro Malanga",
    telephone: "820095620",
    email: "",
  },
  {
    id: 10,
    province_id: 1,
    district_id: 2,
    name: "Centro de Saúde Xipamanine",
    address: "Av Joaquim Chissano nº 2775, Bairro Xipamanine",
    telephone: "827619986",
    email: "",
  },
  {
    id: 11,
    province_id: 1,
    district_id: 2,
    name: "Centro de Saúde nr 14",
    address: "Xipamanine",
    telephone: "822938975",
    email: "-",
  },
  {
    id: 12,
    province_id: 1,
    district_id: 2,
    name: "Centro de Saúde Chamanculo",
    address: "Bairro Chamanculo B nº 1046",
    telephone: "823551350",
    email: "",
  },
  {
    id: 13,
    province_id: 1,
    district_id: 2,
    name: "Hospital Geral Chamanculo",
    address: "Av do Trabalho 1064, Bairro Chamanculo A",
    telephone: "21400333",
    email: "",
  },
  {
    id: 14,
    province_id: 1,
    district_id: 2,
    name: "Hospital Geral José Macamo",
    address: "Av OUA, Bairro Malanga",
    telephone: "21400046",
    email: "",
  },
  {
    id: 15,
    province_id: 1,
    district_id: 3,
    name: "Centro de Saúde 1 de Maio",
    address: "Rua da Resistência nº 1349 ,Bairro Maxaquene A",
    telephone: "843960716",
    email: "-",
  },
  {
    id: 16,
    province_id: 1,
    district_id: 3,
    name: "Hospital Geral Polana Caniço",
    address: "Polana Caniço A",
    telephone: "847266556",
    email: "-",
  },
  {
    id: 17,
    province_id: 1,
    district_id: 4,
    name: "Hospital Geral Mavalane",
    address: "Av das FPLM nº 2260, Bairro Mavalane A",
    telephone: "21460103",
    email: "hgm@intra.co.mz",
  },
  {
    id: 18,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde Mavalane",
    address: "Av Milagre Mabote, Bairro Mavalane A",
    telephone: "846932094",
    email: "-",
  },
  {
    id: 19,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde Hulene",
    address: "Hulene Rua 3, Hulene A",
    telephone: "827431830",
    email: "",
  },
  {
    id: 20,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde 1 de Junho",
    address: "Bairro Ferroviario nº 57",
    telephone: "825692846",
    email: "",
  },
  {
    id: 21,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde Pescadores",
    address: "Rua Pescadores nº 48, Bairro Costa do Sol",
    telephone: "827827340",
    email: "",
  },
  {
    id: 22,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde Chiango",
    address: "Chiango",
    telephone: "",
    email: "",
  },
  {
    id: 23,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde Romão",
    address: "Bairro, Romão Q18",
    telephone: "829281380",
    email: "",
  },
  {
    id: 24,
    province_id: 1,
    district_id: 4,
    name: "Centro de Saúde Albazine",
    address: "Rua da Igreja, Bairro Albazine",
    telephone: "823318954",
    email: "",
  },
  {
    id: 25,
    province_id: 1,
    district_id: 5,
    name: "Centro de Saude Inhagoia",
    address: "Rua da Ching nº 53, Bairro Inhagoia A",
    telephone: "828011310",
    email: "",
  },
  {
    id: 26,
    province_id: 1,
    district_id: 5,
    name: "Centro de Saúde Bagamoio",
    address: "Rua do Bagamoio n? 597, Bairro Bagamoio",
    telephone: "827262560",
    email: "luciamanhicamuando@gmail.com",
  },
  {
    id: 27,
    province_id: 1,
    district_id: 5,
    name: "Centro de Saúde Mine centro",
    address: "Rua das Barracas, Bairro Magoanine B",
    telephone: "828916314",
    email: "",
  },
  {
    id: 28,
    province_id: 1,
    district_id: 5,
    name: "Centro de Saúde M.Tendas",
    address: "Rua Ndambe 2000, Bairro Magoanine C",
    telephone: "828916315",
    email: "",
  },
  {
    id: 29,
    province_id: 1,
    district_id: 5,
    name: "Centro de Saúde Zimpeto",
    address: "Bairro Zimpeto",
    telephone: "822627200",
    email: "",
  },
  {
    id: 30,
    province_id: 1,
    district_id: 5,
    name: "Hospital Provincial Infulene",
    address: "Av de Moçambique Km 6.5, Bairro Zimpeto",
    telephone: "21472860",
    email: "",
  },
  {
    id: 31,
    province_id: 1,
    district_id: 6,
    name: "Centro de Saúde Incassane",
    address: "Incassane",
    telephone: "844847470",
    email: "valdemarmaunde1@gmail.com",
  },
  {
    id: 32,
    province_id: 1,
    district_id: 6,
    name: "Centro de Saúde Mutsekua",
    address: "Incassane",
    telephone: "841234054",
    email: "-",
  },
  {
    id: 33,
    province_id: 1,
    district_id: 6,
    name: "Centro de Saúde Catembe",
    address: "Chamissava",
    telephone: "843871490",
    email: "-",
  },
  {
    id: 34,
    province_id: 1,
    district_id: 6,
    name: "Centro de Saúde Chamissava",
    address: "Chamissava",
    telephone: "864964233",
    email: "-",
  },
  {
    id: 35,
    province_id: 1,
    district_id: 7,
    name: "Centro de Saúde Inhaca",
    address: "Inhaca, Bairro Ribjene",
    telephone: "825980811",
    email: "",
  },
  {
    id: 36,
    province_id: 1,
    district_id: 7,
    name: "Centro de Saúde Muchina",
    address: "Inhaca, Bairro Nhaquene",
    telephone: "825980811",
    email: "",
  },
  {
    id: 37,
    province_id: 1,
    district_id: 7,
    name: "Centro de Saúde Inguane",
    address: "Inhaca, Bairro Inguane",
    telephone: "825980811",
    email: "",
  },
  {
    id: 38,
    province_id: 2,
    district_id: 5,
    name: "Hospital Geral da Machava",
    address: "Av. Eduardo Mondlane nº 3888",
    telephone: "25821708147",
    email: "hgmachava@tdm.co.mz",
  },
  {
    id: 39,
    province_id: 2,
    district_id: 5,
    name: "Hospital Provincial da Matola",
    address: "Av. De Namaacha nº 1114, Quarteirão nº 06 Matola C",
    telephone: "258 21 733018, 258 82 2975550",
    email: "hospitalprovincialdematola@gmail.com",
  },
  {
    id: 40,
    province_id: 2,
    district_id: 5,
    name: "Centro de Saude Ndlavela",
    address: "Bairro Ndlavela, Quarteirão 5",
    telephone: "848448275",
    email: "albertomatchavane@gmail.com",
  },
  {
    id: 41,
    province_id: 2,
    district_id: 5,
    name: "Unidade A",
    address: "Bairro do Infulene A, Quarteirão 5, Rua 21230",
    telephone: "",
    email: "",
  },
  {
    id: 42,
    province_id: 2,
    district_id: 5,
    name: "Posto de Saude T.3",
    address: "Bairro T3",
    telephone: "847792665",
    email: "-",
  },
  {
    id: 43,
    province_id: 2,
    district_id: 5,
    name: "Km 25",
    address: "Bairro Siduava",
    telephone: "",
    email: "",
  },
  {
    id: 44,
    province_id: 2,
    district_id: 5,
    name: "Centro de Saude Bedene",
    address: "Bairro machava Bedene",
    telephone: "843870448",
    email: "-",
  },
  {
    id: 45,
    province_id: 2,
    district_id: 5,
    name: "Matola-Gare",
    address: "Bairro Matola Gare, Quarteirão 2",
    telephone: "",
    email: "",
  },
  {
    id: 46,
    province_id: 2,
    district_id: 5,
    name: "Machava II",
    address: "Rua da Familia, nº 21116",
    telephone: "",
    email: "",
  },
  {
    id: 47,
    province_id: 2,
    district_id: 5,
    name: "Centro de Saude Khongolote",
    address: "Bairro Khongolote, Rua do Hospital, Quarteirão 49",
    telephone: "845583958",
    email: "-",
  },
  {
    id: 48,
    province_id: 2,
    district_id: 5,
    name: "Boquisso",
    address: "Bairro Boquisso B, Rua Vundica, Quarteirão 7",
    telephone: "845968481",
    email: "elisaalberto938@gmail.com",
  },
  {
    id: 49,
    province_id: 2,
    district_id: 5,
    name: "Centro de Saude Machava I",
    address: "Rua do Jardim, nº 5088",
    telephone: "847668958",
    email: "-",
  },
  {
    id: 50,
    province_id: 2,
    district_id: 5,
    name: "Matola I",
    address: "Av. União Africana, nº 11078",
    telephone: "848997806",
    email: "elinamalingac@yahoo.com",
  },
  {
    id: 51,
    province_id: 2,
    district_id: 5,
    name: "Matola II",
    address: "Rua das Bananeiras, nº 12218",
    telephone: "825843599",
    email: "fwamusse@yahoo.com",
  },
  {
    id: 52,
    province_id: 2,
    district_id: 5,
    name: "Liberdade",
    address: "Bairro da Liberdade, rua de Mutarara, nº 13392",
    telephone: "",
    email: "",
  },
  {
    id: 53,
    province_id: 2,
    district_id: 5,
    name: "Centro de Saude Muhalaze",
    address: "Bairro de Muhalaze",
    telephone: "846245464",
    email: "-",
  },
  {
    id: 54,
    province_id: 2,
    district_id: 5,
    name: "Centro de Saude Tsalala",
    address: "Bairro de Tsalala",
    telephone: "849358451",
    email: "silviaduvane6@gmail.com",
  },
  {
    id: 55,
    province_id: 2,
    district_id: 5,
    name: "São Dâmaso",
    address: "Bairro São Dâmaso, Rua Scott, Quarteirão 75",
    telephone: "",
    email: "",
  },
  {
    id: 56,
    province_id: 2,
    district_id: 3,
    name: "Hospital Distrital da Manhi",
    address: "",
    telephone: "25821810433",
    email: "",
  },
  {
    id: 57,
    province_id: 2,
    district_id: 3,
    name: "Hospital Rural de Xinavane",
    address: "EN204",
    telephone: "821870090",
    email: "hospitalruralxinavane@gmail.com",
  },
  {
    id: 58,
    province_id: 2,
    district_id: 3,
    name: "Centro de Saúde da Manhi",
    address: "-",
    telephone: "852888000",
    email: "sdsmasmanhica@gmail.com / sdsmas.manhica@yahoo.com.br",
  },
  {
    id: 59,
    province_id: 2,
    district_id: 6,
    name: "Centro de Saúde de Matuuine",
    address: "Rua Principal, Bela Vista",
    telephone: "25 821 620 002",
    email: "sdsmasmatutuine@gmail.com",
  },
  {
    id: 60,
    province_id: 2,
    district_id: 7,
    name: "Centro de Saúde de Moamba",
    address: "Vila da Moamba",
    telephone: "25821552094, 258 842508531",
    email: "sdsmamoamba@gmail.com",
  },
  {
    id: 61,
    province_id: 2,
    district_id: 1,
    name: "Centro de Saúde de Boane",
    address: "Av. de Namaacha - Rua Hospital",
    telephone: "847316467",
    email: "sdsmasboane@gmail.com",
  },
  {
    id: 62,
    province_id: 2,
    district_id: 8,
    name: "Centro de Saúde de Namaacha",
    address: "Vila de namaacha, Rua Hospital",
    telephone: "258960180",
    email: "sdsmas-namaacha@hotmail.com",
  },
  {
    id: 63,
    province_id: 2,
    district_id: 2,
    name: "Centro de Saúde de Magude",
    address: "Rua do Hospital",
    telephone: "25821910027",
    email: "sdsmasmagude1@gmail.com",
  },
  {
    id: 64,
    province_id: 2,
    district_id: 4,
    name: "Centro de Saúde de Marracuene",
    address: "Rua do Hospital",
    telephone: "25 821 901 034",
    email: "sdsmasmarracuene@yahoo.com.br",
  },
  {
    id: 65,
    province_id: 3,
    district_id: 2,
    name: "Hospital Rural do Chibuto",
    address: "Rua da Igreja-Chibuto",
    telephone: "28120099/822657987",
    email: "hospitalrura@gmail.com",
  },
  {
    id: 66,
    province_id: 3,
    district_id: 2,
    name: "Centro de Saúde de Chibuto (Urbano A)",
    address: "Rua da Igreja-Chibuto",
    telephone: "827898676",
    email: "gertrudesumbane22@gmail.com",
  },
  {
    id: 67,
    province_id: 3,
    district_id: 2,
    name: "Centro de Saúde de Chimundo (Urbano B)",
    address: "Bairro 4 Chimundo",
    telephone: "863693191/825390627",
    email: "-",
  },
  {
    id: 68,
    province_id: 3,
    district_id: 5,
    name: "Hospital Rural de Chókwè",
    address: "Cidade de Chókwè, Av. 7 de Abril, Rua de Hospital",
    telephone: "872362749/872085080/846456014",
    email: "hospitalruralchokwe@gmail.com           augustoamauce@gmail.com",
  },
  {
    id: 69,
    province_id: 3,
    district_id: 5,
    name: "Centro de Saúde de Chókwè (Urbano A)",
    address: "Cidade de Chókwè, Rua da Igreja católica",
    telephone: "840556315",
    email: "-",
  },
  {
    id: 70,
    province_id: 3,
    district_id: 5,
    name: "Centro de Saúde Urbano do 3 Bairro (Urbano B)",
    address:
      "Cidade de Chókwè 3 Bairro A Rua do Complexo Agro Industrial do Chókwè (CAIC)",
    telephone: "822223200",
    email: "urbanochokwe@gmail.com              msevene@yooho.com",
  },
  {
    id: 71,
    province_id: 3,
    district_id: 5,
    name: "Centro de Saúde de Carmelo (Urbano A)",
    address: "1 Bairro, Av. Trabalho Cidade de Chókwè",
    telephone: "28128003",
    email: "hospcarmelo@tdm.co.mz",
  },
  {
    id: 72,
    province_id: 3,
    district_id: 5,
    name: "Posto de Saúde do 6 bairro da Cidade",
    address: "Rua da UP-Chókwè",
    telephone: "",
    email: "",
  },
  {
    id: 73,
    province_id: 3,
    district_id: 8,
    name: "Hospital Rural de Chicumbane",
    address: "Bairro 1 de Chicumbane",
    telephone: "25843000",
    email: "hrchicumbane1@gmail.com",
  },
  {
    id: 74,
    province_id: 3,
    district_id: 10,
    name: "Hospital Rural de Mandlakazi",
    address: "Bairro, 25 de Junho Vila de Mandlakazi",
    telephone: "28261041/824121918",
    email: "hrmandlakazi@gmail.com",
  },
  {
    id: 75,
    province_id: 3,
    district_id: 11,
    name: "Hospital Distrital de Mapai",
    address: "Mapai, Bairro 4 de Outubro ao longo da EN-208",
    telephone: "",
    email: "Hdmapai@gmail.com",
  },
  {
    id: 76,
    province_id: 3,
    district_id: 14,
    name: "Hospital Provincial de Xai-Xai",
    address: "Bairro 13 da Cidade de Xai-Xai, Rua do Hospital",
    telephone: "821322340/849681301/824717400",
    email: "hpxxgaza@gmail.com            samirocamal@hotmail.com",
  },
  {
    id: 77,
    province_id: 3,
    district_id: 14,
    name: "Centro de Saúde de Xai-Xai (CS Urbano A)",
    address: "Cidade de Xai- Xai, Avenida Samora Machel",
    telephone: "842650304",
    email: "centrodesaudecidadexx@gmail.com               dicamal@gmail.com",
  },
  {
    id: 78,
    province_id: 3,
    district_id: 14,
    name: "Centro de Saúde Mareien Nguabi (Urbano B)",
    address: "Cidade de Xai-Xai, Bairro 3 Mngouabi B",
    telephone: "877892612/845553081",
    email: "csm@gmail.com",
  },
  {
    id: 79,
    province_id: 3,
    district_id: 14,
    name: "Centro de Saúde Patrice Lumumba (Urbano B)",
    address: "Posto Administrativo Urbano de 2 Bairro Patrice Lumumba",
    telephone: "879016568/848519639",
    email: "lizzysiquice@gmail.com",
  },
  {
    id: 80,
    province_id: 4,
    district_id: 4,
    name: "Hospital Provincial de Inhambane",
    address: "Av Eduardo Mondlane-INHAMBANE",
    telephone: "29 320 345 / 29 320 524",
    email: "hospital-pibane@teledata.mz",
  },
  {
    id: 81,
    province_id: 4,
    district_id: 9,
    name: "Hospital Distrital de Massinga",
    address: "Bairro 21 de Abril, Av. Das FPLM",
    telephone: "+258 293711270",
    email: "hospitaldistritalmassinga@gmail.com",
  },
  {
    id: 82,
    province_id: 4,
    district_id: 8,
    name: "Centro de Saúde de Mabote",
    address: "Bº Josina Machel-Mabote-Sede-INHAMBANE, estrada nacional nr. 222",
    telephone: "829387004/864736132/841286259",
    email: "sdsmasmabote@gmail.com",
  },
  {
    id: 83,
    province_id: 4,
    district_id: 13,
    name: "Hospital Rural de Vilankulo",
    address: "Av Eduardo Mondlane-Vilankulo-INHAMBANE",
    telephone: "+258 29 382 135 / 29 382 022",
    email: "hospitalruralvilankulo@gmail.com",
  },
  {
    id: 84,
    province_id: 4,
    district_id: 2,
    name: "Centro de Saúde de Doane",
    address: "Situado a Sete Quilómetros (7km), da Vila Sede de Nova Mambone",
    telephone: "-",
    email: "-",
  },
  {
    id: 85,
    province_id: 4,
    district_id: 6,
    name: "Centro de Saúde de Inhassoro",
    address: "Estrada Nacional Nr. 252",
    telephone: "+258293910121",
    email: "-",
  },
  {
    id: 86,
    province_id: 4,
    district_id: 1,
    name: "Centro de Saúde de Funhalouro",
    address: "Bairro Muchai 2",
    telephone: "829377002/844595056",
    email: "edson.fr@outlook.com",
  },
  {
    id: 87,
    province_id: 4,
    district_id: 11,
    name: "Centro de Saúde de Morrumbene",
    address: "Estrada Nacional Nr.1 Rua do Hospital Vila de Morrumbene",
    telephone: "+25829341014",
    email: "-",
  },
  {
    id: 88,
    province_id: 4,
    district_id: 10,
    name: "Centro de Saúde de Maxixe",
    address: "Bairro Chambone 1, Av. Ngungunhane",
    telephone: "+25829330148",
    email: "nepsdsmasm@gmail.com",
  },
  {
    id: 89,
    province_id: 4,
    district_id: 10,
    name: "Hospital Rural de Chicuque",
    address: "Bairro Rumbana, rua Almeida Penicela Nhambiwo",
    telephone: "+25829356435",
    email: "hrchicuque2014@gmail.com",
  },
  {
    id: 90,
    province_id: 4,
    district_id: 3,
    name: "Centro de Saúde de Homoíne",
    address: "Rua do hospital",
    telephone: "+25829351020",
    email: "sdsmashomoine@gmail.com",
  },
  {
    id: 91,
    province_id: 4,
    district_id: 7,
    name: "Centro de Saúde de Jangamo",
    address: "Sede de Jangamo, Bairro 2, rua de administração",
    telephone: "+25829356334",
    email: "-",
  },
  {
    id: 92,
    province_id: 4,
    district_id: 12,
    name: "Centro de Saúde de Panda",
    address: "Bairro Jacubecua, Rua 482 Panda a Inharrime",
    telephone: "+25829368017",
    email: "-",
  },
  {
    id: 93,
    province_id: 4,
    district_id: 5,
    name: "Centro de Saúde de Inharrime",
    address: "Bairro Nhamiba, rua da mesquita",
    telephone: "+25829361013",
    email: "sdsmasinharrime@gmail.com",
  },
  {
    id: 94,
    province_id: 4,
    district_id: 14,
    name: "Hospital Distrital de Quissico",
    address: "Bairro de Dombe, Vila Distrital de Quissico EN1",
    telephone: "+25829365008 /+25829365075/827218550",
    email: "fernanda.andre@fulbrihtmail.org",
  },
  {
    id: 95,
    province_id: 5,
    district_id: 1,
    name: "Hospital Rural de Catandica",
    address: "Sede de Bárue, Rua do HDD de Bárue",
    telephone: "25172014",
    email: "-",
  },
  {
    id: 96,
    province_id: 5,
    district_id: 2,
    name: "Hospital Provincial de Chimoio",
    address: "Cidade de Chimoio, Rua Dr. Arujo Lacerda",
    telephone: "25124256",
    email: "-",
  },
  {
    id: 97,
    province_id: 5,
    district_id: 3,
    name: "Hospital Rural de Gondola",
    address: "SEDE de Gondola, Bairro José Machal",
    telephone: "25141003",
    email: "-",
  },
  {
    id: 98,
    province_id: 5,
    district_id: 8,
    name: "Hospital Distrital de Manica",
    address: "SEDE de Manica, Rua 25 de Setembro",
    telephone: "25162683",
    email: "-",
  },
  {
    id: 99,
    province_id: 5,
    district_id: 9,
    name: "Hospital Distrital de Espungabera",
    address: "SEDE de Mossurize, EN 260 lado Banco BCI",
    telephone: "879036753",
    email: "-",
  },
  {
    id: 100,
    province_id: 6,
    district_id: 1,
    name: "Hospital Central da Beira",
    address:
      "BAIRRO-Macuti, Norte: AV. Jaime Sigauque, Sul: AV. Das F.P.L.M, Este: Rua Governador Ferreira Cheves, Oeste: Rua Diogo de Couto",
    telephone: "+258 23 312071/3",
    email: "hospitalcentraldabeira@yahoo.com",
  },
];

// VARIÁVEL DE CONFIGURAÇÃO DA PAGINAÇÃO
const ITEMS_PER_PAGE = 12;

export function HealthCenters() {
  const [search, setSearch] = useState("");
  const [selectedProvinceId, setSelectedProvinceId] = useState<string | null>(
    null
  );
  const [debouncedSearch] = useDebouncedValue(search, 300);

  // 1. ESTADO DA PAGINAÇÃO
  const [activePage, setPage] = useState(1);

  // Mapeamento para os Selects
  const provinceOptions = PROVINCES.map((p) => ({
    value: String(p.id),
    label: p.name,
  }));

  // 2. Lógica de Filtragem e Paginação
  // AQUI É ONDE ESTÁ A CORREÇÃO PRINCIPAL: activePage é uma dependência direta.
  const { paginatedCenters, totalPages, totalCount, filteredListLength } =
    useMemo(() => {
      let list = CENTERS;

      // 2.1. FILTRO DE PROVÍNCIA
      if (selectedProvinceId) {
        list = list.filter((c) => String(c.province_id) === selectedProvinceId);
      }

      // 2.2. FILTRO DE PESQUISA
      if (debouncedSearch) {
        const lowerSearch = debouncedSearch.toLowerCase();
        list = list.filter(
          (c) =>
            c.name.toLowerCase().includes(lowerSearch) ||
            c.address.toLowerCase().includes(lowerSearch)
        );
      }

      // 2.3. CÁLCULO DA PAGINAÇÃO
      const totalCount = list.length;
      const calculatedTotalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

      // 2.4. APLICAR PAGINAÇÃO
      const start = (activePage - 1) * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const paginatedCenters = list.slice(start, end);

      return {
        paginatedCenters,
        totalPages: calculatedTotalPages,
        totalCount,
        filteredListLength: totalCount, // Manter o nome para contagem
      };
    }, [selectedProvinceId, debouncedSearch, activePage]); // 🚨 activePage AQUI FAZ O RE-CALCULO

  // 3. EFEITO PARA RESETAR A PÁGINA QUANDO OS FILTROS MUDAM
  // Este useEffect garante que a página volta para 1 se os filtros (província ou pesquisa) mudarem.
  useEffect(() => {
    // Verificamos se a lista filtrada tem itens para evitar resetar se não houver nada
    if (activePage !== 1) {
      setPage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvinceId, debouncedSearch]); // Não incluir activePage aqui!

  return (
    <Box py={40} bg="gray.0">
      <Container size="xl">
        {/* Botão de voltar */}
        <Button
          component={Link}
          to="/"
          variant="light"
          color="gray"
          leftSection={<IconArrowLeft size={18} />}
          mb="xl"
          size="sm"
        >
          Voltar para o Menu Principal
        </Button>

        <Paper shadow="lg" radius="lg" p="xl" withBorder>
          {/* Título e Descrição */}
          <Center mb="xl">
            <Group>
              <Title order={2} fw={700} size={40} c="dark.7">
                Centros de Saúde
              </Title>
            </Group>
          </Center>

          <Text ta="center" c="dimmed" mb="xl">
            Encontre hospitais, centros de saúde e postos médicos em Moçambique
            por província ou nome.
          </Text>

          <Divider mb="xl" />

          {/* Filtros */}
          <Group mb="xl" grow>
            <Select
              placeholder="Filtrar por Província"
              data={provinceOptions}
              size="md"
              value={selectedProvinceId}
              onChange={setSelectedProvinceId}
              clearable
            />
            <TextInput
              placeholder="Pesquisar por nome ou endereço do centro..."
              leftSection={<IconSearch size={16} />}
              size="md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Group>

          {/* Resultados */}
          {/* <Text size="lg" fw={500} mb="md">
            {totalCount} Centros encontrados:
          </Text> */}

          {paginatedCenters.length > 0 ? (
            <>
              {/* Grid de Cards */}
              <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="xl" mb="xl">
                {paginatedCenters.map((center) => {
                  const provinceName =
                    PROVINCES.find((p) => p.id === center.province_id)?.name ||
                    "Desconhecida";

                  return (
                    <Card
                      key={center.id}
                      shadow="sm"
                      p="lg"
                      radius="md"
                      withBorder
                    >
                      <Group mb="xs" justify="space-between">
                        <Title order={4} fw={700} lineClamp={2} c="blue.7">
                          {center.name}
                        </Title>
                        <Badge color="cyan" variant="filled" size="md">
                          {provinceName}
                        </Badge>
                      </Group>

                      <Text size="sm" c="dimmed" lineClamp={2} mb="sm">
                        <IconMapPin
                          size={14}
                          style={{
                            verticalAlign: "middle",
                            marginRight: "4px",
                          }}
                        />
                        {center.address || "Endereço não disponível"}
                      </Text>

                      <Divider my="sm" />

                      <Group gap="xs" mb="xs">
                        <IconPhone
                          size={16}
                          color="var(--mantine-color-gray-6)"
                        />
                        <Text size="sm" fw={500}>
                          Telefone: {center.telephone || "N/A"}
                        </Text>
                      </Group>

                      {center.email && (
                        <Group gap="xs">
                          <IconMail
                            size={16}
                            color="var(--mantine-color-gray-6)"
                          />
                          <Text size="sm" fw={500} lineClamp={1}>
                            Email: {center.email}
                          </Text>
                        </Group>
                      )}
                    </Card>
                  );
                })}
              </SimpleGrid>

              {/* Componente de Paginação */}
              {totalPages > 1 && (
                <Center mt="xl">
                  <Pagination
                    value={activePage}
                    onChange={setPage} // 👈 A alteração da página atualiza o estado
                    total={totalPages}
                    size="md"
                    siblings={1}
                    // Role para o topo da Container para que o utilizador veja a nova lista
                    onClick={() =>
                      window.scrollTo({
                        top: 200, // Ajuste este valor conforme necessário para subir até aos cards
                        behavior: "smooth",
                      })
                    }
                  />
                </Center>
              )}
            </>
          ) : (
            <Center py={60}>
              <Text c="dimmed" size="lg">
                Nenhum centro de saúde encontrado para os filtros selecionados.
              </Text>
            </Center>
          )}

          <Text size="xs" c="red" mt="xl" ta="center">
            *Os dados e contactos podem sofrer alterações. Confirme sempre a
            informação por telefone antes de se deslocar.
          </Text>
        </Paper>
      </Container>
    </Box>
  );
}

