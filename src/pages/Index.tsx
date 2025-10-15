import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const API_URL = 'https://functions.poehali.dev/59f4d93b-77eb-4d12-b475-756c7d1b684e';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [newsItems, setNewsItems] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminToken, setAdminToken] = useState('');
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showNewsEditor, setShowNewsEditor] = useState(false);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [newsForm, setNewsForm] = useState({ title: '', description: '', content: '', date: '' });

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setNewsItems(data.news || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleAdminLogin = () => {
    if (adminToken === 'admin123') {
      setIsAdmin(true);
      setShowAdminLogin(false);
    } else {
      alert('Неверный токен');
    }
  };

  const handleCreateNews = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken,
        },
        body: JSON.stringify(newsForm),
      });
      if (response.ok) {
        await fetchNews();
        setShowNewsEditor(false);
        setNewsForm({ title: '', description: '', content: '', date: '' });
      }
    } catch (error) {
      console.error('Error creating news:', error);
    }
  };

  const handleUpdateNews = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Token': adminToken,
        },
        body: JSON.stringify({ ...newsForm, id: editingNews.id }),
      });
      if (response.ok) {
        await fetchNews();
        setShowNewsEditor(false);
        setEditingNews(null);
        setNewsForm({ title: '', description: '', content: '', date: '' });
      }
    } catch (error) {
      console.error('Error updating news:', error);
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm('Удалить новость?')) return;
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
        headers: {
          'X-Admin-Token': adminToken,
        },
      });
      if (response.ok) {
        await fetchNews();
      }
    } catch (error) {
      console.error('Error deleting news:', error);
    }
  };

  const openEditNews = (news: any) => {
    setEditingNews(news);
    setNewsForm({
      title: news.title,
      description: news.description,
      content: news.content || '',
      date: news.date,
    });
    setShowNewsEditor(true);
  };

  const openCreateNews = () => {
    setEditingNews(null);
    setNewsForm({ title: '', description: '', content: '', date: '' });
    setShowNewsEditor(true);
  };

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
          <div className="space-y-6">
            {isAdmin && (
              <Card className="border-secondary">
                <CardHeader className="bg-secondary/10">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Панель администратора</CardTitle>
                    <Button onClick={openCreateNews} size="sm">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Создать новость
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            )}
            
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
                      {news.content && (
                        <p className="text-sm text-muted-foreground mt-2">{news.content}</p>
                      )}
                      {isAdmin && (
                        <div className="flex gap-2 mt-3">
                          <Button onClick={() => openEditNews(news)} variant="outline" size="sm">
                            <Icon name="Edit" size={16} className="mr-2" />
                            Редактировать
                          </Button>
                          <Button onClick={() => handleDeleteNews(news.id)} variant="destructive" size="sm">
                            <Icon name="Trash2" size={16} className="mr-2" />
                            Удалить
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
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
            <Button
              variant={isAdmin ? 'destructive' : 'outline'}
              size="sm"
              onClick={() => isAdmin ? setIsAdmin(false) : setShowAdminLogin(true)}
            >
              <Icon name={isAdmin ? 'LogOut' : 'Lock'} size={16} className="mr-2" />
              {isAdmin ? 'Выход' : 'Вход'}
            </Button>
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

      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Вход администратора</CardTitle>
              <CardDescription>Введите токен доступа</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Токен доступа</label>
                <input
                  type="password"
                  value={adminToken}
                  onChange={(e) => setAdminToken(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Введите токен"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdminLogin} className="flex-1">
                  Войти
                </Button>
                <Button onClick={() => setShowAdminLogin(false)} variant="outline" className="flex-1">
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showNewsEditor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <Card className="w-full max-w-2xl my-8">
            <CardHeader>
              <CardTitle>{editingNews ? 'Редактировать новость' : 'Создать новость'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Заголовок</label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Краткое описание</label>
                <textarea
                  value={newsForm.description}
                  onChange={(e) => setNewsForm({ ...newsForm, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Полный текст</label>
                <textarea
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md min-h-[120px]"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Дата</label>
                <input
                  type="text"
                  value={newsForm.date}
                  onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="15 октября 2025"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={editingNews ? handleUpdateNews : handleCreateNews}
                  className="flex-1"
                >
                  {editingNews ? 'Сохранить' : 'Создать'}
                </Button>
                <Button
                  onClick={() => {
                    setShowNewsEditor(false);
                    setEditingNews(null);
                    setNewsForm({ title: '', description: '', content: '', date: '' });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Отмена
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

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