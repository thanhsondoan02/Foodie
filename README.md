# Foodie

(Insert a picture here)

Welcome to Foodie - an e-commerce website tailored for a pizzeria. This digital haven boasts an engaging menu replete with diverse choices ranging from pizzas and sushi to pasta. Streamlining the intricacies of online ordering stood as the paramount objective, ensuring a flawlessly smooth user expedition throughout this venture. Foodie is created utilizing technologies like React Icons, React Router DOM, React Alice Carousel, Leaflet Maps, React Paginate, UUID, React Lazy Load, and Framer Motion.

:fork_and_knife: Vibrant Culinary Center:
Imaginary eatery showcasing a comprehensive menu spanning pizzas, sushi, and pasta. Employed React components such as Icons, Router, and Carousel to facilitate seamless navigation and enhance the user interface.

:earth_asia: Geographical Insight Through Leaflet Maps:
Leveraged the Leaflet Maps API to enrich user interaction and foster a deeper comprehension of store locations through spatial awareness.

:pizza: Enhanced UI Flow through Pagination and Motion:
Utilized React Paginate to seamlessly divide menu pages, improving user-friendly navigation. Framer Motion introduced polished animations, elevating both visual allure and interactive engagement.

:electron: Streamlined Data Handling:
Utilizing UUID for unique ID generation guarantees robust identification of menu items and orders. Implementation of React Lazy Load optimizes the loading of images and components, significantly enhancing overall site performance.

:accessibility: Personalized User Interaction:
Facilitated user registration, login, and profile administration, allowing users to modify and delete profiles, thereby amplifying customization options.

:biohazard: Protected Communication with reCAPTCHA Integration:
Incorporated Google reCAPTCHA to authenticate users submitting contact forms, effectively mitigating spam and ensuring a secure communication environment.

At Foodie, the fusion of delectable cuisine and cutting-edge technology gives rise to a user-friendly digital encounter. This is the intersection of exceptional food and programming, allowing users to embark on a convenient and gratifying culinary journey.


## Contents

- [Getting Started](#gettingStarted)
- [Instruction](#instructions)
- [Available Scripts](#availableScripts)
- [Learn More](#learnMore)
- [Contribution](#contribution)

## Getting Started 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To get started, you need to:

1. Clone the project
2. npm install
3. Install listed dependencies
4. Use available scripts, like npm start

## Instructions

- When you fork or download the project install node modules using npm install and then any additonal dependencies you don't have from <a id="dependencies">Dependencies</a> list

- Next, you need to create the file name .env located outside src file

- In the .env file I am using several variables:
1. REACT_APP_DATABASE_URL & MYSQL_ATTR_SSL_CA - these variables contain information that will connect you to the PlanetScale database. You can use the following documentation https://planetscale.com/docs/tutorials/connect-nodejs-app. If you use any other database you need to use the accoridng information to connect to that database. 
Note that the table for users in my case is named "users" and contains columns with the following data: id | email | password | fullname | address | number.
2. REACT_APP_USERS_URL - these is a url for Node.js server. First, it's better to run it locally and only then switch to whatever you want. If you want to run the server locally the value of this variable should be http://localhost:3000/users. In this project I set up backend using Vercel. You can google "How to Deploy Your Node.js Backend Project to Vercel" and set up your own backend.
3. REACT_APP_CAPTCHA_URL - the same logic works for this backedn url which this time is used for captcha verification. Locally, the url value should be http://localhost:3000/verify-recaptcha.
4. REACT_APP_CAPTCHA_KEY & REACT_APP_CAPTCHA_SECRET - both values can be found once you create an account for reCaptcha at https://www.google.com/recaptcha/about/. Please use their documentation for better understanding.

- Once you set up the variables, you can run the server on one port, if you use local server and the website on another port. 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Contribution

Foodie was created by the group 2 as a project for the Web Development course. Contributors include:
- Đoàn Thanh Sơn_20020153
- Bùi Đắc Hiên_20021346
- Phùng Sỹ Ngọc_19021342
- Trần Quốc Hưng_19021292
