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
            if (document.title == 'home') {
                let storedData = localStorage.getItem('apiData');

                if (storedData) {
                    let data = JSON.parse(storedData);

                    let table = document.getElementById('portfolioPieces');

                    // Populate table with data from local storage
                    data.forEach(portfolio => {
                        let tableRow = document.createElement('tr');

                        // Loop through each property of the portfolio object
                        for (let key in portfolio) {
                            if (portfolio.hasOwnProperty(key)) {
                                let tableCell = document.createElement('td');
                                tableCell.innerText = portfolio[key];
                                tableRow.appendChild(tableCell);
                            }
                        }

                        table.appendChild(tableRow);
                    });
                }
            }
        });
    }

    // Define function to fetch portfolio data from JSON file holding array of portfolio projects
    let getPortfolios = (callback) => {
        $.getJSON('./data/projects.json', (portfolioData) => {
            console.log(portfolioData);
            console.log(portfolioData[0]);
            console.log(portfolioData[0].id);
            callback(portfolioData);
        });
    };

    // Main function to launch application
    let Launch = () => {
        console.log("Everything's up and going");

        // Load header and footer content
        loadHeader();
        loadFooter();

        // get and display portfolio data
        getPortfolios((data) => {
            let table = document.getElementById('portfolioPieces');

            // Populate table with portfolio data
            data.forEach(portfolio => {
                let tableRow = document.createElement('tr');

                // Loop through each property of the portfolio object
                for (let key in portfolio) {
                    if (portfolio.hasOwnProperty(key)) {
                        let tableCell = document.createElement('td');
                        tableCell.innerText = portfolio[key];
                        tableRow.appendChild(tableCell);
                    }
                }

                table.appendChild(tableRow);
            });

            // Store portfolio data in local storage
            localStorage.setItem('apiData', JSON.stringify(data));
        });
    };

    // Event listener for window load event to launch the application
    window.addEventListener('load', Launch);
})();
