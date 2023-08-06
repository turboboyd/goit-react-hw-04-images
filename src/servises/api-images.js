export const fetchImages = (name, page) => {
  const KEY = '37071230-d6b04d3068f1a0950a5b376a5';
  const BASE_URL = 'https://pixabay.com/api/';

  return fetch(
    `${BASE_URL}?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw new Error('An error has occurred, please try again!');
    });
};

