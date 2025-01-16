export default async function Home({ searchParams }) {
  try {
    // Properly handle searchParams
    const currentGenre = await Promise.resolve(searchParams?.genre || 'action');

    const baseUrl = 'https://streaming-availability.p.rapidapi.com/v2/search/basic';
    const queryParams = new URLSearchParams({
      country: 'us',
      services: 'netflix,prime,hulu',
      output_language: 'en',
      show_type: 'movie',
      genre: currentGenre,
      page: '1'
    }).toString();

    const url = `${baseUrl}?${queryParams}`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '950a96686bmshe371fd8ef488f9ap1d3979jsn2fcd29dc5532',
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      },
      next: { revalidate: 60 }
    };

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.result) {
      throw new Error('No data received from API');
    }

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.result.map((movie) => (
            <div key={movie.imdbId} className="p-4 border rounded shadow">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              {movie.posterURLs?.original && (
                <img 
                  src={movie.posterURLs.original}
                  alt={movie.title}
                  className="w-full h-auto mt-2"
                />
              )}
              <p className="mt-2">{movie.overview}</p>
            </div>
          ))}
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error:', error);
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500 text-xl">
          Error loading movies. Please try again later.
        </p>
      </div>
    );
  }
}