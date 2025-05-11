# Find a Coach

A modern web application built with Vue.js that connects coaches with students, facilitating the learning and teaching process.

<iframe src="https://drive.google.com/file/d/1f5zTItfWVX52DNXcpeyvIMwx5M1sbbSL/preview" width="560" height="315" allow="autoplay"></iframe>

## 🚀 Features

- User authentication and authorization
- Coach profile management
- Student registration and profile creation
- Real-time messaging system
- Responsive design with Tailwind CSS
- Modern UI/UX with Flowbite components
- Masonry wall layout for coach listings

## 🛠️ Tech Stack

- **Frontend Framework:** Vue.js 3
- **Language:** TypeScript
- **State Management:** Vuex 4
- **Routing:** Vue Router 4
- **Styling:** Tailwind CSS
- **UI Components:** Flowbite
- **Backend:** Firebase
- **Build Tool:** Vite
- **Package Manager:** npm

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm (comes with Node.js)
- Git

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone [your-repository-url]
   cd find-a-coach
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run deploy` - Deploy to GitHub Pages

## 🏗️ Project Structure

```
find-a-coach/
├── src/
│   ├── assets/        # Static assets
│   ├── components/    # Vue components
│   ├── data/         # Static data
│   ├── store/        # Vuex store
│   ├── types/        # TypeScript type definitions
│   ├── App.vue       # Root component
│   ├── main.ts       # Application entry point
│   ├── router.ts     # Vue Router configuration
│   └── styles.css    # Global styles
├── public/           # Public static files
└── dist/            # Production build output
```


## 👥 Authors

- Lior Silman - Initial work

## 🙏 Acknowledgments

- Vue.js team for the amazing framework
- Firebase for the backend services
- Tailwind CSS for the utility-first CSS framework
- Flowbite for the UI components
