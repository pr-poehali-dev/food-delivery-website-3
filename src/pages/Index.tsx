import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('pizza');

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: 'Пепперони Классик',
      description: 'Пикантная пепперони, моцарелла, томатный соус',
      price: 599,
      image: '/img/216ff2d4-0783-4e78-8558-6e2e0cb6cf6f.jpg',
      category: 'pizza'
    },
    {
      id: 2,
      name: 'Цезарь с курицей',
      description: 'Свежий салат с курицей, пармезаном и соусом цезарь',
      price: 349,
      image: '/img/814d21d9-0fbf-4cff-be7d-654e5ce3f990.jpg',
      category: 'salads'
    },
    {
      id: 3,
      name: 'Чизбургер Премиум',
      description: 'Сочная говядина, сыр чеддер, салат, помидор',
      price: 429,
      image: '/img/eec7b4a6-e5b2-4a35-8f00-55b18f0687cf.jpg',
      category: 'burgers'
    }
  ];

  const categories = [
    { id: 'pizza', name: 'Пицца', icon: 'Pizza' },
    { id: 'burgers', name: 'Бургеры', icon: 'Beef' },
    { id: 'salads', name: 'Салаты', icon: 'Salad' },
    { id: 'drinks', name: 'Напитки', icon: 'Coffee' }
  ];

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-primary">🍕 FoodExpress</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#menu" className="text-gray-600 hover:text-primary transition-colors">Меню</a>
                <a href="#promotions" className="text-gray-600 hover:text-primary transition-colors">Акции</a>
                <a href="#about" className="text-gray-600 hover:text-primary transition-colors">О нас</a>
                <a href="#contacts" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Icon name="Clock" size={16} />
                <span>30-40 мин</span>
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="relative">
                    <Icon name="ShoppingCart" size={20} />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-primary text-white min-w-[20px] h-5 flex items-center justify-center text-xs">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Корзина</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    {cart.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Корзина пуста</p>
                    ) : (
                      <>
                        <div className="space-y-4">
                          {cart.map(item => (
                            <div key={item.id} className="flex items-center space-x-4 py-2">
                              <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-primary font-semibold">{item.price} ₽</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-6 pt-4 border-t">
                          <div className="flex justify-between items-center mb-4">
                            <span className="font-semibold">Итого:</span>
                            <span className="font-bold text-lg text-primary">{getTotalPrice()} ₽</span>
                          </div>
                          <Button className="w-full bg-primary hover:bg-orange-600">
                            Оформить заказ
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Вкусная еда за 30 минут</h2>
          <p className="text-xl mb-8 opacity-90">Быстрая доставка свежих блюд прямо к вашей двери</p>
          <div className="flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} />
              <span>Быстрая доставка</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="ShieldCheck" size={20} />
              <span>Качество гарантировано</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Truck" size={20} />
              <span>Бесплатная доставка от 999₽</span>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Наше меню</h2>
          
          {/* Category Filter */}
          <div className="flex justify-center mb-12">
            <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-sm">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "ghost"}
                  className={`flex items-center space-x-2 ${
                    activeCategory === category.id ? 'bg-primary text-white' : ''
                  }`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <Icon name={category.icon as any} size={18} />
                  <span>{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Menu Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <Card key={item.id} className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardHeader className="p-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg mb-2">{item.name}</CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">{item.price} ₽</span>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    className="w-full bg-primary hover:bg-orange-600"
                    onClick={() => addToCart(item)}
                  >
                    <Icon name="Plus" size={18} className="mr-2" />
                    В корзину
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section id="promotions" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Акции</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-r from-primary to-orange-600 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Бесплатная доставка</h3>
              <p className="mb-4">При заказе от 999 рублей доставка абсолютно бесплатна!</p>
              <Badge className="bg-white text-primary">Акция</Badge>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Счастливые часы</h3>
              <p className="mb-4 text-gray-600">С 14:00 до 16:00 скидка 20% на все меню</p>
              <Badge variant="outline">14:00 - 16:00</Badge>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">О нас</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            FoodExpress — это современная служба доставки еды, которая гарантирует качество, 
            скорость и удобство. Мы готовим только из свежих ингредиентов и доставляем в кратчайшие сроки.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Clock" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Быстро</h3>
              <p className="text-gray-600">Доставка за 30-40 минут</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="ShieldCheck" size={32} />
              </div>
              <h3 className="font-semibold mb-2">Качественно</h3>
              <p className="text-gray-600">Только свежие ингредиенты</p>
            </div>
            <div className="text-center">
              <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Heart" size={32} />
              </div>
              <h3 className="font-semibold mb-2">С любовью</h3>
              <p className="text-gray-600">Готовим с душой для вас</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Свяжитесь с нами</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <span>+7 (999) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <span>order@foodexpress.ru</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <span>Москва, ул. Примерная, д. 123</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-primary" />
                  <span>Ежедневно с 10:00 до 23:00</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Зона доставки</h3>
              <p className="text-gray-600 mb-4">
                Мы доставляем по всей Москве в пределах МКАД. 
                Минимальная сумма заказа — 500 рублей.
              </p>
              <Button className="bg-primary hover:bg-orange-600">
                Проверить адрес доставки
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🍕 FoodExpress</h3>
              <p className="text-gray-400">Вкусная еда с быстрой доставкой</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Меню</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Пицца</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Бургеры</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Салаты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Напитки</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="MessageCircle" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Instagram" size={24} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon name="Facebook" size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodExpress. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;