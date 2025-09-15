// Imgflip API service

export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  box_count: number;
}

export interface GeneratedMeme {
  success: boolean;
  data?: {
    url: string;
    page_url: string;
  };
  error_message?: string;
}

const IMGFLIP_API_BASE = 'https://api.imgflip.com';

// Note: For production use, you should get your own username and password from imgflip.com
// These are public demo credentials
const IMGFLIP_USERNAME = 'imgflip_hubot';
const IMGFLIP_PASSWORD = 'imgflip_hubot';

export const fetchMemeTemplates = async (): Promise<MemeTemplate[]> => {
  try {
    const response = await fetch(`${IMGFLIP_API_BASE}/get_memes`);
    const data = await response.json();
    
    if (data.success) {
      return data.data.memes.slice(0, 50); // Get top 50 templates
    } else {
      throw new Error('Failed to fetch meme templates');
    }
  } catch (error) {
    console.error('Error fetching meme templates:', error);
    // Return fallback templates if API fails
    return [
      {
        id: '181913649',
        name: 'Drake Pointing',
        url: 'https://i.imgflip.com/30b1gx.jpg',
        width: 1200,
        height: 1200,
        box_count: 2
      },
      {
        id: '87743020',
        name: 'Two Buttons',
        url: 'https://i.imgflip.com/1g8my4.jpg',
        width: 600,
        height: 908,
        box_count: 3
      },
      {
        id: '112126428',
        name: 'Distracted Boyfriend',
        url: 'https://i.imgflip.com/1ur9b0.jpg',
        width: 1200,
        height: 800,
        box_count: 3
      }
    ];
  }
};

export const generateMeme = async (
  templateId: string,
  topText: string,
  bottomText: string
): Promise<GeneratedMeme> => {
  try {
    const formData = new FormData();
    formData.append('template_id', templateId);
    formData.append('username', IMGFLIP_USERNAME);
    formData.append('password', IMGFLIP_PASSWORD);
    formData.append('text0', topText);
    formData.append('text1', bottomText);

    const response = await fetch(`${IMGFLIP_API_BASE}/caption_image`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating meme:', error);
    return {
      success: false,
      error_message: 'Failed to generate meme. Please try again.',
    };
  }
};

export const getRandomMeme = async (): Promise<{ template: MemeTemplate; topText: string; bottomText: string }> => {
  const templates = await fetchMemeTemplates();
  const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
  
  const randomTexts = [
    { top: 'When you realize', bottom: 'It\'s already Friday' },
    { top: 'Me trying to code', bottom: 'Without Stack Overflow' },
    { top: 'That moment when', bottom: 'Your code actually works' },
    { top: 'Debugging be like', bottom: 'It works on my machine' },
    { top: 'When the client says', bottom: 'Just a small change' }
  ];
  
  const randomText = randomTexts[Math.floor(Math.random() * randomTexts.length)];
  
  return {
    template: randomTemplate,
    topText: randomText.top,
    bottomText: randomText.bottom
  };
};