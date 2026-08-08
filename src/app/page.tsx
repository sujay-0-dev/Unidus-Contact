'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Link as LinkIcon, Image as ImageIcon, LayoutTemplate, Upload } from 'lucide-react';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function Dashboard() {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        // Construct full URL if it's a relative path, otherwise use it directly
        const fullUrl = data.url.startsWith('http') ? data.url : `${window.location.origin}${data.url}`;
        setImageUrl(fullUrl);
      } else {
        alert('Upload failed: ' + data.error);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image.');
    } finally {
      setIsUploading(false);
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        if (file) {
          handleFileUpload(file);
          e.preventDefault();
          return;
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    } else {
      // Handle dropped URL string
      const text = e.dataTransfer.getData('text/uri-list') || e.dataTransfer.getData('text/plain');
      if (text && (text.startsWith('http') || text.startsWith('data:image'))) {
        setImageUrl(text);
      }
    }
  };

  const handleGenerate = () => {
    if (!imageUrl) {
      alert('Please provide an Image URL first.');
      return;
    }
    
    try {
      const data = {
        i: imageUrl,
        t: title || 'Awesome Post',
        d: description || 'Check out this amazing content.',
        r: redirectUrl || '',
      };
      
      const jsonStr = JSON.stringify(data);
      const encoded = btoa(encodeURIComponent(jsonStr)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      
      const origin = window.location.origin;
      setGeneratedLink(`${origin}/p/${encoded}`);
    } catch (e) {
      console.error('Failed to encode data', e);
      alert('Failed to generate link.');
    }
  };

  const handleCopy = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans selection:bg-[#2dbfbb] selection:text-white pb-20">
      {/* HEADER */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#2dbfbb]/10 p-2 rounded-xl text-[#2dbfbb]">
              <FacebookIcon className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Link Generator</h1>
          </div>
          <a href="/connect" className="text-slate-500 hover:text-[#2dbfbb] font-medium transition-colors">
            Back to Connect
          </a>
        </div>
      </header>

      <main className="container mx-auto px-6 mt-12 max-w-6xl">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Facebook Image Link Generator
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Create dynamic links that perfectly render your images on Facebook. No manual image uploads needed—just generate, copy, and paste!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          
          {/* EDITOR SECTION */}
          <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <LayoutTemplate className="w-6 h-6 text-[#2dbfbb]" />
              Post Details
            </h3>
            
            <div className="space-y-6">
              <div 
                onPaste={handlePaste}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <label className="block text-sm font-bold text-slate-700 mb-2 flex justify-between">
                  <span>Image URL (Or paste/drop an image)</span>
                  {isUploading && <span className="text-[#2dbfbb] animate-pulse">Uploading...</span>}
                </label>
                <div className={`relative rounded-xl transition-all ${isDragging ? 'ring-4 ring-[#2dbfbb]/50' : ''}`}>
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    disabled={isUploading}
                    placeholder="https://example.com/image.jpg or Ctrl+V here"
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2dbfbb] focus:bg-white transition-all text-slate-900 disabled:opacity-50"
                  />
                  <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-2 text-slate-400 hover:text-[#2dbfbb] hover:bg-[#2dbfbb]/10 rounded-lg transition-colors"
                      title="Upload an image from your computer"
                    >
                      <Upload className="w-5 h-5" />
                    </button>
                    <input 
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          handleFileUpload(e.target.files[0]);
                        }
                        // Reset input so the same file can be selected again
                        e.target.value = '';
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 border-2 border-dashed border-transparent pointer-events-none rounded-xl peer-focus:border-transparent"></div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Check out our new product!"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2dbfbb] focus:bg-white transition-all text-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a compelling description for your preview..."
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2dbfbb] focus:bg-white transition-all text-slate-900 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Redirect URL (Where users go when they click)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <LinkIcon className="w-5 h-5" />
                  </div>
                  <input
                    type="url"
                    value={redirectUrl}
                    onChange={(e) => setRedirectUrl(e.target.value)}
                    placeholder="https://unidus.co.in/promotion"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2dbfbb] focus:bg-white transition-all text-slate-900"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!imageUrl || isUploading}
                className="w-full mt-4 bg-[#2dbfbb] hover:bg-[#25a3a0] disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#2dbfbb]/20 flex justify-center items-center gap-2"
              >
                <LinkIcon className="w-5 h-5" />
                Generate Link
              </button>
            </div>
          </div>

          {/* PREVIEW & GENERATED LINK SECTION */}
          <div className="space-y-8">
            {/* Generated Link */}
            <div className="bg-white rounded-3xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100">
              <h3 className="text-xl font-bold mb-4">Your Generated Link</h3>
              {generatedLink ? (
                <div className="space-y-4">
                  <p className="text-sm text-slate-500">Paste this link directly into your Facebook post. Facebook will automatically scrape it and show the image preview below!</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      readOnly 
                      value={generatedLink}
                      className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-slate-600 font-mono text-sm focus:outline-none"
                    />
                    <button 
                      onClick={handleCopy}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all shadow-lg ${copied ? 'bg-green-500 shadow-green-500/30' : 'bg-[#2dbfbb] hover:bg-[#25a3a0] shadow-[#2dbfbb]/30'}`}
                    >
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-200 border-dashed">
                  <p className="text-slate-400">Enter an image URL on the left to generate your shareable link.</p>
                </div>
              )}
            </div>

            {/* Facebook Preview Mockup */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Facebook Preview</h3>
              
              <div className="border border-slate-200 rounded-lg overflow-hidden bg-[#f0f2f5] max-w-md mx-auto">
                <div className="bg-white p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                  <div>
                    <div className="h-3 w-24 bg-slate-200 rounded mb-1"></div>
                    <div className="h-2 w-16 bg-slate-200 rounded"></div>
                  </div>
                </div>
                
                {/* Post Text */}
                <div className="bg-white px-3 pb-3">
                  <p className="text-[15px] text-[#050505]">{generatedLink || "https://unidus.co.in/..."}</p>
                </div>

                {/* Shared Link Card */}
                {imageUrl ? (
                  <div className="bg-[#f0f2f5] border-t border-slate-200 cursor-pointer">
                    <div className="w-full h-[235px] overflow-hidden bg-slate-200 flex items-center justify-center">
                      <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
                    </div>
                    <div className="p-3 bg-[#f0f2f5]">
                      <div className="text-[12px] text-[#65676B] uppercase tracking-wide truncate mb-1">UNIDUS-CONTACT.VERCEL.APP</div>
                      <div className="text-[16px] font-semibold text-[#050505] leading-snug truncate">{title || 'Awesome Post'}</div>
                      <div className="text-[14px] text-[#65676B] mt-1 line-clamp-1">{description || 'Check out this amazing content.'}</div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#f0f2f5] border-t border-slate-200">
                    <div className="w-full h-[235px] bg-slate-200 flex items-center justify-center">
                      <ImageIcon className="w-12 h-12 text-slate-300" />
                    </div>
                    <div className="p-3">
                      <div className="h-3 w-32 bg-slate-300 rounded mb-2"></div>
                      <div className="h-4 w-48 bg-slate-300 rounded mb-2"></div>
                      <div className="h-3 w-full bg-slate-300 rounded"></div>
                    </div>
                  </div>
                )}
                
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
