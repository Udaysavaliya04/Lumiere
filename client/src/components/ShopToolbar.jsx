import { Filter, ChevronDown, Grid, List as ListIcon } from 'lucide-react';

export default function ShopToolbar({ viewMode, setViewMode, sortBy, setSortBy, filterCat, setFilterCat }) {
  const categories = ["All Collections", "Necklaces", "Rings", "Earrings", "Bracelets"];

  return (
    <div className="sticky top-20 z-10 bg-midnight-950/90 backdrop-blur-md border-b border-white/5 py-4 mb-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Left: Filter (Minimal Text Menu) */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar w-full md:w-auto">
            {categories.map((cat) => (
                <button 
                    key={cat}
                    onClick={() => setFilterCat(cat)}
                    className={`text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors ${
                        filterCat === cat ? "text-gold-500 font-bold" : "text-white/40 hover:text-white"
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Right: Sort & View */}
        <div className="flex items-center gap-6">
            <div className="relative group">
                <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    <span>{sortBy === 'price-desc' ? 'Price: High to Low' : sortBy === 'price-asc' ? 'Price: Low to High' : 'Curated'}</span>
                    <ChevronDown className="w-3 h-3" />
                </button>
                {/* Dropdown would go here - simplified for demo */}
                <div className="absolute top-full right-0 mt-2 w-48 bg-midnight-900 border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 p-2 shadow-2xl">
                    <button onClick={() => setSortBy('default')} className="block w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-white/60 hover:text-gold-500 hover:bg-white/5">Curated</button>
                    <button onClick={() => setSortBy('price-desc')} className="block w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-white/60 hover:text-gold-500 hover:bg-white/5">Price: High to Low</button>
                    <button onClick={() => setSortBy('price-asc')} className="block w-full text-left px-4 py-2 text-xs uppercase tracking-wider text-white/60 hover:text-gold-500 hover:bg-white/5">Price: Low to High</button>
                </div>
            </div>

            <div className="h-4 w-[1px] bg-white/10" />

            <div className="flex items-center gap-2">
                <button 
                    onClick={() => setViewMode('grid')}
                    className={`p-2 transition-colors ${viewMode === 'grid' ? "text-white" : "text-white/20 hover:text-white"}`}
                >
                    <Grid className="w-4 h-4" />
                </button>
                <button 
                    onClick={() => setViewMode('list')}
                    className={`p-2 transition-colors ${viewMode === 'list' ? "text-white" : "text-white/20 hover:text-white"}`}
                >
                    <ListIcon className="w-4 h-4" />
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}
