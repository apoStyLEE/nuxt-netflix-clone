# Tables

- **Genres**
  - id
  - title
  - avatar
- **Medias**
  - id
  - genre_id
  - title
  - description
  - type
    - dizi
    - film
  - thumbnail_image
  - cover_image
- **Episods**
  - id
  - media_id
  - title
  - description
  - episode_number
  - season_number
  - duration
  - release_date
- **Profile**
  - id
  - user_id
  - title
  - avatar
  - is_default
- **Lists**
  - id
  - user_id
  - media_id
  - episods_id
  - added_date
- **ResumePoints**
  - id
  - user_id
  - media_id
  - episods_id

# Starflix Db Schema

```mermaid

erDiagram
    Users {
        int id PK
        string name
    }

    Genres {
        int id PK
        string title
        string avatar
    }

    Medias {
        int id PK
        int genre_id FK
        string title
        string description
        string type
        string thumbnail_image
        string cover_image
    }

    Episods {
        int id PK
        int media_id FK
        string title
        string description
        int episode_number
        int season_number
        int duration
        date release_date
    }

    Profile {
        int id PK
        int user_id FK
        string title
        string avatar
    }

    Lists {
        int id PK
        int user_id FK
        int media_id FK
        int episods_id FK
        date added_date
    }

    ResumePoints {
        int id PK
        int user_id FK
        int media_id FK
        int episods_id FK
    }

    Users ||--o{ Profile : "has"
    Users ||--o{ Lists : "has"
    Users ||--o{ ResumePoints : "has"
    Genres ||--o{ Medias : "contains"
    Medias ||--o{ Episods : "contains"
    Medias ||--o{ Lists : "in"
    Episods ||--o{ Lists : "contains"
    Medias ||--o{ ResumePoints : "resume"
    Episods ||--o{ ResumePoints : "resume"

```
