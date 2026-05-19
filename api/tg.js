export default async function handler(req, res) {
  try {

    const { key, term } = req.query;

    if (key !== "mynkx") {
      return res.status(403).json({
        status: false,
        message: "Invalid API Key"
      });
    }

    if (!term) {
      return res.status(400).json({
        status: false,
        message: "Enter number"
      });
    }

    // ✅ NEW BACKEND
    const url = `https://users-xinfo-admin-eight.vercel.app/api?key=lljeliye&type=uers&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    // 🔥 REMOVE EXTRA TAGS
    if (data?.tag) delete data.tag;
    if (data?.buy_api) delete data.buy_api;
    if (data?.support) delete data.support;
    if (data?._powered_by) delete data._powered_by;

    // Nested remove
    if (data?.data?.tag) delete data.data.tag;
    if (data?.data?.buy_api) delete data.data.buy_api;
    if (data?.data?.support) delete data.data.support;
    if (data?.data?._powered_by) delete data.data._powered_by;

    return res.status(200).json(data);

  } catch (e) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
