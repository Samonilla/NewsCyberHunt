# News CyberHunt

A modern, interactive web-based cyberhunt game for news departments. Teams compete to solve investigative questions while earning points and using hints strategically.

## Features

- **Team-based Gameplay**: Multiple teams can participate simultaneously
- **Progressive Question Reveal**: Questions are revealed one by one after correct answers
- **Live Leaderboard**: Real-time scoring and ranking updates
- **Hint System**: Teams can use hints for reduced points (2 points instead of 5)
- **Google Sheets Integration**: Questions loaded directly from a published Google Sheet
- **Modern UI**: Cyberpunk-inspired design with smooth animations
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Auto-refresh**: Live updates without manual page refresh

## Game Rules

1. **Scoring**:
   - Correct answer without hint: 5 points
   - Correct answer with hint: 2 points
   - Teams are ranked by total score, then by questions completed

2. **Progression**:
   - Each team gets 12 questions
   - Questions are revealed sequentially
   - Teams must answer correctly to advance to the next question

3. **Hints**:
   - Each question has one hint available
   - Using a hint reduces the potential points from 5 to 2
   - Hints can only be used once per question

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Samonilla/NewsCyberHunt.git
cd NewsCyberHunt
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Google Sheets Setup

1. Create a Google Sheet with the following columns:
   - `clue_id`: Unique identifier for each question
   - `title`: The question text
   - `answer_regex`: Regular expression pattern for the correct answer
   - `hint`: Hint text to help teams

2. Publish the sheet to the web:
   - File → Share → Publish to web
   - Choose "Entire Document" and "CSV" format
   - Copy the published URL

3. Update the URL in `src/App.jsx` (line 25) with your published sheet URL

## Deployment

### Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts to connect to your Vercel account and deploy

### Manual Build

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory

3. Deploy the `dist` directory to your web server

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header
│   ├── TeamSetup.jsx   # Team registration
│   ├── Game.jsx        # Main game interface
│   └── Leaderboard.jsx # Live leaderboard
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles
```

## Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: HTTP client for API calls
- **PapaParse**: CSV parsing for Google Sheets
- **Lucide React**: Icon library
- **Framer Motion**: Animation library
- **CSS3**: Modern styling with gradients and animations

## Customization

### Styling
- Modify `src/index.css` for global styles
- Each component has its own CSS file for component-specific styles
- The color scheme uses CSS custom properties for easy theming

### Questions
- Update the Google Sheet to add new questions
- The app automatically loads the first 12 questions from the sheet
- Ensure answer regex patterns are case-insensitive and flexible

### Game Rules
- Modify scoring logic in `src/App.jsx` (submitAnswer function)
- Adjust hint penalties in the same function
- Change the number of questions by modifying the slice operation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.

## Support

For questions or issues, please open an issue on GitHub or contact the development team. 