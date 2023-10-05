(function () {

    // Define function to load header from external HTML file
    let loadHeader = () => {
        $.get('./views/shared/header.html', (navData) => {
            console.log(navData);

            $("header").html(navData);

            // Add click event listener to all <a> elements inside <li> elements on navbar
            $("li>a").on("click", (event) => {
                event.preventDefault();

                // Set document title based on clicked element's id
                document.title = $(event.currentTarget).prop("id")
                loadContent(); // Load content based on clicked nav item
            })
        })
    }

    // Define function to load footer
    let loadFooter = () => {
        $.get('./views/shared/footer.html', (footerData) => {
            console.log(footerData);

            // Insert footer content into <footer> element in index.html
            $("footer").html(footerData);
        })
    }

    // Define function to load main content based on document title
    let loadContent = () => {
        let activePage = document.title;

        // get and insert HTML content based on document title
        $.get(`./views/${activePage}.html`, (htmlData) => {
            $("main").html(htmlData);

            // Change the URL in the address bar without reloading the page
            history.pushState({}, "", `/${document.title}`);

            // If document title is home load data from local storage in order to display table on page
            if (document.title == 'projects') {
                let storedData = localStorage.getItem('apiData');

                if (storedData) {
                    let data = JSON.parse(storedData);

                    let table = document.querySelector('#portfolioPieces > tbody');

                    // Populate table with data from local storage
                    data.forEach(portfolio => {
                        let tableRow = document.createElement('tr');

                        // Loop through each property of the portfolio object
                        let tableCell = document.createElement('td');

                        // Create a new table cell and set its inner text to the value of the 'class' property of the 'portfolio' object
                        tableCell.innerText = portfolio.class;
                        // Append the table cell to the table row
                        tableRow.appendChild(tableCell);

                        // Create a new table cell and set its inner HTML to an image tag with the 'src' attribute pointing to the 'photo' property of the 'portfolio' object
                        tableCell = document.createElement('td');
                        tableCell.innerHTML = `<img style="max-width: 200px;" src="../images/${portfolio.photo}">`;
                        // Append the table cell to the table row
                        tableRow.appendChild(tableCell);

                        // Create a new table cell and set its inner HTML to an anchor tag with the 'href' attribute pointing to the 'link' property of the 'portfolio' object
                        tableCell = document.createElement('td');
                        tableCell.innerHTML = `<a href="${portfolio.link}">link</a>`;
                        // Append the table cell to the table row
                        tableRow.appendChild(tableCell);

                        // Append the table row to the table
                        table.appendChild(tableRow);
                    });
                }
            }

            Launch();
        });

    }


    // Main function to launch application
    let Launch = () => {
        console.log("Everything's up and going");

        // Load header and footer content
        loadHeader();
        loadFooter();

        // hook up call to action
        const ctaButton = document.querySelector("#aboutPage")

        if (ctaButton) {
            ctaButton.addEventListener("click", (event) => {
                console.log("CTA clicked");
                event.preventDefault();

                // Set document title based on clicked element's id
                document.title = event.currentTarget.dataset.page;
                loadContent(); // Load content based on clicked nav item
            });
        }

    };

    // Event listener for window load event to launch the application
    window.addEventListener('DOMContentLoaded', Launch);
})();


