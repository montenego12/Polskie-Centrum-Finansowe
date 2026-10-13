export interface ArticleSection {
  heading?: string
  paragraphs: string[] // may contain inline links in [tekst](url) syntax
}

export interface ArticleData {
  slug: string
  title: string
  metaDescription: string
  keywords: string[]
  publishDate: string // ISO date, 'YYYY-MM-DD'
  excerpt: string
  coverImage: string
  sections: ArticleSection[]
}

export const PCF_ARTICLES: ArticleData[] = [
  {
    slug: 'kredyty-w-niemczech-po-polsku',
    title: 'Kredyty w Niemczech dla Polaków — kompletny przewodnik 2026',
    metaDescription: 'Kredyt gotówkowy, na auto czy hipoteczny w Niemczech — co sprawdza bank, jakie dokumenty przygotować i na co uważać. Praktyczny przewodnik po polsku.',
    keywords: ['kredyty w niemczech po polsku', 'kredyt niemcy polak', 'kredyt hipoteczny niemcy', 'kredyt gotówkowy niemcy dla polaka'],
    publishDate: '2026-10-13',
    excerpt: 'Podpisujesz niemiecką umowę kredytową, widzisz ratę i oprocentowanie, ale nie masz pewności ile naprawdę zapłacisz? Sprawdź, co bank ocenia, jakie dokumenty przygotować i na co zwrócić uwagę przed podpisaniem.',
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Podpisujesz niemiecką umowę kredytową, widzisz ratę, oprocentowanie i kilka stron warunków, ale nadal nie masz pewności, ile naprawdę zapłacisz? Właśnie dlatego kredyty w Niemczech po polsku to dla wielu osób nie tylko wygoda językowa, lecz także sposób na spokojniejsze podjęcie decyzji. Kredyt może pomóc sfinansować samochód, wyposażenie mieszkania, większy wydatek albo zakup nieruchomości, ale zawsze powinien pasować do realnego budżetu gospodarstwa domowego.',
          'Niemiecki rynek oferuje wiele form finansowania. Różnią się one wymaganiami, czasem decyzji, kosztami i elastycznością spłaty. Najniższa rata nie zawsze oznacza najlepszą ofertę, podobnie jak szybka decyzja nie zawsze odpowiada bezpiecznej decyzji. Warto rozumieć, co bank sprawdza i o co zapytać przed podpisaniem dokumentów.',
        ],
      },
      {
        heading: 'Kredyty w Niemczech po polsku — od czego zacząć',
        paragraphs: [
          'Pierwszym krokiem nie powinno być wysłanie wniosku do przypadkowej instytucji, lecz określenie celu i maksymalnej bezpiecznej raty. Inaczej analizuje się kredyt gotówkowy na dowolny cel, inaczej finansowanie samochodu, a jeszcze inaczej kredyt hipoteczny. W każdym przypadku miesięczna rata powinna pozostawiać miejsce na zwykłe życie, nieprzewidziane wydatki oraz oszczędności.',
          'Dobrym punktem wyjścia jest przejrzenie ostatnich wpływów na konto i stałych kosztów: czynszu, energii, telefonów, ubezpieczeń, alimentów, wydatków na dzieci oraz innych rat. Nie chodzi o to, aby bank zaakceptował jak najwyższą kwotę. Chodzi o to, aby zobowiązanie nie stało się obciążeniem po kilku miesiącach.',
          'Znaczenie ma również okres spłaty. Dłuższy okres zwykle obniża miesięczną ratę, ale może podnieść całkowity koszt finansowania. Krótszy okres oznacza szybsze zamknięcie zobowiązania, lecz wymaga większej przestrzeni w budżecie. Najlepsze rozwiązanie zależy od stabilności dochodów, planów rodzinnych oraz celu kredytu.',
        ],
      },
      {
        heading: 'Co bank ocenia przy wniosku kredytowym',
        paragraphs: [
          'Bank nie podejmuje decyzji wyłącznie na podstawie wysokości pensji. Analizuje, czy dochody są regularne, jak wyglądają koszty życia i czy klient terminowo reguluje wcześniejsze zobowiązania. Znaczenie może mieć także rodzaj zatrudnienia, długość pracy u obecnego pracodawcy, okres próbny, forma działalności gospodarczej oraz liczba osób w gospodarstwie domowym.',
          'Istotna jest niemiecka historia kredytowa i płatnicza. Negatywne wpisy, zaległości lub częste składanie wniosków mogą utrudnić uzyskanie finansowania albo wpłynąć na warunki oferty. Brak długiej historii w Niemczech nie przekreśla automatycznie możliwości kredytowych, ale często wymaga dokładniejszego przedstawienia sytuacji finansowej.',
        ],
      },
      {
        heading: 'Umowa o pracę, działalność i dochody dodatkowe',
        paragraphs: [
          'Osoba zatrudniona na umowę o pracę zazwyczaj przedstawia dokument tożsamości, potwierdzenie adresu, umowę oraz ostatnie rozliczenia wynagrodzenia. Bank może poprosić także o wyciągi z konta. Przy działalności gospodarczej zakres dokumentów bywa szerszy, ponieważ trzeba pokazać, że dochód jest stabilny w dłuższym okresie.',
          'Dochody dodatkowe mogą zostać uwzględnione, ale zależy to od ich rodzaju i powtarzalności. Nie warto zakładać, że każda premia, nadgodziny czy świadczenie zostaną policzone tak samo jak stała pensja. Rzetelne przedstawienie danych od początku ogranicza ryzyko nieporozumień na późniejszym etapie.',
        ],
      },
      {
        heading: 'Rata to nie cały koszt kredytu',
        paragraphs: [
          'Przy porównywaniu ofert warto patrzeć przede wszystkim na rzeczywistą roczną stopę oprocentowania, całkowitą kwotę do zapłaty i warunki wcześniejszej spłaty. Nominalne oprocentowanie może wyglądać korzystnie, ale nie pokazuje pełnego obrazu kosztów. Różnicę potrafią zrobić opłaty, czas obowiązywania umowy, wymagania dodatkowe oraz sposób naliczania odsetek.',
          'W przypadku finansowania auta trzeba sprawdzić również wpłatę własną, wartość końcową pojazdu, limit kilometrów przy określonych modelach finansowania i zasady rozliczenia po zakończeniu umowy. Niska miesięczna rata może wiązać się z większą płatnością na końcu. To nie musi być złe rozwiązanie, jeśli klient świadomie planuje taki wydatek, ale nie powinno być zaskoczeniem.',
          'Przy kredycie hipotecznym szczególnego znaczenia nabierają wkład własny, koszty zakupu nieruchomości, oprocentowanie stałe oraz możliwość późniejszej nadpłaty. Zakup mieszkania lub domu to decyzja na lata, dlatego sama zdolność kredytowa nie powinna zastępować spokojnej analizy całego budżetu.',
        ],
      },
      {
        heading: 'Jak przygotować dokumenty bez chaosu',
        paragraphs: [
          'Kompletne dokumenty przyspieszają analizę wniosku i pomagają uniknąć wielokrotnego dosyłania tych samych informacji. W praktyce warto przygotować aktualny dokument tożsamości, potwierdzenie zameldowania, umowę o pracę, ostatnie odcinki wynagrodzenia oraz wyciągi bankowe, jeśli są wymagane. Przy kredycie na samochód potrzebne mogą być także dane pojazdu lub oferta sprzedawcy.',
          'Przed przekazaniem dokumentów dobrze sprawdzić, czy wszystkie strony są czytelne, aktualne i zgodne z informacjami podanymi we wniosku. Rozbieżność w adresie, dochodzie albo stanie cywilnym może wywołać dodatkowe pytania. Nie jest to powód do stresu, lecz sygnał, że warto wyjaśnić sytuację jasno i bez ukrywania faktów.',
          'Nie podpisuj dokumentu tylko dlatego, że ktoś mówi, iż oferta jest dostępna „tylko teraz". Kredyt jest zobowiązaniem, a tempo decyzji powinno pozwolić na przeczytanie warunków. Jeśli nie rozumiesz niemieckiego sformułowania, poproś o wyjaśnienie jego praktycznego znaczenia: co zapłacisz, kiedy, w jakiej sytuacji i czy możesz zmienić warunki w przyszłości.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Wsparcie doradcy nie polega na obietnicy przyznania kredytu. Decyzję zawsze podejmuje instytucja finansująca na podstawie własnych kryteriów. Dobra pomoc polega natomiast na uporządkowaniu sytuacji, wstępnym sprawdzeniu możliwości, porównaniu istotnych parametrów i przeprowadzeniu klienta przez formalności w zrozumiałym języku.',
          'W [Polskim Centrum Finansowym w Niemczech](/pl/kredyty) rozmowa może odbyć się po polsku, zdalnie lub stacjonarnie w Magdeburgu. Dzięki temu klient może spokojnie omówić cel finansowania, przygotować dokumenty i zadać pytania, które trudno byłoby sformułować po niemiecku. Konsultacja jest bezpłatna dla klienta i bez zobowiązań, a wynagrodzenie doradcy rozliczane jest przez partnerów finansowych w przypadku zawarcia umowy.',
          'Warto otwarcie zapytać, jakie elementy oferty były porównywane, od czego zależy proponowane oprocentowanie i czy istnieje możliwość wcześniejszej spłaty lub nadpłaty. Transparentna rozmowa nie polega na usłyszeniu wyłącznie zalet. Powinna obejmować również ograniczenia, warunki oraz sytuacje, w których lepiej poczekać z kredytem lub wybrać niższą kwotę.',
        ],
      },
      {
        heading: 'Czy kredyt w Niemczech jest możliwy bez niemieckiego obywatelstwa?',
        paragraphs: [
          'W wielu przypadkach obywatelstwo nie jest kluczowym kryterium. Banki skupiają się raczej na miejscu zamieszkania, dochodach, zatrudnieniu, historii płatniczej i zdolności do spłaty. Każda sytuacja jest jednak oceniana indywidualnie, a wymagania mogą się różnić zależnie od rodzaju kredytu i konkretnej instytucji.',
          'Czy można spłacić kredyt wcześniej? Zwykle jest to możliwe, ale zasady i ewentualne koszty powinny być jasno opisane w umowie. Czy wspólny wniosek ma sens? Może zwiększyć możliwości finansowe gospodarstwa domowego, lecz oznacza też wspólną odpowiedzialność za spłatę. Taką decyzję warto podjąć świadomie, zwłaszcza gdy dochody jednej osoby są mniej stabilne.',
          'Dobrze wybrany kredyt nie zaczyna się od hasła „ile mogę dostać?", ale od pytania „jaką ratę mogę spokojnie spłacać także wtedy, gdy życie nie idzie dokładnie według planu?". Gdy warunki są jasne, dokumenty uporządkowane, a wszystkie pytania otrzymały odpowiedź po polsku, decyzja finansowa staje się po prostu bezpieczniejsza.',
        ],
      },
    ],
  },
  {
    slug: 'ubezpieczenie-zdrowotne-niemcy-po-polsku',
    title: 'Ubezpieczenie zdrowotne w Niemczech — GKV czy PKV? Poradnik po polsku',
    metaDescription: 'Ustawowa kasa chorych (GKV) czy prywatne ubezpieczenie (PKV) w Niemczech? Sprawdź, kto może wybierać, co sprawdza kasa chorych i jak zmienić ubezpieczenie.',
    keywords: ['ubezpieczenie zdrowotne niemcy po polsku', 'gkv czy pkv', 'kasa chorych niemcy polak', 'krankenkasse po polsku'],
    publishDate: '2026-10-14',
    excerpt: 'Ustawowa kasa chorych (GKV) czy prywatne ubezpieczenie (PKV)? Nie każdy ma wybór, a zła decyzja na starcie bywa trudna do cofnięcia. Sprawdź, jak to działa.',
    coverImage: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Każdy, kto zaczyna pracę w Niemczech, prędzej czy później słyszy dwa skróty: GKV i PKV. Pierwszy to ustawowa kasa chorych (gesetzliche Krankenversicherung), drugi — prywatne ubezpieczenie zdrowotne (private Krankenversicherung). Dla większości pracowników najemnych wybór w ogóle nie istnieje — przynależność do GKV jest obowiązkowa. Dla części osób, szczególnie prowadzących działalność gospodarczą albo zarabiających powyżej określonego progu, pojawia się realna decyzja, którą trudno odwrócić bez konsekwencji finansowych.',
          'Zanim podejmie się tę decyzję, warto zrozumieć, czym systemy różnią się w praktyce — nie tylko w teorii z ulotki agenta ubezpieczeniowego.',
        ],
      },
      {
        heading: 'Czym różni się GKV od PKV',
        paragraphs: [
          'W GKV składka jest obliczana jako procent dochodu, niezależnie od wieku czy stanu zdrowia. Zakres świadczeń jest ustawowo określony i podobny we wszystkich kasach — różnice dotyczą głównie dodatkowych usług i obsługi. Współmałżonek bez dochodu i dzieci mogą być ubezpieczeni bezskładkowo w ramach rodziny.',
          'W PKV składka zależy od wieku w momencie zawarcia umowy, stanu zdrowia i wybranego zakresu ochrony — nie od dochodu. Może być tańsza na start dla młodej, zdrowej osoby, ale rośnie z wiekiem, a powrót do GKV po pewnym momencie bywa utrudniony albo niemożliwy. Każdy członek rodziny, w tym dzieci, wymaga osobnej składki.',
        ],
      },
      {
        heading: 'Kto w ogóle ma wybór',
        paragraphs: [
          'Pracownicy etatowi zarabiający poniżej ustawowego progu (Versicherungspflichtgrenze) są ustawowo zobowiązani do GKV — nie ma tu pola do negocjacji. Dopiero przekroczenie tego progu, prowadzenie własnej działalności gospodarczej, status urzędnika (Beamte) albo studenta w określonych warunkach otwiera furtkę do PKV.',
          'To ważne, bo spotyka się czasem sugestię, że PKV „zawsze się bardziej opłaca". Dla osoby bez realnego wyboru to pytanie jest czysto akademickie — decyzja praktyczna dotyczy tylko tej mniejszości, która faktycznie może wybierać.',
        ],
      },
      {
        heading: 'Co sprawdza kasa chorych przy zapisie',
        paragraphs: [
          'Przy zapisie do GKV kasa potrzebuje przede wszystkim potwierdzenia zatrudnienia i danych osobowych — nie bada stanu zdrowia, bo ustawowo musi przyjąć każdego. Inaczej jest przy PKV: tam towarzystwo analizuje historię zdrowotną, a istniejące schorzenia mogą podnieść składkę albo wykluczyć część zakresu ochrony z umowy.',
          'Dlatego decyzja o PKV podjęta pochopnie, bez porównania kilku ofert i przeczytania wyłączeń, bywa trudna do naprawienia później — zwłaszcza jeśli w międzyczasie pojawi się choroba przewlekła.',
        ],
      },
      {
        heading: 'Zmiana kasy chorych w ramach GKV',
        paragraphs: [
          'W obrębie systemu ustawowego zmiana kasy (Krankenkasse) jest prostsza niż zmiana między GKV a PKV — wszystkie kasy oferują ten sam ustawowy zakres świadczeń, różnice dotyczą dodatkowych usług, obsługi klienta i wysokości dodatkowej składki (Zusatzbeitrag). Zmiana zwykle wiąże się z minimalnym okresem przynależności do obecnej kasy i terminem wypowiedzenia.',
          'Nie warto zmieniać kasy wyłącznie pod wpływem reklamy — różnice w praktycznej obsłudze bywają ważniejsze niż ułamek procenta składki dodatkowej.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Decyzję o rodzaju ubezpieczenia i wybór konkretnej kasy łatwiej podjąć, gdy ktoś po polsku wyjaśni różnice bez naleciałości sprzedażowych. W [Polskim Centrum Finansowym w Niemczech](/pl/ubezpieczenia) rozmowa o ubezpieczeniu zdrowotnym odbywa się po polsku, bezpłatnie i bez zobowiązań — pomagamy zrozumieć, czy w Twojej sytuacji w ogóle istnieje wybór, i jeśli tak, co faktycznie się różni między ofertami.',
        ],
      },
      {
        heading: 'Najczęstsze pytania',
        paragraphs: [
          'Czy mogę wrócić z PKV do GKV? Zwykle jest to trudne po przekroczeniu 55. roku życia i wymaga spełnienia konkretnych warunków — dlatego decyzja o PKV powinna być przemyślana na lata do przodu, nie tylko pod kątem bieżącej składki.',
          'Co z ubezpieczeniem w okresie bezrobocia? Osoby pobierające niemieckie świadczenia dla bezrobotnych pozostają zwykle ubezpieczone w GKV — szczegóły zależą od rodzaju świadczenia i wcześniejszej historii ubezpieczeniowej, dlatego warto to sprawdzić indywidualnie.',
        ],
      },
    ],
  },
  {
    slug: 'ubezpieczenie-oc-niemcy-dla-polaka',
    title: 'Ubezpieczenie OC samochodu w Niemczech — jak wybrać jako Polak',
    metaDescription: 'Kfz-Versicherung w Niemczech dla Polaka — czym jest Regionalklasa i klasa bezszkodowej jazdy, czy zniżki z Polski się przenoszą i co zrobić po szkodzie.',
    keywords: ['ubezpieczenie oc niemcy dla polaka', 'kfz versicherung po polsku', 'ubezpieczenie samochodu niemcy', 'oc ac niemcy polak'],
    publishDate: '2026-10-15',
    excerpt: 'Niemiecki rynek OC rządzi się innymi zasadami niż polski — inaczej liczy się zniżki, inaczej wygląda klasyfikacja ryzyka. Sprawdź, na co zwrócić uwagę przed podpisaniem polisy.',
    coverImage: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Rejestrujesz samochód w Niemczech i potrzebujesz Kfz-Versicherung — niemieckiego odpowiednika polskiego OC. Pierwsza niespodzianka to zwykle cena, która może odbiegać od tego, czego ktoś się spodziewał po polskim rynku. Druga to system klasyfikacji ryzyka, zbudowany inaczej niż w Polsce.',
          'Zanim podpiszesz pierwszą ofertę, warto zrozumieć dwa pojęcia, które decydują o wysokości składki: Regionalklasę i Schadenfreiheitsklasse.',
        ],
      },
      {
        heading: 'OC, częściowe i pełne AC — co oznaczają niemieckie nazwy',
        paragraphs: [
          'Haftpflichtversicherung to odpowiednik polskiego OC — obowiązkowe ubezpieczenie odpowiedzialności cywilnej, bez którego nie da się zarejestrować pojazdu. Teilkasko (częściowe autocasco) pokrywa m.in. kradzież, pożar, szkody od zwierząt czy stłuczenie szyby. Vollkasko (pełne autocasco) dodatkowo pokrywa szkody powstałe z własnej winy kierowcy, np. przy kolizji, którą sam spowodował.',
          'Im nowszy i droższy pojazd, tym częściej opłaca się rozważyć Vollkasko — ale to zawsze powinno być policzone względem wartości samochodu, nie wybrane automatycznie.',
        ],
      },
      {
        heading: 'Co wpływa na cenę — Regionalklasa i historia szkodowości',
        paragraphs: [
          'Regionalklasa to wskaźnik ustalany corocznie przez niemieckie zrzeszenie ubezpieczycieli na podstawie statystyk szkodowości w danym okręgu rejestracji pojazdów. Różne miasta i powiaty mają różną klasę — to jeden z powodów, dla których ta sama osoba zapłaci inaczej w Berlinie, a inaczej w mniejszym mieście.',
          'Drugi kluczowy czynnik to Schadenfreiheitsklasse (SF) — klasa bezszkodowej jazdy, budowana latami bezszkodowej historii. Im wyższa klasa, tym niższa składka. Nowi kierowcy zaczynają zwykle od niskiej klasy, co oznacza wyższą cenę na start.',
        ],
      },
      {
        heading: 'Czy zniżki z Polski przenoszą się do Niemiec',
        paragraphs: [
          'To pytanie zadaje sobie niemal każdy, kto przeprowadza się z Polski. Odpowiedź zależy od konkretnego towarzystwa ubezpieczeniowego — część niemieckich ubezpieczycieli uznaje zagraniczną historię bezszkodowej jazdy na podstawie zaświadczenia od poprzedniego ubezpieczyciela, inne tego nie robią albo uznają ją tylko częściowo.',
          'Warto zawsze zapytać wprost, zanim podpisze się umowę — i przygotować zaświadczenie o przebiegu ubezpieczenia (zwykle dostępne na życzenie u polskiego ubezpieczyciela) jeszcze przed wyjazdem.',
        ],
      },
      {
        heading: 'Co przygotować przed zawarciem polisy',
        paragraphs: [
          'Do zawarcia Kfz-Versicherung potrzebne są zwykle dane pojazdu (numer VIN, dane rejestracyjne), dokument tożsamości, dane dotychczasowego ubezpieczyciela i — jeśli dotyczy — zaświadczenie o historii szkodowej. Przy zakupie auta na kredyt lub leasing bank finansujący może dodatkowo wymagać konkretnego zakresu ochrony, np. obowiązkowego Vollkasko przez cały okres spłaty.',
        ],
      },
      {
        heading: 'Co zrobić po szkodzie',
        paragraphs: [
          'Zgłoszenie szkody powinno nastąpić możliwie szybko po zdarzeniu, z dokumentacją (zdjęcia, dane drugiego uczestnika, jeśli dotyczy, ewentualnie protokół policyjny przy poważniejszych zdarzeniach). Zgłoszenie szkody z własnej winy wpływa na przyszłą klasę bezszkodowej jazdy — dlatego przy drobnych szkodach czasem bardziej opłaca się pokryć koszt samodzielnie niż zgłaszać do ubezpieczyciela i stracić zniżkę na kolejne lata.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Porównanie kilku ofert, sprawdzenie czy polska historia bezszkodowa zostanie uznana i dobranie zakresu ochrony do realnej wartości pojazdu — to miejsce, gdzie doradca mówiący po polsku oszczędza czas i unika kosztownych pomyłek. W [Polskim Centrum Finansowym w Niemczech](/pl/ubezpieczenia) bezpłatnie porównujemy oferty kilku towarzystw i pomagamy przejść przez cały proces.',
        ],
      },
    ],
  },
  {
    slug: 'konto-bankowe-niemcy-dla-polaka',
    title: 'Jak założyć konto bankowe w Niemczech — przewodnik dla Polaków',
    metaDescription: 'Girokonto w Niemczech dla Polaka — jakie dokumenty są potrzebne, czy musisz mieć Anmeldung i jak założyć konto bez długiej historii kredytowej.',
    keywords: ['konto bankowe w niemczech dla polaka', 'girokonto po polsku', 'jak założyć konto w niemczech', 'konto bankowe niemcy bez schufa'],
    publishDate: '2026-10-16',
    excerpt: 'Girokonto to pierwsza formalność, od której zaczyna się życie finansowe w Niemczech — bez niej trudno o wypłatę, wynajem mieszkania czy umowę o pracę. Sprawdź, co jest naprawdę potrzebne.',
    coverImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Konto bankowe w Niemczech — Girokonto — to zwykle pierwsza formalność po przyjeździe, od której zależy niemal wszystko inne: wypłata wynagrodzenia, podpisanie umowy najmu, opłacenie rachunków. Teoretycznie proces jest prosty. W praktyce nowo przyjezdni trafiają czasem na odmowy albo długie oczekiwanie, bo nie wiedzą, czego dokładnie bank oczekuje.',
        ],
      },
      {
        heading: 'Jakie dokumenty są zwykle potrzebne',
        paragraphs: [
          'Standardowy zestaw to ważny dokument tożsamości (dowód osobisty lub paszport), potwierdzenie adresu zamieszkania w Niemczech (Anmeldung — rejestracja meldunkowa) oraz, w zależności od banku, potwierdzenie źródła dochodu, np. umowa o pracę. Część banków otwiera konto jeszcze przed otrzymaniem Anmeldung, ale wymaga go donieść w określonym terminie — warto to ustalić wprost przed złożeniem wniosku.',
        ],
      },
      {
        heading: 'Dlaczego brak historii w Niemczech bywa przeszkodą',
        paragraphs: [
          'Część banków sprawdza wpis w Schufa — niemieckim rejestrze historii kredytowej i płatniczej. Brak jakiejkolwiek historii (co jest normalne u osoby nowo przyjezdnej) nie jest tym samym co negatywna historia, ale niektóre banki traktują „pusty" wpis ostrożnie. Konta podstawowe (Basiskonto) są w Niemczech gwarantowane ustawowo dla każdego legalnie przebywającego mieszkańca — to rozwiązanie na wypadek odmowy standardowego konta.',
        ],
      },
      {
        heading: 'Na co zwrócić uwagę przy wyborze banku',
        paragraphs: [
          'Warto porównać miesięczną opłatę za prowadzenie konta, koszt karty płatniczej, dostępność oddziałów lub bankomatów bez prowizji oraz jakość aplikacji mobilnej — dla kogoś, kto dopiero uczy się niemieckiego systemu bankowego, czytelna obsługa online ma realne znaczenie w codziennym użytkowaniu.',
          'Nie każda oferta reklamowana jako „darmowa" zostaje darmowa na stałe — część banków nalicza opłatę po określonym czasie albo przy niespełnieniu warunku minimalnych wpływów miesięcznych. To warto sprawdzić w regulaminie, nie tylko na stronie głównej oferty.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Założenie konta samo w sobie nie jest skomplikowane, ale wyjaśnienie niemieckich formularzy i warunków po polsku oszczędza czas i nerwy, zwłaszcza w pierwszych tygodniach w nowym kraju. W [Polskim Centrum Finansowym w Niemczech](/pl/bankowosc) pomagamy otworzyć konto szybko, bez kolejek i bez barier językowych.',
        ],
      },
      {
        heading: 'Najczęstsze pytania',
        paragraphs: [
          'Czy mogę założyć konto przed przyjazdem do Niemczech? Niektóre banki oferują otwarcie konta online jeszcze przed wyjazdem, ale pełna aktywacja zwykle wymaga potwierdzenia tożsamości i adresu już na miejscu.',
          'Czy mogę mieć jednocześnie konto w Polsce i w Niemczech? Tak, nie ma przeszkód prawnych — wiele osób pracujących w Niemczech zachowuje polskie konto na czas przejściowy lub do rozliczeń rodzinnych.',
        ],
      },
    ],
  },
  {
    slug: 'kindergeld-niemcy-po-polsku',
    title: 'Kindergeld w Niemczech — kto może dostać i jak złożyć wniosek po polsku',
    metaDescription: 'Kindergeld dla Polaka pracującego w Niemczech — kto ma prawo do świadczenia, jakie dokumenty przygotować i co zmienia się, gdy dziecko mieszka w Polsce.',
    keywords: ['kindergeld dla polaka w niemczech', 'kindergeld po polsku', 'wniosek o kindergeld niemcy', 'kindergeld dziecko w polsce'],
    publishDate: '2026-10-17',
    excerpt: 'Kindergeld przysługuje nie tylko rodzinom mieszkającym razem w Niemczech — także wtedy, gdy dzieci zostały w Polsce. Sprawdź, jakie warunki trzeba spełnić i jak wygląda wniosek.',
    coverImage: 'https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Kindergeld to niemieckie świadczenie rodzinne, wypłacane na każde uprawnione dziecko. Wiele osób pracujących w Niemczech zakłada błędnie, że przysługuje ono tylko wtedy, gdy cała rodzina mieszka razem w Niemczech. W rzeczywistości, dzięki unijnej koordynacji systemów zabezpieczenia społecznego, prawo do Kindergeld może przysługiwać także wtedy, gdy dzieci pozostały w Polsce pod opieką drugiego rodzica lub rodziny.',
        ],
      },
      {
        heading: 'Kto ma prawo do świadczenia',
        paragraphs: [
          'Co do zasady prawo do Kindergeld ma osoba, która pracuje w Niemczech i podlega tam obowiązkowemu ubezpieczeniu społecznemu, niezależnie od tego, czy dziecko mieszka w Niemczech, czy w Polsce. Kluczowe jest rzeczywiste zatrudnienie i opłacanie składek w Niemczech — sama rejestracja pobytu bez pracy zwykle nie wystarcza.',
          'Jeśli oboje rodzice pracują — jedno w Niemczech, drugie w Polsce — obowiązują zasady pierwszeństwa określone przepisami unijnymi, które decydują, który kraj wypłaca świadczenie w pełnej wysokości, a który ewentualnie dopłaca różnicę.',
        ],
      },
      {
        heading: 'Jakie dokumenty są zwykle wymagane',
        paragraphs: [
          'Standardowo potrzebne są: akt urodzenia dziecka (z tłumaczeniem przysięgłym, jeśli wydany w Polsce), zaświadczenie o zameldowaniu, potwierdzenie zatrudnienia w Niemczech, numer podatkowy (Steuer-ID) oraz — przy dzieciach pozostających w Polsce — zaświadczenie z polskiego urzędu potwierdzające, czy na te same dzieci nie jest już pobierane podobne świadczenie w Polsce.',
          'Brak jednego dokumentu nie przekreśla wniosku, ale wydłuża jego rozpatrywanie — kompletność na starcie realnie skraca czas oczekiwania.',
        ],
      },
      {
        heading: 'Gdzie i jak złożyć wniosek',
        paragraphs: [
          'Wniosek składa się do właściwej Familienkasse — instytucji przypisanej zwykle według miejsca zamieszkania lub pracodawcy. Formularz można złożyć papierowo lub elektronicznie, w zależności od aktualnych możliwości danej kasy. Po złożeniu wniosku instytucja może poprosić o dodatkowe dokumenty lub wyjaśnienia, zwłaszcza w sytuacjach transgranicznych, gdzie trzeba ustalić, który kraj ma pierwszeństwo wypłaty.',
        ],
      },
      {
        heading: 'Co może opóźnić lub utrudnić wniosek',
        paragraphs: [
          'Najczęstsze przyczyny opóźnień to niekompletne tłumaczenia dokumentów, brak jasności co do sytuacji zawodowej drugiego rodzica w Polsce oraz zmiany miejsca zatrudnienia w trakcie rozpatrywania wniosku. Warto zgłaszać Familienkasse każdą istotną zmianę od razu, a nie dopiero przy kolejnym kontakcie.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Wniosek o Kindergeld w sytuacji transgranicznej — gdy dziecko jest w Polsce, a rodzic pracuje w Niemczech — bywa jedną z bardziej skomplikowanych formalności urzędowych. W [Polskim Centrum Finansowym w Niemczech](/pl/sprawy-urzedowe) pomagamy skompletować dokumenty i przejść przez proces krok po kroku, po polsku.',
        ],
      },
    ],
  },
  {
    slug: 'bausparkasse-po-polsku',
    title: 'Bausparkasse — jak oszczędzać na mieszkanie w Niemczech (dla Polaków)',
    metaDescription: 'Czym jest Bausparvertrag i jak działa Bausparkasse w Niemczech — faza oszczędzania, dopłaty państwowe i na co uważać przed podpisaniem umowy. Poradnik po polsku.',
    keywords: ['bausparkasse co to jest po polsku', 'bausparvertrag po polsku', 'oszczędzanie na mieszkanie niemcy', 'kasa budowlana niemcy'],
    publishDate: '2026-10-18',
    excerpt: 'Bausparkasse to niemiecki system systematycznego oszczędzania na własne mieszkanie, nieznany w Polsce. Sprawdź, jak działa i czy naprawdę się opłaca.',
    coverImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Bausparkasse to instytucja, a Bausparvertrag — umowa, której w Polsce nie ma bezpośredniego odpowiednika. To system łączący systematyczne oszczędzanie z późniejszym prawem do taniego kredytu na cele mieszkaniowe, od dekad popularny w Niemczech, ale dla nowo przyjezdnych Polaków często zupełnie nieznany.',
        ],
      },
      {
        heading: 'Jak działa mechanizm',
        paragraphs: [
          'Umowa dzieli się na dwie fazy. W pierwszej, fazie oszczędzania, klient regularnie wpłaca ustaloną kwotę, aż osiągnie określony procent sumy umowy (Bausparsumme). W drugiej fazie, po spełnieniu warunków, klient otrzymuje prawo do kredytu budowlanego na pozostałą część sumy, z oprocentowaniem ustalonym i zagwarantowanym już w momencie podpisania umowy — niezależnie od tego, jak zmienią się stopy procentowe na rynku w międzyczasie.',
          'To właśnie gwarancja oprocentowania ustalona z góry jest głównym argumentem za tym produktem — chroni przed wzrostem kosztów kredytu w przyszłości, kosztem elastyczności w trakcie fazy oszczędzania.',
        ],
      },
      {
        heading: 'Dopłaty państwowe',
        paragraphs: [
          'W określonych warunkach dochodowych państwo niemieckie dopłaca do oszczędności gromadzonych na Bausparvertrag — m.in. w ramach programów wspierających budownictwo mieszkaniowe oraz oszczędzanie pracownicze. Wysokość i warunki tych dopłat zmieniają się okresowo, dlatego zamiast podawać konkretne kwoty, które szybko się dezaktualizują, najlepiej sprawdzić aktualne progi indywidualnie — zależą od dochodu, stanu cywilnego i liczby dzieci.',
        ],
      },
      {
        heading: 'Dla kogo to ma sens',
        paragraphs: [
          'Bausparvertrag sprawdza się najlepiej dla osób, które planują zakup lub remont nieruchomości w Niemczech w perspektywie kilku–kilkunastu lat i cenią przewidywalność kosztów bardziej niż maksymalny zysk z oszczędności. Dla kogoś, kto nie wie jeszcze, czy zostanie w Niemczech na dłużej, warunki wcześniejszego zerwania umowy warto sprawdzić przed podpisaniem — zwykle wiążą się z utratą części korzyści.',
        ],
      },
      {
        heading: 'Na co uważać przed podpisaniem',
        paragraphs: [
          'Kluczowe elementy do sprawdzenia to: wysokość i częstotliwość obowiązkowych wpłat, minimalny okres oszczędzania przed uzyskaniem prawa do kredytu, opłaty za zawarcie umowy (Abschlussgebühr) oraz warunki, na jakich można zrezygnować z fazy kredytowej i po prostu wypłacić zgromadzone oszczędności z odsetkami.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Zrozumienie, czy w Twojej sytuacji dopłaty państwowe w ogóle Ci przysługują i czy ten konkretny produkt pasuje do Twoich planów mieszkaniowych, wymaga indywidualnej analizy. W [Polskim Centrum Finansowym w Niemczech](/pl/bausparkasse) bezpłatnie dobieramy produkt dopasowany do Twojej sytuacji.',
        ],
      },
    ],
  },
  {
    slug: 'emerytura-niemcy-dla-polaka',
    title: 'Emerytura w Niemczech dla Polaka — jak działa i ile dostaniesz',
    metaDescription: 'Niemiecki system emerytalny dla Polaka — czy lata pracy w Polsce się liczą, jaki jest minimalny okres składkowy i co się dzieje z emeryturą przy powrocie do Polski.',
    keywords: ['emerytura w niemczech dla polaka', 'drv emerytura niemcy', 'emerytura niemiecka po polsku', 'punkty emerytalne niemcy'],
    publishDate: '2026-10-19',
    excerpt: 'Niemiecki system emerytalny opiera się na punktach, nie na prostym procencie od pensji — a lata pracy w Polsce wcale nie przepadają. Sprawdź, jak to się liczy.',
    coverImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=500&fit=crop',
    sections: [
      {
        paragraphs: [
          'Niemiecki system emerytalny (Deutsche Rentenversicherung, w skrócie DRV) działa inaczej niż polski ZUS — zamiast prostego przeliczenia składek na kwotę, opiera się na systemie punktów emerytalnych (Rentenpunkte), gromadzonych przez całe życie zawodowe. Dla osoby, która część kariery przepracowała w Polsce, a część w Niemczech, pojawia się naturalne pytanie: czy te lata się w ogóle liczą razem?',
        ],
      },
      {
        heading: 'Jak liczone są punkty emerytalne',
        paragraphs: [
          'Każdy rok pracy w Niemczech z przeciętnym wynagrodzeniem krajowym daje w przybliżeniu jeden punkt emerytalny. Zarobki wyższe od średniej dają więcej niż jeden punkt rocznie, niższe — mniej. Suma zgromadzonych punktów, pomnożona przez aktualną wartość punktu (ustalaną i aktualizowaną przez państwo), decyduje o wysokości przyszłej emerytury.',
        ],
      },
      {
        heading: 'Czy lata pracy w Polsce się liczą',
        paragraphs: [
          'Dzięki unijnej koordynacji systemów zabezpieczenia społecznego, okresy składkowe z Polski i Niemiec są sumowane przy ustalaniu prawa do emerytury — czyli przy sprawdzaniu, czy dana osoba w ogóle spełniła minimalny wymagany staż. Nie oznacza to jednak, że polskie lata przeliczają się na niemieckie punkty — każdy kraj wypłaca własną część emerytury, proporcjonalnie do przepracowanych tam lat, według własnych zasad.',
          'W praktyce osoba, która pracowała i w Polsce, i w Niemczech, może na starość otrzymywać dwie osobne emerytury — polską z ZUS i niemiecką z DRV — każdą wyliczoną według przepisów danego kraju.',
        ],
      },
      {
        heading: 'Minimalny okres składkowy',
        paragraphs: [
          'Aby w ogóle nabyć prawo do niemieckiej emerytury, potrzebny jest minimalny okres składkowy (Wartezeit) — i tu właśnie sumowanie okresów z obu krajów ma znaczenie, bo pozwala go osiągnąć nawet osobie, która w samych Niemczech przepracowała stosunkowo krótko.',
        ],
      },
      {
        heading: 'Co się dzieje przy powrocie do Polski',
        paragraphs: [
          'Powrót do Polski nie powoduje utraty zgromadzonych niemieckich punktów emerytalnych — prawo do niemieckiej emerytury pozostaje, a jej wypłata może trafiać na polskie konto bankowe po osiągnięciu wieku emerytalnego obowiązującego w niemieckim systemie. Warto jednak pamiętać, że wiek emerytalny i zasady wypłaty mogą różnić się między krajami, dlatego dobrze zawczasu sprawdzić, kiedy dokładnie nabywa się prawo do wypłaty z każdego systemu osobno.',
        ],
      },
      {
        heading: 'Dodatkowe oszczędzanie na emeryturę',
        paragraphs: [
          'Poza ustawowym systemem DRV, w Niemczech dostępne są dodatkowe formy oszczędzania na emeryturę, częściowo wspierane przez państwo — m.in. produkty typu Riester czy prywatne plany inwestycyjne. Dla osoby planującej zostać w Niemczech na dłużej mogą one sensownie uzupełnić ustawową emeryturę, zwłaszcza że ta, licząc tylko niemieckie lata pracy, bywa niższa niż oczekiwania wyniesione z polskiego systemu.',
        ],
      },
      {
        heading: 'Kiedy pomoc po polsku daje realną wartość',
        paragraphs: [
          'Zrozumienie, ile realnie wyniesie przyszła emerytura z obu krajów i czy warto dodatkowo oszczędzać, wymaga spojrzenia na całą sytuację zawodową, nie tylko na jeden fragment kariery. W [Polskim Centrum Finansowym w Niemczech](/pl/inwestycje) pomagamy to policzyć i zaplanować, po polsku i bezpłatnie.',
        ],
      },
    ],
  },
]

export function getArticleBySlug(slug: string): ArticleData | undefined {
  return PCF_ARTICLES.find(a => a.slug === slug)
}

export const ARTICLE_SLUGS = PCF_ARTICLES.map(a => a.slug)
