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

    const url = `https://users-xinfo-admin-six.vercel.app/api?key=mayankbhaiooo&type=users&term=${term}`;

    const response = await fetch(url);
    const data = await response.json();

    const resultData = data.data?.result;

    if (!resultData || Object.keys(resultData).length === 0) {
      return res.status(200).json({
        status: false,
        message: "No data found"
      });
    }

    return res.status(200).json({
      status: true,
      result: resultData,
      success: data.data.success,

      buy_api: "@mynk_mynk_mynk",
      support: "@mynk_mynk_mynk",
      _powered_by: "mynk"
    });

  } catch (e) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
