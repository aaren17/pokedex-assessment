'use client';
import { useState, useEffect } from 'react';

const heroSlides = [
  {
    label: 'Legendary Spotlight',
    title: 'Discover Iconic Pokémon',
    description: 'Track stats, typings, and artwork from every generation.',
    gradient: 'from-pink-300 via-rose-200 to-amber-100',
  },
  {
    label: 'Team Builder Tips',
    title: 'Build The Perfect Squad',
    description: 'Filter and compare Pokémon to complete your competitive roster.',
    gradient: 'from-purple-300 via-indigo-200 to-sky-200',
  },
  {
    label: 'Daily Highlights',
    title: 'Stay Ahead Of The League',
    description: 'New drops, events, and community favorites rotating every day.',
    gradient: 'from-amber-200 via-lime-200 to-emerald-200',
  },
];

const promoBanners = [
  {
    title: 'Trainer Kits',
    subtitle: 'Exclusive gear drops',
    image:
      'https://images.unsplash.com/photo-1523475472560-d2df97ec485c?auto=format&fit=crop&w=500&q=80',
  },
  {
    title: 'Battle Events',
    subtitle: 'Weekend tournaments',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80',
  },
];

const flankImages = {
  left:
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80',
  right:
    'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=900&q=80',
};

// Define the shape of a Pokemon object
interface Pokemon {
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to fetch data
  const fetchPokemons = async (pageNumber: number) => {
    setLoading(true);
    try {
      // 1. Fetch from YOUR Laravel API (use env var or fallback)
      const apiBase = (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost').replace(/\/$/, '');
      const res = await fetch(`${apiBase}/api/pokemons?page=${pageNumber}&limit=20`);
      if (!res.ok) {
        console.error('API responded with non-OK status', res.status, await res.text());
        return;
      }
      const newPokemons = await res.json();
      
      // 2. Append new data to existing list
      setPokemons((prev) => [...prev, ...newPokemons]);
    } catch (error) {
      console.error('Failed to fetch pokemons:', error);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchPokemons(1);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  // Handle "Load More"
  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPokemons(nextPage);
  };

  // Filter Logic
  const filteredPokemons = pokemons.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        {/* Hero + Banners (scrolls away naturally) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-64">
          <div className={`lg:col-span-3 h-full rounded-xl shadow-sm border border-pink-200 relative overflow-hidden bg-gradient-to-r ${heroSlides[currentSlide].gradient} transition-all duration-500`}
          >
            <div className="absolute inset-0 bg-white/10 mix-blend-soft-light" />
            <div className="relative h-full w-full flex flex-col justify-center p-10 text-gray-900">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-700 mb-3">
                {heroSlides[currentSlide].label}
              </p>
              <h1 className="text-4xl font-black tracking-tight text-gray-900 drop-shadow-sm">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="mt-3 text-gray-700 max-w-xl text-lg">
                {heroSlides[currentSlide].description}
              </p>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-2">
              {heroSlides.map((_, index) => (
                <span
                  key={index}
                  className={`h-2 w-6 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-gray-800' : 'bg-white/60'
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 flex flex-col gap-4 h-full">
            {promoBanners.map((banner) => (
              <div
                key={banner.title}
                className="relative flex-1 rounded-xl shadow-sm border border-red-200 bg-cover bg-center"
                style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.4), transparent 40%), url(${banner.image})` }}
              >
                <div className="absolute bottom-4 left-4 text-white drop-shadow">
                  <p className="text-xs uppercase tracking-[0.2em] opacity-70">{banner.subtitle}</p>
                  <p className="text-xl font-semibold">{banner.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content grid with sticky side images */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          <div
            className="hidden lg:flex col-span-1 rounded-xl border border-gray-200 overflow-hidden sticky top-6 h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25), transparent 50%), url(${flankImages.left})` }}
          >
            <span className="sr-only">Trainer showcase</span>
          </div>

          <div className="col-span-1 lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-gray-100 bg-white">
              <h2 className="text-lg font-bold mb-2 text-gray-700">Pokedex</h2>
              <input
                type="text"
                placeholder="Search Pokemon..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="p-4">
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
                {filteredPokemons.map((poke, index) => (
                  <div
                    key={`${poke.name}-${index}`}
                    className="border border-gray-100 rounded-xl p-4 flex flex-col items-center hover:shadow-md hover:border-pink-200 transition bg-white group"
                  >
                    <div className="bg-gray-50 rounded-full p-4 mb-2 group-hover:bg-pink-50 transition">
                      <img src={poke.image} alt={poke.name} className="w-20 h-20 object-contain" />
                    </div>
                    <h3 className="font-bold capitalize text-gray-800">{poke.name}</h3>
                    <div className="flex gap-1 mt-2">
                      {poke.types.map((t) => (
                        <span key={t} className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={handleLoadMore}
                  disabled={loading}
                  className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            </div>
          </div>

          <div
            className="hidden lg:flex col-span-1 rounded-xl border border-gray-200 overflow-hidden sticky top-6 h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.25), transparent 50%), url(${flankImages.right})` }}
          >
            <span className="sr-only">Battle arena</span>
          </div>
        </div>
      </div>
    </div>
  );
}