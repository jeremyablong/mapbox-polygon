# Shimbly

## If you would like information on project structure, please scroll down

## Before running `npm start`

In the project directory, run:

### `npm install`

After install, navigate to:

### `cd src/semantic`

Then run:

### `gulp build`

Install is now fully complete!

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

If GET requests are blocked due to CORS, update the start line under the scripts section in `package.json` with the following code:

For Mac:
### `PORT=####`

For Windows:
### `SET PORT=#### & `

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Structure

Project is done using **React.js** and **Redux**.

CSS framework used is Semantic UI.

To avoid future confusion, please be aware of how React and Redux work together. Semantic UI link below as well.

**React** - (https://reactjs.org/docs/getting-started.html)

**Redux** - (https://redux.js.org/introduction/getting-started)

**Semantic UI** - (https://semantic-ui.com/introduction/getting-started.html)

All files have comments on how they work or why they are there too.

Folders are structured as follows:

**pages** - All pages that are needed by project

**containers** - Any type of container components, App.js is only thing in here for routing

**components** - Contains all heavily used components or rendering of data for smaller parent components

**actions** - (Redux related) - Contains all heavily used actions for universal state management

**reducers** - (Redux related) - Contains reducers for action payloads to be added to state

**apis** - Base url files for axios requests

**assets** - Any local images, fonts, etc
