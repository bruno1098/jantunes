'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Star, Calendar, Gift, Users } from 'lucide-react'
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from './logo.png'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useState, useEffect } from 'react'

export default function HomePage() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden">
            <header className={`bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-10 w-full transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'}`}>
                <nav className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex items-center gap-2"
                        >
                            <img 
                                src={logo.src} 
                                alt="J.Antunes Logo" 
                                className={`transition-all duration-300 ${isScrolled ? 'w-[50px] h-[50px]' : 'w-[70px] h-[70px]'}`}
                            />
                            <h1 className={`font-bold text-white transition-all duration-300 ${isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
                                J.Antunes
                            </h1>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link href="./produtos">
                                <Button variant="outline" className={`transition-all duration-300 ${isScrolled ? 'text-xs py-0.5 px-2' : 'text-sm py-1 px-3'} bg-white hover:bg-gray-50 text-gray-800 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700`}>
                                    Ver Produtos
                                    <ChevronRight className="ml-0 h-2 w-2" />
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </nav>
            </header>

            <main className="container mx-auto px-4 sm:px-6 py-8 pt-28">
                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-black">Transforme seu evento em algo especial</h2>
                    <p className="text-lg sm:text-xl text-black">Alugue os melhores produtos para tornar seu evento inesquecível</p>
                </motion.section>
                <div className="grid md:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center justify-center w-full px-4 sm:px-0"
                    >
                       <div className="w-full max-w-[340px] md:max-w-[1400px] mx-auto overflow-hidden mx-[-3px] sm:mx-0">
                            <Slider
                                dots={false}
                                infinite={true}
                                speed={1000}
                                slidesToShow={1}
                                slidesToScroll={1}
                                autoplay={true}
                                autoplaySpeed={4000}
                                fade={true}
                                arrows={false}
                                className="w-full"
                            >
                                <div className="aspect-[16/9] md:aspect-[4/3] relative">
                                    <img
                                        src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5928-1920w.JPG"
                                        alt="Toalhas de mesa"
                                        className="rounded-lg shadow-lg w-full h-full object-cover"
                                    />
                                </div>
                                <div className="aspect-[16/9] md:aspect-[4/3] relative">
                                    <img
                                        src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5690+%281%29-1920w.JPG"
                                        alt="Decoração de mesa"
                                        className="rounded-lg shadow-lg w-full h-full object-cover"
                                    />
                                </div>
                                <div className="aspect-[16/9] md:aspect-[4/3] relative">
                                    <img
                                        src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5743-1920w.JPG"
                                        alt="Arranjos de mesa"
                                        className="rounded-lg shadow-lg w-full h-full object-cover"
                                    />
                                </div>
                            </Slider>
                        </div>


                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col justify-center space-y-4"
                    >
                        <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-black">Grandes variedades de tamanhos, modelos, tecidos e cores.</h3>
                        <ul className="space-y-3 text-gray-700">
                            <li className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-black mr-2" />
                                <span>Toalhas de mesa em diversos padrões e cores</span>
                            </li>
                            <li className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-black mr-2" />
                                <span>Opções para eventos formais e casuais</span>
                            </li>
                            <li className="flex items-center">
                                <ChevronRight className="h-5 w-5 text-black mr-2" />
                                <span>Tecidos de alta qualidade para todas as ocasiões</span>
                            </li>
                        </ul>
                        <p className="text-gray-600 mt-4">
                            Nossos produtos são cuidadosamente selecionados para garantir a melhor qualidade e apresentação no seu evento.
                        </p>
                        <Link href="/produtos" className="mt-4">
                            <Button variant="outline" className="mt-2">
                                Explorar Catálogo Completo
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-gray-900">Por que escolher a J.Antunes?</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                        <Card className="bg-white hover:shadow-md transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center text-black text-lg sm:text-xl">
                                    <Star className="mr-2" /> Qualidade Premium
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-black text-sm sm:text-base">Oferecemos produtos de alta qualidade para garantir que seu evento seja impecável.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white hover:shadow-md transition-shadow duration-300">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center text-gray-800 text-lg sm:text-xl">
                                    <Calendar className="mr-2" /> Flexibilidade
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm sm:text-base">Adaptamos nossos serviços às suas necessidades, seja qual for o tamanho do seu evento.</p>
                            </CardContent>
                        </Card>
                        <Card className="bg-white hover:shadow-md transition-shadow duration-300 sm:col-span-2 md:col-span-1">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center text-gray-800 text-lg sm:text-xl">
                                    <Gift className="mr-2" /> Variedade
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600 text-sm sm:text-base">Uma ampla gama de produtos para atender a todos os estilos e temas de eventos.</p>
                            </CardContent>
                        </Card>
                    </div>
                </motion.div>

                <motion.section
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="text-center mb-12 sm:mb-16"
                >
                    <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-black">Estamos aqui para te ajudar.</h3>
                    <p className="text-lg sm:text-xl text-black mb-6 sm:mb-8">Nossa equipe está pronta para tornar seu evento único e memorável.</p>
                    <Link href="/produtos">
                        <Button size="lg" className="w-full sm:w-auto bg-black hover:bg-gray-800 text-white">
                            Ver Produtos e Solicitar Orçamento
                            <Users className="ml-2 h-5 w-5" />
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>
                </motion.section>
            </main>

            <footer className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 py-6 sm:py-8 mt-12 sm:mt-16">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <p className="text-sm sm:text-base">&copy; 2023 Evento Elegante. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    )
}