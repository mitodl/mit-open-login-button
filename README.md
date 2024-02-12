# MIT Open Login Button

This library provides a simple way to implement a "Login with MIT Open" button on your website. It requires a running instance of [MIT Open](https://github.com/mitodl/mit-open). Your website implementing the button must be allowed to make CORS requests to said instance of MIT Open in order for the login functionality to work.

# Configuring CORS in MIT Open

In your instance of MIT Open, you will need to set some environment variables to allow CORS access to your instance from the site you are implementing the login button on. Given that your external site is hosted on `https://my-other-website.com/`:

```
CORS_ALLOWED_ORIGINS=["https://my-other-website.com"]
SOCIAL_AUTH_ALLOWED_REDIRECT_HOSTS=["my-other-website.com"]
```

# Adding to your project

You can add `mit-open-login-button` to your project using a Node package manager:

```bash
# NPM
npm install mit-open-login-button

# Yarn
yarn add mit-open-login-button
```

# Usage

In order to create the login button on your page, import `initLoginButton` and run it, passing in a container for it to be rendered inside:

```js
import { initLoginButton } from "mit-open-login-button"

// Given a div with an ID of login-button-container
const container = "login-button-container"
const mitOpenBaseUrl = "https://my-mit-open.com/"
const buttonText = "Login"
const buttonClass = "btn my-button-class"
const textClass = "my-text-class"
initLoginButton(container, mitOpenBaseUrl, buttonText, buttonClass, textClass)
```
