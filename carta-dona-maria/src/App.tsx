import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { Instagram } from 'lucide-react';
import logoDm from './assets/image_5.webp';
import granosCafe from './assets/image_7.png';
// Importamos las imágenes decorativas. Asegúrate de que estén en la carpeta public/ o importadas correctamente.
// Si están en src/assets/ sería algo como: import logoDm from './assets/image_5.png'; import granosCafe from './assets/image_6.png';
// Para este ejemplo, asumiremos que están en la carpeta public/ y las referenciamos directamente.
// URL de tu Google Sheet (CSV publicado)
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRX82GUno0mcdHOYLpMJVdvQymMojdpjmZoRJt9CE95axjACsZi_-b9_LUVNgmJOVBGs35y7AGvad1U/pub?gid=0&single=true&output=csv'; // REEMPLAZA ESTO CON TU LINK CSV PÚBLICO

interface MenuItem {
  categoria: string;
  producto: string;
  descripcion: string;
  precio: string;
  imagen_url?: string;
  disponible: string;
}

type MenuData = Record<string, MenuItem[]>;

const App: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    Papa.parse<MenuItem>(SHEET_URL, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const grouped = results.data.reduce<MenuData>((acc, item) => {
          if (!item.categoria || !item.producto || item.disponible?.toLowerCase() === 'no') {
            return acc;
          }
          const cat = item.categoria.trim();
          if (!acc[cat]) {
            acc[cat] = [];
          }
          acc[cat].push(item);
          return acc;
        }, {});

        setMenuData(grouped);
        const categories = Object.keys(grouped);
        if (categories.length > 0) {
          setActiveCategory(categories[0]);
        }
        setLoading(false);
      },
      error: (err: Error) => {
        console.error("Error cargando carta:", err);
        setLoading(false);
      }
    });
  }, []);

  return (
    // Fondo Cream (#FFEBD8) y texto Brown (#59382F)
    <div className="min-h-screen bg-brand-cream text-brand-brown font-sans pb-12 selection:bg-brand-tan selection:text-white">
      
      {/* DETALLE DECORATIVO SUPERIOR: GRANOS DE CAFÉ */}
      {/* Usamos un div con la imagen de fondo para que se repita o se ajuste. En móvil se verá en la parte superior. */}
      <div className="w-full h-12 md:h-16 bg-repeat-x bg-contain opacity-70" style={{ backgroundImage: `url(${granosCafe})` }}></div>

      {/* HEADER */}
      <header className="bg-brand-cream/90 backdrop-blur-sm sticky top-0 z-50 border-b border-brand-tan/30 shadow-sm transition-all duration-300">
        <div className="max-w-md mx-auto px-6 py-4 flex justify-between items-center relative">
          <div className="flex items-center gap-3">
            {/* Fuente Script para la marca */}
            <h1 className="font-script text-3xl text-brand-maroon mt-1">
              Doña Maria
            </h1>
          </div>
          <a 
            href="https://www.instagram.com/donamaria.coffee/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-brand-red hover:text-brand-maroon transition-transform hover:scale-110"
          >
            <Instagram size={26} />
          </a>
        </div>

        {/* NAVEGACIÓN */}
        {!loading && (
          <nav className="overflow-x-auto px-4 scrollbar-hide flex gap-6 max-w-md mx-auto mt-2 pb-1">
            {Object.keys(menuData).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  const element = document.getElementById(cat);
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                // Montserrat Bold para navegación
                className={`whitespace-nowrap pb-2 text-sm font-bold tracking-wide uppercase border-b-2 transition-all ${
                  activeCategory === cat 
                    ? 'border-brand-red text-brand-red' 
                    : 'border-transparent text-brand-tan hover:text-brand-brown'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        )}
      </header>

      {/* BODY */}
      <main className="max-w-md mx-auto px-5 mt-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 animate-pulse text-brand-tan">
              {/* Usamos el logo también en el loading */}
              <img src={logoDm} alt="Cargando" className="h-16 w-16 object-contain mb-4 opacity-50" />
              <p className="font-script text-2xl">Preparando la carta...</p>
          </div>
        ) : (
          <div className="space-y-12">
            {Object.entries(menuData).map(([category, items]) => (
              <section key={category} id={category} className="scroll-mt-40 relative">
                {/* Título de Categoría en Script */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-px w-8 bg-brand-red/40"></div>
                  <h2 className="font-script text-4xl text-brand-red text-center flex-1 relative z-10">{category}</h2>
                  <div className="h-px w-8 bg-brand-red/40"></div>
                   {/* Detalle de fondo para el título de categoría, usando el logo de aguja e hilo muy sutil */}
                  <div className="absolute inset-0 flex justify-center items-center opacity-5 pointer-events-none">
                      <img src={logoDm} alt="" className="h-24 w-24 object-contain" />
                  </div>
                </div>
                
                <div className="grid gap-5 relative z-10">
                  {items.map((item, index) => (
                    <article 
                      key={`${category}-${index}`} 
                      className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-white shadow-sm flex gap-4 hover:shadow-md transition-all relative overflow-hidden"
                    >
                      {/* Detalle de fondo sutil en cada tarjeta */}
                      <div className="absolute top-0 right-0 opacity-5 pointer-events-none transform translate-x-1/3 -translate-y-1/3">
                          <img src={granosCafe} alt="" className="h-24 w-auto object-contain" />
                      </div>
                      <div className="flex-1 relative z-10">
                        <div className="flex justify-between items-start">
                          {/* Nombre del producto en Montserrat Bold */}
                          <h3 className="font-bold text-lg text-brand-maroon leading-tight">
                            {item.producto}
                          </h3>
                          <span className="font-bold text-lg text-brand-red ml-2 bg-brand-cream px-2 py-0.5 rounded-md text-sm whitespace-nowrap border border-brand-red/10">
                            $ {item.precio}
                          </span>
                        </div>
                        
                        {item.descripcion && (
                          <p className="text-brand-brown/80 text-sm mt-2 leading-relaxed font-medium">
                            {item.descripcion}
                          </p>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
        
        <footer className="mt-20 mb-12 text-center flex flex-col items-center">
          {/* Aumentamos tamaño a w-40 (antes era w-8) y quitamos la opacidad */}
          <img 
            src={logoDm} 
            alt="Dona Maria Logo" 
            className="w-40 h-auto object-contain mb-6 drop-shadow-sm" 
          />
          <div className="h-px w-24 bg-brand-tan/30 mb-4"></div> {/* Una línea decorativa sutil */}
          <p className="font-script text-brand-tan text-2xl">Gracias por su visita</p>
          <p className="text-xs text-brand-brown/40 mt-2 font-sans uppercase tracking-widest">Doña Maria Coffee</p>
        </footer>
      </main>
    </div>
  );
};

export default App;