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

    if (!data || !data.data) {
      return res.status(200).json({
        status: false,
        message: "api down"
      });
    }

    // 🔥 tag remove + clean structure
    const finalData = {
      status: true,
      result: data.data.result,   // actual useful data
      success: data.data.success,

      buy_api: "@mynk_mynk_mynk",
      support: "@mynk_mynk_mynk",
      _powered_by: "mynk"
    };

    return res.status(200).json(finalData);

  } catch (e) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
