/* ============================================
   HIERARCHICAL CATEGORY TREE (430+ categories)
   Each node: { id, name, emoji, children[], color?, sub? }
   Leaf categories are used for bookmark assignment.
   ============================================ */
const CAT_TREE = [
    {
        id: 'tech', name: 'Технології', emoji: '💻', color: '#4caf50', sub: 'Програмування, AI, електроніка та інше',
        children: [
            {
                id: 'programming', name: 'Програмування', emoji: '👨‍💻', color: '#37b24d',
                children: [
                    {
                        id: 'frontend', name: 'Веб-розробка (Frontend)', emoji: '🌐', color: '#4dabf7',
                        children: [
                            { id: 'html-css', name: 'HTML / CSS', emoji: '🏷️' },
                            { id: 'javascript', name: 'JavaScript', emoji: '🟨' },
                            { id: 'typescript', name: 'TypeScript', emoji: '🔷' },
                            { id: 'react', name: 'React', emoji: '⚛️' },
                            { id: 'vuejs', name: 'Vue.js', emoji: '💚' },
                            { id: 'angular', name: 'Angular', emoji: '🅰️' },
                            { id: 'svelte', name: 'Svelte', emoji: '🔥' },
                            { id: 'nextjs-nuxtjs', name: 'Next.js / Nuxt.js', emoji: '▲' },
                            { id: 'tailwind', name: 'Tailwind CSS', emoji: '🎨' },
                            { id: 'ui-libs', name: 'UI-бібліотеки', emoji: '📦' }
                        ]
                    },
                    {
                        id: 'backend', name: 'Backend-розробка', emoji: '⚙️', color: '#20c997',
                        children: [
                            { id: 'nodejs', name: 'Node.js', emoji: '🟩' },
                            { id: 'python-be', name: 'Python (Django, Flask, FastAPI)', emoji: '🐍' },
                            { id: 'php-laravel', name: 'PHP (Laravel)', emoji: '🐘' },
                            { id: 'java-spring', name: 'Java (Spring)', emoji: '☕' },
                            { id: 'csharp-dotnet', name: 'C# (.NET)', emoji: '🟣' },
                            { id: 'golang', name: 'Go', emoji: '🐹' },
                            { id: 'rust', name: 'Rust', emoji: '🦀' },
                            { id: 'ruby-rails', name: 'Ruby on Rails', emoji: '💎' }
                        ]
                    },
                    {
                        id: 'mobile-dev', name: 'Мобільна розробка', emoji: '📱', color: '#845ef7',
                        children: [
                            { id: 'flutter-dart', name: 'Flutter / Dart', emoji: '🦋' },
                            { id: 'react-native', name: 'React Native', emoji: '⚛️' },
                            { id: 'swift-ios', name: 'Swift (iOS)', emoji: '🍎' },
                            { id: 'kotlin-android', name: 'Kotlin (Android)', emoji: '🤖' },
                            { id: 'xamarin-maui', name: 'Xamarin / MAUI', emoji: '🟣' }
                        ]
                    },
                    {
                        id: 'databases', name: 'Бази даних', emoji: '🗄️', color: '#fab005',
                        children: [
                            { id: 'sql-db', name: 'SQL (PostgreSQL, MySQL)', emoji: '🐘' },
                            { id: 'nosql-db', name: 'NoSQL (MongoDB, Redis)', emoji: '🍃' },
                            { id: 'firebase', name: 'Firebase', emoji: '🔥' },
                            { id: 'supabase-db', name: 'Supabase', emoji: '⚡' }
                        ]
                    },
                    {
                        id: 'devops', name: 'DevOps & Cloud', emoji: '🔧', color: '#fd7e14',
                        children: [
                            { id: 'docker', name: 'Docker', emoji: '🐳' },
                            { id: 'kubernetes', name: 'Kubernetes', emoji: '☸️' },
                            { id: 'aws', name: 'AWS', emoji: '☁️' },
                            { id: 'gcloud', name: 'Google Cloud', emoji: '🌩️' },
                            { id: 'azure', name: 'Azure', emoji: '🔵' },
                            { id: 'cicd', name: 'CI/CD (GitHub Actions, Jenkins)', emoji: '🔄' },
                            { id: 'linux-bash', name: 'Linux / Bash', emoji: '🐧' },
                            { id: 'terraform', name: 'Terraform', emoji: '🏗️' }
                        ]
                    },
                    {
                        id: 'gamedev', name: 'Геймдев', emoji: '🎮', color: '#e64980',
                        children: [
                            { id: 'unity', name: 'Unity', emoji: '🎯' },
                            { id: 'unreal', name: 'Unreal Engine', emoji: '⚔️' },
                            { id: 'godot', name: 'Godot', emoji: '🤖' },
                            { id: 'blender-games', name: 'Blender (для ігор)', emoji: '🎲' },
                            { id: 'pixel-art', name: 'Pixel Art', emoji: '🕹️' }
                        ]
                    },
                    {
                        id: 'data-science', name: 'Data Science & Analytics', emoji: '📊', color: '#15aabf',
                        children: [
                            { id: 'python-data', name: 'Python для даних', emoji: '🐍' },
                            { id: 'pandas-numpy', name: 'Pandas / NumPy', emoji: '🐼' },
                            { id: 'jupyter', name: 'Jupyter Notebooks', emoji: '📓' },
                            { id: 'tableau', name: 'Tableau', emoji: '📈' },
                            { id: 'power-bi', name: 'Power BI', emoji: '📊' },
                            { id: 'apache-spark', name: 'Apache Spark', emoji: '⚡' }
                        ]
                    },
                    { id: 'git-repos', name: 'Git та репозиторії', emoji: '🐙' },
                    { id: 'docs-refs', name: 'Документація та довідники', emoji: '📚' },
                    { id: 'sw-arch', name: 'Архітектура ПЗ', emoji: '🏗️' },
                    { id: 'qa-testing', name: 'Тестування (QA)', emoji: '🧪' },
                    { id: 'pkg-managers', name: 'Пакетні менеджери (npm, pip, cargo)', emoji: '📦' }
                ]
            },
            {
                id: 'ai', name: 'Штучний інтелект', emoji: '🤖', color: '#1098ad', sub: 'Найпотужніші AI-інструменти сучасності',
                children: [
                    { id: 'ai-chatbots', name: 'Чат-боти (ChatGPT, Claude, Gemini)', emoji: '💬' },
                    { id: 'ai-images', name: 'Генерація зображень', emoji: '🖼️' },
                    { id: 'ai-voice', name: 'Голос та аудіо', emoji: '🎤' },
                    { id: 'ai-video', name: 'Відео ШІ', emoji: '🎬' },
                    { id: 'ml', name: 'Machine Learning', emoji: '🧠' },
                    { id: 'ai-text', name: 'ШІ для тексту та копірайтингу', emoji: '📝' },
                    { id: 'ai-code', name: 'ШІ для коду (Copilot, Cursor)', emoji: '💻' },
                    { id: 'ai-automation', name: 'Автоматизація (Zapier, Make)', emoji: '⚙️' }
                ]
            },
            {
                id: 'print3d', name: '3D-друк', emoji: '🖨️', color: '#e8590c',
                children: [
                    { id: 'print3d-shops', name: 'Магазини 3D-принтерів', emoji: '🛒' },
                    { id: 'print3d-modeling', name: '3D-моделювання (Tinkercad, Fusion 360, Blender)', emoji: '📐' },
                    { id: 'print3d-libs', name: 'Бібліотеки 3D-моделей (Thingiverse, Printables)', emoji: '📁' },
                    { id: 'print3d-slicers', name: 'Слайсери (Cura, PrusaSlicer)', emoji: '⚙️' },
                    { id: 'print3d-materials', name: 'Матеріали (PLA, ABS, PETG, смоли)', emoji: '🧵' },
                    { id: 'print3d-maintenance', name: 'Обслуговування та калібрування', emoji: '🔧' },
                    { id: 'print3d-ideas', name: 'Ідеї та проєкти', emoji: '💡' }
                ]
            },
            {
                id: 'electronics', name: 'Електроніка та DIY', emoji: '⚡', color: '#fab005',
                children: [
                    { id: 'arduino', name: 'Arduino', emoji: '🔌' },
                    { id: 'raspberry-pi', name: 'Raspberry Pi', emoji: '🍓' },
                    { id: 'esp-iot', name: 'ESP32 / ESP8266 (IoT)', emoji: '📡' },
                    { id: 'batteries', name: 'Батареї та живлення', emoji: '🔋' },
                    { id: 'ham-radio', name: 'Радіозв\'язок (HAM Radio, SDR)', emoji: '📻' },
                    { id: 'soldering', name: 'Паяння та інструменти', emoji: '🛠️' },
                    { id: 'oscilloscopes', name: 'Осцилографи та вимірювання', emoji: '📊' },
                    { id: 'components-shops', name: 'Магазини компонентів', emoji: '🛒' }
                ]
            },
            {
                id: 'cnc', name: 'ЧПУ (CNC)', emoji: '🔩', color: '#868e96',
                children: [
                    { id: 'cnc-milling', name: 'Фрезерні верстати', emoji: '🏭' },
                    { id: 'cnc-laser', name: 'Лазерні різаки / гравери', emoji: '✂️' },
                    { id: 'cad-cam', name: 'CAD/CAM програми', emoji: '📐' },
                    { id: 'cnc-materials', name: 'Матеріали (дерево, метал, акрил)', emoji: '🪵' },
                    { id: 'cnc-shops', name: 'Магазини CNC', emoji: '🛒' }
                ]
            },
            {
                id: 'robotics', name: 'Робототехніка', emoji: '🤖', color: '#4c6ef5',
                children: [
                    { id: 'industrial-robots', name: 'Промислові роботи', emoji: '🦾' },
                    { id: 'hobby-robots', name: 'Хобі-роботи', emoji: '🤖' },
                    { id: 'drones', name: 'Дрони (БПЛА)', emoji: '🚁' },
                    { id: 'robocars', name: 'Робомобілі', emoji: '🏎️' }
                ]
            },
            {
                id: 'smarthome', name: 'Розумний дім (Smart Home)', emoji: '🏠', color: '#12b886',
                children: [
                    { id: 'smart-lighting', name: 'Освітлення (Philips Hue, IKEA)', emoji: '💡' },
                    { id: 'smart-climate', name: 'Клімат (термостати, датчики)', emoji: '🌡️' },
                    { id: 'smart-cameras', name: 'Відеоспостереження', emoji: '📹' },
                    { id: 'smart-locks', name: 'Розумні замки', emoji: '🔒' },
                    { id: 'voice-assistants', name: 'Голосові асистенти (Alexa, Google Home)', emoji: '🎤' },
                    { id: 'smart-protocols', name: 'Протоколи (Zigbee, Z-Wave, Matter)', emoji: '📡' },
                    { id: 'home-assistant', name: 'Home Assistant', emoji: '🏗️' }
                ]
            },
            {
                id: 'cybersec', name: 'Кібербезпека', emoji: '🔐', color: '#495057',
                children: [
                    { id: 'passwords-auth', name: 'Паролі та автентифікація', emoji: '🔑' },
                    { id: 'vpn', name: 'VPN', emoji: '🛡️' },
                    { id: 'antivirus', name: 'Антивіруси', emoji: '🐛' },
                    { id: 'osint', name: 'OSINT (розвідка)', emoji: '🕵️' },
                    { id: 'sec-education', name: 'Навчання з безпеки', emoji: '📖' }
                ]
            },
            {
                id: 'hardware', name: 'Обладнання (Hardware)', emoji: '🖥️', color: '#7950f2',
                children: [
                    { id: 'hw-computers', name: 'Комп\'ютери та ноутбуки', emoji: '💻' },
                    { id: 'hw-phones', name: 'Смартфони та планшети', emoji: '📱' },
                    { id: 'hw-printers', name: 'Принтери та сканери', emoji: '🖨️' },
                    { id: 'hw-audio', name: 'Аудіо (навушники, колонки)', emoji: '🎧' },
                    { id: 'hw-monitors', name: 'Монітори', emoji: '🖥️' },
                    { id: 'hw-peripherals', name: 'Периферія (клавіатури, миші)', emoji: '⌨️' },
                    { id: 'hw-consoles', name: 'Ігрові консолі', emoji: '🎮' },
                    { id: 'hw-storage', name: 'Зберігання (SSD, NAS)', emoji: '💾' },
                    { id: 'hw-network', name: 'Мережеве обладнання (роутери)', emoji: '🔌' }
                ]
            },
            {
                id: 'hosting-net', name: 'Мережі та хостинг', emoji: '🌐', color: '#4dabf7',
                children: [
                    { id: 'domain-reg', name: 'Доменні реєстратори', emoji: '🌍' },
                    { id: 'hosting', name: 'Хостинг (VPS, Shared)', emoji: '🖥️' },
                    { id: 'cdn', name: 'CDN (Cloudflare)', emoji: '☁️' },
                    { id: 'email-hosting', name: 'Email-хостинг', emoji: '📧' }
                ]
            },
            {
                id: 'vr-ar', name: 'VR / AR', emoji: '🕶️', color: '#be4bdb',
                children: [
                    { id: 'vr-headsets', name: 'Гарнітури (Meta Quest, Apple Vision)', emoji: '🥽' },
                    { id: 'vr-games', name: 'VR-ігри', emoji: '🎮' },
                    { id: 'ar-realestate', name: 'AR для нерухомості / інтер\'єру', emoji: '🏗️' }
                ]
            }
        ]
    },
    {
        id: 'realestate', name: 'Нерухомість', emoji: '🏠', color: '#e67700', sub: 'Портали, аналітика, оцінка нерухомості',
        children: [
            { id: 're-portals-ua', name: 'Портали оголошень (Україна)', emoji: '📋' },
            { id: 're-newbuilds', name: 'Новобудови', emoji: '🏗️' },
            { id: 're-international', name: 'Міжнародні портали', emoji: '🌍' },
            { id: 're-analytics', name: 'Аналітика ринку', emoji: '📊' },
            { id: 're-calculators', name: 'Калькулятори та оцінка', emoji: '💰' },
            { id: 're-commercial', name: 'Комерційна нерухомість', emoji: '🏢' },
            { id: 're-resort', name: 'Курортна нерухомість', emoji: '🏖️' },
            { id: 're-suburban', name: 'Заміська нерухомість', emoji: '🏡' },
            { id: 're-photo-video', name: 'Фото та відеозйомка для нерухомості', emoji: '📸' },
            { id: 're-agencies', name: 'Агентства та мережі', emoji: '🏘️' }
        ]
    },
    {
        id: 'legal', name: 'Юридичні ресурси', emoji: '⚖️', color: '#5c940d', sub: 'Законодавство, реєстри, судова практика',
        children: [
            { id: 'legal-registries', name: 'Державні реєстри', emoji: '📜' },
            { id: 'legal-authorities', name: 'Офіційні органи', emoji: '🏛️' },
            { id: 'legal-counterparty', name: 'Перевірка контрагентів', emoji: '📑' },
            { id: 'legal-legislation', name: 'Законодавство', emoji: '📖' },
            { id: 'legal-court', name: 'Судова практика', emoji: '👨‍⚖️' },
            { id: 'legal-templates', name: 'Шаблони договорів', emoji: '📝' },
            { id: 'legal-ip', name: 'Інтелектуальна власність (патенти, ТМ)', emoji: '🔒' },
            { id: 'legal-international', name: 'Міжнародне право', emoji: '🌍' }
        ]
    },
    {
        id: 'finance', name: 'Фінанси', emoji: '💵', color: '#2b8a3e', sub: 'Банки, інвестиції, податки, бюджет',
        children: [
            { id: 'fin-banks', name: 'Банки', emoji: '🏦' },
            { id: 'fin-accounting', name: 'Бухгалтерія та ФОП', emoji: '📒' },
            { id: 'fin-exchange', name: 'Курси валют', emoji: '💱' },
            {
                id: 'fin-invest', name: 'Інвестиції', emoji: '📈',
                children: [
                    { id: 'fin-stocks', name: 'Акції та фондовий ринок', emoji: '📊' },
                    { id: 'fin-crypto', name: 'Криптовалюти', emoji: '🪙' },
                    { id: 'fin-re-invest', name: 'Нерухомість як інвестиція', emoji: '🏠' },
                    { id: 'fin-etf', name: 'ETF та фонди', emoji: '📦' },
                    { id: 'fin-alt-invest', name: 'Альтернативні інвестиції', emoji: '💎' }
                ]
            },
            { id: 'fin-payments', name: 'Платіжні системи', emoji: '💳' },
            { id: 'fin-taxes', name: 'Податки', emoji: '🧾' },
            { id: 'fin-insurance', name: 'Страхування', emoji: '🛡️' },
            { id: 'fin-personal', name: 'Особисті фінанси та бюджет', emoji: '💰' },
            { id: 'fin-credits', name: 'Кредити та іпотека', emoji: '🏧' }
        ]
    },
    {
        id: 'marketing', name: 'Маркетинг', emoji: '📈', color: '#e64980', sub: 'SMM, SEO, контент, реклама',
        children: [
            { id: 'mkt-social', name: 'Соціальні мережі', emoji: '📱' },
            { id: 'mkt-design', name: 'Дизайн та контент', emoji: '🎨' },
            { id: 'mkt-seo', name: 'SEO та аналітика', emoji: '📊' },
            { id: 'mkt-email', name: 'Email-маркетинг', emoji: '📧' },
            { id: 'mkt-websites', name: 'Створення сайтів', emoji: '🌐' },
            { id: 'mkt-chatbots', name: 'Чат-боти', emoji: '🤖' },
            { id: 'mkt-copy', name: 'Копірайтинг', emoji: '📝' },
            { id: 'mkt-video', name: 'Відеомаркетинг', emoji: '📹' },
            { id: 'mkt-podcast', name: 'Подкастинг', emoji: '🎙️' },
            { id: 'mkt-ppc', name: 'Контекстна реклама (PPC)', emoji: '📣' },
            { id: 'mkt-affiliate', name: 'Партнерський маркетинг (Affiliate)', emoji: '🤝' },
            { id: 'mkt-cro', name: 'CRO (оптимізація конверсії)', emoji: '📊' }
        ]
    },
    {
        id: 'productivity', name: 'Продуктивність', emoji: '🛠️', color: '#fd7e14', sub: 'Управління проєктами, інструменти, утиліти',
        children: [
            { id: 'prod-pm', name: 'Управління проєктами та CRM', emoji: '📋' },
            { id: 'prod-google', name: 'Google Workspace', emoji: '☁️' },
            { id: 'prod-comm', name: 'Комунікація (месенджери)', emoji: '💬' },
            { id: 'prod-cloud', name: 'Хмарне зберігання', emoji: '📁' },
            { id: 'prod-security', name: 'Безпека та паролі', emoji: '🔐' },
            { id: 'prod-notes', name: 'Нотатки та знання', emoji: '📝' },
            { id: 'prod-time', name: 'Тайм-менеджмент', emoji: '⏰' },
            { id: 'prod-calc', name: 'Калькулятори та конвертери', emoji: '🧮' },
            { id: 'prod-utils', name: 'Утиліти (PDF, архіви, конвертори)', emoji: '🖨️' }
        ]
    },
    {
        id: 'education', name: 'Навчання', emoji: '🎓', color: '#4263eb', sub: 'Курси, книги, наука, мови',
        children: [
            { id: 'edu-courses', name: 'Онлайн-курси', emoji: '📚' },
            { id: 'edu-languages', name: 'Іноземні мови', emoji: '🌍' },
            { id: 'edu-books', name: 'Книги та читання', emoji: '📖' },
            { id: 'edu-podcasts', name: 'Подкасти', emoji: '🎧' },
            { id: 'edu-universities', name: 'Університети та академії', emoji: '🏫' },
            { id: 'edu-kids', name: 'Дитяча освіта', emoji: '👶' },
            { id: 'edu-math', name: 'Математика', emoji: '📐' },
            {
                id: 'edu-science', name: 'Наука', emoji: '🔬',
                children: [
                    { id: 'sci-physics', name: 'Фізика', emoji: '⚛️' },
                    { id: 'sci-chemistry', name: 'Хімія', emoji: '🧪' },
                    { id: 'sci-biology', name: 'Біологія', emoji: '🧬' },
                    { id: 'sci-astronomy', name: 'Астрономія та космос', emoji: '🌌' },
                    { id: 'sci-geography', name: 'Географія та геологія', emoji: '🌍' },
                    { id: 'sci-psychology', name: 'Психологія', emoji: '🧠' },
                    { id: 'sci-medicine', name: 'Медицина', emoji: '🦠' }
                ]
            },
            { id: 'edu-history', name: 'Історія та філософія', emoji: '📜' },
            { id: 'edu-art-culture', name: 'Мистецтво та культура', emoji: '🎨' },
            { id: 'edu-certs', name: 'Сертифікації (IT, бізнес)', emoji: '📝' }
        ]
    },
    {
        id: 'creative', name: 'Творчість', emoji: '🎨', color: '#e64980', sub: 'Фото, відео, музика, мистецтво',
        children: [
            {
                id: 'cr-photo', name: 'Фотографія', emoji: '📸',
                children: [
                    { id: 'cr-photo-gear', name: 'Камери та обладнання', emoji: '📷' },
                    { id: 'cr-photo-edit', name: 'Обробка (Lightroom, Photoshop)', emoji: '🖼️' },
                    { id: 'cr-photo-stock', name: 'Стокові фотобанки', emoji: '📂' },
                    { id: 'cr-photo-inspo', name: 'Натхнення', emoji: '🏞️' }
                ]
            },
            {
                id: 'cr-video', name: 'Відеовиробництво', emoji: '🎬',
                children: [
                    { id: 'cr-video-gear', name: 'Камери та техніка', emoji: '🎥' },
                    { id: 'cr-video-edit', name: 'Монтаж (Premiere, DaVinci, Final Cut)', emoji: '✂️' },
                    { id: 'cr-vfx', name: 'VFX та Motion Design', emoji: '🎭' },
                    { id: 'cr-youtube-tools', name: 'YouTube-інструменти', emoji: '📺' }
                ]
            },
            {
                id: 'cr-music', name: 'Музика', emoji: '🎵',
                children: [
                    { id: 'cr-music-instruments', name: 'Інструменти', emoji: '🎹' },
                    { id: 'cr-music-daw', name: 'Запис та зведення (DAW)', emoji: '🎚️' },
                    { id: 'cr-music-sheets', name: 'Ноти та табулатури', emoji: '🎼' },
                    { id: 'cr-music-vocal', name: 'Вокал', emoji: '🎤' },
                    { id: 'cr-music-sfx', name: 'Бібліотеки звуків', emoji: '🔊' }
                ]
            },
            {
                id: 'cr-writing', name: 'Письменництво та блогінг', emoji: '✍️',
                children: [
                    { id: 'cr-writing-tools', name: 'Інструменти для письма', emoji: '📝' },
                    { id: 'cr-blog-platforms', name: 'Блог-платформи', emoji: '📰' },
                    { id: 'cr-selfpublish', name: 'Самвидав', emoji: '📚' }
                ]
            },
            {
                id: 'cr-art', name: 'Образотворче мистецтво', emoji: '🎨',
                children: [
                    { id: 'cr-art-traditional', name: 'Малювання (традиційне)', emoji: '✏️' },
                    { id: 'cr-art-digital', name: 'Діджитал-арт (Procreate, Krita)', emoji: '🖥️' },
                    { id: 'cr-art-sculpture', name: 'Скульптура та кераміка', emoji: '🏺' },
                    { id: 'cr-art-crafts', name: 'Рукоділля (в\'язання, вишивка, макраме)', emoji: '🧶' }
                ]
            },
            { id: 'cr-theater', name: 'Театр та кіно', emoji: '🎭' },
            { id: 'cr-calligraphy', name: 'Каліграфія та леттерінг', emoji: '🖋️' }
        ]
    },
    {
        id: 'plants', name: 'Рослини та садівництво', emoji: '🌱', color: '#2b8a3e', sub: 'Кімнатні рослини, сад, город',
        children: [
            {
                id: 'pl-indoor', name: 'Кімнатні рослини', emoji: '🏡',
                children: [
                    { id: 'pl-tropical', name: 'Тропічні рослини', emoji: '🌿' },
                    { id: 'pl-cacti', name: 'Кактуси та сукуленти', emoji: '🌵' },
                    { id: 'pl-flowering', name: 'Квітучі рослини', emoji: '🌸' },
                    { id: 'pl-watering', name: 'Полив та догляд', emoji: '💧' },
                    { id: 'pl-pests', name: 'Хвороби та шкідники', emoji: '🐛' }
                ]
            },
            {
                id: 'pl-garden', name: 'Сад та город', emoji: '🌳',
                children: [
                    { id: 'pl-vegetables', name: 'Овочі', emoji: '🥕' },
                    { id: 'pl-berries', name: 'Ягоди та фрукти', emoji: '🍓' },
                    { id: 'pl-flowers', name: 'Квіти та клумби', emoji: '🌻' },
                    { id: 'pl-trees', name: 'Дерева та кущі', emoji: '🌲' },
                    { id: 'pl-seedlings', name: 'Розсада та насіння', emoji: '🧅' },
                    { id: 'pl-tools', name: 'Садовий інструмент', emoji: '🛠️' }
                ]
            },
            { id: 'pl-hydro', name: 'Гідропоніка та аквапоніка', emoji: '🧪' },
            { id: 'pl-mushrooms', name: 'Грибівництво', emoji: '🍄' },
            { id: 'pl-compost', name: 'Компостування та ґрунт', emoji: '🌾' },
            { id: 'pl-landscape', name: 'Ландшафтний дизайн', emoji: '🏞️' },
            { id: 'pl-bees', name: 'Бджільництво', emoji: '🐝' },
            { id: 'pl-shops', name: 'Інтернет-магазини рослин та насіння', emoji: '🛒' }
        ]
    },
    {
        id: 'cooking', name: 'Кулінарія', emoji: '🍳', color: '#e03131', sub: 'Рецепти, кухні світу, напої',
        children: [
            { id: 'cook-general', name: 'Рецепти (загальні)', emoji: '📖' },
            { id: 'cook-ukrainian', name: 'Українська кухня', emoji: '🇺🇦' },
            { id: 'cook-italian', name: 'Італійська кухня', emoji: '🇮🇹' },
            { id: 'cook-asian', name: 'Азійська кухня', emoji: '🇯🇵' },
            { id: 'cook-healthy', name: 'Здорове харчування', emoji: '🥗' },
            { id: 'cook-vegan', name: 'Вегетаріанське / веганське', emoji: '🌱' },
            { id: 'cook-desserts', name: 'Десерти та випічка', emoji: '🍰' },
            { id: 'cook-drinks', name: 'Напої (кава, чай, вино, коктейлі)', emoji: '🍷' },
            { id: 'cook-bbq', name: 'Гриль та BBQ', emoji: '🥩' },
            { id: 'cook-spices', name: 'Спеції та приправи', emoji: '🧂' },
            { id: 'cook-youtube', name: 'Кулінарні YouTube-канали', emoji: '📹' },
            { id: 'cook-apps', name: 'Додатки з рецептами', emoji: '📲' },
            { id: 'cook-delivery', name: 'Доставка продуктів', emoji: '🛒' }
        ]
    },
    {
        id: 'health', name: "Здоров'я", emoji: '🏥', color: '#e03131', sub: 'Фітнес, медицина, ментальне здоров\'я',
        children: [
            {
                id: 'health-fitness', name: 'Фітнес та спорт', emoji: '🏋️',
                children: [
                    { id: 'fitness-programs', name: 'Тренування (програми)', emoji: '💪' },
                    { id: 'fitness-running', name: 'Біг', emoji: '🏃' },
                    { id: 'fitness-cycling', name: 'Велоспорт', emoji: '🚴' },
                    { id: 'fitness-swimming', name: 'Плавання', emoji: '🏊' },
                    { id: 'fitness-yoga', name: 'Йога та пілатес', emoji: '🧘' },
                    { id: 'fitness-martial', name: 'Єдиноборства', emoji: '🥊' },
                    { id: 'fitness-winter', name: 'Зимові види спорту', emoji: '⛷️' },
                    { id: 'fitness-tennis', name: 'Теніс / падел', emoji: '🎾' },
                    { id: 'fitness-team', name: 'Командні види спорту', emoji: '⚽' },
                    { id: 'fitness-golf', name: 'Гольф', emoji: '🏌️' }
                ]
            },
            { id: 'health-nutrition', name: 'Нутріціологія та дієтологія', emoji: '🥗' },
            {
                id: 'health-mental', name: 'Ментальне здоров\'я', emoji: '🧠',
                children: [
                    { id: 'mental-meditation', name: 'Медитація (Headspace, Calm)', emoji: '🧘' },
                    { id: 'mental-journaling', name: 'Журналінг', emoji: '📓' },
                    { id: 'mental-therapy', name: 'Психотерапія', emoji: '💆' },
                    { id: 'mental-sleep', name: 'Сон', emoji: '😴' }
                ]
            },
            {
                id: 'health-medicine', name: 'Медицина', emoji: '🏥',
                children: [
                    { id: 'med-doctors', name: 'Запис до лікаря', emoji: '👨‍⚕️' },
                    { id: 'med-pharmacy', name: 'Ліки та аптеки', emoji: '💊' },
                    { id: 'med-dental', name: 'Стоматологія', emoji: '🦷' },
                    { id: 'med-eye', name: 'Офтальмологія', emoji: '👁️' },
                    { id: 'med-tele', name: 'Телемедицина', emoji: '🩺' },
                    { id: 'med-genetics', name: 'Генетичні тести', emoji: '🧬' }
                ]
            },
            { id: 'health-firstaid', name: 'Перша допомога', emoji: '💉' },
            { id: 'health-bodycare', name: 'Догляд за тілом (шкіра, волосся)', emoji: '🧴' }
        ]
    },
    {
        id: 'transport', name: 'Транспорт та авто', emoji: '🚗', color: '#495057', sub: 'Авто, мото, вело, електромобілі',
        children: [
            {
                id: 'tr-car-buy', name: 'Вибір та купівля авто', emoji: '🚙',
                children: [
                    { id: 'tr-car-market', name: 'Автомобільні маркетплейси (AUTO.RIA)', emoji: '🛒' },
                    { id: 'tr-car-check', name: 'Перевірка авто (VIN, історія)', emoji: '📊' },
                    { id: 'tr-car-credit', name: 'Кредит / лізинг', emoji: '💰' },
                    { id: 'tr-car-insurance', name: 'Страхування (ОСАГО, КАСКО)', emoji: '📝' }
                ]
            },
            {
                id: 'tr-maintenance', name: 'Обслуговування та ремонт', emoji: '🔧',
                children: [
                    { id: 'tr-oils', name: 'Масла та рідини', emoji: '🛢️' },
                    { id: 'tr-parts', name: 'Запчастини', emoji: '🔩' },
                    { id: 'tr-diagnostics', name: 'Діагностика', emoji: '🧰' },
                    { id: 'tr-tires', name: 'Шини та диски', emoji: '🛞' }
                ]
            },
            {
                id: 'tr-ev', name: 'Електромобілі', emoji: '⚡',
                children: [
                    { id: 'tr-ev-charging', name: 'Зарядні станції', emoji: '🔌' },
                    { id: 'tr-ev-batteries', name: 'Батареї', emoji: '🔋' },
                    { id: 'tr-ev-models', name: 'Моделі (Tesla, BYD)', emoji: '🚗' }
                ]
            },
            { id: 'tr-moto', name: 'Мотоцикли', emoji: '🏍️' },
            {
                id: 'tr-bikes', name: 'Велосипеди', emoji: '🚲',
                children: [
                    { id: 'tr-bikes-mtb', name: 'MTB', emoji: '🚵' },
                    { id: 'tr-bikes-road', name: 'Шосейні', emoji: '🚴' },
                    { id: 'tr-bikes-ebike', name: 'Електровелосипеди', emoji: '⚡' },
                    { id: 'tr-bikes-parts', name: 'Запчастини та ремонт', emoji: '🔧' }
                ]
            },
            { id: 'tr-scooters', name: 'Електросамокати', emoji: '🛴' },
            { id: 'tr-taxi', name: 'Таксі та каршерінг', emoji: '🚕' },
            { id: 'tr-railway', name: 'Залізничний транспорт', emoji: '🚂' },
            {
                id: 'tr-aviation', name: 'Авіація', emoji: '✈️',
                children: [
                    { id: 'tr-flights', name: 'Авіаквитки', emoji: '✈️' },
                    { id: 'tr-light-aviation', name: 'Мала авіація', emoji: '🛩️' },
                    { id: 'tr-drones-avia', name: 'Дрони (БПЛА)', emoji: '🚁' }
                ]
            },
            { id: 'tr-water', name: 'Водний транспорт', emoji: '🚤' }
        ]
    },
    {
        id: 'home', name: 'Дім та побут', emoji: '🏡', color: '#f76707', sub: 'Будівництво, ремонт, інтер\'єр',
        children: [
            {
                id: 'home-build', name: 'Будівництво', emoji: '🏗️',
                children: [
                    { id: 'home-design-proj', name: 'Проєктування', emoji: '📐' },
                    { id: 'home-build-materials', name: 'Матеріали', emoji: '🧱' },
                    { id: 'home-frame', name: 'Каркасні будинки', emoji: '🏠' },
                    { id: 'home-wood', name: "Дерев'яні будинки", emoji: '🪵' },
                    { id: 'home-energy', name: 'Енергоефективність', emoji: '🧪' }
                ]
            },
            {
                id: 'home-repair', name: 'Ремонт', emoji: '🔨',
                children: [
                    { id: 'home-paint', name: 'Фарби та покриття', emoji: '🎨' },
                    { id: 'home-windows', name: 'Вікна та двері', emoji: '🪟' },
                    { id: 'home-plumbing', name: 'Сантехніка', emoji: '🚿' },
                    { id: 'home-electric', name: 'Електрика', emoji: '⚡' },
                    { id: 'home-hvac', name: 'Опалення та вентиляція', emoji: '🌡️' },
                    { id: 'home-drywall', name: 'Гіпсокартон та штукатурка', emoji: '🏗️' },
                    { id: 'home-flooring', name: 'Підлогові покриття', emoji: '🪨' }
                ]
            },
            {
                id: 'home-interior', name: 'Інтер\'єрний дизайн', emoji: '🛋️',
                children: [
                    { id: 'home-int-styles', name: 'Стилі інтер\'єру', emoji: '🎨' },
                    { id: 'home-furniture', name: 'Меблі', emoji: '🛏️' },
                    { id: 'home-int-lighting', name: 'Освітлення', emoji: '💡' },
                    { id: 'home-decor', name: 'Декор', emoji: '🖼️' },
                    { id: 'home-3d-planners', name: '3D-планувальники', emoji: '📐' }
                ]
            },
            { id: 'home-cleaning', name: 'Прибирання та організація', emoji: '🧹' },
            { id: 'home-shops', name: 'Магазини будматеріалів', emoji: '🛒' },
            { id: 'home-utilities', name: 'Комунальні послуги', emoji: '🏠' },
            { id: 'home-climate', name: 'Кліматичне обладнання', emoji: '🌡️' }
        ]
    },
    {
        id: 'family', name: "Сім'я та діти", emoji: '👨‍👩‍👧‍👦', color: '#f06595', sub: 'Діти, домашні тварини, сімейні події',
        children: [
            { id: 'fam-pregnancy', name: 'Вагітність та пологи', emoji: '🤰' },
            { id: 'fam-baby', name: 'Немовлята (0–1 рік)', emoji: '👶' },
            { id: 'fam-toddler', name: 'Раннє дитинство (1–6 років)', emoji: '🧒' },
            {
                id: 'fam-edu', name: 'Освіта дітей', emoji: '📚',
                children: [
                    { id: 'fam-schools', name: 'Школи', emoji: '🏫' },
                    { id: 'fam-clubs', name: 'Гуртки та секції', emoji: '🎨' },
                    { id: 'fam-edu-apps', name: 'Освітні додатки', emoji: '📱' },
                    { id: 'fam-toys', name: 'Розвивальні іграшки', emoji: '🧩' }
                ]
            },
            { id: 'fam-parenting', name: 'Виховання (підліткові питання)', emoji: '👨‍👩‍👧' },
            { id: 'fam-events', name: 'Свята та розваги для дітей', emoji: '🎂' },
            {
                id: 'fam-pets', name: 'Домашні тварини', emoji: '🐕',
                children: [
                    { id: 'fam-dogs', name: 'Собаки', emoji: '🐶' },
                    { id: 'fam-cats', name: 'Коти', emoji: '🐱' },
                    { id: 'fam-aquarium', name: 'Акваріумістика', emoji: '🐠' },
                    { id: 'fam-birds', name: 'Птахи', emoji: '🦜' },
                    { id: 'fam-rodents', name: 'Гризуни', emoji: '🐹' },
                    { id: 'fam-vet', name: 'Ветеринарія', emoji: '🏥' }
                ]
            },
            { id: 'fam-wedding', name: 'Весілля та події', emoji: '💍' },
            { id: 'fam-elderly', name: 'Догляд за літніми людьми', emoji: '👴' }
        ]
    },
    {
        id: 'travel', name: 'Подорожі', emoji: '✈️', color: '#1098ad', sub: 'Квитки, готелі, путівники',
        children: [
            { id: 'trav-flights', name: 'Авіаквитки', emoji: '✈️' },
            { id: 'trav-hotels', name: 'Готелі та житло', emoji: '🏨' },
            { id: 'trav-car-rent', name: 'Оренда авто', emoji: '🚗' },
            { id: 'trav-visa', name: 'Візи та документи', emoji: '📋' },
            {
                id: 'trav-guides', name: 'Путівники (по країнах)', emoji: '🗺️',
                children: [
                    { id: 'trav-europe', name: 'Європа', emoji: '🇪🇺' },
                    { id: 'trav-america', name: 'Америка', emoji: '🇺🇸' },
                    { id: 'trav-asia', name: 'Азія', emoji: '🇹🇭' },
                    { id: 'trav-africa', name: 'Африка', emoji: '🇪🇬' },
                    { id: 'trav-oceania', name: 'Океанія', emoji: '🇦🇺' }
                ]
            },
            { id: 'trav-packing', name: 'Пакувальні списки', emoji: '🧳' },
            { id: 'trav-camping', name: 'Кемпінг та хайкінг', emoji: '🏕️' },
            { id: 'trav-beach', name: 'Пляжний відпочинок', emoji: '🏖️' },
            { id: 'trav-ski', name: 'Гірськолижний відпочинок', emoji: '🏔️' },
            { id: 'trav-extreme', name: 'Екстремальний туризм', emoji: '🧭' },
            { id: 'trav-insurance', name: 'Туристична страховка', emoji: '🛡️' },
            { id: 'trav-blogs', name: 'Travel-блоги та влоги', emoji: '📷' }
        ]
    },
    {
        id: 'news', name: 'Новини та медіа', emoji: '📰', color: '#ae3ec9', sub: 'ЗМІ, технологічні медіа, RSS',
        children: [
            { id: 'news-ua', name: 'Українські ЗМІ', emoji: '🇺🇦' },
            { id: 'news-world', name: 'Міжнародні ЗМІ', emoji: '🌍' },
            { id: 'news-realestate', name: 'Нерухомість — медіа', emoji: '🏠' },
            { id: 'news-tech', name: 'Технологічні медіа', emoji: '💻' },
            { id: 'news-finance', name: 'Фінансові медіа', emoji: '💰' },
            { id: 'news-science', name: 'Наукові медіа', emoji: '🔬' },
            { id: 'news-sports', name: 'Спортивні медіа', emoji: '⚽' },
            { id: 'news-rss', name: 'RSS та агрегатори', emoji: '📡' }
        ]
    },
    {
        id: 'maps', name: 'Карти та геодані', emoji: '🗺️', color: '#0ca678', sub: 'Онлайн-карти, кадастр, погода',
        children: [
            { id: 'maps-online', name: 'Онлайн-карти', emoji: '🗺️' },
            { id: 'maps-satellite', name: 'Супутникові знімки', emoji: '🛰️' },
            { id: 'maps-cadastral', name: 'Кадастрові карти', emoji: '📍' },
            { id: 'maps-weather', name: 'Погодні карти', emoji: '🌤️' },
            { id: 'maps-transport', name: 'Транспортні карти', emoji: '🚦' },
            { id: 'maps-demographic', name: 'Демографічні карти', emoji: '📊' }
        ]
    },
    {
        id: 'career', name: "Кар'єра та бізнес", emoji: '👔', color: '#4263eb', sub: 'Робота, фриланс, підприємництво',
        children: [
            {
                id: 'car-jobs', name: 'Пошук роботи', emoji: '💼',
                children: [
                    { id: 'car-job-portals', name: 'Портали вакансій (Work.ua, Robota.ua, DOU)', emoji: '📋' },
                    { id: 'car-resume', name: 'Резюме та CV', emoji: '📄' },
                    { id: 'car-interviews', name: 'Підготовка до співбесід', emoji: '🎤' },
                    { id: 'car-salary', name: 'Зарплатні калькулятори', emoji: '💰' }
                ]
            },
            {
                id: 'car-freelance', name: 'Фриланс', emoji: '🧑‍💻',
                children: [
                    { id: 'car-fl-platforms', name: 'Платформи (Upwork, Fiverr, Freelancer)', emoji: '🌍' },
                    { id: 'car-fl-ua', name: 'Українські платформи (Freelancehunt)', emoji: '🇺🇦' },
                    { id: 'car-fl-contracts', name: 'Контракти та оплата', emoji: '📝' },
                    { id: 'car-fl-portfolio', name: 'Портфоліо', emoji: '💡' }
                ]
            },
            {
                id: 'car-startup', name: 'Підприємництво', emoji: '🚀',
                children: [
                    { id: 'car-biz-ideas', name: 'Бізнес-ідеї', emoji: '💡' },
                    { id: 'car-biz-plans', name: 'Бізнес-плани', emoji: '📝' },
                    { id: 'car-biz-register', name: 'Реєстрація бізнесу', emoji: '🏢' },
                    { id: 'car-biz-invest', name: 'Інвестиції та гранти', emoji: '💰' },
                    { id: 'car-biz-startups', name: 'Стартапи', emoji: '📊' },
                    { id: 'car-biz-network', name: 'Нетворкінг', emoji: '🤝' }
                ]
            },
            {
                id: 'car-management', name: 'Управління бізнесом', emoji: '📊',
                children: [
                    { id: 'car-strategy', name: 'Стратегія', emoji: '📈' },
                    { id: 'car-hr', name: 'HR та рекрутинг', emoji: '👥' },
                    { id: 'car-logistics', name: 'Логістика', emoji: '📦' },
                    { id: 'car-manufacturing', name: 'Виробництво', emoji: '🏭' }
                ]
            },
            {
                id: 'car-ecommerce', name: 'E-commerce', emoji: '🛒',
                children: [
                    { id: 'car-marketplaces', name: 'Маркетплейси (Etsy, Amazon)', emoji: '🏪' },
                    { id: 'car-shopify', name: 'Shopify / WooCommerce', emoji: '🛍️' },
                    { id: 'car-dropship', name: 'Дропшипінг', emoji: '📦' },
                    { id: 'car-sales-analytics', name: 'Аналітика продажів', emoji: '📊' }
                ]
            },
            { id: 'car-certs', name: 'Сертифікації та ліцензії', emoji: '📜' }
        ]
    },
    {
        id: 'sport', name: 'Спорт', emoji: '⚽', color: '#f03e3e', sub: 'Футбол, теніс, шахи, трансляції',
        children: [
            { id: 'sport-football', name: 'Футбол', emoji: '⚽' },
            { id: 'sport-basketball', name: 'Баскетбол', emoji: '🏀' },
            { id: 'sport-tennis', name: 'Теніс', emoji: '🎾' },
            { id: 'sport-martial', name: 'Бойові мистецтва', emoji: '🥊' },
            { id: 'sport-chess', name: 'Шахи', emoji: '♟️' },
            { id: 'sport-billiards', name: 'Більярд', emoji: '🎱' },
            { id: 'sport-shooting', name: 'Стрільба', emoji: '🎯' },
            { id: 'sport-golf', name: 'Гольф', emoji: '🏌️' },
            { id: 'sport-horse', name: 'Кінний спорт', emoji: '🏇' },
            { id: 'sport-surf', name: 'Серфінг та водні види', emoji: '🏄' },
            { id: 'sport-climbing', name: 'Скелелазіння', emoji: '🧗' },
            { id: 'sport-crossfit', name: 'Важка атлетика / Crossfit', emoji: '🏋️' },
            { id: 'sport-stats', name: 'Спортивна статистика', emoji: '📊' },
            { id: 'sport-streams', name: 'Спортивні трансляції', emoji: '📺' }
        ]
    },
    {
        id: 'games', name: 'Ігри та розваги', emoji: '🎮', color: '#f03e3e', sub: 'Відеоігри, настільні ігри, фільми',
        children: [
            { id: 'games-pc', name: 'Відеоігри (PC, Console)', emoji: '🎮' },
            { id: 'games-mobile', name: 'Мобільні ігри', emoji: '📱' },
            { id: 'games-board', name: 'Настільні ігри', emoji: '🎲' },
            { id: 'games-puzzles', name: 'Головоломки та пазли', emoji: '🧩' },
            { id: 'games-casual', name: 'Казуальні ігри', emoji: '🎰' },
            { id: 'games-movies', name: 'Фільми та серіали', emoji: '🎬' },
            { id: 'games-comics', name: 'Комікси та манга', emoji: '📚' },
            { id: 'games-theater', name: 'Театр та мистецтво', emoji: '🎭' },
            { id: 'games-festivals', name: 'Фестивалі та події', emoji: '🎪' }
        ]
    },
    {
        id: 'selfdev', name: 'Саморозвиток', emoji: '🧘', color: '#7950f2', sub: 'Продуктивність, лідерство, звички',
        children: [
            { id: 'self-personal', name: 'Особистий розвиток', emoji: '📖' },
            { id: 'self-productivity', name: 'Продуктивність та звички', emoji: '🧠' },
            { id: 'self-speaking', name: 'Ораторське мистецтво', emoji: '💬' },
            { id: 'self-leadership', name: 'Лідерство та менеджмент', emoji: '🤝' },
            { id: 'self-creativity', name: 'Креативне мислення', emoji: '💡' },
            { id: 'self-journal', name: 'Ведення щоденника', emoji: '📓' },
            { id: 'self-goals', name: 'Цілепокладання (OKR, GTD)', emoji: '🎯' },
            { id: 'self-spiritual', name: 'Духовні практики', emoji: '🧘' }
        ]
    },
    {
        id: 'ecology', name: 'Екологія та сталий розвиток', emoji: '🌍', color: '#2b8a3e', sub: 'Переробка, енергія, клімат',
        children: [
            { id: 'eco-recycling', name: 'Переробка та zero waste', emoji: '♻️' },
            { id: 'eco-solar', name: 'Сонячна енергетика', emoji: '☀️' },
            { id: 'eco-wind', name: 'Вітрова енергетика', emoji: '💨' },
            { id: 'eco-batteries', name: 'Акумулятори та зберігання енергії', emoji: '🔋' },
            { id: 'eco-water', name: 'Водні ресурси', emoji: '🚰' },
            { id: 'eco-forests', name: 'Ліси та біорізноманіття', emoji: '🌳' },
            { id: 'eco-climate', name: 'Зміна клімату', emoji: '🌡️' },
            { id: 'eco-house', name: 'Енергоефективний будинок', emoji: '🏠' }
        ]
    },
    {
        id: 'gov-ua', name: 'Державні послуги (Україна)', emoji: '🇺🇦', color: '#1971c2', sub: 'Дія, документи, реєстрації',
        children: [
            { id: 'gov-diia', name: 'Дія', emoji: '📱' },
            { id: 'gov-docs', name: 'Документи (паспорт, ІПН, РНОКПП)', emoji: '📋' },
            { id: 'gov-ministries', name: 'Міністерства та відомства', emoji: '🏛️' },
            { id: 'gov-health', name: 'Медичні послуги (eHealth)', emoji: '🏥' },
            { id: 'gov-education', name: 'Освітні послуги', emoji: '📚' },
            { id: 'gov-military', name: 'Військовий облік', emoji: '🪖' },
            { id: 'gov-realestate', name: 'Реєстрація нерухомості', emoji: '🏠' },
            { id: 'gov-auto', name: 'Реєстрація авто', emoji: '🚗' },
            { id: 'gov-taxes', name: 'Податки', emoji: '🧾' },
            { id: 'gov-social', name: 'Соціальні послуги та виплати', emoji: '👶' }
        ]
    },
    {
        id: 'shopping', name: 'Шопінг', emoji: '🛒', color: '#e8590c', sub: 'Маркетплейси, одяг, техніка, доставка',
        children: [
            { id: 'shop-general', name: 'Маркетплейси (загальні)', emoji: '🛍️' },
            { id: 'shop-clothes', name: 'Одяг та взуття', emoji: '👗' },
            { id: 'shop-electronics', name: 'Електроніка та техніка', emoji: '💻' },
            { id: 'shop-home', name: 'Товари для дому', emoji: '🏠' },
            { id: 'shop-kids', name: 'Дитячі товари', emoji: '🧸' },
            { id: 'shop-beauty', name: 'Косметика та парфумерія', emoji: '💄' },
            { id: 'shop-pharmacy', name: 'Аптеки', emoji: '💊' },
            { id: 'shop-delivery', name: 'Пошта та доставка (Нова Пошта, Укрпошта)', emoji: '📦' },
            { id: 'shop-gifts', name: 'Подарунки', emoji: '🎁' },
            { id: 'shop-cashback', name: 'Кешбек та купони', emoji: '🔖' },
            { id: 'shop-compare', name: 'Порівняння цін', emoji: '🛒' }
        ]
    },
    {
        id: 'animals', name: 'Тварини', emoji: '🐕', color: '#e67700', sub: 'Домашні тварини, ветеринарія, притулки',
        children: [
            { id: 'anim-dogs', name: 'Собаки', emoji: '🐶' },
            { id: 'anim-cats', name: 'Коти', emoji: '🐱' },
            { id: 'anim-aquarium', name: 'Акваріумістика', emoji: '🐠' },
            { id: 'anim-birds', name: 'Птахи', emoji: '🦜' },
            { id: 'anim-reptiles', name: 'Рептилії', emoji: '🐍' },
            { id: 'anim-horses', name: 'Коні', emoji: '🐴' },
            { id: 'anim-bees', name: 'Бджоли', emoji: '🐝' },
            { id: 'anim-vet', name: 'Ветеринарія', emoji: '🏥' },
            { id: 'anim-food', name: 'Корми та товари', emoji: '🍖' },
            { id: 'anim-shelters', name: 'Притулки та волонтерство', emoji: '🐾' }
        ]
    },
    {
        id: 'quickaccess', name: 'Швидкий доступ', emoji: '📌', color: '#4263eb', sub: 'Пошта, календар, месенджери',
        children: [
            { id: 'qa-email', name: 'Пошта', emoji: '📧' },
            { id: 'qa-calendar', name: 'Календар', emoji: '📅' },
            { id: 'qa-messengers', name: 'Месенджери', emoji: '💬' },
            { id: 'qa-ai', name: 'ШІ-асистенти', emoji: '🤖' },
            { id: 'qa-files', name: 'Файли', emoji: '📁' },
            { id: 'qa-notes', name: 'Нотатки', emoji: '📝' },
            { id: 'qa-search', name: 'Пошук', emoji: '🔍' }
        ]
    },
    {
        id: 'archive', name: 'Архів та тимчасове', emoji: '🗄️', color: '#868e96', sub: 'Переглянути пізніше, архів проєктів',
        children: [
            { id: 'arch-later', name: 'Переглянути пізніше', emoji: '📂' },
            { id: 'arch-projects', name: 'Архів проєктів', emoji: '📦' },
            { id: 'arch-delete', name: 'На видалення', emoji: '🗑️' }
        ]
    },
    { id: 'free', name: 'Сайти, які неймовірно що безкоштовні', emoji: '🤯', color: '#f9a825', sub: 'Ці ресурси настільки потужні, що дивно, чому вони досі безкоштовні' }
];

