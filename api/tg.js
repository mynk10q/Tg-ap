export default async function handler(req, res) {
  try {

    const { key, term } = req.query;

    // ✅ API KEY CHECK
    if (key !== "mynkx") {
      return res.status(403).json({
        status: false,
        message: "Invalid API Key"
      });
    }

    // ✅ NUMBER CHECK
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

    // ✅ LIMIT HANDLE
    if (data?.error?.includes("Limit exceeded")) {
      return res.status(200).json({
        status: false,
        message: "Server busy try later"
      });
    }

    // 🔥 REMOVE EXTRA TAGS
    delete data.tag;
    delete data.buy_api;
    delete data.support;
    delete data._powered_by;

    // 🔥 REMOVE NESTED TAGS
    if (data?.data) {
      delete data.data.tag;
      delete data.data.buy_api;
      delete data.data.support;
      delete data.data._powered_by;
    }

    // ✅ FINAL RESPONSE
    return res.status(200).json(data);

  } catch (e) {

    return res.status(200).json({
      status: false,
      message: "API Down"
    });

  }
}
