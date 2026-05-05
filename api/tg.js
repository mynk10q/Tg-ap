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

    const url = `https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=uers&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    // 🔥 SAB TAG REMOVE
    if (data?.tag) delete data.tag;
    if (data?.buy_api) delete data.buy_api;
    if (data?.support) delete data.support;
    if (data?._powered_by) delete data._powered_by;

    // agar nested me ho
    if (data?.data?.tag) delete data.data.tag;

    return res.status(200).json(data);

  } catch (e) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
