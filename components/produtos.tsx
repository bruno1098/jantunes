'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { ShoppingCart, X, ChevronLeft, ChevronRight, Pencil, Trash2 } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'

const categories = [
  { id: 'toalhas', name: 'Toalhas' },
  { id: 'trilhos', name: 'Trilhos' },
  { id: 'guardanapos', name: 'Guardanapos' },
  { id: 'cadeiras', name: 'Cadeiras' },
  { id: 'mesas', name: 'Mesas' },
  { id: 'outros', name: 'Outros' },
]

interface FormData {
  name: string;
  email: string;
  phone: string;
  deliveryDate: string;
  pickupDate: string;
  cep: string;
  street: string;
  number: string;
  message?: string;
}

interface CartItem {
  id: number;
  name: string;
  quantity: number;
  observations?: string;
}
interface Product {
  id: number;
  name: string;
  image: string;
  category: string;
}

const products = [
  { id: 1, name: 'Toalha Adamascada Preta', image: 'https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5895-1920w.JPG?height=200&width=200', category: 'toalhas' },
  { id: 2, name: 'Toalha Redonda Branca', image: 'https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/WhatsApp+Image+2023-05-24+at+14.15.45-1920w.jpeg?height=200&width=200', category: 'toalhas' },
  { id: 3, name: 'Trilho de mesa Floral Cinza', image: 'https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5623-1920w.JPG?height=200&width=200', category: 'trilhos' },
  { id: 4, name: 'Trilho de mesa Floral Primavera', image: 'https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5626-1920w.JPG?height=200&width=200', category: 'trilhos' },
  { id: 5, name: 'Tilho de mesa Floral Marrom', image: 'https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5629-1920w.JPG?height=200&width=200', category: 'trilhos' },
  { id: 6, name: 'Mesa Plástica Redonda', image: '/placeholder.svg?height=200&width=200', category: 'mesas' },
  { id: 7, name: 'Cadeira Tiffany Dourada', image: '/placeholder.svg?height=200&width=200', category: 'cadeiras' },
  { id: 8, name: 'Taça de Cristal', image: '/placeholder.svg?height=200&width=200', category: 'outros' },
]

