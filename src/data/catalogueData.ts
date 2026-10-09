// Generated from Pieces_Carrosserie_Par_Modele_MAJ.xlsx model worksheets.
export interface CataloguePart {
  model: string;
  category: string;
  subType: string;
  position: string;
  itemCode: string;
  itemShortName: string;
}

export const normalizeCatalogueModel = (value: string) =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/^DONGFENG\s+/i, "").replace(/[^a-z0-9]/gi, "").toUpperCase();

export const catalogueData = [
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1012014-FD2302-B",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "KLXK32551X",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FFPNH0402X",
    "itemShortName": "FILTRE À CARBURANT"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "8104012-FD2202",
    "itemShortName": "COURROIE ALTERNAREUR"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "P01A085401",
    "itemShortName": "Filtre A Clim"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-02",
    "itemShortName": "HAVOLINE ProDS MSAE 5W30"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Ambulance",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO ATF",
    "itemShortName": "HUILE ATF 1L"
  },
  {
    "model": "BOX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B024934",
    "itemShortName": "AC filter"
  },
  {
    "model": "BOX",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "BOX",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "SP4-1",
    "itemShortName": "Drive motor Gearbox oil"
  },
  {
    "model": "BOX",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "B025379",
    "itemShortName": "Drive motor Cooling fluid"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre / glace",
    "position": "ARD",
    "itemCode": "L054030208",
    "itemShortName": "Vitres arrière droites"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Lunette arrière",
    "position": "AR",
    "itemCode": "L08231009",
    "itemShortName": "Joint de lunette arrière"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Lunette arrière",
    "position": "AR",
    "itemCode": "5603-L11",
    "itemShortName": "LUNETTE AR"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Pare-brise arrière / lunette",
    "position": "AR",
    "itemCode": "L04230013",
    "itemShortName": "Pare-brise arrière en verre tr"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre latérale",
    "position": "AR",
    "itemCode": "L054030208-L",
    "itemShortName": "GLACE LATERAL AR"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre / glace",
    "position": "G",
    "itemCode": "L055030307",
    "itemShortName": "QUATRIÈME VITRE GAUCHE"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre latérale",
    "position": "G",
    "itemCode": "L055030305",
    "itemShortName": "Deuxième vitre collée gauche"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre latérale",
    "position": "G",
    "itemCode": "5503003-L11",
    "itemShortName": "VITRE LATERALE GH N°4"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre latérale",
    "position": "D",
    "itemCode": "L054030304",
    "itemShortName": "Deuxième vitre collée droite"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre latérale",
    "position": "D",
    "itemCode": "L054030206",
    "itemShortName": "TROISIÈME VITRE COLLÉE DROITE"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre latérale",
    "position": "D",
    "itemCode": "5403001-L11",
    "itemShortName": "VITRE LATERALE DR N°1"
  },
  {
    "model": "BUS",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "Non précisé",
    "itemCode": "5503000-L11",
    "itemShortName": "GLACE DE PORTE CONDUCTEUR"
  },
  {
    "model": "BUS",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5303-L11",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "BUS",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "L04230012",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "BUS",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5306052-L11",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "BUS",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "L04230001(L)",
    "itemShortName": "OPTIQUE AVG"
  },
  {
    "model": "BUS",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "L04230001(R)",
    "itemShortName": "OPTIQUE AVD"
  },
  {
    "model": "BUS",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARG",
    "itemCode": "L04230004(L)",
    "itemShortName": "FEU ARG"
  },
  {
    "model": "BUS",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARD",
    "itemCode": "3722010-L11",
    "itemShortName": "FEU ARD"
  },
  {
    "model": "BUS",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARD",
    "itemCode": "L04230004(R)",
    "itemShortName": "FEU ARD"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "LF16015",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1109010-FF03825B-001",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "C4989106",
    "itemShortName": "FILTRE À CARBURANT"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FS19816X",
    "itemShortName": "Filtre à eau"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "C4994780",
    "itemShortName": "COURROIE"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-1",
    "itemShortName": "DELO 400 SLK SAE 15W40"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "BUS",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO ATF",
    "itemShortName": "HUILE ATF 1L"
  },
  {
    "model": "Captain 3400",
    "category": "Portes",
    "subType": "Porte",
    "position": "AVG",
    "itemCode": "D6101009-T1500",
    "itemShortName": "PORTE AVG"
  },
  {
    "model": "Captain 3400",
    "category": "Portes",
    "subType": "Porte",
    "position": "AVD",
    "itemCode": "D6101010-T1500",
    "itemShortName": "PORTE AVD"
  },
  {
    "model": "Captain 3400",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVD",
    "itemCode": "6103010-T1500",
    "itemShortName": "VITRE DE PORTE AVD"
  },
  {
    "model": "Captain 3400",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "8406010-T1500",
    "itemShortName": "PARE CHOCS AV"
  },
  {
    "model": "Captain 3400",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "Non précisé",
    "itemCode": "8406010-T1500-G",
    "itemShortName": "pare-choc"
  },
  {
    "model": "Captain 3400",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206611-T1501",
    "itemShortName": "PARE-BRISE"
  },
  {
    "model": "Captain 3400",
    "category": "Calandre / grille / logo",
    "subType": "Grille",
    "position": "AV",
    "itemCode": "8406013-T1500",
    "itemShortName": "GRILLE AV"
  },
  {
    "model": "Captain 3400",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5000522-T1500",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "Captain 3400",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5301515-T1502",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "Captain 3400",
    "category": "Calandre / grille / logo",
    "subType": "Logo / emblème",
    "position": "Non précisé",
    "itemCode": "5000515-T1500",
    "itemShortName": "MONOGRAMME"
  },
  {
    "model": "Captain 3400",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "3772010-T1501",
    "itemShortName": "OPTIQUE AVG"
  },
  {
    "model": "Captain 3400",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "3772020-T1501",
    "itemShortName": "OPTIQUE AVD"
  },
  {
    "model": "Captain 3400",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "37720201600D031A",
    "itemShortName": "OPTIQUE AVD BLEU"
  },
  {
    "model": "Captain 3400",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARG",
    "itemCode": "37QC9-73010-A-B",
    "itemShortName": "FEU ARG"
  },
  {
    "model": "Captain 3400",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARD",
    "itemCode": "37QC9-73020-A",
    "itemShortName": "FEU ARD"
  },
  {
    "model": "Captain 3400",
    "category": "Feux AR",
    "subType": "Feu d'immatriculation",
    "position": "Non précisé",
    "itemCode": "3717010-Q22925A",
    "itemShortName": "FEU D'IMMATRICULATION"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "JE1012160TA",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1109V91711-020/030",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FF5236",
    "itemShortName": "FILTRE A GASOIL"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FSP0120",
    "itemShortName": "PRE FILTRE"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "JE1307012A1A",
    "itemShortName": "COURROIE"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "JE3406021A",
    "itemShortName": "COURROIE STRIÉE"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-1",
    "itemShortName": "DELO 400 SLK SAE 15W40"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-20",
    "itemShortName": "GEAR OIL GL-5"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "Captain 3400",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Captain 3500",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVD",
    "itemCode": "6103020-G01201A",
    "itemShortName": "VITRE DE PORTE AVD"
  },
  {
    "model": "Captain 3500",
    "category": "Vitres / glaces",
    "subType": "Vitre / glace",
    "position": "Non précisé",
    "itemCode": "5205049-G01202B",
    "itemShortName": "BRAS ESSUI-GLACE G/D"
  },
  {
    "model": "Captain 3500",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206011-G01201C",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "Captain 3500",
    "category": "Calandre / grille / logo",
    "subType": "Grille",
    "position": "AV",
    "itemCode": "5302060-G01102A",
    "itemShortName": "GRILLE AV"
  },
  {
    "model": "Captain 3500",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5302040-G01102B",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "Captain 3500",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5302011-G01101C",
    "itemShortName": "CALANDRE SUP"
  },
  {
    "model": "Captain 3500",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "3772010-QA3401K",
    "itemShortName": "OPTIQUE AVG"
  },
  {
    "model": "Captain 3500",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARG",
    "itemCode": "37QF18-73010",
    "itemShortName": "FEU ARG"
  },
  {
    "model": "Captain 3500",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARD",
    "itemCode": "37QF18-73020",
    "itemShortName": "FEU ARD"
  },
  {
    "model": "Captain 3500",
    "category": "Feux AR",
    "subType": "Feu d'immatriculation",
    "position": "Non précisé",
    "itemCode": "3717010-Q22925A",
    "itemShortName": "FEU D'IMMATRICULATION"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "JE1012160TA",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "Q33101-020X-B",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FF5236",
    "itemShortName": "FILTRE A GASOIL"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FSP0120",
    "itemShortName": "PRE FILTRE"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "3407012JQV",
    "itemShortName": "COURROIE DE DISTRIBUTION"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-1",
    "itemShortName": "DELO 400 SLK SAE 15W40"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-20",
    "itemShortName": "GEAR OIL GL-5"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "Captain 3500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Captain 7500",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVG",
    "itemCode": "6103019-G01201A",
    "itemShortName": "VITRE DE PORTE AVG"
  },
  {
    "model": "Captain 7500",
    "category": "Pare-chocs AV / AR",
    "subType": "Support pare-chocs",
    "position": "AVG",
    "itemCode": "8422521-G07104-B",
    "itemShortName": "SUPPORT PARE CHOCS AVG"
  },
  {
    "model": "Captain 7500",
    "category": "Pare-chocs AV / AR",
    "subType": "Support pare-chocs",
    "position": "AVD",
    "itemCode": "8422522-G07104-B",
    "itemShortName": "SUPPORT PARE CHOCS AVD"
  },
  {
    "model": "Captain 7500",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "5302060-G07102",
    "itemShortName": "CALANDRE INF DE PARCHOC AV"
  },
  {
    "model": "Captain 7500",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "8422020-G07101",
    "itemShortName": "PARE CHOCS AV"
  },
  {
    "model": "Captain 7500",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206011-G07201C",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "Captain 7500",
    "category": "Calandre / grille / logo",
    "subType": "Grille de pare-chocs",
    "position": "AVD",
    "itemCode": "8422054-G07101",
    "itemShortName": "GRILLE DE PARE CHOCS AVD"
  },
  {
    "model": "Captain 7500",
    "category": "Calandre / grille / logo",
    "subType": "Support calandre",
    "position": "G",
    "itemCode": "5302072-G07101",
    "itemShortName": "SUPPORT CALANDRE GAUCHE"
  },
  {
    "model": "Captain 7500",
    "category": "Calandre / grille / logo",
    "subType": "Support calandre",
    "position": "G",
    "itemCode": "5302131-G01201",
    "itemShortName": "SUPPORT DE CALANDRE GAUCHE"
  },
  {
    "model": "Captain 7500",
    "category": "Calandre / grille / logo",
    "subType": "Support calandre",
    "position": "D",
    "itemCode": "5302071-G07101A",
    "itemShortName": "SUPPORT CALANDRE DROIT"
  },
  {
    "model": "Captain 7500",
    "category": "Calandre / grille / logo",
    "subType": "Support calandre",
    "position": "D",
    "itemCode": "5302132-G01201",
    "itemShortName": "SUPPORT DE CALANDRE DROIT"
  },
  {
    "model": "Captain 7500",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5302040-G07102",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "Captain 7500",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "3772020-CA3101",
    "itemShortName": "OPTIQUE AVD"
  },
  {
    "model": "Captain 7500",
    "category": "Optiques AV",
    "subType": "Support optique",
    "position": "AVD",
    "itemCode": "5302080-G01101",
    "itemShortName": "SUPPORT OPTIQUE AVD"
  },
  {
    "model": "Captain 7500",
    "category": "Feux AR",
    "subType": "Feu d'immatriculation",
    "position": "Non précisé",
    "itemCode": "3717010-Q22925A",
    "itemShortName": "FEU D'IMMATRICULATION"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "LF16015",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "CA3101-020",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "C5262311",
    "itemShortName": "FILTRE À CARBURANT"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "C5259161",
    "itemShortName": "SÉPARATEUR DE CARBURANT ET D'E"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "C3972384",
    "itemShortName": "COURROIE ALTERNATEUR"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-1",
    "itemShortName": "DELO 400 SLK SAE 15W40"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Captain 7500",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Captain C",
    "category": "Vitres / glaces",
    "subType": "Vitre / glace",
    "position": "Non précisé",
    "itemCode": "5205010-G07202A",
    "itemShortName": "BRAS ESSUI-GLACE /G D"
  },
  {
    "model": "Captain C",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206011-G07201C",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "Captain T",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "8406010-T1500",
    "itemShortName": "PARE CHOCS AV"
  },
  {
    "model": "Captain T",
    "category": "Feux AR",
    "subType": "Feu d'immatriculation",
    "position": "Non précisé",
    "itemCode": "3717010-Q22925A",
    "itemShortName": "FEU D'IMMATRICULATION"
  },
  {
    "model": "Captain W",
    "category": "Portes",
    "subType": "Porte",
    "position": "AVG",
    "itemCode": "6100011-V01001",
    "itemShortName": "PORTE AVG"
  },
  {
    "model": "Captain W",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVG",
    "itemCode": "61031001600D111A",
    "itemShortName": "VITRE DE PORTE AVG"
  },
  {
    "model": "Captain W",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVD",
    "itemCode": "61032001600D111A",
    "itemShortName": "VITRE DE PORTE AVD"
  },
  {
    "model": "Captain W",
    "category": "Pare-chocs AV / AR",
    "subType": "Assemblage pare-chocs",
    "position": "Non précisé",
    "itemCode": "28030101600D024A",
    "itemShortName": "Assemblage de pare-chocs"
  },
  {
    "model": "Captain W",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "Non précisé",
    "itemCode": "28030101600D021A",
    "itemShortName": "PARE-CHOCS"
  },
  {
    "model": "Captain W",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "52061001600D111B",
    "itemShortName": "PARE-BRISE"
  },
  {
    "model": "Captain W",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "53213101600D022A",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "37720101600D021B",
    "itemShortName": "OPTIQUE AVG BLANC"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "37720101600D021B-G",
    "itemShortName": "OPTIQUE AVG BLANC"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "37720101600D031A",
    "itemShortName": "OPTIQUE AVG BLEU"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "37720101600D031A-G",
    "itemShortName": "OPTIQUE AVG BLEU"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "37720201600D021B",
    "itemShortName": "OPTIQUE AVD BLANC"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "37720201600D021B-G",
    "itemShortName": "OPTIQUE AVD BLANC"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "37720201600D031A",
    "itemShortName": "OPTIQUE AVD BLEU"
  },
  {
    "model": "Captain W",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "37720201600D031A-G",
    "itemShortName": "OPTIQUE AVD BLEU"
  },
  {
    "model": "Captain W",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARG",
    "itemCode": "41331001035D001B",
    "itemShortName": "FEU ARG"
  },
  {
    "model": "Captain W",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARD",
    "itemCode": "41332001035D001C",
    "itemShortName": "Ensemble de feux arrière droit"
  },
  {
    "model": "Captain W",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "ARD",
    "itemCode": "41332001035D001B",
    "itemShortName": "FEU ARD"
  },
  {
    "model": "Captain W",
    "category": "Feux AR",
    "subType": "Feu arrière",
    "position": "AR",
    "itemCode": "41331001035D001C",
    "itemShortName": "Ensemble de feux combinés arri"
  },
  {
    "model": "Captain W",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AVG",
    "itemCode": "31021201600D510A",
    "itemShortName": "BAGUETTE DE ROUE AVG"
  },
  {
    "model": "Captain W",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AVD",
    "itemCode": "31021101600D510A",
    "itemShortName": "BAGUETTE DE ROUE AVD"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "LJ469QE2-1012010AA-B",
    "itemShortName": "FILTRE A HUILE"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1109010-Q48031-1-B",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "A1105007-YH",
    "itemShortName": "FILTRE A ESSENCE"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "8104012-V01001",
    "itemShortName": "COURROIE COMPRESSEUR"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "LJ469QE2-1006400",
    "itemShortName": "Chaine de distribution"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "LJ469Q-1AE9-3707100A",
    "itemShortName": "BOUGIE D'ALLUMAGE"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-03",
    "itemShortName": "HAVOLINE EXTRA 10W40"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-20",
    "itemShortName": "GEAR OIL GL-5"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "Captain W",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Captain 3500L",
    "category": "Portes",
    "subType": "Porte",
    "position": "AVD",
    "itemCode": "6100120-G07251",
    "itemShortName": "PORTE AVD"
  },
  {
    "model": "Captain 3500L",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVG",
    "itemCode": "6103019-G01201A",
    "itemShortName": "VITRE DE PORTE AVG"
  },
  {
    "model": "Captain 3500L",
    "category": "Vitres / glaces",
    "subType": "Vitre de porte",
    "position": "AVD",
    "itemCode": "6103020-G01201A",
    "itemShortName": "VITRE DE PORTE AVD"
  },
  {
    "model": "Captain 3500L",
    "category": "Vitres / glaces",
    "subType": "Vitre / glace",
    "position": "Non précisé",
    "itemCode": "5205010-G07202",
    "itemShortName": "BRAS ESSUI-GLACE /G D"
  },
  {
    "model": "Captain 3500L",
    "category": "Pare-chocs AV / AR",
    "subType": "Support pare-chocs",
    "position": "AVD",
    "itemCode": "8422522-G07104-B",
    "itemShortName": "SUPPORT PARE CHOCS AVD"
  },
  {
    "model": "Captain 3500L",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "5302060-G07102",
    "itemShortName": "CALANDRE INF DE PARCHOC AV"
  },
  {
    "model": "Captain 3500L",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "8422020-G07101",
    "itemShortName": "PARE CHOCS AV"
  },
  {
    "model": "Captain 3500L",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "8422020-G07101C",
    "itemShortName": "PARE CHOCS AV"
  },
  {
    "model": "Captain 3500L",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206011-G01201C",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "Captain 3500L",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206011-G07201C",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "Captain 3500L",
    "category": "Calandre / grille / logo",
    "subType": "Grille de pare-chocs",
    "position": "AVG",
    "itemCode": "8422053-G07101",
    "itemShortName": "GRILLE DE PARE CHOCS AVG"
  },
  {
    "model": "Captain 3500L",
    "category": "Calandre / grille / logo",
    "subType": "Grille de pare-chocs",
    "position": "AVD",
    "itemCode": "8422054-G07101",
    "itemShortName": "GRILLE DE PARE CHOCS AVD"
  },
  {
    "model": "Captain 3500L",
    "category": "Calandre / grille / logo",
    "subType": "Support calandre",
    "position": "G",
    "itemCode": "5302072-G07101",
    "itemShortName": "SUPPORT CALANDRE GAUCHE"
  },
  {
    "model": "Captain 3500L",
    "category": "Calandre / grille / logo",
    "subType": "Support calandre",
    "position": "D",
    "itemCode": "5302132-G01201",
    "itemShortName": "SUPPORT DE CALANDRE DROIT"
  },
  {
    "model": "Captain 3500L",
    "category": "Calandre / grille / logo",
    "subType": "Calandre",
    "position": "Non précisé",
    "itemCode": "5302040-G07102",
    "itemShortName": "CALANDRE"
  },
  {
    "model": "Captain 3500L",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "3772010-QA3401K",
    "itemShortName": "OPTIQUE AVG"
  },
  {
    "model": "Captain 3500L",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "3772020-QA3401K",
    "itemShortName": "OPTIQUE AVD"
  },
  {
    "model": "Captain 3500L",
    "category": "Optiques AV",
    "subType": "Support optique",
    "position": "AVD",
    "itemCode": "5302080-G01101",
    "itemShortName": "SUPPORT OPTIQUE AVD"
  },
  {
    "model": "Captain 3500L",
    "category": "Feux AR",
    "subType": "Feu d'immatriculation",
    "position": "Non précisé",
    "itemCode": "3717010-Q22925A",
    "itemShortName": "FEU D'IMMATRICULATION"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "JE1012160TA",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "C22612-020X",
    "itemShortName": "FILTRE À AIR"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FF5236",
    "itemShortName": "FILTRE A GASOIL"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FSP0120",
    "itemShortName": "PRE FILTRE"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "3407012JQV",
    "itemShortName": "COURROIE DE DISTRIBUTION"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-1",
    "itemShortName": "DELO 400 SLK SAE 15W40"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-20",
    "itemShortName": "GEAR OIL GL-5"
  },
  {
    "model": "Captain 3500L",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Fourgon",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "5206010-K21060G",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1012014-FD2302-B",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "KLXK32551X",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "FFPNH0402X",
    "itemShortName": "FILTRE À CARBURANT"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "8104012-FD2202",
    "itemShortName": "COURROIE ALTERNAREUR"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "P01A085401",
    "itemShortName": "Filtre A Clim"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-02",
    "itemShortName": "HAVOLINE ProDS MSAE 5W30"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-10",
    "itemShortName": "Multigear R"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "Fourgon",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO ATF",
    "itemShortName": "HUILE ATF 1L"
  },
  {
    "model": "HUGE",
    "category": "Vitres / glaces",
    "subType": "Lunette arrière",
    "position": "AR",
    "itemCode": "B019326",
    "itemShortName": "LUNETTE ARR"
  },
  {
    "model": "HUGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AR",
    "itemCode": "B019053",
    "itemShortName": "PARE-CHOCS AR"
  },
  {
    "model": "HUGE",
    "category": "Calandre / grille / logo",
    "subType": "Logo / emblème",
    "position": "Non précisé",
    "itemCode": "B021527",
    "itemShortName": "EMBLEME \"HUGE\""
  },
  {
    "model": "HUGE",
    "category": "Feux AR",
    "subType": "Feu d'aile AR",
    "position": "ARG",
    "itemCode": "B018728",
    "itemShortName": "FEU D'AILE ARG"
  },
  {
    "model": "HUGE",
    "category": "Feux AR",
    "subType": "Feu d'aile AR",
    "position": "ARD",
    "itemCode": "B018729",
    "itemShortName": "FEU D'AILE ARD"
  },
  {
    "model": "HUGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AR",
    "itemCode": "B019060",
    "itemShortName": "BAGUETTE INF PARE-CHOCS ARR"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1603001",
    "itemShortName": "FILTRE A HUILE"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016463",
    "itemShortName": "JOINT DE VIDANGE"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B019424",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016527",
    "itemShortName": "CANISTER FILTER"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B018403",
    "itemShortName": "FILTRE A CARBURANT"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016977",
    "itemShortName": "FILTRE A POLLEN"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016585",
    "itemShortName": "Accessory belt"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B001246",
    "itemShortName": "Sprak Plugs"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-04",
    "itemShortName": "Huile moteur 0W20"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "HUGE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "9361606",
    "itemShortName": "LIQUIDE DE REFROIDISSEMENT"
  },
  {
    "model": "MAGE",
    "category": "Portes",
    "subType": "Porte",
    "position": "AVG",
    "itemCode": "B021495",
    "itemShortName": "PORTE AVG"
  },
  {
    "model": "MAGE",
    "category": "Portes",
    "subType": "Porte",
    "position": "AVD",
    "itemCode": "B021496",
    "itemShortName": "PORTE AVD"
  },
  {
    "model": "MAGE",
    "category": "Portes",
    "subType": "Porte",
    "position": "ARD",
    "itemCode": "B021740",
    "itemShortName": "PORTE ARD"
  },
  {
    "model": "MAGE",
    "category": "Vitres / glaces",
    "subType": "Vitre / glace",
    "position": "ARG",
    "itemCode": "B025448",
    "itemShortName": "GLACE ARG"
  },
  {
    "model": "MAGE",
    "category": "Vitres / glaces",
    "subType": "Lunette arrière",
    "position": "AR",
    "itemCode": "B021669",
    "itemShortName": "LUNETTE ARR"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Support pare-chocs",
    "position": "AVG",
    "itemCode": "B021305",
    "itemShortName": "SUPPORT PARE-CHOCS AVG"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Support pare-chocs",
    "position": "AVD",
    "itemCode": "B021306",
    "itemShortName": "SUPPORT PARE-CHOCS AVD"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Cache pare-chocs",
    "position": "AV",
    "itemCode": "B021307",
    "itemShortName": "CACHE DE PARE-CHOCS AV INF"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "B021288",
    "itemShortName": "PARE-CHOCS AV"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AV",
    "itemCode": "B022061",
    "itemShortName": "PARE-CHOCS AV"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Support pare-chocs",
    "position": "AV",
    "itemCode": "B021304",
    "itemShortName": "SUPPORT PARE-CHOCS AV CTR"
  },
  {
    "model": "MAGE",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AR",
    "itemCode": "B021369",
    "itemShortName": "PARE-CHOCS AR"
  },
  {
    "model": "MAGE",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "B021487",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "MAGE",
    "category": "Pare-brise AV",
    "subType": "Pare-brise",
    "position": "AV",
    "itemCode": "B021488",
    "itemShortName": "PARE BRISE"
  },
  {
    "model": "MAGE",
    "category": "Calandre / grille / logo",
    "subType": "Grille",
    "position": "AV",
    "itemCode": "B021311",
    "itemShortName": "GRILLE AV"
  },
  {
    "model": "MAGE",
    "category": "Calandre / grille / logo",
    "subType": "Grille de pare-chocs",
    "position": "AV",
    "itemCode": "B022075",
    "itemShortName": "GRILLE PARE-CHOC AV"
  },
  {
    "model": "MAGE",
    "category": "Calandre / grille / logo",
    "subType": "Logo / emblème",
    "position": "Non précisé",
    "itemCode": "B024922",
    "itemShortName": "EMBLEME \"MAGE\""
  },
  {
    "model": "MAGE",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVG",
    "itemCode": "B021126",
    "itemShortName": "OPTIQUE AVG"
  },
  {
    "model": "MAGE",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "B021125",
    "itemShortName": "OPTIQUE AVD"
  },
  {
    "model": "MAGE",
    "category": "Feux AR",
    "subType": "Feu d'aile AR",
    "position": "ARG",
    "itemCode": "B021128",
    "itemShortName": "FEU D'AILE ARG"
  },
  {
    "model": "MAGE",
    "category": "Feux AR",
    "subType": "Antibrouillard AR",
    "position": "AR",
    "itemCode": "B012236",
    "itemShortName": "FEU ANTIBROUILLARD ARR"
  },
  {
    "model": "MAGE",
    "category": "Feux AR",
    "subType": "Feu arrière central",
    "position": "AR",
    "itemCode": "B021133",
    "itemShortName": "FEU ARR CTR"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AVG",
    "itemCode": "B021555",
    "itemShortName": "BAGUETTE D'AILE AVG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AVG",
    "itemCode": "B021550",
    "itemShortName": "BAGUETTE PORTE AVG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Bande décorative",
    "position": "AVG",
    "itemCode": "B021579",
    "itemShortName": "BANDE DE PORTE AVG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AVD",
    "itemCode": "B021556",
    "itemShortName": "BAGUETTE D'AILE AVD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "AVD",
    "itemCode": "B021551",
    "itemShortName": "BAGUETTE PORTE AVD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Moulure",
    "position": "AVD",
    "itemCode": "B021299",
    "itemShortName": "MOULURE PARE-CHOCS AVD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "ARG",
    "itemCode": "B021557",
    "itemShortName": "BAGUETTE D'AILE ARG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "ARG",
    "itemCode": "B021559",
    "itemShortName": "BAGUETTE D'AILE ARG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "ARG",
    "itemCode": "B021552",
    "itemShortName": "BAGUETTE PORTE ARG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Moulure",
    "position": "ARG",
    "itemCode": "B021377",
    "itemShortName": "MOULURE ECHAPPEM ARG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Moulure",
    "position": "ARG",
    "itemCode": "B021375",
    "itemShortName": "MOULURE PARE-CHOCS ARG"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "ARD",
    "itemCode": "B021558",
    "itemShortName": "BAGUETTE D'AILE ARD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "ARD",
    "itemCode": "B021560",
    "itemShortName": "BAGUETTE D'AILE ARD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "ARD",
    "itemCode": "B021553",
    "itemShortName": "BAGUETTE PORTE ARD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Moulure",
    "position": "ARD",
    "itemCode": "B021374",
    "itemShortName": "MOULURE PARE-CHOCS ARD"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Bande décorative",
    "position": "AV",
    "itemCode": "B021580",
    "itemShortName": "BANDE DE PORTE AV"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Bande décorative",
    "position": "AR",
    "itemCode": "B021583",
    "itemShortName": "BANDE DE PORTE AR"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Bande décorative",
    "position": "AR",
    "itemCode": "B021588",
    "itemShortName": "BANDE DE PORTE AR"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Bande décorative",
    "position": "D",
    "itemCode": "B021376",
    "itemShortName": "BANDE DÉCORATIVE DROITE, PARE-"
  },
  {
    "model": "MAGE",
    "category": "Moulures / baguettes",
    "subType": "Bande décorative",
    "position": "Non précisé",
    "itemCode": "B021298",
    "itemShortName": "BANDE DÉCORATIVE DU PARE-CHOCS"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1603001",
    "itemShortName": "FILTRE A HUILE"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016463",
    "itemShortName": "JOINT DE VIDANGE"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016576",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016527",
    "itemShortName": "CANISTER FILTER"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B021747",
    "itemShortName": "Fuel Filter with pump"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016978",
    "itemShortName": "FILTRE A POLLEN"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016585",
    "itemShortName": "Accessory belt"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B001246",
    "itemShortName": "Spark Plugs"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-04",
    "itemShortName": "Huile moteur 0W20"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "MAGE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "9361606",
    "itemShortName": "LIQUIDE DE REFROIDISSEMENT"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "25T5.0012+1439",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "165464KV0A+1434",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "16402Y3701+A108",
    "itemShortName": "Filtre à carburant"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B72775JGAA+1434",
    "itemShortName": "FILTRE A POLLEN"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-02",
    "itemShortName": "HAVOLINE ProDS MSAE 5W30"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "GEAR OIL GL-5",
    "itemShortName": "Huile de différentiel AR 85W-90"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "Multigear R",
    "itemShortName": "Huile de boîte des vitesses 75W-85"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "RICH 6 DC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "RICH 6 SC",
    "category": "Vitres / glaces",
    "subType": "Lunette arrière",
    "position": "AR",
    "itemCode": "797002ZG0B+G020",
    "itemShortName": "LUNETTE AR"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "25T5.0012+1439",
    "itemShortName": "FILTRE À HUILE"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "165464KV0A+1434",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "16402Y3701+A108",
    "itemShortName": "Filtre à carburant"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B72775JGAA+1434",
    "itemShortName": "FILTRE A POLLEN"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-02",
    "itemShortName": "HAVOLINE ProDS MSAE 5W30"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "GEAR OIL GL-5",
    "itemShortName": "Huile de différentiel AR 85W-90"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "Multigear R",
    "itemShortName": "Huile de boîte des vitesses 75W-85"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "RICH 6 SC",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "SHINE",
    "category": "Portes",
    "subType": "Porte",
    "position": "ARD",
    "itemCode": "B013017",
    "itemShortName": "PORTE ARD"
  },
  {
    "model": "SHINE",
    "category": "Pare-chocs AV / AR",
    "subType": "Pare-chocs",
    "position": "AR",
    "itemCode": "B012499",
    "itemShortName": "PARE-CHOCS ARR"
  },
  {
    "model": "SHINE",
    "category": "Pare-chocs AV / AR",
    "subType": "Renfort pare-chocs",
    "position": "AR",
    "itemCode": "B013100",
    "itemShortName": "RENFORT PARE-CHOC ARR"
  },
  {
    "model": "SHINE",
    "category": "Optiques AV",
    "subType": "Optique / phare",
    "position": "AVD",
    "itemCode": "B012189",
    "itemShortName": "OPTIQUE AVD HALOGEN"
  },
  {
    "model": "SHINE",
    "category": "Feux AR",
    "subType": "Antibrouillard AR",
    "position": "AR",
    "itemCode": "B012236",
    "itemShortName": "FEU ANTIBROUILLARD ARR"
  },
  {
    "model": "SHINE",
    "category": "Moulures / baguettes",
    "subType": "Baguette",
    "position": "Non précisé",
    "itemCode": "B016239",
    "itemShortName": "BAGUETTE PARE CHOC INF"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1603001",
    "itemShortName": "FILTRE A HUILE"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016463",
    "itemShortName": "JOINT DE VIDANGE"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B020369",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B020037",
    "itemShortName": "fuel pump with filter"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B011761",
    "itemShortName": "CANISTER FILTER"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B004682",
    "itemShortName": "FILTRE A POLLEN"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016584",
    "itemShortName": "Accessory belt"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B019924",
    "itemShortName": "Sprak plugs"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-04",
    "itemShortName": "Huile moteur 0W20"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "FFL-7A",
    "itemShortName": "Oil Tansmission DCT"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "SHINE",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "DELO XL",
    "itemShortName": "ANTIGEL 20L"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "1603001",
    "itemShortName": "FILTRE A HUILE"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016463",
    "itemShortName": "JOINT DE VIDANGE"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016576",
    "itemShortName": "FILTRE A AIR"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016527",
    "itemShortName": "CANISTER FILTER"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B018403",
    "itemShortName": "FILTRE A CARBURANT"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016978",
    "itemShortName": "FILTRE A POLLEN"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B016585",
    "itemShortName": "Accessory belt"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Pièce",
    "position": "—",
    "itemCode": "B001246",
    "itemShortName": "Spark plugs"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-04",
    "itemShortName": "Huile moteur 0W20"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "TEXACO-DOT4",
    "itemShortName": "BRAKE FLUID 0.25L"
  },
  {
    "model": "SHINE MAX",
    "category": "Maintenance",
    "subType": "Lubrifiant",
    "position": "—",
    "itemCode": "9361606",
    "itemShortName": "LIQUIDE DE REFROIDISSEMENT"
  }
] as const;
