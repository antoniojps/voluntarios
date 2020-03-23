
export  const postImage = async file => {
	var data = new FormData();
	data.append('upload_preset', `${process.env.CLOUDINARY_NAME}`);
	data.append('source', 'uw');
	data.append('api_key', null);
	data.append('file', file);
	return await fetch(`https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_UPLOAD_PRESET}/upload`, {
		method: "POST",
		body: data,
	})
}



