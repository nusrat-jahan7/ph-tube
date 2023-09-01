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
            <button type="button" class="focus:outline-none text-black bg-gray-300 hover:bg-red-500 focus:bg-red-500 focus:text-white font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 mt-5 p-4 hover:text-white">
                ${e.category}
            </button>
        </li>
    `
    )
    .join("");
  categoryDiv.innerHTML = categoriesHTML;
};

const getData = (data) => {
    console.log(data);
  const cardDiv = document.getElementById("card");
  const cardHTML = data
    .map(
      (p) => `
    <div class="max-w-sm bg-white rounded-lg"> 
    <img
    class="rounded-lg w-96 h-48"
    src="${p.thumbnail}"
    alt=""
  />        

  <div class="flex mt-6 gap-6">
    <div>
      <img
        class="rounded-full w-14 h-14"
        src="${p.authors[0].profile_picture}"
        alt=""
      />
    </div>
    <div>
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        ${p.title}
      </h5>
      <div class="flex gap-5 items-center">
        <p class="mb-2 font-semibold text-sm text-gray-600">
        ${p.authors[0].profile_name}
        </p>
        <svg
          class="w-5 h-6 text-blue-600 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            d="m18.774 8.245-.892-.893a1.5 1.5 0 0 1-.437-1.052V5.036a2.484 2.484 0 0 0-2.48-2.48H13.7a1.5 1.5 0 0 1-1.052-.438l-.893-.892a2.484 2.484 0 0 0-3.51 0l-.893.892a1.5 1.5 0 0 1-1.052.437H5.036a2.484 2.484 0 0 0-2.48 2.481V6.3a1.5 1.5 0 0 1-.438 1.052l-.892.893a2.484 2.484 0 0 0 0 3.51l.892.893a1.5 1.5 0 0 1 .437 1.052v1.264a2.484 2.484 0 0 0 2.481 2.481H6.3a1.5 1.5 0 0 1 1.052.437l.893.892a2.484 2.484 0 0 0 3.51 0l.893-.892a1.5 1.5 0 0 1 1.052-.437h1.264a2.484 2.484 0 0 0 2.481-2.48V13.7a1.5 1.5 0 0 1 .437-1.052l.892-.893a2.484 2.484 0 0 0 0-3.51Z"
          />
          <path
            fill="#fff"
            d="M8 13a1 1 0 0 1-.707-.293l-2-2a1 1 0 1 1 1.414-1.414l1.42 1.42 5.318-3.545a1 1 0 0 1 1.11 1.664l-6 4A1 1 0 0 1 8 13Z"
          />
        </svg>
      </div>
      <p class="font-semibold text-sm text-gray-600">
        ${p.others.views} <span>views</span>
      </p>
    </div>
  </div>
  </div>
 `
    )
    .join("");
  cardDiv.innerHTML = cardHTML;
};

fetchAllCategory();
fetchDataByCategory(1000);
