import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const newsItems = [
    {
      id: 1,
      date: '15 октября 2025',
      title: 'Профилактическое мероприятие "Безопасная дорога"',
      description: 'В период с 20 по 25 октября будет проведено профилактическое мероприятие, направленное на снижение аварийности.',
    },
    {
      id: 2,
      date: '12 октября 2025',
      title: 'Совещание руководящего состава',
      description: 'Состоялось ежемесячное совещание по итогам работы за сентябрь 2025 года.',
    },
    {
      id: 3,
      date: '8 октября 2025',
      title: 'Награждение лучших сотрудников',
      description: 'За образцовое выполнение служебных обязанностей награждены 5 сотрудников подразделения.',
    },
  ];

  const leadershipItems = [
    {
      name: 'Иванов Иван Иванович',
      position: 'Начальник ГИБДД',
      rank: 'Полковник полиции',
    },
    {
      name: 'Петров Петр Петрович',
      position: 'Заместитель начальника',
      rank: 'Подполковник полиции',
    },
    {
      name: 'Сидоров Сидор Сидорович',
      position: 'Начальник штаба',
      rank: 'Подполковник полиции',
    },
  ];

  const departments = [
    {
      id: 'cpp',
      name: 'ЦПП',
      fullName: 'Центр пропаганды БДД',
      icon: 'Users',
      info: 'Информация для сотрудников Центра пропаганды безопасности дорожного движения',
    },
    {
      id: 'ob',
      name: 'ОБ',
      fullName: 'Отдел безопасности',
      icon: 'Shield',
      info: 'Информация для сотрудников Отдела безопасности дорожного движения',
    },
    {
      id: 'sr',
      name: 'СР',
      fullName: 'Служба розыска',
      icon: 'Search',
      info: 'Информация для сотрудников Службы розыска транспортных средств',
    },
    {
      id: 'rs',
      name: 'РС',
      fullName: 'Регистрационная служба',
      icon: 'FileText',
      info: 'Информация для сотрудников Регистрационной службы',
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-primary via-primary/90 to-accent p-8 rounded-lg text-white">
              <div className="flex items-center gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Coat_of_Arms_of_the_Russian_Federation.svg/800px-Coat_of_Arms_of_the_Russian_Federation.svg.png"
                    alt="Герб России"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">ГИБДД Республики Провинция #7 Сервер</h1>
                  <p className="text-lg opacity-90">Официальный портал подразделения</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {departments.map((dept) => (
                <Card 
                  key={dept.id}
                  className="hover:shadow-lg transition-shadow cursor-pointer border-primary/20"
                  onClick={() => setActiveSection(dept.id)}
                >
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-primary/10 p-2 rounded">
                        <Icon name={dept.icon} className="text-primary" size={24} />
                      </div>
                      <Badge variant="outline" className="border-primary text-primary">{dept.name}</Badge>
                    </div>
                    <CardTitle className="text-lg">{dept.fullName}</CardTitle>
                    <CardDescription className="text-sm">{dept.info}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Icon name="Newspaper" className="text-primary" size={28} />
                  <CardTitle className="text-2xl">Новости</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsItems.map((news, index) => (
                  <div key={news.id}>
                    {index > 0 && <Separator className="my-4" />}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{news.date}</Badge>
                      </div>
                      <h3 className="font-bold text-lg">{news.title}</h3>
                      <p className="text-muted-foreground">{news.description}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        );

      case 'leadership':
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="UserCircle" className="text-primary" size={28} />
                <CardTitle className="text-2xl">Руководство</CardTitle>
              </div>
              <CardDescription>Руководящий состав подразделения ГИБДД</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {leadershipItems.map((leader, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Icon name="User" className="text-primary" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{leader.name}</h3>
                      <p className="text-muted-foreground">{leader.position}</p>
                      <Badge variant="outline" className="mt-2">{leader.rank}</Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 'news':
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Newspaper" className="text-primary" size={28} />
                <CardTitle className="text-2xl">Новости</CardTitle>
              </div>
              <CardDescription>Актуальные новости подразделения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {newsItems.map((news, index) => (
                <div key={news.id}>
                  {index > 0 && <Separator className="my-6" />}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{news.date}</Badge>
                    </div>
                    <h3 className="font-bold text-xl">{news.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{news.description}</p>
                    <Button variant="link" className="p-0 h-auto text-primary">
                      Читать полностью →
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      case 'cpp':
      case 'ob':
      case 'sr':
      case 'rs':
        const dept = departments.find(d => d.id === activeSection);
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-3 rounded">
                  <Icon name={dept?.icon || 'Info'} className="text-primary" size={28} />
                </div>
                <div>
                  <CardTitle className="text-2xl">{dept?.fullName}</CardTitle>
                  <CardDescription>Информация для сотрудников</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Служебная информация</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" size={18} />
                    Регламенты и инструкции
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" size={18} />
                    Формы отчетности
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" size={18} />
                    Графики дежурств
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon name="CheckCircle2" className="text-primary" size={18} />
                    Методические материалы
                  </li>
                </ul>
              </div>

              <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/30">
                <h3 className="font-bold text-lg mb-3 text-secondary">Важно</h3>
                <p className="text-muted-foreground">
                  Вся служебная информация предназначена только для сотрудников подразделения. 
                  Распространение материалов третьим лицам запрещено.
                </p>
              </div>
            </CardContent>
          </Card>
        );

      case 'contacts':
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="Phone" className="text-primary" size={28} />
                <CardTitle className="text-2xl">Контакты</CardTitle>
              </div>
              <CardDescription>Контактная информация подразделения</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="MapPin" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-bold mb-1">Адрес</p>
                      <p className="text-muted-foreground">г. Провинция, ул. Центральная, д. 7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Phone" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-bold mb-1">Телефон</p>
                      <p className="text-muted-foreground">+7 (XXX) XXX-XX-XX</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Icon name="Mail" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-bold mb-1">Email</p>
                      <p className="text-muted-foreground">gibdd@province7.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Icon name="Clock" className="text-primary mt-1" size={20} />
                    <div>
                      <p className="font-bold mb-1">Режим работы</p>
                      <p className="text-muted-foreground">Пн-Пт: 09:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="bg-muted p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-3">Дежурная часть</h3>
                <p className="text-muted-foreground mb-2">Телефон: +7 (XXX) XXX-XX-XX (круглосуточно)</p>
                <p className="text-muted-foreground">Экстренные вызовы: 102</p>
              </div>
            </CardContent>
          </Card>
        );

      case 'documents':
        return (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Icon name="FolderOpen" className="text-primary" size={28} />
                <CardTitle className="text-2xl">Документы</CardTitle>
              </div>
              <CardDescription>Служебная документация и нормативные акты</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: 'Регламент работы подразделения', date: '01.09.2025', icon: 'FileText' },
                { name: 'Должностные инструкции', date: '15.08.2025', icon: 'FileCheck' },
                { name: 'Формы отчетности', date: '10.08.2025', icon: 'ClipboardList' },
                { name: 'Нормативные акты МВД РФ', date: '05.08.2025', icon: 'Scale' },
              ].map((doc, index) => (
                <div key={index}>
                  {index > 0 && <Separator className="my-4" />}
                  <div className="flex items-center justify-between hover:bg-muted/50 p-3 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Icon name={doc.icon} className="text-primary" size={20} />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">Обновлено: {doc.date}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-2" />
                      Скачать
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Coat_of_Arms_of_the_Russian_Federation.svg/800px-Coat_of_Arms_of_the_Russian_Federation.svg.png"
                alt="Герб"
                className="w-12 h-12 object-contain"
              />
              <div>
                <h1 className="text-xl font-bold text-primary">ГИБДД РП #7 Сервер</h1>
                <p className="text-sm text-muted-foreground">Официальный портал</p>
              </div>
            </div>
          </div>
          
          <nav className="flex flex-wrap gap-2">
            <Button
              variant={activeSection === 'home' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('home')}
            >
              <Icon name="Home" size={16} className="mr-2" />
              Главная
            </Button>
            <Button
              variant={activeSection === 'leadership' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('leadership')}
            >
              <Icon name="UserCircle" size={16} className="mr-2" />
              Руководство
            </Button>
            <Button
              variant={activeSection === 'news' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('news')}
            >
              <Icon name="Newspaper" size={16} className="mr-2" />
              Новости
            </Button>
            <Button
              variant={activeSection === 'contacts' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('contacts')}
            >
              <Icon name="Phone" size={16} className="mr-2" />
              Контакты
            </Button>
            <Button
              variant={activeSection === 'documents' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveSection('documents')}
            >
              <Icon name="FolderOpen" size={16} className="mr-2" />
              Документы
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      <footer className="bg-primary text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <h3 className="font-bold mb-2">ГИБДД РП #7 Сервер</h3>
              <p className="opacity-90">Официальный портал подразделения</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Контакты</h3>
              <p className="opacity-90">Телефон: +7 (XXX) XXX-XX-XX</p>
              <p className="opacity-90">Email: gibdd@province7.ru</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Экстренные службы</h3>
              <p className="opacity-90">Единый номер: 112</p>
              <p className="opacity-90">Полиция: 102</p>
            </div>
          </div>
          <Separator className="my-4 opacity-30" />
          <p className="text-center text-sm opacity-75">
            © 2025 ГИБДД Республики Провинция #7 Сервер. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
