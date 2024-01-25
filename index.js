/**
 * Generates a simple HTML login button pointing an an instance of MIT Open
 * If already logged in, displays the user's username
 * @function initLoginButton
 * @param {String} containerId The id property of the container element to place the login button / status in
 * @param {String} baseUrl The base URL of the MIT Open instance
 * @param {String} buttonText The text to show on the Login button
 * @param {String} buttonClass The CSS class(es) to assign to the button
 * @param {String} loggedInTextClass The CSS class(es) to assign to the logged-in status text
 */
export function initLoginButton(containerId, baseUrl, buttonText = "Login", buttonClass = "", loggedInTextClass = "") {
  const container = document.getElementById(containerId)
  const parsedBaseUrl = new URL(baseUrl)
  const reconstructedBaseUrl = `${parsedBaseUrl.protocol}//${parsedBaseUrl.hostname}${parsedBaseUrl.port !== '' ? `:${parsedBaseUrl.port}` : ''}`
  const apiUrl = `${reconstructedBaseUrl}/api/v0/users/me?format=json`
  const loginUrl = `${reconstructedBaseUrl}/login/ol-oidc/`
  fetch(apiUrl, {
    method: "GET",
    credentials: "include",
    mode: "cors",
    headers: {
      "Accept": "application/json",
    }
  }).then(response => {
    if (!response.ok) {
      // create the login button
      const linkButton = document.createElement('a')
      const linkText = document.createTextNode(buttonText)
      linkButton.appendChild(linkText)
      linkButton.title = buttonText
      linkButton.href = loginUrl
      if (buttonClass !== "") {
        linkButton.classList.add(...buttonClass.split(' '))
      }
      container.appendChild(linkButton)
    }
    return response.json()
  }).then(data => {
    if (data['username'] !== undefined) {
      // display the logged in user
      const userName = data['username']
      const loggedInText = document.createElement('span')
      if (loggedInTextClass !== "") {
        loggedInText.classList.add(...loggedInTextClass.split(' '))
      }
      loggedInText.textContent = `Logged in as: ${userName}`
      container.appendChild(loggedInText)
    }
  })
}
