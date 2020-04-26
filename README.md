## System do aktualizacji stanu liczników w budynku wielomieszkaniowym

Tutaj znajduje się Backend aplikacji, aby zobaczyć Frontend kliknij [tutaj](https://github.com/MarcinZmudka/HouseMetersFront).

Aplikacja umożliwia spisanie stanu liczników:

- wody zimnej
- wody ciepłej
- gazu
- liczników elektrycznych
  - posiadających dwie taryfy

dla każdego mieszkania osobno. System automatycznie wpisuje datę oraz sprawdza czy wpisana wartość nie jest mniejsza od poprzedniego wpisu.

---

### Instalacja

Aby zainstalować wpisz:

```bash
    cd client && npm install
    cd server && npm install
```

### Uruchomienie

```bash
  npm start
```

### Docker

Aby uruchomić aplikację z dockerem, utwórz docker-compose file, który bedzię wyglądał np:

```yml
version: "3"
services:
  server:
    container_name: node-mongo
    restart: always
    build: ./server
    ports:
      - "80:3000"
    links:
      - mongo
    depends_on:
      - mongo
    volumes:
      - ./server:/usr/src/app
  mongo:
    container_name: mongo
    image: mongo
    ports:
      - "27017:27017"
  client:
    container_name: client-react
    build: ./client
    stdin_open: true
    ports:
      - 3000:3000
    links:
      - server
    depends_on:
      - server
    volumes:
      - ./client/src:/usr/src/app/src
```

Gdzie Backend będzie w folderze server, frontend w client oraz wpisz komendę:

```bash
  docker-compose up
```
