const fetchAllCategory = async () => {
    try {
        const response = await fetch(
            "https://openapi.programming-hero.com/api/videos/categories"
        );
        const data = await response.json();
        setCategories(data.data);
    } catch (error) {
        console.error(error);
    }
};

let cards = [];

const fetchDataByCategory = async (id) => {
    try {
        const response = await fetch(
            `https://openapi.programming-hero.com/api/videos/category/${id}`
        );
        const data = await response.json();
        cards = data.data;
        setCards(data.data);
    } catch (error) {
        console.error(error);
    }
};

const setCategories = (data) => {
    const categoryDiv = document.getElementById("category");

    const categoriesHTML = data
        .map(
            (e) => `
        <li onclick = "fetchDataByCategory(${e.category_id})"  class="">
            <button type="button" class="focus:outline-none text-black bg-gray-300 hover:bg-red-500 focus:bg-red-500 focus:text-white font-medium rounded-lg text-sm px-3 sm:px-5 py-2 sm:py-2.5 mr-2 mb-2 mt-5 hover:text-white">
                ${e.category}
            </button>
        </li>
        `
        )
        .join("");
    categoryDiv.innerHTML = categoriesHTML;
};

const setCards = (data) => {
    console.log(data);
    const cardContainer = document.getElementById("card-container");

    cardContainer.textContent = "";

    if (data.length <= 0) {
        cardContainer.classList = "";
        const noContent = document.createElement("div");
        noContent.classList = "mt-20";
        noContent.innerHTML = `<div class="flex flex-col justify-center items-center">
        <img src="./Icon.png" alt="">
        <h1 class="text-3xl font-bold text-gray-900 text-center mt-6 w-96">Oops!! Sorry, There is no content here</h1>
    </div>`;
        cardContainer.appendChild(noContent);
    } else {
        cardContainer.classList =
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-5";
    }

    data.forEach((card) => {
        const convertedTime = toHoursAndMinutes(card.others.posted_date);

        const div = document.createElement("div");
        div.classList =
            "rounded-lg border shadow-sm relative";
        div.innerHTML = `
        <div>
          <img id="thumbnail-img" class="rounded-t-lg w-full h-48" src="${
              card.thumbnail
          }" alt="" />
        </div>
        ${
            card.others.posted_date === ""
                ? ""
                : `<p class="absolute bg-[#171717] text-white rounded-md p-1 px-2 text-xs right-1 top-40">${convertedTime}</p>`
        }
        <div class="flex gap-3 px-3 py-5">
            <img class="h-10 w-10 rounded-full mt-2" src="${
                card.authors[0].profile_picture
            }" alt="">
            <div class="flex flex-col">
                <h2 class="font-bold text-lg">${card.title}</h2>
                <div id="card-authors" class="flex items-center gap-2">
                    <p class="font-medium text-gray-500">${
                        card.authors[0].profile_name
                    }</p>
                    ${
                        card.authors[0].verified === true
                            ? '<img src="./images/verified.svg" class="h-4 w-4" alt="">'
                            : ""
                    }
                </div>
                <p class="font-medium text-gray-400">${card.others.views} views</p>
            </div>
        </div>`;

        cardContainer.appendChild(div);
    });
};

const toHoursAndMinutes = (seconds) => {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hrs ${minutes} min ago`;
};

const sortCardsByViews = (cards) =>
    cards.sort((a, b) => {
        const viewsA = +a.others.views.replace(/\D/g, "");
        const viewsB = +b.others.views.replace(/\D/g, "");
        return viewsB - viewsA;
    });

const sortButton = document.getElementById("sort-btn");
sortButton.addEventListener("click", () => {
    const sortedData = sortCardsByViews(cards);

    setCards(sortedData);
});

const sortButtonPhone = document.getElementById("sort-btn-mobile");
sortButtonPhone.addEventListener("click", () => {
    const sortedData = sortCardsByViews(cards);

    setCards(sortedData);
});

fetchAllCategory();
fetchDataByCategory(1000);
