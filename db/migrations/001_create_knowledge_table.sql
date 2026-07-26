CREATE TABLE knowledge_items (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    keywords TEXT[] NOT NULL DEFAULT '{}',
    file_path TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT title_not_empty
        CHECK (length(trim(title)) > 0),
    CONSTRAINT file_path_not_empty
        CHECK (length(trim(file_path)) > 0)
);