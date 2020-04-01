
export const Face = [
	"Calm",
	"Cute",
	"Smile",
];

export const FacialHair = [
	"None",
	"Full",
	"FullMajestic",
	"GoateeCircle",
  "Handlebars",
	"MajesticHandlebars",
];

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

export const Accessories = [
  "None",
	"SunglassClubmaster",
	"GlassButterfly",
	"GlassRound",
]

export const getRandomHead = () => {
	const face = Face[Math.floor(Math.random() * Face.length)];
	const hair = Hair[Math.floor(Math.random() * Hair.length)];
	const facialHair = FacialHair[Math.floor(Math.random() * FacialHair.length)];
	const accessories = Accessories[Math.floor(Math.random() * Accessories.length)];
	return {
			accessories,
			face,
			hair,
			facialHair,
	}
}


export const getStyles = (size) => {
	let width = 110
	let transform = `translate(-18px, 2px)`

	if (size === 'sm') {
			width = 70
			transform = `translate(-8px, 5px)`
	}
	if (size === 'lg') {
			width = 180
			transform = `translate(-20px, 10px)`
	}


	return {
			width,
			height: width,
			transform,
			justifyContent: 'center',
			alignSelf: 'center',
	}
}