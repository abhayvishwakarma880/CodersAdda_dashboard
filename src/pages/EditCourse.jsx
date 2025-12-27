import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2, Play, Lock, Info, Layout, Award, User, Plus, DollarSign, Upload, Video, Image as ImageIcon, X, Star } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { toast } from 'react-toastify';

function EditCourse() {
  const { colors } = useTheme();
  const { categories, courses, updateCourse } = useData();
  const navigate = useNavigate();
  const { id } = useParams();
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const course = courses.find(c => c.id === id);
    if (course) {
      setFormData({
        ...course,
        priceType: course.priceType || 'Free',
        price: course.price || '',
        LectureNumber: course.LectureNumber || '',
        promoVideo: course.promoVideo || '',
        promoVideo: course.promoVideo || '',
        promoVideoUrl: course.promoVideoUrl || '',
        faqs: course.faqs || [],
        reviews: course.reviews || []
      });
    } else {
      navigate('/dashboard/courses');
    }
  }, [id, courses, navigate]);

  if (!formData) return null;

  // File Handlers
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be under 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ 
        ...formData, 
        promoVideo: file.name,
        promoVideoUrl: URL.createObjectURL(file)
      });
      toast.info("Video selected: " + file.name);
    }
  };

  const removeVideo = () => {
    setFormData({ ...formData, promoVideo: '', promoVideoUrl: '' });
  };

  const handleAddWhatYoullLearn = () => {
    setFormData({ ...formData, whatYouWillLearn: [...formData.whatYouWillLearn, ''] });
  };

  const handleRemoveWhatYoullLearn = (index) => {
    const newList = formData.whatYouWillLearn.filter((_, i) => i !== index);
    setFormData({ ...formData, whatYouWillLearn: newList });
  };

  const handleWhatYoullLearnChange = (index, value) => {
    const newList = [...formData.whatYouWillLearn];
    newList[index] = value;
    setFormData({ ...formData, whatYouWillLearn: newList });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    updateCourse(id, formData);
    toast.success('Course updated successfully!');
    navigate('/dashboard/courses');
  };

  const labelStyle = { color: colors.textSecondary, fontSize: '12px', fontWeight: '600', marginBottom: '8px', display: 'block' };

  return (
    <div className="w-full mx-auto pb-20 pt-2 px-4 h-full overflow-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg transition-all cursor-pointer border"
          style={{ color: colors.text, backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold" style={{ color: colors.text }}>Edit Course</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* General Information */}
          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Info size={18} className="text-primary" style={{ color: colors.primary }} /> General Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label style={labelStyle}>Course Title</label>
                <input 
                  type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Instructor Name</label>
                <input 
                  type="text" required value={formData.instructor} onChange={(e) => setFormData({...formData, instructor: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none transition-all text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Category</label>
                <select 
                  required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none cursor-pointer text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                >
                  {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Technology</label>
                <input 
                  type="text" value={formData.technology} onChange={(e) => setFormData({...formData, technology: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Duration</label>
                <input 
                  type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Lecture Number</label>
                <input 
                  type="number" value={formData.LectureNumber} onChange={(e) => setFormData({...formData, LectureNumber: e.target.value})}
                  className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                />
              </div>
              <div className="space-y-1">
                <label style={labelStyle}>Price Type</label>
                <div className="flex gap-2">
                  {['Free', 'Paid'].map(type => (
                    <button 
                      key={type} type="button" onClick={() => setFormData({...formData, priceType: type, price: type === 'Free' ? '' : formData.price})}
                      className={`flex-1 py-2 rounded-md border text-sm font-semibold transition-all cursor-pointer ${formData.priceType === type ? 'shadow-sm' : 'opacity-50'}`}
                      style={{ 
                        backgroundColor: formData.priceType === type ? colors.primary : 'transparent', 
                        color: formData.priceType === type ? colors.background : colors.text,
                        borderColor: formData.priceType === type ? colors.primary : colors.accent + '30'
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {formData.priceType === 'Paid' && (
                <div className="space-y-1">
                  <label style={labelStyle}>Price (₹)</label>
                  <input 
                    type="number" required value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})}
                    className="w-full px-4 py-2 rounded-md border outline-none text-sm"
                    style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Description & Learning Objectives */}
          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h2 className="text-lg font-bold mb-6 flex items-center gap-2" style={{ color: colors.text }}>
              <Layout size={18} className="text-primary" style={{ color: colors.primary }} /> Course Details
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label style={labelStyle}>Course Description</label>
                <textarea 
                  rows="4" value={formData.about} onChange={(e) => setFormData({...formData, about: e.target.value})}
                  className="w-full px-4 py-3 rounded-md border outline-none resize-none text-sm"
                  style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                ></textarea>
              </div>

              <div className="space-y-2">
                <label style={labelStyle}>What you will learn</label>
                <div className="space-y-2">
                  {formData.whatYouWillLearn.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" value={point} onChange={(e) => handleWhatYoullLearnChange(index, e.target.value)}
                        className="flex-1 px-4 py-2 rounded-md border outline-none text-sm"
                        style={{ backgroundColor: colors.background, borderColor: colors.accent + '30', color: colors.text }}
                      />
                      <button type="button" onClick={() => handleRemoveWhatYoullLearn(index)} className="p-2 text-red-500 border rounded-md hover:bg-red-50 transition-all cursor-pointer">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={handleAddWhatYoullLearn} className="mt-2 flex items-center gap-1 text-xs font-bold transition-all cursor-pointer" style={{ color: colors.primary }}>
                  <Plus size={16} /> Add Point
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Media */}
          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: colors.text }}>Course Assets</h3>
            
            <div className="space-y-4">
              <div>
                <label style={labelStyle}>Thumbnail Image</label>
                <div 
                  onClick={() => imageInputRef.current.click()}
                  className="relative h-40 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all hover:bg-black/5"
                  style={{ borderColor: colors.accent + '30', backgroundColor: colors.background }}
                >
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center opacity-40">
                      <ImageIcon size={32} className="mx-auto mb-2" />
                      <p className="text-xs font-bold">Upload Image</p>
                    </div>
                  )}
                  <input type="file" ref={imageInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Promo Video</label>
                <div 
                  className="h-32 rounded-lg border-2 border-dashed flex flex-col items-center justify-center relative transition-all"
                  style={{ borderColor: colors.accent + '30', backgroundColor: colors.background }}
                >
                  {formData.promoVideo ? (
                    <div className="flex flex-col items-center p-2 text-center">
                      <Video size={24} className="text-green-500 mb-1" />
                      <p className="text-[10px] font-bold truncate max-w-[150px]">{formData.promoVideo}</p>
                      <button type="button" onClick={removeVideo} className="mt-2 text-[10px] font-bold text-red-500 hover:underline cursor-pointer">Remove</button>
                    </div>
                  ) : (
                    <div onClick={() => videoInputRef.current.click()} className="text-center opacity-40 cursor-pointer">
                      <Video size={32} className="mx-auto mb-2" />
                      <p className="text-xs font-bold">Upload Video</p>
                      <input type="file" ref={videoInputRef} onChange={handleVideoChange} accept="video/*" className="hidden" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Course Status */}
          {/* FAQs Section */}
          <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
              <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Course FAQs</h3>
                  <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, faqs: [...(prev.faqs || []), { question: '', answer: '' }] }))}
                      className="text-[10px] font-black uppercase tracking-widest text-blue-500 cursor-pointer hover:underline flex items-center gap-1"
                  >
                      <Plus size={12} /> Add FAQ
                  </button>
              </div>
              
              <div className="space-y-4">
                  {(formData.faqs || []).map((faq, index) => (
                      <div key={index} className="flex gap-4 items-start p-4 rounded bg-black/5">
                          <div className="flex-1 space-y-3">
                              <input
                                  type="text"
                                  value={faq.question}
                                  onChange={(e) => {
                                      const newFaqs = [...(formData.faqs || [])];
                                      newFaqs[index].question = e.target.value;
                                      setFormData({ ...formData, faqs: newFaqs });
                                  }}
                                  placeholder="Question"
                                  className="w-full bg-transparent border-b border-black/10 outline-none text-sm font-bold"
                              />
                              <textarea
                                  value={faq.answer}
                                  onChange={(e) => {
                                      const newFaqs = [...(formData.faqs || [])];
                                      newFaqs[index].answer = e.target.value;
                                      setFormData({ ...formData, faqs: newFaqs });
                                  }}
                                  placeholder="Answer"
                                  rows={2}
                                  className="w-full bg-transparent outline-none text-xs opacity-80 resize-none"
                              />
                          </div>
                          <button
                              type="button"
                              onClick={() => {
                                  const newFaqs = formData.faqs.filter((_, i) => i !== index);
                                  setFormData({ ...formData, faqs: newFaqs });
                              }}
                              className="text-red-500 opacity-50 hover:opacity-100 cursor-pointer"
                          >
                              <Trash2 size={14} />
                          </button>
                      </div>
                  ))}
                  {(!formData.faqs || formData.faqs.length === 0) && <p className="text-xs opacity-40 text-center py-4">No FAQs added yet.</p>}
              </div>
          </div>

          {/* Reviews Section */}
          <div className="p-6 rounded border shadow-sm space-y-6" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
               <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider opacity-60">Course Reviews</h3>
                  <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, reviews: [...(prev.reviews || []), { user: '', rating: 5, comment: '' }] }))}
                      className="text-[10px] font-black uppercase tracking-widest text-blue-500 cursor-pointer hover:underline flex items-center gap-1"
                  >
                      <Plus size={12} /> Add Review
                  </button>
              </div>

              <div className="space-y-4">
                  {(formData.reviews || []).map((review, index) => (
                      <div key={index} className="flex gap-4 items-start p-4 rounded bg-black/5">
                          <div className="flex-1 space-y-3">
                              <div className="flex gap-4">
                                  <input
                                      type="text"
                                      value={review.user}
                                      onChange={(e) => {
                                          const newReviews = [...(formData.reviews || [])];
                                          newReviews[index].user = e.target.value;
                                          setFormData({ ...formData, reviews: newReviews });
                                      }}
                                      placeholder="Student Name"
                                      className="flex-1 bg-transparent border-b border-black/10 outline-none text-sm font-bold"
                                  />
                                  <div className="flex items-center gap-2">
                                      <span className="text-xs font-bold opacity-60">Rating:</span>
                                      <select
                                          value={review.rating}
                                          onChange={(e) => {
                                              const newReviews = [...(formData.reviews || [])];
                                              newReviews[index].rating = Number(e.target.value);
                                              setFormData({ ...formData, reviews: newReviews });
                                          }}
                                          className="bg-transparent text-sm font-bold outline-none cursor-pointer"
                                      >
                                          {[1,2,3,4,5].map(r => <option key={r} value={r}>{r}</option>)}
                                      </select>
                                      <Star size={12} fill="currentColor" className="text-yellow-500" />
                                  </div>
                              </div>
                              <textarea
                                  value={review.comment}
                                  onChange={(e) => {
                                      const newReviews = [...(formData.reviews || [])];
                                      newReviews[index].comment = e.target.value;
                                      setFormData({ ...formData, reviews: newReviews });
                                  }}
                                  placeholder="Review Comment"
                                  rows={2}
                                  className="w-full bg-transparent outline-none text-xs opacity-80 resize-none"
                              />
                          </div>
                          <button
                              type="button"
                              onClick={() => {
                                  const newReviews = formData.reviews.filter((_, i) => i !== index);
                                  setFormData({ ...formData, reviews: newReviews });
                              }}
                              className="text-red-500 opacity-50 hover:opacity-100 cursor-pointer"
                          >
                              <Trash2 size={14} />
                          </button>
                      </div>
                  ))}
                  {(!formData.reviews || formData.reviews.length === 0) && <p className="text-xs opacity-40 text-center py-4">No reviews added yet.</p>}
              </div>
          </div>

          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <h3 className="text-sm font-bold mb-4" style={{ color: colors.text }}>Course Status</h3>
            <div className="flex gap-4">
                {['Active', 'Disabled'].map(stat => (
                    <button 
                        key={stat}
                        type="button"
                        onClick={() => setFormData({...formData, status: stat})}
                        className={`flex-1 py-2.5 rounded border text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer ${
                            formData.status === stat 
                            ? 'bg-primary text-white border-primary' 
                            : 'bg-transparent opacity-40 border-accent/20'
                        }`}
                        style={{ 
                            backgroundColor: formData.status === stat ? colors.primary : 'transparent',
                            borderColor: formData.status === stat ? colors.primary : colors.accent + '20'
                        }}
                    >
                        {stat}
                    </button>
                ))}
            </div>
          </div>

          {/* Submit */}
          <div className="p-6 rounded-lg border shadow-sm" style={{ backgroundColor: colors.sidebar || colors.background, borderColor: colors.accent + '20' }}>
            <button 
              type="submit"
              className="w-full py-3 rounded-md font-bold transition-all shadow-md text-sm uppercase tracking-wider active:scale-[0.98] cursor-pointer mb-3"
              style={{ backgroundColor: colors.primary, color: colors.background }}
            >
              Update Course
            </button>
            <button 
              type="button" onClick={() => navigate('/dashboard/courses')}
              className="w-full py-3 rounded-md font-bold transition-all border text-xs uppercase tracking-wider opacity-60 hover:opacity-100 cursor-pointer"
              style={{ color: colors.text, borderColor: colors.accent + '30' }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditCourse;
