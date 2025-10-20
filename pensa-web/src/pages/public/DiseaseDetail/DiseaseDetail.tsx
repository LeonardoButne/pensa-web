import { useParams, Link } from "react-router-dom";
import {
  Container,
  Title,
  Text,
  Image,
  Box,
  Paper,
  Grid,
  Badge,
  Button,
  Group,
  Divider,
  Loader,
  Center,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconAlertCircle,
  IconFirstAidKit,
  IconShieldCheck,
  IconHelpCircle, // Novo ícone para Causas
} from "@tabler/icons-react";
import { useQuery } from "react-query";

// para garantir a consistência dos dados do MOCK.
interface DiseaseDetailData {
  id: number;
  name: string;
  description: string;
  category:
    | "INFECTIOUS_DISEASES"
    | "CHRONIC_DISEASES"
    | "CARDIOVASCULAR"
    | "MENTAL_HEALTH"
    | "RESPIRATORY"
    | "MATERNAL_HEALTH"
    | "CHILD_HEALTH"
    | string;
  imageUrl: string;
  symptoms?: string;
  treatment?: string;
  prevention?: string;
  causes?: string;
  isFeatured: boolean;
}

const MOCK_DISEASES_DETAILS: DiseaseDetailData[] = [
  {
    id: 1,
    name: "Aftas",
    description:
      "É uma pequena úlcera não muito profunda que pode ser bem dolorosas e incomodar o paciente na hora de ingerir alimentos, surge em diversos pontos da boca.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Dor intensa no local, que pode causar dificuldade para comer, falar, engolir, febre, sensação de mal-estar e em alguns casos, aumento das glândulas do pescoço.",
    treatment:
      "Afta passa naturalmente após alguns dias. Se sente muita dor na hora de comer é possível usar medicamentos e pomadas tópicas aplicadas sobre afta.",
    prevention: undefined,
    causes:
      "As aftas, surgem normalmente, como resultado de um sistema imunológico que está mais enfraquecido.",
    isFeatured: false,
  },
  {
    id: 2,
    name: "Alcoolismo",
    description:
      "O alcoolismo é uma condição caracterizada pelo uso compulsivo de bebidas alcoólicas, a pesar das consequências negativas para saúde, vida social, familiar e profissional da pessoa.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Forte vontade de consumir álcool, dificuldade em limitar a quantidade de álcool consumida, ansiedade, náuseas, tremores, irritabilidade quando a pessoa fica sem beber.",
    treatment:
      "Buscar ajuda de profissionais para um tratamento médico, psicológico e social contínuo de modo a que possa prevenir recaídas e reconstruir sua vida.",
    prevention:
      "Evitar consumo precoce e excessivo. Educação sobre riscos e falsos mitos (ex.: álcool alivia o stress). Limitar acesso a bebidas e promover alternativas de lazer sem álcool.",
    causes:
      "Factores biológicos e genéticos como a hereditariedade, factores psicológicos como traumas, ansiedade ou depressão. Factores sociais e Ambientais como a pressão social ou cultural e a falta de uma rede de apoio.",
    isFeatured: true,
  },
  {
    id: 3,
    name: "AVC",
    description:
      "Acidente Vascular Cerebral (AVC ou Derrame) ocorre quando há entupimento ou rompimento dos vasos que levam sangue ao cérebro provocando a paralisia da área.",
    category: "CARDIOVASCULAR",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Dor de cabeça, perda da força de 1 lado do corpo, alterações da visão, boca torta e sobrancelha caída, dificuldade de falar, perda de memória.",
    treatment:
      "Va logo ao Hospital: O tratamento e reabilitação de AVC varia dependendo da gravidade. Os menos graves podem não deixar sequelas. Os graves podem levar à morte.",
    prevention: undefined,
    causes:
      "Isquémico: entupimento dos vasos que levam sangue ao cérebro. Hemorrágico: rompimento do vaso provocando sangramento no cérebro.",
    isFeatured: false,
  },
  {
    id: 4,
    name: "Cancro da Mama",
    description:
      "O cancro da mama é o aparecimento de 1 caroço na mama. É mais frequente na mulher, mas pode atingir também o homen.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Nódulo ou inchaço na mama ou axila, mudança no tamanho ou forma da mama, secreção no mamilo (exceto leite), mudança na cor ou textura da pele da mama.",
    treatment:
      "Cirurgia, radioterapia, quimioterapia e/ou terapia hormonal. O tratamento depende do estágio do cancro e deve ser definido por um especialista.",
    prevention:
      "Autoexame das mamas, mamografia regular, manter um peso saudável, praticar exercícios e evitar o consumo excessivo de álcool.",
    causes:
      "Histórico familiar, obesidade, consumo de álcool, exposição prolongada a hormônios femininos (menstruação precoce e menopausa tardia).",
    isFeatured: false,
  },
  {
    id: 5,
    name: "Cancro da Próstata",
    description:
      "O cancro da próstata é o crescimento desorganizado, descontrolado e desnecessário da próstata (um órgão que se localiza logo abaixo da bexiga masculina).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Na fase inicial, pode não apresentar sintomas. Em fases avançadas: dificuldade para urinar, jato urinário fraco, necessidade de urinar frequentemente (principalmente à noite), sangue na urina ou sêmen.",
    treatment:
      "Cirurgia, radioterapia, terapia hormonal e, em casos iniciais e de baixo risco, vigilância ativa. A escolha depende da idade e da gravidade.",
    prevention:
      "Exames de rotina (Toque Retal e PSA) a partir dos 45-50 anos, dieta rica em frutas, verduras, e grãos, e exercícios regulares.",
    causes:
      "Idade avançada, histórico familiar, obesidade e etnia (mais comum em homens negros).",
    isFeatured: false,
  },
  {
    id: 6,
    name: "Cancro do Colo do Útero",
    description:
      "O cancro do colo do útero é um doença silenciosa (não doi) que se desenvolve no colo do útero (a parte mais funda da vagina).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Sangramento vaginal anormal (após a relação sexual, entre períodos ou após a menopausa), dor pélvica e corrimento vaginal com odor fétido.",
    treatment:
      "Cirurgia, radioterapia e quimioterapia, dependendo do estágio do cancro.",
    prevention:
      "Vacinação contra o HPV (principal causa), uso de preservativo e exame de Papanicolau (preventivo) regular.",
    causes:
      "Infecção persistente pelo Vírus do Papiloma Humano (HPV) de alto risco.",
    isFeatured: false,
  },
  {
    id: 7,
    name: "Cancro Oral",
    description:
      "É um conjunto de tumores malignos que afectam qualquer localização da cavidade oral, dos lábios à garganta, (incluindo as amígdalas e a faringe).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Feridas na boca ou lábios que não cicatrizam em 15 dias, manchas brancas ou vermelhas na boca, sangramento sem causa aparente e dificuldade para mastigar ou engolir.",
    treatment:
      "Cirurgia, radioterapia, isoladas ou combinadas. O diagnóstico precoce é o fator chave para o tratamento.",
    prevention:
      "Evitar o tabaco e o consumo excessivo de álcool, proteger os lábios da exposição solar e manter boa higiene oral.",
    causes:
      "Tabagismo, consumo de álcool, exposição solar (câncer de lábio) e infecção pelo HPV.",
    isFeatured: false,
  },
  {
    id: 8,
    name: "Cárie dentária",
    description:
      "Doença pós-eruptiva, caracterizada por amolecimento da superfície do dente, levando à formação de uma cavidade.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Dor de dente, sensibilidade ao comer doces ou beber líquidos frios/quentes, e buracos visíveis nos dentes.",
    treatment:
      "Remoção do tecido cariado e preenchimento (obturação) do dente. Em casos avançados, canal ou extração.",
    prevention:
      "Escovação correta com pasta fluoretada 3 vezes ao dia, uso de fio dental e visitas regulares ao dentista.",
    causes:
      "Acúmulo de placa bacteriana, consumo excessivo de açúcares e falta de higiene oral adequada.",
    isFeatured: false,
  },
  {
    id: 9,
    name: "Cólera",
    description:
      "Cólera é uma doença infecto-contagiosa do intestino delgado transmitida por meio de alimento ou água contaminados.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Diarreia aquosa e abundante (água de arroz), vômitos e desidratação severa.",
    treatment:
      "Reidratação imediata (soro oral ou venoso) e antibióticos em casos graves. É essencial procurar a Unidade Sanitária.",
    prevention:
      "Consumir apenas água tratada/fervida, lavar bem os alimentos e manter boa higiene pessoal, especialmente das mãos.",
    causes:
      "Ingestão de água ou alimentos contaminados pela bactéria Vibrio cholerae.",
    isFeatured: false,
  },
  {
    id: 10,
    name: "Condiloma Acuminado",
    description:
      "Os condilomas aparecem como verrugas, que ocorrem de forma única ou múltipla, localizadas principalmente na região genital.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Verrugas na região genital ou anal, que podem ser planas, elevadas ou em forma de couve-flor. Podem causar coceira ou ardência.",
    treatment:
      "Remoção das verrugas (cirurgia, laser, cauterização ou medicamentos tópicos). Não elimina o vírus, mas remove as lesões.",
    prevention: "Vacinação contra o HPV e uso correto de preservativo.",
    causes: "Infecção pelo Vírus do Papiloma Humano (HPV).",
    isFeatured: false,
  },
  {
    id: 11,
    name: "Conjuntivite",
    description:
      "É uma doença que se caracteriza pela inflamação da conjuntiva, ou seja, inflamação da membrana de globo ocular.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Olhos vermelhos, coceira, lacrimejamento, secreção (ramela), inchaço das pálpebras e sensibilidade à luz.",
    treatment:
      "Limpeza com água corrente, compressas frias e, dependendo da causa (viral ou bacteriana), colírios específicos. Não usar medicamentos sem orientação.",
    prevention:
      "Lavar as mãos frequentemente, evitar tocar nos olhos e não compartilhar maquiagem ou toalhas.",
    causes:
      "Vírus, bactérias, alergias ou contato com substâncias irritantes (fumaça, cloro).",
    isFeatured: false,
  },
  {
    id: 12,
    name: "Coronavírus",
    description:
      "O coronavírus é um vírus que causa doenças respiratórias que são na maioria gripes comuns. Em algumas pessoas pode causar doenças mais graves como a pneumonia.",
    category: "RESPIRATORY",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Febre, tosse seca, cansaço, dificuldade para respirar (em casos graves), dores musculares, perda de olfato ou paladar.",
    treatment:
      "Tratamento de suporte (repouso, hidratação) e, em casos graves, suporte hospitalar (oxigênio).",
    prevention:
      "Vacinação, uso de máscara em locais fechados, lavar as mãos e manter o distanciamento social.",
    causes:
      "Infecção pelo vírus SARS-CoV-2, transmitido por gotículas respiratórias.",
    isFeatured: true,
  },
  {
    id: 13,
    name: "Corrimento Vaginal",
    description:
      "Corrimento vaginal é uma secreção natural que sai da vagina. Mudanças na cor, cheiro ou quantidade podem indicar um problema.",
    category: "MATERNAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Aumento da secreção com cor, cheiro ou textura anormal (verde, amarelada, fétida). Pode vir acompanhada de coceira, ardência ou dor ao urinar.",
    treatment:
      "O tratamento depende da causa (fúngica, bacteriana ou DST) e é feito com medicamentos (comprimidos ou cremes) receitados pelo médico.",
    prevention:
      "Boa higiene íntima, evitar roupas muito apertadas ou sintéticas, e uso de preservativo nas relações sexuais.",
    causes:
      "Infecções por fungos (candidíase), bactérias (vaginose) ou doenças sexualmente transmissíveis (DSTs).",
    isFeatured: false,
  },
  {
    id: 14,
    name: "Dependência de Drogas Ilícitas",
    description:
      "É quando a pessoa não consegue parar de usar drogas proibidas, como cocaína ou heroína. Continua a usar por se sentir presa ao vício, mesmo com problemas sérios.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Uso compulsivo da substância, necessidade de doses cada vez maiores, ansiedade/irritação na ausência da droga, negligência de responsabilidades e isolamento social.",
    treatment:
      "Tratamento multidisciplinar com acompanhamento médico (desintoxicação), psicológico e apoio de grupos de ajuda (como Narcóticos Anônimos).",
    prevention:
      "Educação sobre os riscos, ambiente familiar de apoio, promoção de atividades saudáveis e tratamento precoce de problemas de saúde mental.",
    causes:
      "Fatores genéticos, psicológicos (busca por alívio de dor emocional) e ambientais (acesso fácil, pressão social, estresse).",
    isFeatured: false,
  },
  {
    id: 15,
    name: "Depressão",
    description:
      "A depressão é uma doença que afeta o modo como a pessoa se sente, pensa e vive o dia a dia. Vai além da tristeza comum.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Tristeza profunda e persistente, perda de interesse em atividades prazerosas, alterações no sono/apetite, cansaço excessivo, dificuldade de concentração e pensamentos de morte ou suicídio.",
    treatment:
      "Psicoterapia (acompanhamento psicológico) e, em muitos casos, uso de antidepressivos prescritos por psiquiatra.",
    prevention:
      "Manter relações sociais saudáveis, prática regular de exercícios, boa higiene do sono e não hesitar em buscar ajuda profissional.",
    causes:
      "Fatores genéticos, alterações químicas no cérebro (neurotransmissores), eventos estressantes da vida (luto, perda de emprego) e outras doenças.",
    isFeatured: true,
  },
  {
    id: 16,
    name: "Diabetes",
    description:
      "Diabetes é 1 doença com aumento anormal de açúcar (glicose) no sangue que surge devido à 1 deficiência na produção/ação da insulina (produzida no pâncreas).",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Muita sede ou fome, cansaço fácil, visão turva, demora na cicatrização de feridas, urina muitas vezes, ganho ou perda de peso em excesso.",
    treatment:
      "Melhorar dieta (comer vegetais e legumes, e evitar açúcar e carboidratos). Usar medicamentos ou insulina conforme orientação médica. Vá logo à unidade sanitária.",
    prevention: undefined, // Mantendo a estrutura
    causes:
      "Pessoas com diabetes na família, falta de exercício, pressão alta, obesidade, consumo excessivo de álcool, dieta rica em gordura e açúcar.",
    isFeatured: false,
  },
  {
    id: 17,
    name: "Diarreia",
    description:
      "Diz-se que se esta com diarreia, quando uma pessoa vai 3 ou mais vezes a casa de banho e evacua fezes amolecidas ou mais líquidas que o normal.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Desidratação, dores de barriga, lábios secos e rachados, olhos para dentro, fraqueza, pregas na barriga, e pulso fraco.",
    treatment:
      "Beba muitos líquidos: água tratada, chá com açúcar, sumo, água de lanho, água de arroz ou mistura de água com açúcar e sal.",
    prevention:
      "Lavar as mãos com sabão ou cinza sempre que usar a latrina, antes de comer e preparar os alimentos e depois de tossir ou expirar.",
    causes:
      "Causas infecciosas (microrganismos) de diarreia, alérgicas, medicamentosas e inflamatórias.",
    isFeatured: false,
  },
  {
    id: 18,
    name: "Doença cardíaca",
    description:
      "Doenças cardiovasculares ou cardíacas são uma classe de doenças que afectam o coração ou os vasos sanguíneos.",
    category: "CARDIOVASCULAR",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Falta de ar, sentir-se fraco/com peso no peito, palpitações cardíacas, inchaço nos tornozelos/pés/barriga, dores de cabeça, vertigens.",
    treatment:
      "O tratamento depende do tipo de doença cardíaca e deve ser avaliado pelo médico. Parte da prevenção é manter um estilo de vida ativo e saudável.",
    prevention:
      "Manter um estilo de vida ativo e saudável, controlar a pressão arterial e o colesterol.",
    causes:
      "Tensão alta, altos níveis de LDL (colesterol), má alimentação, falta de exercício, excesso de peso, diabetes, e estresse.",
    isFeatured: true,
  },
  {
    id: 19,
    name: "Epilepsia",
    description:
      "Doença neurológica caracterizada por convulsões recorrentes causadas por descargas eléctricas anormais no cérebro. A epilepsia não é contagiosa e tem tratamento.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Fase inicial: visão turva, tonturas e náuseas. Durante a crise: perda de consciência, tremores involuntários (convulsões) e espumar pela boca. Pós-crise: Confusão mental, sonolência e dores de cabeça.",
    treatment:
      "Os medicamentos antiepilépticos representam a principal forma de controle das crises para a maioria dos pacientes. Cirurgia é uma opção em casos difíceis.",
    prevention:
      "Manter uma rotina saudável (alimentação equilibrada, exercícios moderados), proteger a cabeça durante atividades de risco e evitar privação de sono, estresse e luzes intensas.",
    causes:
      "Traumas ou lesões na cabeça, infecções como a meningite, ou um AVC. Também pode ter origem genética.",
    isFeatured: false,
  },
  {
    id: 20,
    name: "Fendas Labiais",
    description:
      "São anomalias congénitas consistem em fendas nas estruturas anatómicas como os lábios, o palato, alvéolo dentário, comissura labial, pálpebras, cantos dos olhos.",
    category: "CHILD_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Fenda visível nos lábios e/ou no palato (céu da boca) à nascença.",
    treatment:
      "O tratamento para fenda palatina é feito por meio da realização de cirurgia, que tem como objetivo corrigir a anomalia.",
    prevention: undefined,
    causes:
      "Associa-se a má nutrição, consumo de bebidas alcoólicas e tabagismo, algumas doenças maternas durante a gestação e hereditariedade.",
    isFeatured: false,
  },
  {
    id: 21,
    name: "Gengivite",
    description: "É uma inflamação da gengiva.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Gengivas inchadas, vermelhas e sangramento ao toque ou ao escovar os dentes.",
    treatment:
      "Escovar os dentes corretamente com uma pasta de dentes com flúor 3 vezes por dia sempre depois das refeições, principalmente antes de dormir.",
    prevention: undefined,
    causes:
      "A causa mais comum é o acúmulo da placa bacteriana nos dentes e na gengiva falta de higiene oral adequada.",
    isFeatured: false,
  },
  {
    id: 22,
    name: "Gonorreia",
    description:
      "A gonorreia é uma infecção causada por uma bactéria e é transmitida atraves de contacto sexual desprotegido (vaginal, oral ou anal) com uma pessoa infectada. ",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Nos homens: dor ao urinar e saída de um líquido amarelo-esverdeado de pus pelo pénis. Nas mulheres: corrimento vaginal, dor e ardência ao urinar e dor na parte baixa da barriga.",
    treatment:
      "A gonorreia tem cura e é feito com antibióticos receitados pelo provedor de saúde. É importante completar o tratamento.",
    prevention:
      "Usar preservativo em todas as relações sexuais é a melhor forma de evitar a infecção.",
    causes:
      "É causada por uma bactéria chamada Neisseria gonorrhoeae, transmitida através de relações sexuais sem proteção.",
    isFeatured: false,
  },
  {
    id: 23,
    name: "Halitose",
    description:
      "A Halitose (Mau Hálito) é a alteração no hálito, produzindo um mau cheiro. Pode ser causada por má higiene ou outros problemas de saúde.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "O principal sintoma é a alteração no hálito, produzindo um mau cheiro.",
    treatment:
      "Adotar boa rotina de higiene oral, escovando os dentes usando uma pasta de dentes com flúor 3 vezes ao dia, sempre depois das refeições e antes de dormir.",
    prevention: "Boa higiene oral e tratamento de cáries e gengivite.",
    causes:
      "Está associada à existência de cáries e à má higiene bucal, porém pode ter outra origem como a respiratória, digestiva e de origem metabólica e sistémica.",
    isFeatured: false,
  },
  {
    id: 24,
    name: "Hepatite B",
    description:
      "Hepatite B é uma infecção do fígado causada pelo vírus da hepatite B (VHB). O VHB é transmitido por contacto com fluidos corporais infectados.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Diversas pessoas não apresentam sintomas. Mas podem ter: febre, náuseas, dor abdominal, urina escura, fezes claras e pele ou olhos amarelados (icterícia).",
    treatment:
      "Não há cura para casos crônicos, mas há medicamentos que ajudam a controlar o vírus e evitar complicações.",
    prevention:
      "Vacinação, uso de preservativos, não partilhar objectos perfurantes e ter cuidados em procedimentos médicos e estéticos.",
    causes:
      "É transmitida pelo sangue, relações sexuais desprotegidas, partilha de agulhas ou de objectos cortantes, e da mãe para o filho durante o parto.",
    isFeatured: false,
  },
  {
    id: 25,
    name: "Herpes Genital",
    description:
      "A úlcera genital (Herpes genital) ou anorrectal é caracterizada por presença de borbulhas ou feridas na área genital.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Presença de vesículas agrupadas em 'cacho' com sintomas como sensibilidade aumentada, ardência, comichão (coceira).",
    treatment:
      "O tratamento é feito com antivirais para reduzir a duração e a frequência dos surtos.",
    prevention:
      "Usar preservativo sempre que tiver relações sexuais. Falar abertamente com o(a) parceiro(a) sobre saúde sexual é importante.",
    causes:
      "Transmite-se através de relações sexuais sem preservativo com alguém infectado por herpes genital.",
    isFeatured: false,
  },
  {
    id: 26,
    name: "Hipertensão Arterial",
    description:
      "Hipertensão ou Tensão alta é uma doença que ocorre quando a pressão que o sangue faz na parede das artérias para se movimentar é muito forte.",
    category: "CARDIOVASCULAR",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Geralmente não apresenta sintomas, mas há doentes que sentem dores de cabeça, tonturas, fraqueza, visão turva. Pode levar ao AVC e morte.",
    treatment:
      "Vá logo ao Hospital: Tratar a Hipertensão Arterial com medicamentos, reduzir uso de sal e álcool, dieta com pouca gordura, exercício físico e parar de fumar.",
    prevention:
      "Estilo de vida saudável, controlo de peso, redução do sal e prática de exercício físico.",
    causes:
      "Vida sedentária, estresse, falta de exercício físico, obesidade, consumo excessivo de álcool, fumar, dieta rica em gordura e sal.",
    isFeatured: true,
  },
  {
    id: 27,
    name: "HIV/SIDA",
    description:
      "SIDA é provocada pelo Vírus da Imunodeficiência Humana (HIV) que entra no organismo por contacto com uma pessoa infectada e destroi as nossas células de defesa.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Febre, tosse, suores noturnos, inchaço dos gânglios linfáticos, dores de cabeça/músculos/articulações, emagrecimento, falta de apetite.",
    treatment:
      "Não se elimina HIV, mas para o paciente viver mais e melhor deve manter 1 vida saudável, e tomar Antirretrovirais para impedir a multiplicação do vírus.",
    prevention:
      "Usar sempre preservativo, ter apenas 1 parceiro, não partilhar objectos cortantes. A mulher grávida deve aderir ao programa PTV.",
    causes:
      "Relações sexuais desprotegidas, transfusão de sangue, da mãe para o bebé (na gravidez, parto e amamentação), partilha de objectos cortantes.",
    isFeatured: false,
  },
  {
    id: 28,
    name: "Malária",
    description:
      "Malária é uma doença infecciosa causada pela picada de mosquito anofeles infectado que injecta o parasita quando pica a pessoa para se alimentar do sangue dela.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Febre, suor, tremores e calafrios, dores de cabeça e musculares, cansaço, náusea, vómito, diarreia. Pode levar à morte quando não tratada.",
    treatment:
      "Vá ao centro de saúde mais próximo e consulte o profissional de saúde para tratamento imediato com antimaláricos.",
    prevention:
      "Durma debaixo da rede mosquiteira tratada com isecticida. Elimine a água parada e use repelentes.",
    causes:
      "A malária é causada pelo plasmodium falciparum através da picada do mosquito infectado.",
    isFeatured: true,
  },
  {
    id: 29,
    name: "Marburg",
    description:
      "É uma febre hemorrágica rara, mas grave, que afecta humanos e é causada pelo vírus Marburg.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Febre, calafrios, cefaleia e dor muscular. Pode evoluir para náusea, vômito, diarreia, icterícia, insuficiência hepática e hemorragia maciça.",
    treatment:
      "Não há tratamento específico para a doença. A doença é tratada de acordo com a sintomatologia. A pessoa infectada deve cumprir com o isolamento.",
    prevention:
      "Evitar contacto com fluidos/objectos contaminados; cumprir com a quarentena em caso de contacto com alguém infectado; uso da máscara e higiene.",
    causes:
      "É transmitido por meio do contacto com uma pessoa infectada, o vírus se espalha pelo sangue e fluidos corporais.",
    isFeatured: false,
  },
  {
    id: 30,
    name: "Noma",
    description:
      "O noma (o termo vem do grego e significa 'devorar') é uma doença necrosante destrutiva da boca e do rosto.",
    category: "CHILD_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Mau hálito ou halitose, ulceração dolorosa das gengivas, sangramento espontâneo, salivação excessiva, desfiguração, perda de dentes.",
    treatment:
      "O tratamento é complexo e necessita de uma rápida intervenção. Dirija-se a uma Unidade Sanitária, logo que começarem os primeiros sintomas.",
    prevention:
      "Melhoria das condições de higiene oral e combate à subnutrição.",
    causes:
      "Doenças concomitantes, como o sarampo ou o paludismo, má higiene oral, factores sociais e ambientais.",
    isFeatured: false,
  },
  {
    id: 31,
    name: "Periodontite",
    description: "É destruição do osso e dos tecidos que suportam o dente.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Mau hálito, gengiva vermelha e inchada, dentes tortos, aumento da sensibilidade dentária, mobilidade dentária, perda dos dentes, aumento do espaço entre dentes.",
    treatment:
      "Destartarização ou limpeza nos dentes, para remoção da placa bacteriana e de tártaro que estão a destruir a estrutura óssea que suporta o dente.",
    prevention:
      "Escovação e uso de fio dental regulares. Não deixar de tratar a gengivite.",
    causes:
      "Consequência de acumulação de placa bacteriana e de NÃO tratamento da gengivite.",
    isFeatured: false,
  },
  {
    id: 32,
    name: "Pólio",
    description:
      "A Pólio é uma doença altamente contagiosa, que causa paralisia infantil e não tem cura. Em casos graves pode levar à morte.",
    category: "CHILD_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "A criança com pólio apresenta febres altas e perda da força muscular. Um ou mais membros (braço ou perna) podem ficar paralisados.",
    treatment:
      "Não existe um tratamento específico para a pólio. Repouso absoluto é recomendado. Dirija-se à unidade sanitária para receber apoio profissional.",
    prevention:
      "A vacina oral contra a pólio é a forma mais eficaz para proteger as crianças e interromper a cadeia de transmissão do vírus no País.",
    causes:
      "A doença se transmite ao consumir comida ou água contaminada por fezes de uma pessoa com o micróbio do pólio ou então, mãos sujas por fezes contaminadas.",
    isFeatured: false,
  },
  {
    id: 33,
    name: "Raiva",
    description:
      "A raiva é uma doença causada por um vírus que afeta animais mamíferos, incluindo o Homem.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Dor no local da mordedura, perda de sensibilidade local, mal-estar geral, dor de cabeça, febre, ansiedade, dor de garganta, salivação excessiva, convulsões.",
    treatment:
      "Se foi mordido por um animal, lave a ferida por mais de 15 minutos com água limpa e sabão e vá sem demora à Unidade Sanitária mais próxima para vacinação pós-exposição.",
    prevention:
      "Leve os seus animais (cães e gatos) à vacinação contra a raiva, uma vez por ano. Não brinque com animais não vacinados e nem desconhecidos.",
    causes:
      "Raiva é causada pela transmissão da saliva do animal que tiver a doença, quando este morde, arranha ou lambe as feridas.",
    isFeatured: false,
  },
  {
    id: 34,
    name: "Sífilis",
    description:
      "A sífilis é uma infecção causada pela bactéria Treponema pallidum, transmitida por via sexual ou vertical (de mãe para o filho).",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Primeiro: ferida no local de entrada da bactéria (pénis, vagina, ânus, boca). Secundária: Manchas no corpo, palmas das mãos e plantas dos pés. Terciária: Afecta o coração, cérebro, nervos e ossos.",
    treatment:
      "A sífilis tem cura. É tratada com antibióticos, normalmente uma injeção. Quanto mais cedo for tratada, melhor.",
    prevention:
      "Uso correto do preservativo, realizar teste para ISTs. Evitar múltiplos parceiros e relações sexuais desprotegidas.",
    causes: "A sífilis é causado por uma bacteria chamada Treponema pallidum.",
    isFeatured: false,
  },
  {
    id: 35,
    name: "Suicídio",
    description:
      "Suicídio é quando alguém tira a própria vida, movido por uma dor profunda que parece não ter fim. Muitas vezes, a pessoa já tentou antes ou deu sinais de que estava a sofrer.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "A pessoa pode começar a se isolar, perder interesse em tudo, ou até começar a se desfazer de coisas importantes. Falar direta ou indiretamente sobre a morte são pedidos de ajuda.",
    treatment:
      "Se o risco for imediato, não deixe a pessoa sozinha e busque ajuda médica imediata. Incentive a procurar um psicólogo ou psiquiatra.",
    prevention:
      "A melhor prevenção é não ter medo de falar sobre isso. Mostre que ela não está sozinha, ofereça companhia e ajude-a a encontrar apoio.",
    causes:
      "Pode ser uma mistura de tristeza profunda, solidão, perdas recentes, abusos, pressão no trabalho ou estudo, ou até doenças que afectam a mente, como a depressão.",
    isFeatured: true,
  },
  {
    id: 36,
    name: "Tabagismo",
    description:
      "O tabagismo é uma dependência da nicotina, substância presente no tabaco que leva ao uso contínuo de cigarros e outros produtos derivados.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Desejo intenso por fumar, ansiedade ou irritação quando não consegue fumar. A longo prazo, tosse crônica, dificuldades respiratórias e cancro.",
    treatment:
      "Redução progressiva do número de cigarros. Apoio médico e psicológico para tratar a dependência física e emocional.",
    prevention:
      "Manter um ambiente livre de fumo e adotar um estilo de vida saudável, com atividades físicas e alimentação equilibrada.",
    causes:
      "Curiosidade, influência de amigos e familiares, exposição constante ao fumo do cigarro, ansiedade e depressão.",
    isFeatured: false,
  },
  {
    id: 37,
    name: "Tártaro",
    description:
      "É calcificação da placa bacteriana ao longo do tempo pelo efeito da saliva só por si não é doença, mas sua presença na superfície dentária origina outras doenças.",
    category: "CHRONIC_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Endurecimento da placa bacteriana, inchaço e vermelhidão na gengiva, retração gengival e mau hálito.",
    treatment:
      "Só através de uma limpeza feita por um profissional de saúde oral, na estomatologia ou consultório dentário para remover o tártaro.",
    prevention:
      "Escovação e uso de fio dental regulares para prevenir o acúmulo de placa.",
    causes:
      "Resulta da placa bacteriana que fica depositada nas arcadas dentárias por período de tempo mais ou menos prolongado.",
    isFeatured: false,
  },
  {
    id: 38,
    name: "Tuberculose",
    description:
      "Tuberculose é uma doença causada por uma bactéria que afecta principalmente os pulmões, mas pode afectar qualquer órgão do corpo como ossos, rins, e o cérebro.",
    category: "RESPIRATORY",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Os principais sintomas da tuberculose são a tosse persistente, a febre, a perda de peso e falta de apetite. Podendo causar também dor no peito e suores nocturnos.",
    treatment:
      "O tratamento da tuberculose é gratuito e está disponível em todas as Unidades Sanitarias, podendo durar 6 ou mais meses.",
    prevention:
      "Evite locais com aglomerados, mantenha as janelas abertas para circulação de ar e cumpra com a etiqueta da tosse.",
    causes:
      "A tuberculose é transmitida quando um indivíduo contaminado tosse, expira ou fala, liberando gotículas de saliva que contêm bactérias.",
    isFeatured: false,
  },
  {
    id: 39,
    name: "Varíola dos macacos",
    description:
      "A Varíola dos Macacos (Mpox) é uma doença causada pelo vírus que infecta macacos. Pode ser transmitida através do contacto com animais infectados ou com uma pessoa infectada.",
    category: "INFECTIOUS_DISEASES",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Erupções cutâneas iguais a borbulhas em partes do corpo, ter febres, Inchaço nos gânglios, dores musculares, dores de cabeça, fraqueza.",
    treatment:
      "Dirija-se à Unidade sanitária mais próxima de si. O tratamento é focado no alívio dos sintomas em isolamento domiciliar de 5 a 21 dias.",
    prevention:
      "Para prevenir a transmissão do vírus Mpox, fica atento aos sinais e sintomas da doença, evite contato íntimo com pessoas com lesões suspeitas.",
    causes:
      "Contacto direto pele a pele com erupções cutâneas, crostas ou certos fluídos corporais, e contacto com objectos contaminados.",
    isFeatured: false,
  },
  {
    id: 40,
    name: "Vício em Jogos de Azar",
    description:
      "É uma perturbação em que a pessoa sente desejo incontrolável de jogar, mesmo sabendo dos prejuízos. O jogo passa a ser o centro da vida.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Perda de controlo, apostas frequentes e progressivas, esconder o problema da família, endividamento e sofrimento emocional.",
    treatment:
      "Reconhecer que há um problema é o primeiro passo. Evitar locais de apostas. Buscar apoio emocional e atendimento psicológico.",
    prevention:
      "Controlo de acesso, campanhas de sensibilização e apoio para mudança comportamental e emocional.",
    causes:
      "Promessa de dinheiro fácil, sensação de emoção e adrenalina ao apostar, influência de amigos ou publicidade assim como a facilidade de acesso aos jogos.",
    isFeatured: false,
  },
  {
    id: 41,
    name: "Vício em Redes Sociais",
    description:
      "É quando a pessoa sente necessidade constante de estar conectada, mesmo sem motivo claro e não conseguem controlar o tempo que passa online.",
    category: "MENTAL_HEALTH",
    imageUrl: "/images/disease-placeholder.jpg",
    symptoms:
      "Ansiedade ou tristeza quando está longe do celular ou da internet. Verificação compulsiva de notificações, isolamento e negligência de tarefas.",
    treatment:
      "Reconhecer o problema é o primeiro passo. Estabelecer limites de tempo de uso diário. Praticar atividades presenciais. Buscar apoio nos serviços de saúde mental.",
    prevention:
      "Evitar o uso constante de redes sociais, fazer o uso pausado se necessário, controlar o tempo de uso, trocar o uso pela prática de outras atividades fora do telefone.",
    causes:
      "Vontade de se sentir aceito, receber atenção ou esquecer problemas. As redes sociais prendem a atenção: cada vídeo ou imagem activa áreas do cérebro ligadas ao prazer.",
    isFeatured: false,
  },
];

