export default async function handler(req, res) {
  const API_KEY = process.env.GNEWS_API_KEY || 'b8e1f194a30f64d7eb60a8e4dcb15e2b';

  const queries = [
    'fashion+trends+style+outfit',
    'celebrity+style+looks+glamour',
    'beauty+skincare+makeup+tips',
    'bikini+swimwear+beach+fashion',
    'party+outfit+nightlife+dress',
    'fitness+gym+workout+body',
    'hair+trends+hairstyle+beauty',
    'luxury+lifestyle+travel+style'
  ];

  const randomQuery = queries[Math.floor(Math.random() * queries.length)];

  try {
    const response = await fetch(
      `https://gnews.io/api/v4/search?q=${randomQuery}&lang=en&max=6&sortby=publishedAt&apikey=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status}`);
    }

    const data = await response.json();

    const articles = (data.articles || []).map(article => ({
      title: article.title || 'Untitled',
      description: article.description || '',
      image: article.image || '',
      url: article.url || '#',
      source: (article.source && article.source.name) || 'Unknown',
      publishedAt: article.publishedAt || new Date().toISOString()
    }));

    res.setHeader('Cache-Control', 'public, s-maxage=3600, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({ articles });
  } catch (error) {
    res.setHeader('Cache-Control', 'public, s-maxage=300, max-age=300');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json({
      articles: [],
      error: 'Unable to fetch news right now'
    });
  }
}