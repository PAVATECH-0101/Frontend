# Accessibility App

## Overview

The **Accessibility App** is designed to help users with mobility impairments find accessible routes in urban environments. The app provides suggestions for stair-free paths, routes with ramps, and other features to accommodate wheelchair users and others with accessibility needs. The app uses Google Maps and Azure services for real-time data, AI-powered path analysis, and accessibility recommendations.

---

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Getting Started](#getting-started)
4. [Environment Variables](#environment-variables)
5. [Usage](#usage)
6. [API Endpoints](#api-endpoints)
7. [Accessibility Considerations](#accessibility-considerations)
8. [Contributing](#contributing)
9. [License](#license)

---

## Features

- **Route Suggestions**: Find accessible routes to destinations, avoiding stairs and other barriers.
- **Real-Time Path Updates**: Get live information about temporary blockages (construction, street repairs, etc.).
- **AI-Powered Path Analysis**: Uses Azure Cognitive Services and Google Maps Street View to detect obstacles, ramps, and stairs.
- **Voice Commands**: Allows users to interact with the app via voice for hands-free use.
- **Screen Reader Compatibility**: Optimized for screen readers to help visually impaired users navigate.
- **Custom Alerts**: Notify users of construction and path closures that may impact their journey.

---

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Axios**: For making HTTP requests from the client to the server.
- **React Router**: For handling navigation and routing within the app.

### Backend
- **Node.js**: A JavaScript runtime for building scalable network applications.
- **Express.js**: A web application framework for Node.js.
- **Azure Blob Storage**: For storing images, videos, and geographic data.
- **Google Maps API**: For retrieving and analyzing map data.
- **Azure Cognitive Services**: For analyzing images and videos (e.g., detecting ramps, stairs, and obstacles).

### AI & Machine Learning
- **Azure Machine Learning**: For creating models that analyze map and image data to detect accessibility features.
- **Google Maps Elevation API**: To assess the topography and detect elevation changes.

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:
- **Node.js** (v14+): [Install Node.js](https://nodejs.org/en/)
- **npm** (v6+): npm is bundled with Node.js, but you can update it using `npm install npm@latest -g`.
- **Azure Account**: Set up an account on [Azure](https://azure.microsoft.com/) to use Cognitive Services.
- **Google Cloud Platform Account**: Set up an account on [Google Cloud](https://cloud.google.com/) to access Google Maps APIs.

---

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/accessibility-app.git
   cd accessibility-app

- **Overview**: Gives a high-level summary of what the app does and why it's useful.
- **Features**: Lists the main functionality, including AI-powered route analysis, voice commands, and accessibility support.
- **Tech Stack**: Breaks down the technologies used in the frontend, backend, and machine learning components.
- **Getting Started**: Provides clear instructions for installing dependencies, running the app, and setting up environment variables.
- **API Endpoints**: Outlines the main API functionality for retrieving accessible route suggestions, with example requests and responses.
- **Accessibility Considerations**: Highlights the accessibility features of the app, showing that it's designed with inclusivity in mind.
- **Contributing**: Encourages open-source contributions and outlines the steps to contribute to the project.


Accessibility Considerations

-High Contrast Mode: The app uses a high contrast color scheme for users with visual impairments.
-Large Buttons: The UI features large, easy-to-press buttons for users with limited mobility.
-Screen Reader Support: All components are optimized for screen readers.
-Voice Commands: Users can input destinations or navigate through the app using voice commands.
Contributing
-We welcome contributions to this project! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.