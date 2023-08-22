# Condiviso Frontend

Condiviso is a mobile app built using React Native and Expo. It is designed to help users manage food events and avoid food waste. A user can create an account, see events in their local area, post recipes and events, attend events and edit events. This repository contains the frontend codebase for the Condiviso app.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Dependencies](#dependencies)
- [Firebase Configuration](#firebase-configuration)
- [Contributors] 
- [License](#license)

## Getting Started

### Prerequisites

Install the following:

- Node.js (version 14.1.0. or higher)
- Xcode Simulator:The Xcode Simulator allows you to emulate the behavior of an iOS device directly on your computer.
- Android Studio Emulator: The Android Studio Emulator enables you to simulate the behavior of an Android device directly on your computer.


### Installation

1. Clone the repository: 
    `git clone https://github.com/your-username/condiviso-fe.git`
2. Navigate to the project directory:
    `cd condiviso-fe`
3. Install the dependencies:
    npm install


## Usage
To start the app, use the following commands:
    `npx expo start`
- Run on Android:
    `a`
- Run on iOS:
    `i`
- Run on web:
    `w`


## Dependencies

The Condiviso frontend utilizes the following major dependencies:

- **Expo**: Framework for building React Native applications
- **React Navigation**: Library for managing navigation and routing
- **Firebase**: Backend-as-a-Service platform for authentication, storage, and more
- **React Native modules**: Various modules for handling UI components, images, maps, and more

For a full list of dependencies, refer to the [package.json](./package.json) file.

## Firebase Configuration

To connect the app to your Firebase project, you will need to set up the `firebaseConfig.js` file. For security reasons, the actual configuration is not included in this repository.

To set up the `firebaseConfig.js` file, follow these steps:

1. Create a new file named `firebaseConfig.js` in the root directory of the project.
2. Open your Firebase project in the Firebase Console.
3. Go to Project Settings > General and find your Firebase SDK configuration.
4. Copy the configuration object, which looks something like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

export default firebaseConfig;

## Contributors:

Catherine Newman, Harriet Hall, Luke Ford, Stephen Lancaster and Simone Dessi

## License

This project is licensed under the [MIT License](./LICENSE).
