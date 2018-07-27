![](https://raw.githubusercontent.com/asatelit/cryptocurrency-tracking-app/master/doc/images/cryptocurrency-tracking-app.jpg)

# Cryptocurrency Tracking App

A sample financial app for keeping track of the cryptocurrency market built on top of React, Redux,
[Wijmo FlexGrid](https://www.grapecity.com/en/wijmo-flexgrid),
[Wijmo FlexChart](https://www.grapecity.com/en/wijmo-flexchart) and Material UI.
See live demo here: [](https://https://asatelit.com/projects/cryptocurrency-tracking-app).

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
and minimized in this case. For more information, check out the additional documentation [here](./doc/README.md).

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

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and powered by Wijmo components:
* [FlexGrid](https://www.grapecity.com/en/wijmo-flexgrid) - Fast, high-performance grid.
* [FlexChart](https://www.grapecity.com/en/wijmo-flexchart) - A Flexible JavaScript Chart Control.

#### Included dependencies:

* [classnames](https://github.com/JedWatson/classnames) -  utility for conditionally joining classNames together.
* [humps](https://github.com/domchristie/humps) - Underscore-to-camelCase converter for strings and object keys.
* [material-ui-icons](https://www.npmjs.com/package/material-ui-icons) - provides the Google Material icons packaged as a set of React components.
* [material-ui](https://github.com/mui-org/material-ui) - components that implement Google's Material Design.
* [prop-types](https://www.npmjs.com/package/prop-types) - runtime type checking for React props and similar objects.
* [react-dom](https://github.com/facebook/react) - serves as the entry point of the DOM-related rendering paths.
* [react-redux](https://github.com/reactjs/redux/tree/master/docs) - complete state management.
* [react-router-dom](https://www.npmjs.com/package/react-router-dom) - DOM bindings for React Router.
* [react-scripts](https://github.com/facebook/create-react-app) - create React apps with no build configuration.
* [react](https://github.com/facebook/react) - library for building user interfaces.
* [redux-thunk](https://github.com/gaearon/redux-thunk) - async operations.
* [wijmo](https://www.npmjs.com/package/wijmo) - Enterprise UI controls.
