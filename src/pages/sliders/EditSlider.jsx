import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Upload, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useData } from '../../context/DataContext';
import { toast } from 'react-toastify';

function EditSlider() {
  const { colors } = useTheme();
  const { sliders, updateSlider } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const slider = sliders.find(s => s.id === id);
    if (slider) {
      setFormData(slider);
    } else {
      navigate('/dashboard/slider');
    }
  }, [id, sliders, navigate]);

  if (!formData) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.image) {
      toast.warning("Please select an image");
      return;
    }
    updateSlider(id, formData);
    toast.success('Slider updated successfully!');
    navigate('/dashboard/slider');
  };

  return (
    <div className="w-full mx-auto pb-20 pt-4 px-4 h-full overflow-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded transition-all cursor-pointer border"
          style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Edit Slider</h1>
          <p className="text-xs font-bold opacity-40 uppercase tracking-widest">Update slider image</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="p-6 rounded border shadow-sm space-y-4" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2 block">Slider Title</label>
            <input 
              type="text" 
              value={formData.title} 
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter slider title"
              className="w-full px-4 py-3 rounded border outline-none text-sm font-semibold transition-all"
              style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
            />
          </div>

          <h3 className="text-sm font-bold uppercase tracking-wider opacity-60 pt-4">Slider Image</h3>
          
          <div
            onClick={() => fileInputRef.current.click()}
            className="relative h-96 rounded border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:bg-black/5"
            style={{ borderColor: colors.accent + '30', backgroundColor: colors.background }}
          >
            {formData.image ? (
              <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center opacity-40">
                <Upload size={48} className="mx-auto mb-2" />
                <p className="text-sm font-bold">Click to upload image</p>
                <p className="text-xs mt-1">Max size: 5MB</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>

        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            className="flex-1 py-4 rounded font-black text-xs uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-3 cursor-pointer"
            style={{ backgroundColor: colors.primary, color: colors.background }}
          >
            <Save size={18} /> Update Slider
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/slider')}
            className="flex-1 py-4 rounded font-black text-xs uppercase tracking-widest border opacity-60 hover:opacity-100 transition-all flex items-center justify-center gap-3 cursor-pointer"
            style={{ borderColor: colors.accent + '30', color: colors.text }}
          >
            <X size={18} /> Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditSlider;
