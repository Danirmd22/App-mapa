document.addEventListener("DOMContentLoaded", function() {
  const menuItemsContainer = document.getElementById("menuItems");
  const veganCheckbox = document.getElementById("veganCheckbox");
  const celiacCheckbox = document.getElementById("celiacCheckbox");
  const lactoseCheckbox = document.getElementById("lactoseCheckbox");
  const sortPriceAscButton = document.getElementById("sortPriceAsc");
  const sortPriceDescButton = document.getElementById("sortPriceDesc");

  let menuItems = [
      {
        "nombre": "Ensalada de quinoa",
        "foto": "images/ensalada_quinoa.jpg",
        "ingredientes": ["quinoa", "tomate", "pepino", "espinacas"],
        "precio": 12.99,
        "intolerancia": ["vegano", "celiaco"]
      },
      {
        "nombre": "Pizza vegana",
        "foto": "images/pizza_vegana.jpg",
        "ingredientes": ["masa integral", "salsa de tomate", "verduras", "queso vegano"],
        "precio": 15.99,
        "intolerancia": ["vegano", "celiaco", "intolerante a la lactosa"]
      },
      {
        "nombre": "Tacos de champiñones",
        "foto": "images/tacos_champinones.jpg",
        "ingredientes": ["tortillas de maíz", "champiñones", "cebolla"],
        "precio": 10.50,
        "intolerancia": ["vegano"]
      },
      {
        "nombre": "Sopa de lentejas",
        "foto": "images/sopa_lentejas.jpg",
        "ingredientes": ["lentejas", "zanahoria", "apio", "cebolla", "tomate"],
        "precio": 8.99,
        "intolerancia": ["vegano", "celiaco"]
      },
      {
        "nombre": "Pasta sin gluten",
        "foto": "images/pasta_sin_gluten.jpg",
        "ingredientes": ["pasta de arroz", "salsa de tomate", "albahaca", "aceitunas"],
        "precio": 13.50,
        "intolerancia": ["celiaco"]
      },
      {
        "nombre": "Smoothie de frutas",
        "foto": "images/smoothie_frutas.jpg",
        "ingredientes": ["plátano", "fresas", "arándanos", "leche de almendras"],
        "precio": 6.75,
        "intolerancia": ["vegano", "intolerante a la lactosa"]
      }
    ];

  // Función para renderizar los platos en la interfaz
  renderMenuItems(menuItems);

  // Función para renderizar los platos en la interfaz
  function renderMenuItems(items) {
      menuItemsContainer.innerHTML = ""; 

      items.forEach(item => {
          const menuItemElement = document.createElement("div");
          menuItemElement.classList.add("menuItem");

          const imageElement = document.createElement("img");
          imageElement.src = item.foto;
          imageElement.alt = item.nombre;

          const nameElement = document.createElement("h2");
          nameElement.textContent = item.nombre;

          const priceElement = document.createElement("p");
          priceElement.textContent = "Precio: $" + item.precio.toFixed(2);

          const ingredientesElement = document.createElement("p");
          ingredientesElement.textContent = "Ingredientes : " + item.ingredientes;

          const intoleranceElement = document.createElement("p");
          intoleranceElement.textContent = "Intolerancias: " + item.intolerancia.join(", ");

          const favoriteButton = document.createElement("button");
          favoriteButton.textContent = "Agregar a favoritos";

          menuItemElement.appendChild(imageElement);
          menuItemElement.appendChild(nameElement);
          menuItemElement.appendChild(priceElement);
          menuItemElement.appendChild(ingredientesElement);
          menuItemElement.appendChild(intoleranceElement);
          menuItemElement.appendChild(favoriteButton);

          menuItemsContainer.appendChild(menuItemElement);
      });
  }

  
  veganCheckbox.addEventListener("change", applyFilters);
  celiacCheckbox.addEventListener("change", applyFilters);
  lactoseCheckbox.addEventListener("change", applyFilters);
  sortPriceAscButton.addEventListener("click", () => {
       sortMenuItems(true);
  });
  sortPriceDescButton.addEventListener("click", () => {
      
    sortMenuItems(false);
  });

  // Función para aplicar filtros
  function applyFilters() {
      let filteredItems = menuItems.filter(item => {
          return (

              (!veganCheckbox.checked || item.intolerancia.includes("vegano")) &&
              (!celiacCheckbox.checked || item.intolerancia.includes("celiaco")) &&
              (!lactoseCheckbox.checked || item.intolerancia.includes("intolerante a la lactosa"))

          );
      });
      renderMenuItems(filteredItems);

      // Guardar el estado de los checkboxes en el almacenamiento local
      localStorage.setItem('veganCheckbox', veganCheckbox.checked);
      localStorage.setItem('celiacCheckbox', celiacCheckbox.checked);
      localStorage.setItem('lactoseCheckbox', lactoseCheckbox.checked);

      // Guardar los elementos filtrados en el almacenamiento local
      localStorage.setItem('filteredItems', JSON.stringify(filteredItems));
  }

  // Función para ordenar los elementos según el precio
  function sortMenuItems(ascending) {
      menuItems.sort((a, b) => {

          if (ascending) 
          {
              return a.precio - b.precio;
          } else {
              return b.precio - a.precio;
          }
      });
      applyFilters(); 
  }

  // Función para cargar los elementos filtrados desde el almacenamiento local
  function loadFilteredItems() {
      const filteredItems = JSON.parse(localStorage.getItem('filteredItems'));
      if (filteredItems) {
          renderMenuItems(filteredItems);

      }
      
      // Restaurar el estado de los checkboxes desde el almacenamiento local
      veganCheckbox.checked = JSON.parse(localStorage.getItem('veganCheckbox')) || false;
      celiacCheckbox.checked = JSON.parse(localStorage.getItem('celiacCheckbox')) || false;
      lactoseCheckbox.checked = JSON.parse(localStorage.getItem('lactoseCheckbox')) || false;
  }

  // Cargar los elementos filtrados al cargar la página
  window.onload = () => {
      loadFilteredItems();
  };
});
