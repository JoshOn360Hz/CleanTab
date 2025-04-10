# CleanTab - Minimal New Tab Extension

CleanTab is a minimal, customizable new tab page for Chrome that offers a sleek design, weather information, search functionality, and customizable shortcuts. This extension replaces your default new tab page with a user-friendly interface and the ability to upload your background image and personalize your shortcuts.

## Features

- **Weather Information**: Displays real-time weather data for a specified city, including temperature, weather conditions, and an icon representing the weather.
- **Customizable Shortcuts**: Add and remove custom shortcuts with URLs and display the corresponding favicon.
- **Search Bar**: Search the web using Google or directly visit a URL entered in the search bar.
- **Background Image**: Upload and set your own background image to personalize the new tab page.
- **Settings**: Modify your API key, city, country code, and shortcuts via a simple settings modal.

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/JoshOn360Hz/CleanTab.git
    cd CleanTab
    ```

2. **Open Chrome** and go to `chrome://extensions/`.

3. Enable **Developer Mode** by toggling the switch at the top right.

4. Click **Load unpacked**, then select the folder where you cloned CleanTab.

5. Once installed, your Chrome's **new tab page** will be replaced with CleanTab.

## Usage

1. **Search**: Simply type into the search bar to search Google or enter a URL to navigate directly.
2. **Weather**: The weather will be automatically displayed based on the city you've set. You can update the city and API key from the settings.
3. **Shortcuts**: Add and remove shortcuts from the settings modal. Shortcuts are displayed below the search bar and can be clicked to open the specified URLs.
4. **Background**: Upload your background image by clicking the **Upload** button.

## Customization

- **API Key**: You need an API key from [OpenWeather](https://openweathermap.org/api) to fetch weather data. Enter it in the settings modal.
- **City & Country Code**: Modify the default city and country code to fetch weather for the location of your choice.
- **Shortcuts**: You can add custom shortcuts with names and URLs. You can also remove them easily from the settings.

## Contributing

1. Fork the repository.
2. Create your branch: `git checkout -b feature/YourFeature`.
3. Commit your changes: `git commit -m 'Add your feature'`.
4. Push to the branch: `git push origin feature/YourFeature`.
5. Open a pull request.



