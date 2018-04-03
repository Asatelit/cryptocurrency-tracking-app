![](https://raw.githubusercontent.com/asatelit/cryptocurrency-tracking-app/master/doc/images/cryptocurrency-tracking-app.jpg)

# Cryptocurrency Tracking App

A sample financial app for keeping track of the cryptocurrency market built on top of React, Redux,
[Wijmo FlexGrid](https://www.grapecity.com/en/wijmo-flexgrid),
[Wijmo FlexChart](https://www.grapecity.com/en/wijmo-flexchart) and Material UI.

## Getting Started

### Requirements

  * Mac OS X, Windows, or Linux
  * [Node.js](https://nodejs.org/) v8 or newer
  * `npm` v5 or newer (included in node.js installation)
  * Text editor or IDE pre-configured with React/JSX/Flow/ESlint

### Directory Layout

```
.
├── /build/                         # The folder for compiled output
├── /node_modules/                  # 3rd-party libraries and utilities
├── /src/                           # The source code of the application
│   ├── /actions/                   # Action creators that allow to trigger a dispatch to stores
│   ├── /components/                # React components
│   ├── /constants/                 # Constants (action types etc.)
│   ├── /reducers/                  # Reducers contain the application state and logic
│   ├── /routes/                    # Page/screen components along with the routing information
│   ├── /store/                     # Holds application state
│   ├── /utils/                     # Utility classes and functions
│   ├── /index.js                   # Startup script
│   └── /registerServiceWorker.js   # Lets the app load faster on subsequent visits in production
├── /public/                        # Static files which are copied into the /build/ folder
└── package.json                    # The list of 3rd party libraries and utilities
```

### How to Install

```shell
$ npm install
```

This will install both run-time project dependencies and developer tools listed in package.json file.

### How to Start

```shell
$ npm start
```

This command will build the app from the source files (`/src`) into the output `/build` folder.
As soon as the initial build completes, it will start a light-weight developer server.

Now you can open your web app in a browser and start hacking.
Whenever you modify any of the source files inside the /src folder, the module bundler (Webpack)
will recompile the app on the fly and refresh all the connected browsers.

Note that the npm start command launches the app in development mode, the compiled output files are not optimized
and minimized in this case.

### How to Build

If you need just to build the app (without running a dev server), simply run:

```shell
$ npm run build
```

This command builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
By default, it also includes a service worker so that your app loads from local cache on future visits.

Your app is ready to be deployed.

### References

This project was bootstrapped with:
* [Create React App](./doc/README.md).
* [Wijmo FlexGrid](https://www.grapecity.com/en/wijmo-flexgrid) - Fast, high-performance grid.
* [Wijmo FlexChart](https://www.grapecity.com/en/wijmo-flexchart) - A Flexible JavaScript Chart Control.
