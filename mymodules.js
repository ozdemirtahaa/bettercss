function filterModule(moduleName)
{
    var filterKeyword = moduleName; // Example filter keyword for the text content

    // Find all the divs with class "course-category"
    var courseCategoryDivs = document.querySelectorAll('.course-category');

    // Loop through each div and apply the filter
    courseCategoryDivs.forEach(div => {
        if (div.textContent.includes(filterKeyword)) {
        // If the div contains the filter keyword, find its parents
        var currentElement = div.parentElement.parentElement.parentElement;



        // For demonstration, let's log the parent elements
        console.log("Current Element: ", div);
        console.log("Parent Element: ", currentElement);

        // Here, you could show or highlight the element based on filter logic
        currentElement.setAttribute("style", "display:block!important;"); // Example: highlight filtered elements
        } else {
        var currentElement = div.parentElement.parentElement.parentElement;



        // For demonstration, let's log the parent elements
        console.log("Current Element: ", div);
        console.log("Parent Element: ", currentElement);

        // Here, you could show or highlight the element based on filter logic
        currentElement.setAttribute("style", "display:none!important;"); // Example: highlight filtered elements
        }
    });
    
}


function initModules()
{
    var courseCategoryDivs = document.querySelectorAll('.course-category');

    // Loop through each div and apply the filter
    courseCategoryDivs.forEach(div => {
    
        var currentCard = div.parentElement.parentElement.parentElement;
        var currentTitleArea = currentCard.querySelector(".coursename");
        if (currentTitleArea)
        {
            titleAreaContainer = currentTitleArea.parentElement;
            moduleTitle = currentTitleArea.querySelector(".multiline").textContent;
            moduleLink = currentTitleArea.getAttribute("href");
            console.log("********************************")
            console.log(moduleTitle)
            console.log(moduleLink)
        }



        // Here, you could show or highlight the element based on filter logic
        //currentElement.setAttribute("style", "display:none!important;"); // Example: highlight filtered elements
    });
}

// Function to replace #toggle-darkmode with a custom switch
function replaceToggleButton() {
    const toggleDarkMode = document.getElementById("toggle-darkmode");

    if (!toggleDarkMode) return; // Ensure the element exists

    // Create the new container div
    const newDiv = document.createElement("div");
    newDiv.id = "darkmode-container";
    newDiv.innerHTML = `
        <label class="switch">
            <input type="checkbox" id="darkmode-switch">
            <span class="slider"></span>
        </label>
    `;

    // Replace the original element
    toggleDarkMode.replaceWith(newDiv);

    // Get the switch element
    const switchInput = document.getElementById("darkmode-switch");

    // Check current theme and update switch state
    if (document.documentElement.getAttribute("data-theme") === "dark") {
        switchInput.checked = true;
    }

    // Add event listener to toggle dark mode
    switchInput.addEventListener("click", function () {
        if (switchInput.checked) {
            document.documentElement.setAttribute("data-theme", "dark");
        } else {
            document.documentElement.setAttribute("data-theme", "");
        }
    });
}

// Call function to replace the toggle button


function applyTheme() {
    chrome.storage.local.get(['darkMode'], (result) => {
      const darkMode = result.darkMode;
      if (darkMode) {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
      }
    });
}
  // Apply the theme on page load
applyTheme();


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "updateTheme") {
        applyTheme();
    }
});