/* ============================================
   FLATTEN helpers
   ============================================ */
function flattenCats(nodes, parent, depth) {
    let result = [];
    (nodes || []).forEach(node => {
        result.push({
            id: node.id,
            name: node.name,
            emoji: node.emoji,
            color: node.color || (parent ? parent.color : '#868e96'),
            sub: node.sub || '',
            parent: parent ? parent.id : null,
            depth: depth,
            hasChildren: !!(node.children && node.children.length)
        });
        if (node.children) {
            result = result.concat(flattenCats(node.children, node, depth + 1));
        }
    });
    return result;
}

const CATS = flattenCats(CAT_TREE, null, 0);

function getCatChildren(parentId) {
    return CATS.filter(c => c.parent === parentId);
}

function getCatDescendantIds(parentId) {
    const ids = [parentId];
    const children = CATS.filter(c => c.parent === parentId);
    children.forEach(ch => {
        ids.push(...getCatDescendantIds(ch.id));
    });
    return ids;
}

function isLeafCat(catId) {
    return !CATS.some(c => c.parent === catId);
}

function getCatById(catId) {
    return CATS.find(c => c.id === catId);
}

function getCatPath(catId) {
    const parts = [];
    let cur = getCatById(catId);
    while (cur) {
        parts.unshift(cur);
        cur = cur.parent ? getCatById(cur.parent) : null;
    }
    return parts;
}