// MOCK para simular diseasesService.getById
const mockDiseasesService = {
  getById: (id: number) => {
    const disease = MOCK_DISEASES_DETAILS.find((d) => d.id === id);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (disease) {
          resolve({ data: disease });
        } else {
          // Simula um erro ou não encontrado
          resolve({ data: undefined });
        }
      }, 500); // Simula delay de rede
    });
  },
};

// ===========================================
// 2. COMPONENTE ADAPTADO
// ===========================================

export function DiseaseDetail() {
  const { id } = useParams<{ id: string }>();

  // A tipagem do useQuery agora usa o tipo DiseaseDetailData
  const { data, isLoading } = useQuery(
    ["disease", id],
    // Substituindo diseasesService.getById pela função de mock
    () => mockDiseasesService.getById(Number(id)),
    {
      enabled: !!id,
    }
  );

  // O componente espera data.data ser DiseaseDetailData | undefined
  const diseaseData: DiseaseDetailData | undefined = (
    data as { data: DiseaseDetailData }
  )?.data;

  if (isLoading) {
    return (
      <Center py={100}>
        <Loader size="lg" />
      </Center>
    );
  }

  // Verifica se não há dados ou se o mock retornou undefined
  if (!diseaseData) {
    return (
      <Container size="md" py={60}>
        <Center>
          <Box ta="center">
            <IconAlertCircle size={48} color="red" />
            <Title order={3} mt="md">
              Doença não encontrada
            </Title>
            <Button
              component={Link}
              to="/doencas"
              mt="lg"
              leftSection={<IconArrowLeft size={16} />}
            >
              Voltar para doenças
            </Button>
          </Box>
        </Center>
      </Container>
    );
  }

  const disease = diseaseData;

  // Função auxiliar para formatar a categoria
  const formatCategory = (category: string) => {
    // Exemplo: 'CARDIOVASCULAR' -> 'Cardiovascular'
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box py={60}>
      <Container size="lg">
        <Button
          component={Link}
          to="/doencas"
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          mb="xl"
        >
          Voltar para doenças
        </Button>

        <Paper shadow="sm" radius="lg" p="xl">
          <Grid>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Image
                src={disease.imageUrl || "/images/disease-placeholder.jpg"}
                alt={disease.name}
                radius="md"
                fallbackSrc="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='%2300A0A0'/%3E%3C/svg%3E"
              />
              {disease.isFeatured && (
                <Badge color="cyan" size="lg" mt="md" fullWidth>
                  Em Destaque
                </Badge>
              )}
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Title order={1} mb="md">
                {disease.name}
              </Title>

              {disease.category && (
                <Badge color="cyan" variant="light" size="lg" mb="lg">
                  {formatCategory(disease.category)}
                </Badge>
              )}

              <Text size="lg" c="dimmed" mb="xl">
                {disease.description}
              </Text>

              <Divider my="xl" />

              {/* Novo Bloco: Causas */}
              {disease.causes && (
                <Box mb="xl">
                  <Group mb="md">
                    <IconHelpCircle
                      size={24}
                      color="var(--mantine-color-orange-6)"
                    />
                    <Title order={3}>Causas</Title>
                  </Group>
                  <Text>{disease.causes}</Text>
                </Box>
              )}
              {/* Fim do Novo Bloco: Causas */}

              {disease.symptoms && (
                <Box mb="xl">
                  <Group mb="md">
                    <IconAlertCircle
                      size={24}
                      color="var(--mantine-color-red-6)"
                    />
                    <Title order={3}>Sintomas</Title>
                  </Group>
                  <Text>{disease.symptoms}</Text>
                </Box>
              )}

              {disease.treatment && (
                <Box mb="xl">
                  <Group mb="md">
                    <IconFirstAidKit
                      size={24}
                      color="var(--mantine-color-blue-6)"
                    />
                    <Title order={3}>Tratamento</Title>
                  </Group>
                  <Text>{disease.treatment}</Text>
                </Box>
              )}

              {disease.prevention && (
                <Box>
                  <Group mb="md">
                    <IconShieldCheck
                      size={24}
                      color="var(--mantine-color-green-6)"
                    />
                    <Title order={3}>Prevenção</Title>
                  </Group>
                  <Text>{disease.prevention}</Text>
                </Box>
              )}
            </Grid.Col>
          </Grid>
        </Paper>

        {/* <Paper shadow="sm" radius="lg" p="xl" mt="xl" bg="cyan.0">
          <Title order={3} mb="md">
            Precisa de ajuda?
          </Title>
          <Text mb="lg">
            Se você está enfrentando sintomas relacionados a esta doença, é
            importante procurar ajuda médica profissional.
          </Text>
          <Group>
            <Button component={Link} to="/medicos" color="cyan" size="lg">
              Encontre um médico
            </Button>
            <Button
              component="a"
              href="tel:*660#"
              variant="outline"
              color="cyan"
              size="lg"
            >
              Ligue *660#
            </Button>
          </Group>
        </Paper> */}
      </Container>
    </Box>
  );
}

