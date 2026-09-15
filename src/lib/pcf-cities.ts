export interface CityData {
  name: string
  slug: string
  state: string
  locative: string   // Polish locative case ("w Berlinie")
  namePolish?: string // Polish name if different ("Monachium" for München)
}

export const GERMAN_CITIES: CityData[] = [
  { name: 'Berlin', slug: 'berlin', state: 'Berlin', locative: 'w Berlinie' },
  { name: 'Hamburg', slug: 'hamburg', state: 'Hamburg', locative: 'w Hamburgu' },
  { name: 'München', slug: 'muenchen', state: 'Bayern', locative: 'w Monachium', namePolish: 'Monachium' },
  { name: 'Köln', slug: 'koeln', state: 'Nordrhein-Westfalen', locative: 'w Kolonii', namePolish: 'Kolonia' },
  { name: 'Frankfurt am Main', slug: 'frankfurt', state: 'Hessen', locative: 'we Frankfurcie' },
  { name: 'Stuttgart', slug: 'stuttgart', state: 'Baden-Württemberg', locative: 'w Stuttgarcie' },
  { name: 'Düsseldorf', slug: 'duesseldorf', state: 'Nordrhein-Westfalen', locative: 'w Düsseldorfie' },
  { name: 'Leipzig', slug: 'leipzig', state: 'Sachsen', locative: 'w Lipsku', namePolish: 'Lipsk' },
  { name: 'Dortmund', slug: 'dortmund', state: 'Nordrhein-Westfalen', locative: 'w Dortmundzie' },
  { name: 'Essen', slug: 'essen', state: 'Nordrhein-Westfalen', locative: 'w Essen' },
  { name: 'Bremen', slug: 'bremen', state: 'Bremen', locative: 'w Bremie' },
  { name: 'Dresden', slug: 'dresden', state: 'Sachsen', locative: 'w Dreźnie', namePolish: 'Drezno' },
  { name: 'Hannover', slug: 'hannover', state: 'Niedersachsen', locative: 'w Hanowerze', namePolish: 'Hanower' },
  { name: 'Nürnberg', slug: 'nuernberg', state: 'Bayern', locative: 'w Norymberdze', namePolish: 'Norymberga' },
  { name: 'Duisburg', slug: 'duisburg', state: 'Nordrhein-Westfalen', locative: 'w Duisburgu' },
  { name: 'Bochum', slug: 'bochum', state: 'Nordrhein-Westfalen', locative: 'w Bochum' },
  { name: 'Wuppertal', slug: 'wuppertal', state: 'Nordrhein-Westfalen', locative: 'w Wuppertalu' },
  { name: 'Bielefeld', slug: 'bielefeld', state: 'Nordrhein-Westfalen', locative: 'w Bielefeld' },
  { name: 'Bonn', slug: 'bonn', state: 'Nordrhein-Westfalen', locative: 'w Bonn' },
  { name: 'Münster', slug: 'muenster', state: 'Nordrhein-Westfalen', locative: 'w Münster' },
  { name: 'Mannheim', slug: 'mannheim', state: 'Baden-Württemberg', locative: 'w Mannheim' },
  { name: 'Karlsruhe', slug: 'karlsruhe', state: 'Baden-Württemberg', locative: 'w Karlsruhe' },
  { name: 'Augsburg', slug: 'augsburg', state: 'Bayern', locative: 'w Augsburgu' },
  { name: 'Wiesbaden', slug: 'wiesbaden', state: 'Hessen', locative: 'w Wiesbaden' },
  { name: 'Mönchengladbach', slug: 'moenchengladbach', state: 'Nordrhein-Westfalen', locative: 'w Mönchengladbach' },
  { name: 'Gelsenkirchen', slug: 'gelsenkirchen', state: 'Nordrhein-Westfalen', locative: 'w Gelsenkirchen' },
  { name: 'Aachen', slug: 'aachen', state: 'Nordrhein-Westfalen', locative: 'w Akwizgranie', namePolish: 'Akwizgran' },
  { name: 'Braunschweig', slug: 'braunschweig', state: 'Niedersachsen', locative: 'w Brunszwiku', namePolish: 'Brunszwik' },
  { name: 'Chemnitz', slug: 'chemnitz', state: 'Sachsen', locative: 'w Chemnitz' },
  { name: 'Kiel', slug: 'kiel', state: 'Schleswig-Holstein', locative: 'w Kilonii', namePolish: 'Kilonia' },
  { name: 'Halle (Saale)', slug: 'halle', state: 'Sachsen-Anhalt', locative: 'w Halle' },
  { name: 'Magdeburg', slug: 'magdeburg', state: 'Sachsen-Anhalt', locative: 'w Magdeburgu' },
  { name: 'Freiburg im Breisgau', slug: 'freiburg', state: 'Baden-Württemberg', locative: 'we Fryburgu', namePolish: 'Fryburg' },
  { name: 'Krefeld', slug: 'krefeld', state: 'Nordrhein-Westfalen', locative: 'w Krefeld' },
  { name: 'Lübeck', slug: 'luebeck', state: 'Schleswig-Holstein', locative: 'w Lubece', namePolish: 'Lubeka' },
  { name: 'Mainz', slug: 'mainz', state: 'Rheinland-Pfalz', locative: 'w Moguncji', namePolish: 'Moguncja' },
  { name: 'Erfurt', slug: 'erfurt', state: 'Thüringen', locative: 'w Erfurcie' },
  { name: 'Oberhausen', slug: 'oberhausen', state: 'Nordrhein-Westfalen', locative: 'w Oberhausen' },
  { name: 'Rostock', slug: 'rostock', state: 'Mecklenburg-Vorpommern', locative: 'w Rostocku' },
  { name: 'Kassel', slug: 'kassel', state: 'Hessen', locative: 'w Kassel' },
  { name: 'Hagen', slug: 'hagen', state: 'Nordrhein-Westfalen', locative: 'w Hagen' },
  { name: 'Hamm', slug: 'hamm', state: 'Nordrhein-Westfalen', locative: 'w Hamm' },
  { name: 'Saarbrücken', slug: 'saarbruecken', state: 'Saarland', locative: 'w Saarbrücken' },
  { name: 'Potsdam', slug: 'potsdam', state: 'Brandenburg', locative: 'w Poczdamie', namePolish: 'Poczdam' },
  { name: 'Mülheim an der Ruhr', slug: 'muelheim', state: 'Nordrhein-Westfalen', locative: 'w Mülheim' },
  { name: 'Oldenburg', slug: 'oldenburg', state: 'Niedersachsen', locative: 'w Oldenburgu' },
  { name: 'Leverkusen', slug: 'leverkusen', state: 'Nordrhein-Westfalen', locative: 'w Leverkusen' },
  { name: 'Osnabrück', slug: 'osnabrueck', state: 'Niedersachsen', locative: 'w Osnabrück' },
  { name: 'Solingen', slug: 'solingen', state: 'Nordrhein-Westfalen', locative: 'w Solingen' },
  { name: 'Heidelberg', slug: 'heidelberg', state: 'Baden-Württemberg', locative: 'w Heidelbergu' },
  { name: 'Wolfsburg', slug: 'wolfsburg', state: 'Niedersachsen', locative: 'w Wolfsburgu' },
  { name: 'Bottrop', slug: 'bottrop', state: 'Nordrhein-Westfalen', locative: 'w Bottrop' },
  { name: 'Recklinghausen', slug: 'recklinghausen', state: 'Nordrhein-Westfalen', locative: 'w Recklinghausen' },
  { name: 'Göttingen', slug: 'goettingen', state: 'Niedersachsen', locative: 'w Getyndze', namePolish: 'Getynga' },
  { name: 'Heilbronn', slug: 'heilbronn', state: 'Baden-Württemberg', locative: 'w Heilbronn' },
]

export function getCityBySlug(slug: string): CityData | undefined {
  return GERMAN_CITIES.find(c => c.slug === slug)
}

export const CITY_SLUGS = GERMAN_CITIES.map(c => c.slug)
