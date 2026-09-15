import { getPcfTranslations, VALID_PCF_LANGS, type Lang } from '@/lib/i18n/pcf'
import { notFound } from 'next/navigation'
import { PcfNav } from '@/components/pcf/Nav'
import { PcfFooter } from '@/components/pcf/Footer'
import type { Metadata } from 'next'

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: 'Polityka Prywatności — Polskie Centrum Finansowe w Magdeburgu',
    robots: { index: false },
  }
}

export default async function PrivacyPage({ params }: Props) {
  const { lang: langStr } = await params
  const lang = langStr as Lang
  if (!VALID_PCF_LANGS.includes(lang)) notFound()
  const t = getPcfTranslations(lang)

  return (
    <>
      <PcfNav t={t.nav} lang={lang} />
      <main className="min-h-screen px-6 py-20 md:px-12">
        <div className="mx-auto max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#c9a227]">Informacje prawne</p>
          <h1 className="mb-2 text-3xl font-black text-gray-900">Polityka Prywatności</h1>
          <p className="mb-10 text-xs text-gray-400">Ostatnia aktualizacja: lipiec 2025</p>

          <div className="space-y-10 text-sm leading-relaxed text-gray-700">

            {/* 1. Administrator */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">1. Administrator danych osobowych</h2>
              <p className="mb-3">Administratorem Twoich danych osobowych w rozumieniu art. 4 pkt 7 RODO jest:</p>
              <div className="rounded-xl border border-gray-200 bg-gray-200 px-5 py-4 text-sm">
                <p className="font-bold text-gray-900">Patryk Błażej Kukliński</p>
                <p>Halberstädter Str. 29A</p>
                <p>39112 Magdeburg, Niemcy</p>
                <p className="mt-2">E-mail: <a href="mailto:patryk.kuk@pm.me" className="text-[#c9a227] hover:underline">patryk.kuk@pm.me</a></p>
                <p>Telefon / WhatsApp: <a href="tel:+4917683425546" className="text-[#c9a227] hover:underline">+49 176 83425546</a></p>
                <p className="mt-2 text-xs text-gray-500">Działający jako Vermögensberater w strukturach: Deutsche Vermögensberatung AG (DVAG), Wilhelm-Leuschner-Straße 24, 60329 Frankfurt am Main</p>
              </div>
            </section>

            {/* 2. Rodzaje danych */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">2. Jakie dane przetwarzamy</h2>
              <p className="mb-3">W zależności od celu kontaktu i realizowanej usługi przetwarzamy następujące kategorie danych:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { icon: '👤', title: 'Dane identyfikacyjne', desc: 'Imię, nazwisko, data urodzenia' },
                  { icon: '📬', title: 'Dane kontaktowe', desc: 'Adres e-mail, telefon, WhatsApp, adres zamieszkania' },
                  { icon: '💼', title: 'Dane finansowe', desc: 'Dochody, zobowiązania, cel ubezpieczenia lub kredytu — wyłącznie na potrzeby doradztwa' },
                  { icon: '🌐', title: 'Dane techniczne', desc: 'Adres IP, typ przeglądarki, czas i strona wizyty' },
                  { icon: '💬', title: 'Treść korespondencji', desc: 'Wiadomości e-mail, WhatsApp, formularze kontaktowe' },
                  { icon: '📞', title: 'Nagrania rozmów', desc: 'Wyłącznie w przypadkach wymaganych przez § 18a FinVermV (patrz pkt 7)' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 rounded-xl border border-gray-200 bg-gray-100 p-4">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{item.title}</p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Cele i podstawy prawne */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">3. Cele i podstawy prawne przetwarzania</h2>
              <div className="space-y-3">
                {[
                  {
                    title: 'Świadczenie usług doradztwa finansowego',
                    basis: 'Art. 6 ust. 1 lit. b RODO — wykonanie umowy lub działania przedumowne na żądanie osoby, której dane dotyczą',
                  },
                  {
                    title: 'Odpowiedź na zapytania kontaktowe (e-mail, WhatsApp, formularz)',
                    basis: 'Art. 6 ust. 1 lit. f RODO — uzasadniony interes administratora (obsługa klienta)',
                  },
                  {
                    title: 'Wypełnianie obowiązków prawnych (dokumentacja, archiwizacja)',
                    basis: 'Art. 6 ust. 1 lit. c RODO — obowiązek prawny (m.in. przepisy podatkowe, nadzorcze)',
                  },
                  {
                    title: 'Przesyłanie informacji handlowych (za zgodą)',
                    basis: 'Art. 6 ust. 1 lit. a RODO — zgoda osoby, której dane dotyczą (można wycofać w każdym czasie)',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-xl border border-gray-200 bg-gray-100 p-4">
                    <p className="font-semibold text-gray-900 mb-1">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.basis}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Odbiorcy */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">4. Odbiorcy danych</h2>
              <p className="mb-3">Twoje dane mogą być przekazywane wyłącznie następującym kategoriom odbiorców:</p>
              <ul className="space-y-2 list-disc pl-5 text-gray-600">
                <li><span className="font-medium text-gray-800">Deutsche Vermögensberatung AG (DVAG)</span> — jako firma nadrzędna, w zakresie niezbędnym do realizacji usługi</li>
                <li><span className="font-medium text-gray-800">Partnerzy produktowi</span> (m.in. Allianz, Generali, Santander, Badenia, Deutsche Bank, Advocard, BKK Linde, Commerzbank) — wyłącznie w celu zawarcia wybranego produktu finansowego i za Twoją wiedzą</li>
                <li><span className="font-medium text-gray-800">Dostawcy usług IT</span> — hosting, e-mail, narzędzia pracy; związani umowami powierzenia przetwarzania danych</li>
                <li><span className="font-medium text-gray-800">Organy publiczne</span> — wyłącznie na podstawie obowiązku prawnego (np. Finanzamt, BaFin)</li>
              </ul>
              <p className="mt-3 text-gray-500 text-xs">Dane nie są sprzedawane ani udostępniane podmiotom trzecim w celach marketingowych bez Twojej zgody.</p>
            </section>

            {/* 5. Przekazanie do krajów trzecich */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">5. Przekazanie danych poza EOG</h2>
              <p>Co do zasady Twoje dane przetwarzane są na terenie Europejskiego Obszaru Gospodarczego (EOG). Jeśli korzystamy z narzędzi, których serwery znajdują się poza EOG (np. usługi chmurowe), transfer odbywa się wyłącznie na podstawie:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
                <li>Standardowych klauzul umownych zatwierdzonych przez Komisję Europejską (art. 46 ust. 2 RODO)</li>
                <li>Decyzji o adekwatności Komisji Europejskiej (EU-US Data Privacy Framework)</li>
              </ul>
            </section>

            {/* 6. Okres przechowywania */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">6. Okres przechowywania danych</h2>
              <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-xs">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2.5 text-left font-bold text-gray-900">Kategoria danych</th>
                      <th className="px-4 py-2.5 text-left font-bold text-gray-900">Okres</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-gray-100">
                    {[
                      ['Dane kontaktowe (bez umowy)', 'Do 3 lat od ostatniego kontaktu'],
                      ['Dane z zawartych umów finansowych', 'Do 10 lat (wymogi podatkowe i nadzorcze)'],
                      ['Nagrania rozmów telefonicznych', 'Do 5 lat (§ 18a FinVermV)'],
                      ['Logi serwera', 'Do 30 dni'],
                      ['Dane marketingowe (za zgodą)', 'Do cofnięcia zgody'],
                    ].map(([cat, period], i) => (
                      <tr key={i}>
                        <td className="px-4 py-3 text-gray-700">{cat}</td>
                        <td className="px-4 py-3 text-gray-500">{period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* 7. Nagrywanie rozmów */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">7. Nagrywanie rozmów telefonicznych</h2>
              <div className="rounded-xl border border-[#c9a227]/30 bg-[#c9a227]/5 p-4">
                <p>Na podstawie <strong>§ 18a FinVermV</strong> doradcy finansowi są zobowiązani do rejestrowania treści rozmów telefonicznych dotyczących doradztwa inwestycyjnego dla celów dowodowych. Zostaniesz o tym poinformowany przed rozmową. Możesz wyrazić sprzeciw — w takim przypadku doradztwo inwestycyjne drogą telefoniczną nie będzie możliwe.</p>
              </div>
            </section>

            {/* 8. Spotkania online */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">8. Spotkania online (Zoom / Teams / WhatsApp)</h2>
              <p>W przypadku spotkań online lub rozmów wideo przetwarzamy: metadane połączenia, dane uczestnika (imię, e-mail), treści audio/wideo oraz udostępnione dokumenty. Administratorem po stronie narzędzia jest jego dostawca (np. Zoom Video Communications, Microsoft Corp.). Korzystamy wyłącznie z narzędzi zapewniających odpowiedni poziom ochrony danych zgodnie z RODO.</p>
            </section>

            {/* 9. Pliki cookie */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">9. Pliki cookie i dane techniczne</h2>
              <p>Strona wykorzystuje wyłącznie <strong>techniczne pliki cookie</strong> niezbędne do prawidłowego działania (np. zapamiętanie preferencji językowych, stan sesji). Nie stosujemy plików cookie śledzących, remarketingowych ani narzędzi analitycznych zbierających dane osobowe.</p>
              <p className="mt-2 text-gray-500 text-xs">Możesz w każdej chwili wyłączyć obsługę plików cookie w ustawieniach przeglądarki. Może to ograniczyć działanie niektórych funkcji strony.</p>
            </section>

            {/* 10. Brak automatycznych decyzji */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">10. Brak zautomatyzowanego podejmowania decyzji</h2>
              <p>Nie stosujemy zautomatyzowanego podejmowania decyzji ani profilowania w rozumieniu art. 22 RODO. Wszystkie decyzje dotyczące doradztwa i oferty produktowej podejmowane są przez człowieka.</p>
            </section>

            {/* 11. Prawa */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">11. Twoje prawa</h2>
              <p className="mb-3">Na podstawie RODO przysługują Ci następujące prawa:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { art: 'Art. 15', icon: '📋', title: 'Dostęp', desc: 'Prawo do uzyskania informacji o przetwarzanych danych i ich kopii' },
                  { art: 'Art. 16', icon: '✏️', title: 'Sprostowanie', desc: 'Prawo do poprawy nieprawidłowych lub niekompletnych danych' },
                  { art: 'Art. 17', icon: '🗑️', title: 'Usunięcie', desc: 'Prawo do żądania usunięcia danych (z zastrzeżeniem obowiązków prawnych)' },
                  { art: 'Art. 18', icon: '⏸️', title: 'Ograniczenie', desc: 'Prawo do ograniczenia przetwarzania w określonych sytuacjach' },
                  { art: 'Art. 20', icon: '📤', title: 'Przenoszenie', desc: 'Prawo do otrzymania danych w formacie nadającym się do odczytu maszynowego' },
                  { art: 'Art. 21', icon: '🚫', title: 'Sprzeciw', desc: 'Prawo do wniesienia sprzeciwu wobec przetwarzania na podstawie uzasadnionego interesu' },
                ].map((r, i) => (
                  <div key={i} className="flex gap-3 rounded-xl border border-gray-200 bg-gray-100 p-3">
                    <span className="text-lg shrink-0">{r.icon}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{r.title} <span className="font-normal text-gray-400">({r.art} RODO)</span></p>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl border border-gray-200 bg-gray-100 p-4 text-xs text-gray-600">
                <p>Aby skorzystać z powyższych praw, skontaktuj się: <a href="mailto:patryk.kuk@pm.me" className="text-[#c9a227] hover:underline font-medium">patryk.kuk@pm.me</a></p>
                <p className="mt-2">Masz również prawo złożyć skargę do organu nadzorczego: <strong>Landesbeauftragte für den Datenschutz Sachsen-Anhalt</strong>, Leiterstraße 9, 39104 Magdeburg, <a href="https://datenschutz.sachsen-anhalt.de" target="_blank" rel="noopener noreferrer" className="text-[#c9a227] hover:underline">datenschutz.sachsen-anhalt.de</a></p>
              </div>
            </section>

            {/* 12. Zmiany */}
            <section>
              <h2 className="mb-3 text-base font-black text-gray-900">12. Zmiany polityki prywatności</h2>
              <p>Zastrzegamy sobie prawo do aktualizacji niniejszej polityki prywatności w związku ze zmianami prawnymi lub technicznymi. Aktualna wersja jest zawsze dostępna pod tym adresem. Prosimy o regularne zapoznawanie się z jej treścią.</p>
            </section>

            <div className="border-t border-gray-200 pt-6 text-xs text-gray-400">
              <p>Stan: lipiec 2025 · Podstawa prawna: Rozporządzenie (UE) 2016/679 (RODO / DSGVO)</p>
              <p className="mt-1">© {new Date().getFullYear()} Patryk Kukliński · Polskie Centrum Finansowe w Niemczech</p>
            </div>

          </div>
        </div>
      </main>
      <PcfFooter t={t.footer} lang={lang} />
    </>
  )
}
