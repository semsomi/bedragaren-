"use strict";

/*
 * REGLER FÖR ORD OCH LEDTRÅDAR
 * - Varje ledtråd ska bestå av exakt ett ord.
 * - Ledtråden får inte vara samma som det hemliga ordet.
 * - Ledtråden får inte förekomma inuti det hemliga ordet.
 *   Exempel: om ordet är "Anteckningsbok" får ledtråden inte vara "Bok".
 * Kontrollfunktionen längst ned stoppar appen vid ogiltiga kombinationer.
 */
window.BEDRAGAREN_CATEGORIES = {
  food: { label: "Mat och dryck", emoji: "🍕", selected: true, words: [
    ["Pizza","Italien"],["Kaffe","Morgon"],["Sushi","Japan"],["Tacos","Mexiko"],["Glass","Sommar"],["Pannkakor","Lördag"],["Hamburgare","Bröd"],["Pasta","Sås"],["Choklad","Kakao"],["Te","Kopp"],["Pommes","Ketchup"],["Kebab","Grillat"],["Jordgubbar","Sommar"],["Lemonad","Citron"],["Popcorn","Bio"],["Soppa","Varm"],["Smörgås","Frukost"],["Våffla","Grädde"],["Sill","Midsommar"],["Köttbullar","Ikea"],["Kanelbulle","Fika"],["Lasagne","Ugn"],["Omelett","Ägg"],["Risotto","Ris"],["Smoothie","Frukt"],["Müsli","Yoghurt"],["Croissant","Paris"],["Nachos","Chips"],["Halloumi","Grillad"],["Avokado","Grön"]
  ]},
  items: { label: "Vardagsföremål", emoji: "🪥", selected: true, words: [
    ["Tandborste","Badrum"],["Paraply","Regn"],["Fjärrkontroll","Soffa"],["Nyckel","Dörr"],["Kudde","Sömn"],["Sax","Klippa"],["Laddare","Batteri"],["Stekpanna","Spis"],["Spegel","Reflektion"],["Ryggsäck","Skola"],["Klocka","Tid"],["Dammsugare","Golv"],["Glasögon","Syn"],["Handduk","Dusch"],["Penna","Skriva"],["Bok","Bibliotek"],["Lampa","Ljus"],["Tallrik","Mat"],["Gaffel","Middag"],["Mugg","Dryck"],["Väska","Bära"],["Kamera","Foto"],["Kalender","Datum"],["Linjal","Mäta"],["Pennfodral","Skola"],["Termos","Varm"],["Kniv","Kök"],["Korkskruv","Flaska"],["Skärbräda","Kök"],["Tvål","Händer"]
  ]},
  sport: { label: "Idrott", emoji: "⚽", words: [
    ["Fotboll","Mål"],["Tennis","Racket"],["Basket","Korg"],["Ishockey","Puck"],["Handboll","Klister"],["Golf","Green"],["Simning","Bassäng"],["Boxning","Handskar"],["Skidåkning","Snö"],["Cykling","Pedal"],["Volleyboll","Nät"],["Bordtennis","Pingis"],["Friidrott","Stadion"],["Löpning","Tempo"],["Gymnastik","Matta"],["Ridning","Häst"],["Baseboll","Slagträ"],["Rugby","Tackling"],["Badminton","Fjäderboll"],["Klättring","Grepp"],["Bowling","Käglor"],["Fäktning","Värja"],["Dart","Tavla"],["Curling","Sopning"],["Surfing","Vågor"],["Segling","Vind"],["Judo","Kast"],["Padel","Glas"],["Motorsport","Bana"],["Orientering","Kompass"]
  ]},
  weather: { label: "Väder och natur", emoji: "🌦️", words: [
    ["Regn","Paraply"],["Snö","Vinter"],["Sol","Värme"],["Åska","Muller"],["Blixt","Ljus"],["Dimma","Sikt"],["Hagel","Is"],["Storm","Vind"],["Orkan","Virvel"],["Duggregn","Smådroppar"],["Skyfall","Översvämning"],["Värmebölja","Hetta"],["Frost","Morgon"],["Moln","Himmel"],["Regnbåge","Färger"],["Tornado","Tratt"],["Bris","Svag"],["Minusgrader","Kyla"],["Luftfuktighet","Fukt"],["Högtryck","Klart"],["Lågtryck","Ostadigt"],["Is","Halka"],["Slask","Blött"],["Snöstorm","Sikt"],["Solnedgång","Kväll"],["Soluppgång","Gryning"],["Temperatur","Grader"],["Torka","Torrt"],["Norrsken","Natt"],["Lavinen","Fjäll"]
  ]},
  animals: { label: "Djur", emoji: "🦁", words: [
    ["Lejon","Savann"],["Elefant","Snabel"],["Giraff","Hals"],["Krokodil","Flod"],["Pingvin","Is"],["Delfin","Hav"],["Haj","Fena"],["Örn","Himmel"],["Uggla","Natt"],["Kanin","Morot"],["Hund","Koppel"],["Katt","Spinn"],["Häst","Stall"],["Ko","Mjölk"],["Får","Ull"],["Apa","Banan"],["Björn","Ide"],["Räv","Skog"],["Zebra","Ränder"],["Känguru","Australien"]
  ]},
  brands: { label: "Varumärken och logotyper", emoji: "🏢", words: [
    ["Apple","Äpple"],["Nike","Swoosh"],["Adidas","Ränder"],["Ikea","Möbler"],["Volvo","Sverige"],["Samsung","Mobil"],["Lego","Klossar"],["Spotify","Musik"],["Netflix","Streaming"],["Google","Sökning"],["Amazon","Paket"],["McDonalds","Bågar"],["Pepsi","Läsk"],["Rolex","Klocka"],["Ferrari","Häst"],["Disney","Slott"],["Playstation","Konsol"],["Nintendo","Mario"],["Microsoft","Windows"],["YouTube","Video"]
  ]},
  shapes: { label: "Färger och former", emoji: "🎨", words: [
    ["Röd","Stoppskylt"],["Blå","Himmel"],["Grön","Gräs"],["Gul","Sol"],["Lila","Druva"],["Orange","Apelsin"],["Rosa","Flamingo"],["Svart","Natt"],["Vit","Snö"],["Brun","Choklad"],["Cirkel","Rund"],["Triangel","Tre"],["Kvadrat","Fyra"],["Rektangel","Lång"],["Stjärna","Himmel"],["Hjärta","Kärlek"],["Oval","Ägg"],["Spiral","Snurra"],["Kub","Tärning"],["Pyramid","Egypten"]
  ]},
  places: { label: "Länder och städer", emoji: "🌍", words: [
    ["Sverige","Stockholm"],["Norge","Fjord"],["Danmark","Köpenhamn"],["Finland","Bastu"],["Island","Vulkan"],["Frankrike","Paris"],["Italien","Rom"],["Spanien","Madrid"],["Tyskland","Berlin"],["Grekland","Aten"],["Japan","Tokyo"],["Kina","Peking"],["Indien","Delhi"],["Australien","Sydney"],["Kanada","Toronto"],["Brasilien","Rio"],["Egypten","Kairo"],["Turkiet","Ankara"],["Dubai","Skyskrapa"],["London","Bigben"]
  ]},
  emotions: { label: "Känslor och emotioner", emoji: "😊", words: [
    ["Glädje","Leende"],["Sorg","Tårar"],["Ilska","Röd"],["Rädsla","Mörker"],["Avund","Grön"],["Kärlek","Hjärta"],["Förvåning","Chock"],["Skam","Blick"],["Stolthet","Bröst"],["Lugn","Andning"],["Stress","Puls"],["Nervositet","Mage"],["Ensamhet","Tystnad"],["Hopp","Framtid"],["Besvikelse","Förlust"],["Nyfikenhet","Fråga"],["Lättnad","Pust"],["Saknad","Avstånd"],["Förvirring","Frågetecken"],["Entusiasm","Energi"]
  ]},
  hobbies: { label: "Hobbys och aktiviteter", emoji: "🎯", words: [
    ["Måla","Pensel"],["Fotografera","Kamera"],["Baka","Ugn"],["Läsa","Bok"],["Trädgård","Blommor"],["Fiska","Krok"],["Vandra","Stig"],["Sticka","Garn"],["Dans","Musik"],["Sjunga","Röst"],["Spela","Kontroll"],["Pussel","Bitar"],["Schack","Kung"],["Camping","Tält"],["Yoga","Matta"],["Samla","Kollektion"],["Snickra","Trä"],["Laga","Verktyg"],["Resa","Pass"],["Meditera","Lugn"]
  ]},
  internet: { label: "Internetkultur", emoji: "😂", words: [
    ["Meme","Bild"],["Viral","Spridning"],["Influencer","Följare"],["Hashtag","Tecken"],["Selfie","Kamera"],["Emoji","Känsla"],["Podcast","Ljud"],["Stream","Direkt"],["Troll","Kommentar"],["Clickbait","Rubrik"],["Filter","Ansikte"],["Story","Dygn"],["Reels","Kortvideo"],["Trend","Populär"],["Like","Hjärta"],["Följare","Profil"],["Chat","Meddelande"],["Avatar","Profilbild"],["Unboxing","Paket"],["Challenge","Utmaning"]
  ]},
  cooking: { label: "Kök och matlagning", emoji: "🍳", words: [
    ["Vispa","Skål"],["Hacka","Kniv"],["Steka","Panna"],["Koka","Vatten"],["Grilla","Glöd"],["Baka","Ugn"],["Marinera","Smak"],["Krydda","Salt"],["Recept","Instruktion"],["Förkläde","Kök"],["Kastrull","Spis"],["Durkslag","Pasta"],["Slev","Soppa"],["Rivjärn","Ost"],["Mixer","Smoothie"],["Termometer","Temperatur"],["Deg","Mjöl"],["Sås","Tillbehör"],["Buljong","Tärning"],["Servera","Tallrik"]
  ]},
  movies: { label: "Filmer och TV-serier", emoji: "🎬", words: [
    ["Titanic","Fartyg"],["Avatar","Blå"],["Frost","Elsa"],["Shrek","Träsk"],["Matrix","Piller"],["Joker","Skratt"],["Starwars","Rymd"],["Harrypotter","Trollstav"],["Saganomringen","Äventyr"],["Lejonkungen","Simba"],["Vänner","Soffa"],["Breakingbad","Kemi"],["Strangerthings","Uppochner"],["Gameofthrones","Drake"],["Theoffice","Kontor"],["Solsidan","Saltsjöbaden"],["Bron","Malmö"],["Bonusfamiljen","Relationer"],["Squidgame","Lekar"],["Wednesday","Flätor"]
  ]},
  music: { label: "Musik och band", emoji: "🎵", words: [
    ["Abba","Sverige"],["Beatles","Liverpool"],["Queen","Freddie"],["Metallica","Hårdrock"],["Coldplay","Gul"],["Roxette","Sverige"],["Adele","Ballad"],["Beyonce","Queen"],["Eminem","Rap"],["Avicii","Dj"],["Mozart","Klassiskt"],["Elvis","Kung"],["Madonna","Pop"],["Drake","Kanada"],["Rihanna","Barbados"],["EdSheeran","Gitarr"],["TaylorSwift","Eras"],["BrunoMars","Scen"],["ZaraLarsson","Sverige"],["HåkanHellström","Göteborg"]
  ]},
  jobs: { label: "Yrken", emoji: "👔", words: [
    ["Läkare","Sjukhus"],["Lärare","Skola"],["Polis","Uniform"],["Brandman","Eld"],["Kock","Kök"],["Pilot","Flyg"],["Snickare","Trä"],["Elektriker","Ström"],["Frisör","Sax"],["Advokat","Domstol"],["Journalist","Nyheter"],["Fotograf","Kamera"],["Programmerare","Kod"],["Bonde","Gård"],["Tandläkare","Tänder"],["Arkitekt","Ritning"],["Mekaniker","Motor"],["Servitör","Restaurang"],["Skådespelare","Scen"],["Veterinär","Djur"]
  ]},
  school: { label: "Skola och utbildning", emoji: "📚", words: [
    ["Matematik","Siffror"],["Svenska","Språk"],["Historia","Dåtid"],["Geografi","Karta"],["Biologi","Liv"],["Kemi","Ämnen"],["Fysik","Kraft"],["Prov","Betyg"],["Läxa","Hemma"],["Rast","Paus"],["Klassrum","Bänkar"],["Bibliotek","Böcker"],["Rektor","Ledare"],["Student","Mössa"],["Universitet","Examen"],["Förskola","Barn"],["Gymnasium","Ungdom"],["Penna","Skriva"],["Tavla","Krita"],["Lunch","Matsal"]
  ]},
  science: { label: "Vetenskap och teknik", emoji: "🔬", words: [
    ["Robot","Maskin"],["Dator","Skärm"],["Raket","Rymd"],["Atom","Liten"],["Laser","Ljus"],["Mikroskop","Förstoring"],["Teleskop","Stjärnor"],["Internet","Nätverk"],["Batteri","Energi"],["Magnet","Poler"],["Satellit","Bana"],["Algoritm","Regler"],["Virus","Smitta"],["DNA","Gener"],["Gravitation","Fall"],["Elektricitet","Ström"],["Klimat","Väder"],["Laboratorium","Experiment"],["AI","Intelligens"],["Drönare","Flyg"]
  ]},
  heroes: { label: "Superhjältar", emoji: "🦸", words: [
    ["Superman","Krypton"],["Batman","Gotham"],["Spiderman","Nät"],["Hulken","Grön"],["Thor","Hammare"],["Ironman","Rustning"],["Wonderwoman","Lasso"],["Flash","Snabb"],["Aquaman","Hav"],["Wolverine","Klor"],["Deadpool","Mask"],["Blackpanther","Wakanda"],["Captainamerica","Sköld"],["Antman","Liten"],["Doctorstrange","Magi"],["Storm","Väder"],["Robin","Sidekick"],["Venom","Svart"],["Shazam","Blixt"],["Groot","Träd"]
  ]},
  transport: { label: "Transport", emoji: "🚗", words: [
    ["Bil","Väg"],["Buss","Hållplats"],["Tåg","Räls"],["Flygplan","Himmel"],["Båt","Vatten"],["Cykel","Pedal"],["Motorcykel","Hjälm"],["Spårvagn","Stad"],["Tunnelbana","Underjord"],["Taxi","Mätare"],["Helikopter","Rotor"],["Sparkcykel","Styre"],["Färja","Överfart"],["Lastbil","Frakt"],["Traktor","Åker"],["Ambulans","Sirén"],["Brandbil","Eld"],["Ubåt","Djup"],["Luftballong","Korg"],["Rymdraket","Uppskjutning"]
  ]},
  games: { label: "TV-spel", emoji: "🎮", words: [
    ["Minecraft","Block"],["Fortnite","Bygga"],["Mario","Rör"],["Zelda","Link"],["Tetris","Bitar"],["Fifa","Fotboll"],["Sims","Livet"],["Pokemon","Fånga"],["Roblox","Spelvärld"],["Gta","Stad"],["Amongus","Bedragare"],["Pacman","Spöken"],["Sonic","Snabb"],["Halo","Rymd"],["Overwatch","Hjältar"],["Callofduty","Krig"],["Skyrim","Drakar"],["Portal","Hål"],["Fallguys","Hinder"],["Counterstrike","Bomb"]
  ]}
};

function normalizeForHintCheck(value) {
  return value
    .normalize("NFC")
    .toLocaleLowerCase("sv-SE")
    .replace(/[\s\-–—_]/g, "");
}

for (const [categoryKey, category] of Object.entries(window.BEDRAGAREN_CATEGORIES)) {
  category.words = category.words.map(([word, hint]) => {
    const normalizedWord = normalizeForHintCheck(word);
    const normalizedHint = normalizeForHintCheck(hint);

    if (!word || !hint) {
      throw new Error(`Kategori "${categoryKey}" innehåller ett ord eller en ledtråd som saknas.`);
    }
    if (/\s/.test(hint)) {
      throw new Error(`Ledtråden "${hint}" till "${word}" måste bestå av exakt ett ord.`);
    }
    if (normalizedWord.includes(normalizedHint)) {
      throw new Error(`Ledtråden "${hint}" får inte förekomma inuti det hemliga ordet "${word}".`);
    }

    return { word, hint };
  });
}
