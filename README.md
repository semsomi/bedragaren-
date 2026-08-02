# Bedragaren

Ett mobilanpassat partysällskapsspel inspirerat av "Vem är bedragaren?" (Who's the Impostor?).

## Om spelet

Alla spelare utom en får ett hemligt ord. Den ena spelaren – **bedragaren** – känner inte till ordet, utan får i stället en **ledtråd** (ett enda ord). Under spelets gång diskuterar alla spelare ordet utan att säga det direkt. Målet är att lista ut vem bedragaren är – och bedragarens mål är att smälta in!

## Regler

1. Lägg till minst 3 spelare.
2. Välj en eller båda kategorier: **Mat och dryck** eller **Vardagsföremål**.
3. Tryck **Spela**.
4. Skicka telefonen runt. Varje spelare håller ned sin spelarkort för att se sin roll.
5. En spelare är bedragaren och ser bara en ledtråd – inte det hemliga ordet.
6. Alla övriga spelare ser det hemliga ordet.
7. Diskutera ordet utan att säga det direkt.
8. Rösta om vem ni tror är bedragaren.
9. Avslöja bedragaren och se om ni hade rätt!

## Håll-för-att-visa (hold-to-reveal)

Varje spelarkort visar bara spelarens namn tills spelaren håller ned fingret (eller klickar och håller in musknappen). Informationen visas **enbart** under tiden spelaren håller ned. Så snart spelaren släpper, drar undan fingret, byter app eller fliken tappar fokus döljs kortet automatiskt.

### Tangentbord

Fokusera kortet och håll in **Mellanslag** eller **Enter** för att visa. Släpp för att dölja.

## Ledtrådar

Varje hemligt ord har exakt **ett** ledtrådsord. Ledtråden är ett enda svenskt ord – inga fraser eller meningar. Den är tillräckligt vag för att inte omedelbart avslöja ordet, men hjälper bedragaren att delta i diskussionen.

## Köra spelet lokalt

1. Klona eller ladda ned det här repositoriet.
2. Öppna `index.html` direkt i en webbläsare (inga beroenden eller byggsteg behövs).

## Publicera med GitHub Pages

1. Gå till **Settings → Pages** i ditt GitHub-repositorium.
2. Under *Build and deployment*, välj **Deploy from a branch**.
3. Välj grenen **main** och mappen **/ (root)**.
4. Spara. GitHub Pages publicerar automatiskt.

Den publika adressen är normalt:

```
https://USERNAME.github.io/REPOSITORY-NAME/
```

Ersätt `USERNAME` med ditt GitHub-användarnamn och `REPOSITORY-NAME` med repositoriets namn.

## Ingen backend – inga konton

Spelet körs helt i webbläsaren. Det finns ingen server, ingen databas och inga konton. Spelarnamnen sparas i webbläsarens **localStorage** på den aktuella enheten och lämnar aldrig enheten.
