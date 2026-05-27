export const initialRestaurants = [
	{
		id: "rest-1",
		name: "El Rincón Paisa",
		slug: "el-rincon-paisa",
		avatarImage:
			"https://images.unsplash.com/photo-1526470498-9ae73c665de8?w=400&h=400&fit=crop",
		avatarBackgroundImage:
			"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
		description:
			"Hamburguesas, salchipapas y perros calientes al mejor estilo.",
		menus: [
			{
				id: "menu-1",
				name: "Carta Principal",
				slug: "carta-principal",
				description: "Menú completo del local",
				categories: [
					{
						id: "cat-1",
						name: "Hamburguesas",
						dishes: [
							{
								id: "dish-1",
								name: "Sencilla",
								description: "Cerdo o Carne o Pollo.",
								price: 18000,
								available: true,
								image:
									"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=400&fit=crop",
							},
							{
								id: "dish-2",
								name: "Mixta",
								description: "Pollo y Carne / Pollo y Cerdo.",
								price: 23000,
								available: true,
								image:
									"https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=400&fit=crop",
							},
							{
								id: "dish-3",
								name: "Trifásica",
								description: "Carne, Pollo y Cerdo.",
								price: 27000,
								available: true,
								image:
									"https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop",
							},
							{
								id: "dish-4",
								name: "Especial de la Casa",
								description:
									"Carne - Pollo - Cerdo - Chorizo - Tocineta - Huevo.",
								price: 30000,
								available: true,
								image:
									"https://images.unsplash.com/photo-1586816001966-79b736744398?w=400&h=400&fit=crop",
							},
						],
					},
					{
						id: "cat-2",
						name: "Salchipapas",
						description:
							"Acompañadas de salchichas, salsas, lechuga, papitas chongo y queso rallado.",
						dishes: [
							{
								id: "dish-5",
								name: "Clásica Sencilla",
								description:
									"Papas, salchicha, lechuga, chongo y queso rallado.",
								price: 10000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&h=400&fit=crop",
							},
							{
								id: "dish-6",
								name: "Clásica Mediana",
								description:
									"Papas, salchicha, lechuga, chongo, jamón y queso.",
								price: 15000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=400&h=400&fit=crop",
							},
							{
								id: "dish-7",
								name: "Salchipapa con proteína",
								description: "Pollo o Cerdo o Suiza.",
								price: 24000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1585238341710-4b4e6b2fd8d7?w=400&h=400&fit=crop",
							},
							{
								id: "dish-8",
								name: "Salchimixta",
								description:
									"Pollo/Chorizo/Butifarra - Cerdo/Chorizo/Butifarra - Pollo y Cerdo.",
								price: 27000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1554520735-0a6b8b6ce8b7?w=400&h=400&fit=crop",
							},
							{
								id: "dish-9",
								name: "Salchitrifásica",
								description: "Pollo, Chorizo, Butifarra, Cerdo.",
								price: 35000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=400&fit=crop",
							},
							{
								id: "dish-10",
								name: "Salchiespecial",
								description: "Pollo, Chorizo, Butifarra, Cerdo. (mayor tamaño)",
								price: 40000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop",
							},
						],
					},
					{
						id: "cat-3",
						name: "Perros Calientes",
						description: "Variedad de perros calientes para todos los gustos.",
						dishes: [
							{
								id: "dish-11",
								name: "Sencillo",
								description: "Perro caliente clásico.",
								price: 6000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1612392062798-4d98d4f26ab8?w=400&h=400&fit=crop",
							},
							{
								id: "dish-12",
								name: "Sencillo Gratinado",
								description: "Perro caliente sencillo con gratinado.",
								price: 12000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1619740455993-9d83b8e5b1b5?w=400&h=400&fit=crop",
							},
							{
								id: "dish-13",
								name: "Choriperro",
								description: "Con chorizo.",
								price: 8000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&h=400&fit=crop",
							},
							{
								id: "dish-14",
								name: "Medio Suizo",
								description: "Con salchicha suiza.",
								price: 9000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
							},
							{
								id: "dish-15",
								name: "Suizo Entero",
								description: "Tocineta, queso Mozarella, queso cheddar.",
								price: 17000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop",
							},
							{
								id: "dish-16",
								name: "Perripollo",
								description: "Con pollo.",
								price: 15000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=400&h=400&fit=crop",
							},
							{
								id: "dish-17",
								name: "Perricerdo",
								description: "Con cerdo.",
								price: 19000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=400&fit=crop",
							},
							{
								id: "dish-18",
								name: "Perrimixto",
								description: "Mixto de carnes.",
								price: 9000,
								available: true,

								image:
									"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&h=400&fit=crop",
							},
							{
								id: "dish-19",
								name: "Perros Gemelos",
								description: "Dos perros calientes en uno.",
								price: 15000,
								available: true,
								tag: "Para compartir",
								image:
									"https://images.unsplash.com/photo-1519984388953-d2406bc725e1?w=400&h=400&fit=crop",
							},
						],
					},
					{
						id: "cat-4",
						name: "Adicionales",
						description: "Complementos para tu pedido.",
						dishes: [
							{
								id: "dish-20",
								name: "Aguacate",
								description: "Porción de aguacate.",
								price: 2000,
								available: true,
								tag: "Adicional",
								image:
									"https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=400&h=400&fit=crop",
							},
							{
								id: "dish-21",
								name: "Carne extra",
								description: "Porción adicional de carne.",
								price: 8000,
								available: true,
								tag: "Adicional",
								image:
									"https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=400&h=400&fit=crop",
							},
							{
								id: "dish-22",
								name: "Tocineta",
								description: "Porción de tocineta.",
								price: 2000,
								available: true,
								tag: "Adicional",
								image:
									"https://images.unsplash.com/photo-1528607929212-2636ec44253e?w=400&h=400&fit=crop",
							},
							{
								id: "dish-23",
								name: "Huevo frito",
								description: "Huevo frito adicional.",
								price: 2000,
								available: true,
								tag: "Adicional",
								image:
									"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop",
							},
							{
								id: "dish-24",
								name: "Gratinado o Maíz",
								description: "Porción de gratinado o maíz.",
								price: 5000,
								available: true,
								tag: "Adicional",
								image:
									"https://images.unsplash.com/photo-1551462147-37885acc36f1?w=400&h=400&fit=crop",
							},
							{
								id: "dish-25",
								name: "Gratinado Salvajadas",
								description: "Gratinado especial.",
								price: 15000,
								available: true,
								tag: "Especial",
								image:
									"https://images.unsplash.com/photo-1548340748-6af6a19a44c1?w=400&h=400&fit=crop",
							},
						],
					},
				],
			},
			{
				id: "menu-2",
				name: "Carta de Burritos y Picadas",
				slug: "carta-burritos-picadas",
				description: "Burritos, picadas y desgranados",
				isActive: true,
				categories: [
					{
						id: "cat-5",
						name: "Burritos en Tortilla y Pepitos en Pan",
						description:
							"Acompañados de salsas, lechuga, papitas chongo, jamón y queso mozzarella.",
						dishes: [
							{
								id: "dish-26",
								name: "Sencillo",
								description: "Cerdo o Pollo - Carne.",
								price: 22000,
								available: true,
								tag: "Sencillo",
								image:
									"https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=400&h=400&fit=crop",
							},
							{
								id: "dish-27",
								name: "Mixto",
								description:
									"Pollo/Chorizo/Butifara - Cerdo/Chorizo/Butifarra - pollo/cerdo.",
								price: 26000,
								available: true,
								tag: "Mixto",
								image:
									"https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&h=400&fit=crop",
							},
							{
								id: "dish-28",
								name: "Trifásico",
								description: "Carne, Pollo, Butifarra y Cerdo.",
								price: 30000,
								available: true,
								tag: "Trifásico",
								image:
									"https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&h=400&fit=crop",
							},
							{
								id: "dish-29",
								name: "Especial de la Casa",
								description:
									"Pollo, Cerdo, Butifarra, Chorizo, Tocineta, Maíz.",
								price: 35000,
								available: true,
								tag: "Especial",
								image:
									"https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400&h=400&fit=crop",
							},
							{
								id: "dish-30",
								name: "Suizo",
								description: "Una salchiza Suiza.",
								price: 24000,
								available: true,
								tag: "Suizo",
								image:
									"https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=400&h=400&fit=crop",
							},
						],
					},
					{
						id: "cat-6",
						name: "Picadas con Papa o Bollo",
						description:
							"Acompañadas de lechuga, salsas, chongo y queso rallado.",
						dishes: [
							{
								id: "dish-31",
								name: "Sencilla - Papa",
								description: "Cerdo o Pollo - Carne.",
								price: 22000,
								available: true,
								tag: "Con papa",
								image:
									"https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop",
							},
							{
								id: "dish-32",
								name: "Sencilla - Bollo",
								description: "Cerdo o Pollo - Carne.",
								price: 20000,
								available: true,
								tag: "Con bollo",
								image:
									"https://images.unsplash.com/photo-1559620192-032c4bc4674e?w=400&h=400&fit=crop",
							},
							{
								id: "dish-33",
								name: "Mixta - Papa",
								description:
									"Pollo/Chorizo/Butifara - Cerdo,Chorizo,Butifarra - Pollo/cerdo.",
								price: 26000,
								available: true,
								tag: "Con papa",
								image:
									"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&h=400&fit=crop",
							},
							{
								id: "dish-34",
								name: "Mixta - Bollo",
								description:
									"Pollo/Chorizo/Butifara - Cerdo,Chorizo,Butifarra - Pollo/cerdo.",
								price: 24000,
								available: true,
								tag: "Con bollo",
								image:
									"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
							},
							{
								id: "dish-35",
								name: "Trifásica - Papa",
								description: "Carne, Pollo, Butifarra y Cerdo.",
								price: 30000,
								available: true,
								tag: "Con papa",
								image:
									"https://images.unsplash.com/photo-1484723969641-e6a4b8d6dad0?w=400&h=400&fit=crop",
							},
							{
								id: "dish-36",
								name: "Trifásica - Bollo",
								description: "Carne, Pollo, Butifarra y Cerdo.",
								price: 28000,
								available: true,
								tag: "Con bollo",
								image:
									"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=400&h=400&fit=crop",
							},
							{
								id: "dish-37",
								name: "Especial de la Casa - Papa",
								description:
									"Pollo, Cerdo, Butifarra, Chorizo, jamón, Tocineta, Maíz.",
								price: 40000,
								available: true,
								tag: "Con papa",
								image:
									"https://images.unsplash.com/photo-1432139555190-58524dae6a55?w=400&h=400&fit=crop",
							},
							{
								id: "dish-38",
								name: "Especial de la Casa - Bollo",
								description:
									"Pollo, Cerdo, Butifarra, Chorizo, jamón, Tocineta, Maíz.",
								price: 35000,
								available: true,
								tag: "Con bollo",
								image:
									"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=400&fit=crop",
							},
							{
								id: "dish-39",
								name: "Suizo - Papa",
								description: "Una salchiza Suiza.",
								price: 24000,
								available: true,
								tag: "Con papa",
								image:
									"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop",
							},
							{
								id: "dish-40",
								name: "Suizo - Bollo",
								description: "Una salchiza Suiza.",
								price: 22000,
								available: true,
								tag: "Con bollo",
								image:
									"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop",
							},
						],
					},
					{
						id: "cat-7",
						name: "Desgranados con Papa o Bollo",
						description: "Selección de desgranados.",
						dishes: [
							{
								id: "dish-41",
								name: "Sencillo",
								description: "Cerdo o Pollo - Carne o Suizo.",
								price: 24000,
								available: true,
								tag: "Sencillo",
								image:
									"https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&h=400&fit=crop",
							},
							{
								id: "dish-42",
								name: "Mixto",
								description:
									"Pollo/Chorizo/Butifara - Cerdo/Chorizo/Butifarra - pollo/cerdo.",
								price: 27000,
								available: true,
								tag: "Mixto",
								image:
									"https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop",
							},
							{
								id: "dish-43",
								name: "Trifásico",
								description: "Carne, Pollo, Butifarra y Cerdo.",
								price: 35000,
								available: true,
								tag: "Trifásico",
								image:
									"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
							},
							{
								id: "dish-44",
								name: "Especial de la Casa",
								description: "Pollo, Cerdo, Butifarra, Chorizo, maíz.",
								price: 40000,
								available: true,
								tag: "Especial",
								image:
									"https://images.unsplash.com/photo-1476224203421-9ac39bcb3b42?w=400&h=400&fit=crop",
							},
						],
					},
					{
						id: "cat-8",
						name: "Salvajadas con Papa o Bollo",
						description:
							"Pollo, chorizo, butifarra, cerdo, maíz, tocineta, lechuga, jamón y queso, chongo, queso rallado y salsas.",
						dishes: [
							{
								id: "dish-45",
								name: "Para 2 Personas",
								description: "Salvajada para 2 personas.",
								price: 40000,
								available: true,
								tag: "Para 2",
								image:
									"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop",
							},
							{
								id: "dish-46",
								name: "Para 3 Personas",
								description: "Salvajada para 3 personas.",
								price: 50000,
								available: true,
								tag: "Para 3",
								image:
									"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=400&fit=crop",
							},
							{
								id: "dish-47",
								name: "Para 4 Personas",
								description: "Salvajada para 4 personas.",
								price: 60000,
								available: true,
								tag: "Para 4",
								image:
									"https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=400&fit=crop",
							},
							{
								id: "dish-48",
								name: "Para 5 Personas",
								description: "Salvajada para 5 personas.",
								price: 70000,
								available: true,
								tag: "Para 5",
								image:
									"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop",
							},
							{
								id: "dish-49",
								name: "Familiar Especial Gratinada",
								description: "Salvajada familiar especial con gratinado.",
								price: 90000,
								available: true,
								tag: "Familiar",
								image:
									"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=400&fit=crop",
							},
							{
								id: "dish-50",
								name: "Adicional de Gratinado",
								description: "Adicional de gratinado para salvajada.",
								price: 15000,
								available: true,
								tag: "Adicional",
								image:
									"https://images.unsplash.com/photo-1548340748-6af6a19a44c1?w=400&h=400&fit=crop",
							},
						],
					},
				],
			},
			{
				id: "menu-3",
				name: "Bebidas",
				slug: "bebidas",
				description: "Bebidas para acompañar tu pedido",
				isActive: true,
				categories: [
					{
						id: "cat-9",
						name: "Bebidas",
						description: "Refrescantes opciones para acompañar.",
						dishes: [
							{
								id: "dish-51",
								name: "Coca Cola y Postobón Pequeñas",
								description: "Presentación pequeña.",
								price: 1500,
								available: true,
								tag: "Bebida",
								image:
									"https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
							},
							{
								id: "dish-52",
								name: "Coca Cola y Postobón Personal",
								description: "Presentación personal.",
								price: 4000,
								available: true,
								tag: "Bebida",
								image:
									"https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=400&h=400&fit=crop",
							},
							{
								id: "dish-53",
								name: "Malta Pony 400ml",
								description: "Malta Pony 400ml.",
								price: 4000,
								available: true,
								tag: "Bebida",
								image:
									"https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=400&h=400&fit=crop",
							},
							{
								id: "dish-54",
								name: "Té y Hit Personal",
								description: "Presentación personal.",
								price: 4000,
								available: true,
								tag: "Bebida",
								image:
									"https://images.unsplash.com/photo-1556679343-c7306c1313c0?w=400&h=400&fit=crop",
							},
							{
								id: "dish-55",
								name: "Agua, Agua de Manzana y Soda",
								description: "Variedades de agua y soda.",
								price: 2000,
								available: true,
								tag: "Bebida",
								image:
									"https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
							},
							{
								id: "dish-56",
								name: "Speed Max",
								description: "Energizante Speed Max.",
								price: 3000,
								available: true,
								tag: "Energizante",
								image:
									"https://images.unsplash.com/photo-1606168094336-48f205b96e54?w=400&h=400&fit=crop",
							},
							{
								id: "dish-57",
								name: "Litro Postobón y Pool",
								description: "Presentación de un litro.",
								price: 4000,
								available: true,
								tag: "Litro",
								image:
									"https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=400&h=400&fit=crop",
							},
							{
								id: "dish-58",
								name: "Hit Litro y Pony Litro",
								description: "Hit o Pony en presentación litro.",
								price: 7000,
								available: true,
								tag: "Litro",
								image:
									"https://images.unsplash.com/photo-1563227812-0ea4c22e6cc8?w=400&h=400&fit=crop",
							},
							{
								id: "dish-59",
								name: "Litro y Medio Postobón y Coca Cola",
								description: "Presentación litro y medio.",
								price: 8000,
								available: true,
								tag: "Grande",
								image:
									"https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop",
							},
							{
								id: "dish-60",
								name: "Postobón 2.5 Lt y Coca Cola 3Lt",
								description: "Presentaciones familiares.",
								price: 15000,
								available: true,
								tag: "Familiar",
								image:
									"https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=400&h=400&fit=crop",
							},
						],
					},
				],
			},
		],
	},
];

export function cloneRestaurants(restaurants) {
	return restaurants.map((restaurant) => ({
		...restaurant,
		menus: restaurant.menus.map((menu) => ({
			...menu,
			categories: menu.categories.map((category) => ({
				...category,
				dishes: category.dishes.map((dish) => ({ ...dish })),
			})),
		})),
	}));
}
