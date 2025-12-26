import { Plus, X, Edit2, Trash2, Check, Search, Layers, ChevronRight, Hash, ChartBarStacked, School, BookOpen } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useState, useEffect } from 'react';

function Category() {
  const { colors } = useTheme();
  const { categories, addCategory, updateCategory, deleteCategory } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showModalContent, setShowModalContent] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Handle modal animation
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => setShowModalContent(true), 10);
    } else {
      setShowModalContent(false);
    }
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setShowModalContent(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  // Add Category
  const handleAddCategory = () => {
    if (categoryName.trim()) {
      addCategory(categoryName);
      setCategoryName('');
      handleCloseModal();
    }
  };

  // Delete Category
  const handleDeleteCategory = (id) => {
    deleteCategory(id);
  };

  // Start Editing
  const handleEditStart = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  // Save Edit
  const handleEditSave = (id) => {
    if (editingName.trim()) {
      updateCategory(id, editingName);
      setEditingId(null);
      setEditingName('');
    }
  };

  // Cancel Edit
  const handleEditCancel = () => {
    setEditingId(null);
    setEditingName('');
  };

  // Filter categories based on search query
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-2 md:p-6 transition-all duration-300 min-h-screen" style={{ backgroundColor: colors.background }}>
      {/* Reorganized Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 sticky top-0 z-30 pb-4" style={{ backgroundColor: colors.background }}>
        <div className="relative hidden md:block">
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-8 rounded-full" style={{ backgroundColor: colors.primary }}></div>
          <h1 className="text-2xl md:text-3xl font-semibold flex items-center gap-3" style={{ color: colors.text }}>
            Explore Categories
          </h1>
          <p className="text-xs md:text-sm font-medium opacity-50 mt-1" style={{ color: colors.textSecondary }}>
            Curate and manage your content taxonomies
          </p>
        </div>
        
        <div className="flex flex-row items-center gap-3 w-full lg:w-auto">
          {/* Modern Search Bar Integrated */}
          <div className="relative flex-1 group">
            <Search 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 transition-colors duration-300"
              style={{ color: colors.textSecondary }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-3 pr-3 py-2 rounded outline-none border transition-all text-xs font-medium backdrop-blur-sm"
              style={{ 
                backgroundColor: colors.sidebar || colors.background, 
                borderColor: colors.accent + '15',
                color: colors.text 
              }}
              onFocus={(e) => e.target.style.borderColor = colors.primary}
              onBlur={(e) => e.target.style.borderColor = colors.accent + '15'}
            />
          </div>

          <button
            onClick={handleOpenModal}
            className="flex-none px-4 py-2 cursor-pointer rounded-xl font-semibold transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <Plus size={16} />
            <span className="text-xs">New</span>
          </button>
        </div>
      </div>

      {/* Premium Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="group relative rounded-2xl p-5 border transition-all duration-300 hover:shadow-md cursor-default flex flex-col overflow-hidden"
            style={{ 
              backgroundColor: colors.sidebar || colors.background,
              borderColor: colors.accent + '15'
            }}
          >
            {editingId === category.id ? (
              <div className="relative z-10 flex flex-col h-full justify-between">
                <input
                  type="text"
                  value={editingName}
                  onChange={(e) => setEditingName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl outline-none border text-sm font-semibold mb-3"
                  style={{ backgroundColor: colors.background, color: colors.text, borderColor: colors.primary }}
                  autoFocus
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditSave(category.id)}
                    className="flex-1 py-2 cursor-pointer rounded-xl font-bold text-[10px] uppercase transition-all active:scale-95 flex items-center justify-center gap-2"
                    style={{ backgroundColor: colors.primary, color: colors.background }}
                  >
                    <Check size={14} /> Update
                  </button>
                  <button
                    onClick={handleEditCancel}
                    className="flex-1 py-2 cursor-pointer rounded-xl font-bold text-[10px] uppercase transition-all border opacity-60 hover:opacity-100"
                    style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.accent + '20' }}
                  >
                    Discard
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300"
                         style={{ backgroundColor: colors.primary + '10', color: colors.primary }}>
                        <BookOpen size={20} />
                    </div>
                    <div>
                        <h3 className="text-base font-bold line-clamp-1 transition-colors duration-300" style={{ color: colors.text }}>
                            {category.name}
                        </h3>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-40" style={{ color: colors.textSecondary }}>Collection</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 mt-4 pt-4 border-t" style={{ borderColor: colors.accent + '05' }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEditStart(category); }}
                    className="flex-1 py-2 cursor-pointer rounded-lg font-bold text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                    style={{ 
                        color: colors.primary, 
                        backgroundColor: colors.primary + '05'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colors.primary + '15'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colors.primary + '05'}
                  >
                    <Edit2 size={12} /> Edit
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteCategory(category.id); }}
                    className="p-2 cursor-pointer rounded-lg transition-all flex items-center justify-center"
                    style={{ 
                        color: '#ef4444', 
                        backgroundColor: '#ef444405' 
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#ef444410'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#ef444405'}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Enhanced Empty States */}
      {categories.length === 0 ? (
        <div 
          className="text-center py-32 rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center gap-6 opacity-30 mt-8"
          style={{ borderColor: colors.accent + '15', color: colors.textSecondary }}
        >
          <div className="p-8 rounded-full bg-accent/5">
             <Layers size={64} className="animate-pulse" />
          </div>
          <div>
            <p className="text-2xl font-bold uppercase tracking-[4px]">Vault is Empty</p>
            <p className="text-sm font-medium mt-2">Initialize your repository by adding a category</p>
          </div>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div 
          className="text-center py-32 rounded-[3rem] border-4 border-dashed flex flex-col items-center justify-center gap-6 opacity-30 mt-8"
          style={{ borderColor: colors.accent + '15', color: colors.textSecondary }}
        >
          <Search size={64} />
          <div>
            <p className="text-2xl font-bold uppercase tracking-[4px]">No Discovery</p>
            <p className="text-sm font-medium mt-2">No categories matched your search query</p>
          </div>
        </div>
      ) : null}

      {/* Premium Animated Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          <div 
            className={`absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500 ${showModalContent ? 'opacity-100' : 'opacity-0'}`}
            onClick={handleCloseModal}
          />
          
          <div 
            className={`relative rounded-[2.5rem] p-10 w-full max-w-lg border shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] transition-all duration-500 transform ${showModalContent ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}
            style={{ 
              backgroundColor: colors.sidebar || colors.background,
              borderColor: colors.accent + '30'
            }}
          >
            <div className="flex justify-between items-center mb-10">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: colors.text }}>Create New Entity</h2>
                <div className="w-12 h-1.5 rounded-full mt-2" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-12 h-12 cursor-pointer rounded-2xl transition-all flex items-center justify-center border hover:rotate-90"
                style={{ color: colors.text, borderColor: colors.accent + '20', backgroundColor: colors.background }}
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-[3px] mb-3 opacity-50" style={{ color: colors.textSecondary }}>
                    Taxonomy Identity
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Artificial Intelligence"
                  className="w-full px-6 py-4 rounded-2xl outline-none border-2 transition-all font-bold text-lg shadow-inner"
                  style={{ 
                      backgroundColor: colors.background, 
                      color: colors.text, 
                      borderColor: colors.accent + '20' 
                  }}
                  onFocus={(e) => e.target.style.borderColor = colors.primary}
                  onBlur={(e) => e.target.style.borderColor = colors.accent + '20'}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  autoFocus
                />
              </div>

              <div className="flex gap-4 pt-6 border-t" style={{ borderColor: colors.accent + '10' }}>
                <button
                  onClick={handleAddCategory}
                  className="flex-1 py-4 cursor-pointer rounded-2xl font-bold uppercase tracking-widest text-sm transition-all shadow-xl hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-3"
                  style={{ backgroundColor: colors.primary, color: colors.background }}
                >
                  Confirm Entry
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-8 py-4 cursor-pointer rounded-2xl font-bold uppercase tracking-widest text-[10px] transition-all border hover:bg-white/5 opacity-60"
                  style={{ backgroundColor: 'transparent', color: colors.text, borderColor: colors.accent + '30' }}
                >
                  Abort
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;