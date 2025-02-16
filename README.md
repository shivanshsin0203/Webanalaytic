# Analytics NPM Package

## Overview
`Analytics` is a simple React component that tracks user sessions, device types, and country information for website analytics. The package automatically captures session data and sends it to a specified tracking server.

## Installation

You can install the package using npm or yarn:

```sh
npm install webanalytic
```

or

```sh
yarn add webanalytic
```

## Usage

Import the `Analytics` component in your React application and include it in your component tree.

```tsx
import Analytics from "webanalytic";

function App() {
  return (
    <>
      <Analytics keyId="your-tracking-key" />
      <h1>Welcome to My Website</h1>
    </>
  );
}

export default App;
```

## Props

| Prop   | Type   | Description |
|--------|--------|-------------|
| `keyId` | `string` | A unique tracking key to identify analytics data. |

## Features
- Tracks unique user sessions using `localStorage`.
- Detects device type using `ua-parser-js`.
- Fetches country and IP information using `ipapi.co`.
- Sends analytics data to the backend server at `http://127.0.0.1:8787/track`.

## How It Works
1. The component runs inside `useEffect` when mounted.
2. It checks for an existing session ID in `localStorage`.
3. If no session ID exists, it generates a new one and stores it.
4. The component determines the device type.
5. It fetches the user's country and IP address from `ipapi.co`.
6. The collected data is sent to the backend server.

## API Request Structure
The analytics data is sent via a `POST` request to `http://127.0.0.1:8787/track` with the following JSON payload:

```json
{
  "keyId": "your-tracking-key",
  "sessionId": "random-generated-id",
  "device": "desktop or mobile",
  "country": "US or Unknown",
  "sessionIdPresent": true
}
```

## Notes
- Ensure the backend server at `http://127.0.0.1:8787/track` is set up to receive analytics data.
- If `ipapi.co` fails, the country data will be set to "Unknown".

## License
This project is licensed under the MIT License.