export  function Produtos() {
  const [cart, setCart] = useState<Record<number, CartItem>>({});
  const [showCart, setShowCart] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [showAddToCartModal, setShowAddToCartModal] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<FormData>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToCart = (product: Product | null, quantity: number, observations: string) => {
    if (product) {
      setCart(prev => {
        return {
          ...prev,
          [product.id]: {
            id: product.id,
            name: product.name,
            quantity: quantity,
            observations: observations
          }
        }
      })
    }
    setShowAddToCartModal(false)
  }

  const removeFromCart = (productId: string | number) => {
    setCart(prev => {
      const newCart: Record<string | number, CartItem> = { ...prev };
      delete newCart[productId];
      return newCart;
    });
  };

  const getUniqueItemsCount = () => {
    return Object.keys(cart).length
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0)
  }

  const onSubmit = async (data: FormData) => {
    const orderDetails = Object.values(cart).map((item: CartItem) =>
      `${item.name}: ${item.quantity} - Observações: ${item.observations || 'Nenhuma'}`
    ).join('\n');

    const emailBody = `
      Nome: ${data.name}
      Email: ${data.email}
      Telefone: ${data.phone}
      Data de entrega: ${data.deliveryDate}
      Data de retirada: ${data.pickupDate}
      Local de entrega:
      CEP: ${data.cep}
      Rua: ${data.street}
      
      Número: ${data.number}
      Mensagem: ${data.message}
      
      Pedido:
      ${orderDetails}
    `

    console.log('Email a ser enviado:', emailBody)
    alert('Pedido enviado com sucesso! Entraremos em contato em breve.')
    setShowForm(false)
    setCart({})
    reset()
  }

  const fetchAddress = useCallback(async (cep: string) => {
    try {
      if (!cep) return; // Verifica se o CEP existe antes de buscar
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setValue('street', data.logradouro);
      }
    } catch (error) {
      console.error('Erro ao buscar endereço:', error);
    }
  }, [setValue]);
  const cep = watch('cep')
  useEffect(() => {
    if (cep) {
      fetchAddress(cep);
    }
  }, [fetchAddress, cep]);
  
 


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length)
  }

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col relative">
      <header className={`bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10 w-full transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
        <nav className="container mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/">
                <Button variant="ghost" className={`transition-all duration-300 ${isScrolled ? 'text-xs py-0.5 px-2' : 'text-sm py-1 px-3'} text-blue-600 dark:text-blue-400`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Voltar para Home
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button 
                onClick={() => setShowCart(!showCart)} 
                variant="outline" 
                className={`transition-all duration-300 ${isScrolled ? 'text-xs py-0.5 px-2' : 'text-sm py-1 px-3'} text-white dark:bg-gray-800`}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Carrinho ({getUniqueItemsCount()})
              </Button>
            </motion.div>
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-48 sm:h-64 md:h-96 mb-8 sm:mb-12 overflow-hidden rounded-lg"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: index === currentSlide ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            >
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">{product.name}</h2>
              </div>
            </motion.div>
          ))}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 left-2 sm:left-3 transform -translate-y-1/2 bg-white dark:bg-gray-300"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 right-1 sm:right-3 transform -translate-y-1/2 bg-white dark:bg-gray-300"
            onClick={nextSlide}
          >
            <ChevronRight className="h-1 w-1" />
          </Button>
        </motion.div>

        <Tabs defaultValue="toalhas" className="mb-8 sm:mb-12">
          <div className="bg-muted rounded-lg p-2 overflow-x-auto">
            <TabsList className="flex flex-nowrap justify-start sm:justify-center gap-2 bg-transparent px-2 min-w-max sm:min-w-full">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="px-3 py-1.5 text-sm whitespace-nowrap sm:text-base data-[state=active]:bg-background flex-shrink-0"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {products
                  .filter((product) => product.category === category.id)
                  .map((product) => (
                    <motion.div
                      key={product.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="bg-white dark:bg-gray-800">
                        <CardContent className="p-3 sm:p-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-32 sm:h-48 object-cover rounded-t-lg"
                          />
                          <h3 className="text-base sm:text-lg font-semibold my-2 text-gray-800 dark:text-gray-200">
                            {product.name}
                          </h3>
                          <Button 
                            onClick={() => {
                              setSelectedProduct(product)
                              setShowAddToCartModal(true)
                            }} 
                            className="w-full text-sm sm:text-base bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            Adicionar ao Carrinho
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <AnimatePresence>
          {showAddToCartModal && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4"
            >
              <Card className="max-w-md w-full bg-white dark:bg-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">{selectedProduct?.name}</h2>
                  <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()
                    const form = e.target as HTMLFormElement
                    const quantity = parseInt((form.elements.namedItem('quantity') as HTMLInputElement).value)
                    const observations = (form.elements.namedItem('observations') as HTMLTextAreaElement).value
                    addToCart(selectedProduct, quantity, observations)
                  }} className="space-y-4">
                    <div>
                      <Label htmlFor="quantity" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Quantidade</Label>
                      <Input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        defaultValue="1"
                        required
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div>
                      <Label htmlFor="observations" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Observações</Label>
                      <Textarea
                        id="observations"
                        name="observations"
                        placeholder="Alguma observação específica?"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setShowAddToCartModal(false)}>Cancelar</Button>
                      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Adicionar ao Carrinho</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <Card className="max-w-md w-full bg-white dark:bg-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Carrinho</h2>
                    <Button variant="ghost" onClick={() => setShowCart(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  {Object.keys(cart).length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">Seu carrinho está vazio.</p>
                  ) : (
                    <>
                      <ul className="mb-4">
                        {Object.values(cart).map((item) => (
                          <li key={item.id} className="flex justify-between items-center mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex-1">
                              <span className="font-semibold text-gray-800 dark:text-gray-200">{item.name}</span>
                              <br />
                              <span className="text-sm text-gray-600 dark:text-gray-400">Quantidade: {item.quantity}</span>
                            </div>
                            <div className="flex gap-2 items-center">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  setSelectedProduct(products.find(p => p.id === item.id) || null);
                                  setShowAddToCartModal(true);
                                }}
                              >
                                <Pencil className="h-4 w-4 text-blue-600" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => {
                                  if (window.confirm('Tem certeza que deseja remover este item do carrinho?')) {
                                    removeFromCart(item.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4 text-red-600" />
                              </Button>
                            </div>
                          </li>
                        ))}
                      </ul>
                      <p className="mb-4 font-semibold text-gray-800 dark:text-gray-200">Total de itens: {getTotalItems()}</p>
                      <Button 
                        onClick={() => { setShowCart(false); setShowForm(true); }} 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Solicitar Orçamento
                      </Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <Card className="max-w-md w-full max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Solicitar Orçamento</h2>
                    <Button variant="ghost" onClick={() => setShowForm(false)}>
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <p className="mb-4 text-gray-600 dark:text-gray-400">Preencha seus dados para receber um orçamento. Um de nossos vendedores entrará em contato em breve.</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <div>
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">Nome</Label>
                      <Input
                        id="name"
                        {...register('name', { required: 'Nome é obrigatório' })}
                        placeholder="Seu nome"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.name && <span className="text-red-500 text-sm">{errors.name.message?.toString()}</span>}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
                      <Input
                        id="email"
                        {...register('email', { required: 'Email é obrigatório', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' } })}
                        placeholder="Seu email"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.email && <span className="text-red-500 text-sm">{errors.email.message?.toString()}</span>}
                      
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Telefone</Label>
                      <Input
                        id="phone"
                        {...register('phone', { required: 'Telefone é obrigatório' })}
                        placeholder="Seu telefone"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message?.toString()}</span>}

                    </div>
                    <div>
                      <Label htmlFor="deliveryDate" className="text-gray-700 dark:text-gray-300">Data de entrega</Label>
                      <Input
                        id="deliveryDate"
                        type="date"
                        {...register('deliveryDate', { required: 'Data de entrega é obrigatória' })}
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.deliveryDate && <span className="text-red-500 text-sm">{errors.deliveryDate.message?.toString()}</span>}
                      
                    </div>
                    <div>
                      <Label htmlFor="pickupDate" className="text-gray-700 dark:text-gray-300">Data de retirada</Label>
                      <Input
                        id="pickupDate"
                        type="date"
                        {...register('pickupDate', { required: 'Data de retirada é obrigatória' })}
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.pickupDate && <span className="text-red-500 text-sm">{errors.pickupDate.message?.toString()}</span>}
                    </div>
                    <div>
                      <Label htmlFor="cep" className="text-gray-700 dark:text-gray-300">CEP</Label>
                      <Input
                        id="cep"
                        {...register('cep', { required: 'CEP é obrigatório' })}
                        placeholder="00000-000"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.cep && <span className="text-red-500 text-sm">{errors.cep.message?.toString()}</span>}
                    </div>
                    <div>
                      <Label htmlFor="street" className="text-gray-700 dark:text-gray-300">Rua</Label>
                      <Input
                        id="street"
                        {...register('street', { required: 'Rua é obrigatória' })}
                        placeholder="Nome da rua"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.street && <span className="text-red-500 text-sm">{errors.street.message?.toString()}</span>}
                    </div>
                    <div>
                      <Label htmlFor="number" className="text-gray-700 dark:text-gray-300">Número</Label>
                      <Input
                        id="number"
                        {...register('number', { required: 'Número é obrigatório' })}
                        placeholder="Número"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                      {errors.number && <span className="text-red-500 text-sm">{errors.number.message?.toString()}</span>}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">Mensagem (opcional)</Label>
                      <Textarea
                        id="message"
                        {...register('message')}
                        placeholder="Alguma observação adicional?"
                        className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
  Enviar Pedido
</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-6 sm:py-8 w-full mt-auto">
        <div className="container mx-auto px-4 sm:px-6 text-center text-sm sm:text-base">
          <p>&copy; 2012 - 2024 J.Antunes Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}