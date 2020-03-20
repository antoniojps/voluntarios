export const resSchema = (data, code) => {
  return {
    results: data,
    code,
  }
}

export const errSchema = (data, code) => {
  let res = {
    error: data,
    code: code,
  }

  if (typeof data === 'string') res.error = { message: data }

  return res
}