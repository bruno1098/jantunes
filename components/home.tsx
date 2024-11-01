'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, Star, Calendar, Gift, Users } from 'lucide-react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import logo from './logo.png'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { useState, useEffect } from 'react'

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const graySectionOpacity = useTransform(smoothY, [300, 700], [0, 1])
  const mainTransform = useTransform(smoothY, [0, 300], [150, 0])

  return (
    <div className="min-h-screen overflow-x-hidden relative">
      {/* Header */}
      <header
        className={`bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'py-1' : 'py-2'
          }`}
      >
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
                className={`transition-all duration-300 ${isScrolled ? 'w-[40px] h-[40px]' : 'w-[60px] h-[60px]'
                  }`}
              />
              <h1
                className={`font-bold text-white transition-all duration-300 ${isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                  }`}
              >
                J.Antunes
              </h1>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >

            </motion.div>
          </div>
        </nav>
      </header>

      <section className="relative w-full h-screen overflow-y-scroll">
  <motion.div
    className="fixed top-0 left-0 w-full h-full z-0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <img
      src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5695+%282%29-1920w.JPG"
      alt="Evento Especial"
      className="absolute top-0 left-0 w-full h-full object-cover"
      loading="eager"
    />
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50"></div>
  </motion.div>
  <div className="relative z-10 flex items-center justify-center min-h-screen px-4 text-center text-white">
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-center text-white"
    >
      <h1 className="text-3xl sm:text-5xl font-bold mb-4">
        Transforme seu evento em algo especial
      </h1>
      <p className="text-base sm:text-xl mb-6">
        Alugue os melhores produtos para tornar seu evento inesquecível
      </p>
    </motion.div>
  </div>
</section>



      {/* Gray Section Transition */}
      <motion.div
        style={{ opacity: graySectionOpacity }}
        className="bg-gray-100 relative z-10 mt-10"
      >
        <motion.section
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.1 }}
          className="container mx-auto px-4 sm:px-6 py-16 grid md:grid-cols-2 gap-12 items-center"
        >
          <div className="order-1 md:order-2">
            <div className="w-full max-w-[340px] md:max-w-[1400px] mx-auto overflow-hidden mx-[3px] sm:mx-0">
              <Slider
                dots={true}
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
                <div className="relative">
                  <img
                    src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5928-1920w.JPG"
                    alt="Toalhas de mesa"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>
                <div className="relative">
                  <img
                    src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5690+%281%29-1920w.JPG"
                    alt="Decoração de mesa"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>
                <div className="relative">
                  <img
                    src="https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5743-1920w.JPG"
                    alt="Arranjos de mesa"
                    className="rounded-lg shadow-lg w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover"
                  />
                </div>
              </Slider>
            </div>
          </div>

          <div className="order-2 md:order-1">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-black">
              Grandes variedades de tamanhos, modelos, tecidos e cores.
            </h3>
            <ul className="space-y-4 text-gray-700 text-base">
              <li className="flex items-start">
                <ChevronRight className="h-6 w-6 text-black mr-2 mt-1" />
                <span>Toalhas de mesa em diversos padrões e cores</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-6 w-6 text-black mr-2 mt-1" />
                <span>Opções para eventos formais e casuais</span>
              </li>
              <li className="flex items-start">
                <ChevronRight className="h-6 w-6 text-black mr-2 mt-1" />
                <span>Tecidos de alta qualidade para todas as ocasiões</span>
              </li>
            </ul>
            <p className="text-gray-600 mt-6">
              Nossos produtos são cuidadosamente selecionados para garantir a
              melhor qualidade e apresentação no seu evento.
            </p>
            <Link href="/produtos">
              <Button variant="outline" className="mt-6">
                Explorar Catálogo Completo
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </motion.section>
 
      {/* Remaining Content */}
      <motion.main style={{ y: mainTransform }} className="relative z-10">
        {/* Why Choose Us Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center px-4 sm:px-6"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold mb-12 text-black">
            Por que escolher a J.Antunes?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-black text-xl">
                    <Star className="mr-2 h-6 w-6" /> Qualidade Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black text-base">
                    Oferecemos produtos de alta qualidade para garantir que seu
                    evento seja impecável.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-black text-xl">
                    <Calendar className="mr-2 h-6 w-6" /> Flexibilidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black text-base">
                    Adaptamos nossos serviços às suas necessidades, seja qual for
                    o tamanho do seu evento.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center text-black text-xl">
                    <Gift className="mr-2 h-6 w-6" /> Variedade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-black text-base">
                    Uma ampla gama de produtos para atender a todos os estilos e
                    temas de eventos.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          viewport={{ once: true, amount: 0.1 }}
          className="relative overflow-hidden mt-16 py-16 bg-fixed bg-center bg-cover"
          style={{
            backgroundImage:
              'url(https://lirp.cdn-website.com/f46edd80/dms3rep/multi/opt/IMG_5743-1920w.JPG)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          <div className="relative z-10 text-center text-white px-4">
            <h3 className="text-2xl sm:text-4xl font-semibold mb-6">
              Estamos aqui para te ajudar.
            </h3>
            <p className="text-base sm:text-xl mb-8">
              Nossa equipe está pronta para tornar seu evento único e memorável.
            </p>
            <Link href="/produtos">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-gray-200"
              >
                Ver Produtos e Solicitar Orçamento
                <Users className="ml-2 h-5 w-5" />
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </motion.section>
      </motion.main>
      </motion.div>
      {/* Footer */}
      <footer className="bg-gray-800 text-gray-100 py-6 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm sm:text-base">
            &copy; 2023 J.Antunes. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}