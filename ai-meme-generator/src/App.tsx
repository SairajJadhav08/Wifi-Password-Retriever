import React, { useState, useEffect } from 'react';
import './App.css';
import * as MemeService from './services/memeService';
import type { MemeTemplate, GeneratedMeme } from './services/memeService';

function App() {
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<MemeTemplate | null>(null);
  const [generatedMeme, setGeneratedMeme] = useState<GeneratedMeme | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [templates, setTemplates] = useState<MemeTemplate[]>([]);
  const [error, setError] = useState<string>('');
  const [customTemplates, setCustomTemplates] = useState<MemeTemplate[]>([]);
  const [showAllTemplates, setShowAllTemplates] = useState(false);

  // Load meme templates on component mount
  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const fetchedTemplates = await MemeService.fetchMemeTemplates();
        setTemplates(fetchedTemplates);
      } catch (err) {
        setError('Failed to load meme templates');
        console.error('Error loading templates:', err);
      }
    };
    
    loadTemplates();
  }, []);

  const handleGenerateMeme = async () => {
    if (!selectedTemplate) {
      alert('Please select a meme template first!');
      return;
    }

    if (!topText.trim() && !bottomText.trim()) {
      alert('Please enter some text for your meme!');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await MemeService.generateMeme(selectedTemplate.id, topText, bottomText);
      
      if (result.success && result.data) {
         setGeneratedMeme(result);
      } else {
        setError(result.error_message || 'Failed to generate meme');
      }
    } catch (err) {
      setError('An error occurred while generating the meme');
      console.error('Error generating meme:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRandomMeme = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const randomMemeData = await MemeService.getRandomMeme();
      setSelectedTemplate(randomMemeData.template);
      setTopText(randomMemeData.topText);
      setBottomText(randomMemeData.bottomText);
      
      // Auto-generate the meme
      const result = await MemeService.generateMeme(
        randomMemeData.template.id,
        randomMemeData.topText,
        randomMemeData.bottomText
      );
      
      if (result.success && result.data) {
         setGeneratedMeme(result);
      } else {
        setError(result.error_message || 'Failed to generate random meme');
      }
    } catch (err) {
      setError('An error occurred while generating random meme');
      console.error('Error generating random meme:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadMeme = () => {
    if (generatedMeme?.data) {
      const link = document.createElement('a');
      link.href = generatedMeme.data.url;
      link.download = 'meme.jpg';
      link.click();
    }
  };

  const handleCustomImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        const customTemplate: MemeTemplate = {
          id: `custom-${Date.now()}`,
          name: file.name.split('.')[0] || 'Custom Image',
          url: imageUrl,
          width: 500,
          height: 500,
          box_count: 2
        };
        setCustomTemplates(prev => [customTemplate, ...prev]);
        setSelectedTemplate(customTemplate);
      };
      reader.readAsDataURL(file);
    } else {
      setError('Please select a valid image file.');
    }
  };

  const loadMoreTemplates = async () => {
    setIsLoading(true);
    setError('');
    try {
      const newTemplates = await MemeService.fetchMemeTemplates();
      // Get more templates by fetching again and filtering out duplicates
      const uniqueNewTemplates = newTemplates.filter(
        newTemplate => !templates.some(existingTemplate => existingTemplate.id === newTemplate.id)
      );
      if (uniqueNewTemplates.length > 0) {
        setTemplates(prev => [...prev, ...uniqueNewTemplates]);
      } else {
        setError('No new templates available at the moment.');
      }
    } catch (err) {
      setError('Failed to load more templates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🤖 AI Meme Generator</h1>
        <p>Create hilarious memes with just a few clicks!</p>
      </header>

      <main className="app-main">
        <div className="input-section">
          <h2>Create Your Meme</h2>
          
          <div className="text-inputs">
            <div className="input-group">
              <label htmlFor="top-text">Top Text:</label>
              <input
                id="top-text"
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                placeholder="Enter top text..."
                maxLength={100}
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="bottom-text">Bottom Text:</label>
              <input
                id="bottom-text"
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                placeholder="Enter bottom text..."
                maxLength={100}
              />
            </div>
          </div>

          <div className="template-section">
            <h3>Choose a Template</h3>
            
            <div className="template-controls">
              <input
                type="file"
                id="custom-template"
                accept="image/*"
                onChange={handleCustomImageUpload}
                style={{ display: 'none' }}
              />
              <button 
                onClick={() => document.getElementById('custom-template')?.click()}
                className="upload-btn"
              >
                📱 Upload Custom Image
              </button>
              
              <button 
                onClick={loadMoreTemplates}
                disabled={isLoading}
                className="load-more-btn"
              >
                {isLoading ? 'Loading...' : '🔄 Load More Templates'}
              </button>
            </div>
            
            <div className="template-grid">
              {[...customTemplates, ...(showAllTemplates ? templates : templates.slice(0, 12))].map((template) => (
                <div
                  key={template.id}
                  className={`template-card ${
                    selectedTemplate?.id === template.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                >
                  <img src={template.url} alt={template.name} />
                  <p>{template.name}</p>
                  {template.id.startsWith('custom-') && (
                    <span className="custom-badge">Custom</span>
                  )}
                </div>
              ))}
            </div>
            
            {!showAllTemplates && templates.length > 12 && (
              <button 
                onClick={() => setShowAllTemplates(true)}
                className="show-all-btn"
              >
                Show All Templates ({templates.length})
              </button>
            )}
          </div>

          <div className="action-buttons">
            <button 
              onClick={handleGenerateMeme} 
              disabled={isLoading || !selectedTemplate}
              className="generate-btn"
            >
              {isLoading ? 'Generating...' : 'Generate Meme'}
            </button>
            
            <button 
              onClick={handleRandomMeme}
              disabled={isLoading}
              className="random-btn"
            >
              {isLoading ? 'Generating...' : '🎲 Random Meme'}
            </button>
          </div>
        </div>

        <div className="preview-section">
          <h2>Preview</h2>
          {error && (
            <div className="error-message">
              <p>❌ {error}</p>
            </div>
          )}
          {generatedMeme?.data ? (
            <div className="meme-preview">
              <img src={generatedMeme.data.url} alt="Generated meme" />
              <div className="meme-actions">
                <button onClick={downloadMeme} className="download-btn">
                  📥 Download
                </button>
                <button 
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'Check out this meme!',
                        url: generatedMeme.data!.page_url
                      });
                    } else {
                      navigator.clipboard.writeText(generatedMeme.data!.url);
                      alert('Meme URL copied to clipboard!');
                    }
                  }}
                  className="share-btn"
                >
                  🔗 Share
                </button>
              </div>
            </div>
          ) : (
            <div className="placeholder">
              <p>Your generated meme will appear here</p>
              {selectedTemplate && (
                <div className="template-preview">
                  <img src={selectedTemplate.url} alt="Selected template" />
                  <div className="text-overlay">
                    {topText && <div className="top-text">{topText}</div>}
                    {bottomText && <div className="bottom-text">{bottomText}</div>}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;