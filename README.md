# Bedragaren

🎮 **Spela direkt:** [semsomi.github.io/bedragaren](https://semsomi.github.io/bedragaren/)

Ett mobilanpassat sällskapsspel på svenska, inspirerat av *Who’s the Impostor?* Spelet körs helt i webbläsaren och är gjort för att mobilen enkelt ska kunna skickas mellan spelarna.

## Så fungerar spelet

Alla spelare utom en får samma hemliga ord. Den återstående spelaren är **bedragaren** och får i stället en ledtråd bestående av ett enda ord.

När alla har sett sina kort börjar en slumpmässigt vald spelare samtalet. Gruppen diskuterar det hemliga ordet utan att säga det rakt ut. Målet är att lista ut vem bedragaren är, medan bedragaren försöker smälta in.

## Regler

1. Lägg till minst tre spelare.
2. Välj kategorin **Mat och dryck**, **Vardagsföremål** eller båda.
3. Tryck på **Spela**.
4. Skicka mobilen till spelaren vars namn visas.
5. Spelaren håller ned kortet för att se sitt ord eller sin ledtråd.
6. När spelaren släpper döljs kortet igen.
7. Tryck på **Nästa spelare** och fortsätt tills alla har sett sitt kort.
8. Den utvalda första spelaren börjar samtalet.
9. Diskutera, rösta och avslöja bedragaren.

## Håll ned för att visa

Kortets innehåll visas bara medan spelaren håller ned fingret eller musknappen. Så snart spelaren släpper, byter flik, byter app eller fönstret tappar fokus döljs kortet automatiskt.

Med tangentbord kan kortet visas genom att hålla ned **Mellanslag** eller **Enter**.

## Ledtrådar

Varje hemligt ord har exakt en ledtråd. Ledtråden är alltid ett enda svenskt ord: tillräckligt relevant för att hjälpa bedragaren delta, men tillräckligt vag för att inte avslöja svaret direkt.

## Skydd mot feltryck

På slutskärmen är **Spela igen** låst i fem sekunder. En nedräkning visas på knappen innan den går att trycka på, så att en ny omgång inte startas av misstag.

## Köra lokalt

Klona eller ladda ned repositoriet och öppna `index.html` direkt i en webbläsare. Inga beroenden, paket eller byggsteg behövs.

## Publicera med GitHub Pages

1. Öppna **Settings → Pages** i repositoriet.
2. Välj **Deploy from a branch** under *Build and deployment*.
3. Välj grenen **main** och mappen **/ (root)**.
4. Spara.

Webbadressen blir normalt:

```text
https://USERNAME.github.io/REPOSITORY-NAME/
```

## Integritet

Spelet har ingen backend, databas, inloggning, analys eller externa API-anrop. Spelarnamnen sparas endast i webbläsarens `localStorage` på den aktuella enheten.
