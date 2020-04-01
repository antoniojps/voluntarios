export const Types = {
	Face: 'Face',
	FacialHair: 'FacialHair',
	Hair: 'Hair',
	Accessories: 'Accessories',
}

export const Face = [
	"Calm",
	"Cute",
	"Smile",
];

export const FaceOptions = [
	{
		value: "Calm",
		label: "Calmo",
	},
	{
		value: "Cute",
		label: "Fofo",
	},
	{
		value: "Smile",
		label: "Sorriso",
	},
]

export const FacialHair = [
	"None",
	"Full",
	"FullMajestic",
	"GoateeCircle",
  "Handlebars",
	"MajesticHandlebars",
];

export const FacialHairOptions = [
	{
		value: "None",
		label: "Nenhum",
	},
	{
		value: "Full",
		label: "Grande",
	},
	{
		value: "FullMajestic",
		label: "Grande estiloso",
	},
	{
		value: "GoateeCircle",
		label: "Pera",
	},
	{
		value: "Handlebars",
		label: "Bigodaço",
	},
	{
		value: "MajesticHandlebars",
		label: "Bigodaço estiloso",
	},
]

export const Hair = [
  "Afro",
	"Bald",
	"Bangs",
	"BangsFilled",
	"Bun",
	"FlatTop",
	"Long",
	"Medium",
	"Mohawk",
	"Pomp",
	"ShavedSides",
	"ShortVolumed",
	"ShortWavy",
	"BunFancy",
]

export const HairOptions = [
	{
		value: "Afro",
		label: "Afro",
	},
	{
		value: "Bald",
		label: "Careca",
	},
	{
		value: "Bangs",
		label: "Franja",
	},
	{
		value: "BangsFilled",
		label: "Franja alternativa",
	},
	{
		value: "Bun",
		label: "Coque",
	},
	{
		value: "FlatTop",
		label: "Flat top",
	},
	{
		value: "Long",
		label: "Longo",
	},
	{
		value: "Medium",
		label: "Médio",
	},
	{
		value: "Mohawk",
		label: "Crista",
	},
	{
		value: "Pomp",
		label: "Pomp",
	},
	{
		value: "ShavedSides",
		label: "Lados rapados",
	},
	{
		value: "ShortVolumed",
		label: "Curto",
	},
	{
		value: "ShortWavy",
		label: "Curto estiloso",
	},
	{
		value: "BunFancy",
		label: "Classy",
	},
]

export const Accessories = [
  "None",
	"SunglassClubmaster",
	"GlassButterfly",
	"GlassRound",
]

export const AccessoriesOptions = [
	{
		value: "None",
		label: "Nenhum",
	},
	{
		value: "SunglassClubmaster",
		label: "Óculos Clubmaster",
	},
	{
		value: "GlassButterfly",
		label: "Óculos borboleta",
	},
	{
		value: "GlassRound",
		label: "Óculos redondos",
	},
]

export const Customization = {
	Face,
	Hair,
	Accessories,
	FacialHair,
}

export const getRandomHead = () => {
	const face = Face[Math.floor(Math.random() * Face.length)];
	const hair = Hair[Math.floor(Math.random() * Hair.length)];
	const facialHair = FacialHair[Math.floor(Math.random() * FacialHair.length)];
	const accessory = Accessories[Math.floor(Math.random() * Accessories.length)];
	return {
			accessory,
			face,
			hair,
			facialHair,
	}
}

export const getValueByIndexAndType = (type = 'Hair', index = 0) => {
	const types = Customization[type]
	const value = types[index]
	return value === undefined ? null : value
}

export const getIndexByValueAndType = (type = 'Hair', value = 'Afro') => {
	const types = Customization[type]
	const index = types.indexOf(value)
	return index === -1 ? null : index
}


export const getStyles = (size) => {
	let width = 110
	let transform = `translate(-20px, 2px)`

	if (size === 'sm') {
			width = 70
			transform = `translate(-8px, 5px)`
	}
	if (size === 'lg') {
			width = 180
			transform = `translate(-20px, 10px)`
	}
	if (size === 'xl') {
		width = 300
		transform = `translate(-10px, 30px)`
}


	return {
			width,
			height: width,
			transform,
			justifyContent: 'center',
			alignSelf: 'center',
	}
}