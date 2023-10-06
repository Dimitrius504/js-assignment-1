(function () {
    const skillsData = [
        {
            "name": "JavaScript",
            "description": "JavaScript is a versatile programming language commonly used for creating interactive and dynamic web applications. It runs in web browsers and allows for client-side scripting."
        },
        {
            "name": "HTML",
            "description": "HTML (HyperText Markup Language) is the standard markup language used to create web pages. It structures content on the web and defines elements such as headings, paragraphs, links, and images."
        },
        ,
        {
            "name": "CSS",
            "description": "CSS (Cascading Style Sheets) is a stylesheet language used for describing the presentation of a web page written in HTML. It controls the layout, design, and appearance of elements on the web."
        },
        {
            "name": "C#",
            "description": "C# (C-Sharp) is a versatile, modern programming language developed by Microsoft. It is widely used for building Windows applications, web services, and web applications using ASP.NET framework."
        },
        {
            "name": "ASP.NET",
            "description": "ASP.NET is an open-source web framework developed by Microsoft for building modern, dynamic, and robust web applications and services. It is built on the .NET framework and supports various programming languages, including C#."
        },
        {
            "name": "PHP",
            "description": "PHP is a popular server-side scripting language for web development. It creates dynamic web pages, integrates with databases, and has an extensive developer community. Easy to learn and versatile, PHP is widely used to build interactive websites and applications."
        }

    ];

    // Function to populate the skills list
    function populateSkillsList() {
        const skillsList = document.getElementById('skillsList');

        // Loop through the skillsData array and create list items dynamically
        skillsData.forEach(skill => {
            const listItem = document.createElement('h2');
            listItem.textContent = skill.name; // Populate the first-level <li> with the skill name

            // If the skill has a description, create a nested list item for the description
            if (skill.description) {
                const descriptionItem = document.createElement('li');
                descriptionItem.textContent = skill.description; // Populate the nested <li> with the skill description
                listItem.appendChild(descriptionItem); // Append the nested <li> to the first-level <li>
            }

            skillsList.appendChild(listItem); // Append the first-level <li> to the skills list
        });
    }

    // Call the function to populate the skills lis


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
                populateSkillsList();
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
                console.log("building projects");
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
            populateSkillsList();

        });

    }


    // Main function to launch application
    let Launch = () => {
        console.log("Everything's up and going");

        // load localstorage with data
        $.getJSON("../data/projects.json", (data) => {
            localStorage.setItem("apiData", JSON.stringify(data));

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
        });
    };

    // Event listener for window load event to launch the application
    window.addEventListener('DOMContentLoaded', Launch);
})();


