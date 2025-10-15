CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS news (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    date VARCHAR(50) NOT NULL,
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2b$10$YourHashedPasswordHere', 'admin')
ON CONFLICT (username) DO NOTHING;

INSERT INTO news (title, description, content, date, author_id) VALUES
('Профилактическое мероприятие "Безопасная дорога"', 'В период с 20 по 25 октября будет проведено профилактическое мероприятие, направленное на снижение аварийности.', 'Подробное описание мероприятия...', '15 октября 2025', 1),
('Совещание руководящего состава', 'Состоялось ежемесячное совещание по итогам работы за сентябрь 2025 года.', 'Подробности совещания...', '12 октября 2025', 1),
('Награждение лучших сотрудников', 'За образцовое выполнение служебных обязанностей награждены 5 сотрудников подразделения.', 'Список награжденных...', '8 октября 2025', 1)
ON CONFLICT DO NOTHING;
