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

To connect the app to your Firebase project, it is necessary to set up the `firebaseConfig.js` file in the root directory of the project. For security reasons, the actual configuration is not included in this repository. The `firebaseConfigExample.js` file included in this repository can be used as a template for the firebaseConfig.js. To produce a complete `firebaseConfig.js`, take the content of the `firebaseConfigExample.js` and replace the placeholders for the following fields with valid credentials: 

- apiKey
- authDomain
- projectId
- storageBucket
- messagingSenderId
- appId

## Contributors:

Catherine Newman, Harriet Hall, Luke Ford, Stephen Lancaster and Simone Dessi

## License

This project is licensed under the [MIT License](./LICENSE).
