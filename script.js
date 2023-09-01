const fetchAllCategory = async () => {
    try {
        const response = await fetch(
            "https://openapi.programming-hero.com/api/videos/categories"
        );
        const data = await response.json();
        getCategories(data.data);
    } catch (error) {
        console.error(error);
    }
};

const fetchDataByCategory = async (id) => {
    try {
        const response = await fetch(
            `https://openapi.programming-hero.com/api/videos/category/${id}`
        );
        const data = await response.json();
        getData(data.data);
    } catch (error) {
        console.error(error);
    }
};

const getCategories = (data) => {
    const categoryDiv = document.getElementById("category");

    const categoriesHTML = data
        .map(
            (e) => `
        <li onclick = "fetchDataByCategory(${e.category_id})"  class="">
            <button type="button" class="focus:outline-none text-black bg-gray-300 hover:bg-red-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-5 p-4 hover:text-white">
                ${e.category}
            </button>
        </li>
    `
        )
        .join("")
    categoryDiv.innerHTML = categoriesHTML;
};

const getData = (data) => {
    console.log(data);
};

fetchAllCategory();
fetchDataByCategory(1000);
