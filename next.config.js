module.exports = {
  reactStrictMode: true,
  env:{
    "BASE_URL": "https://freshveg.vercel.app/",
    "MONGODB_URL": "mongodb+srv://admin:duong123@cluster0.aazcf.mongodb.net/freshveg?retryWrites=true&w=majority",
    "ACCESS_TOKEN_SECRET": "4c9FwG{v9$[(3uvFg$E%$+(%!bhU6&vMKUsfNX_=jEg#&:5?B8",
    "REFRESH_TOKEN_SECRET": "DBC=v`vyFP_\"PY%N6zuzK=%`7&5BVW5.fjYn:eW&wbP?hRc?}K%^y$^9j=U>J\P~>T?pc\`Ts.='2\"}rU",
    "PAYPAL_CLIENT_ID": "ATl0zdn2faY-L-9IRA4YpmXCEiVFVBHn0rBQVrGh_4Jl6GFDPTQZwMFsqekFb4GA115j1zKmpX7DBd6F",
    "CLOUD_UPDATE_PRESET": "freshveg_store",
    "CLOUD_NAME": "dnstudio",
    "CLOUD_API": "https://api.cloudinary.com/v1_1/dnstudio/image/upload",
  },
  images: {
    domains: ['res.cloudinary.com', 'images.unsplash.com'],
  }
}
