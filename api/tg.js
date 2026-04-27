export default async function handler(req, res) {
  try {

    const { key, term } = req.query;

    // API key check
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

    // ✅ NEW API LINK
    const url = `https://tg-num-two.vercel.app/api/userid=${term}?key=sellapi`;

    const response = await fetch(url);
    const data = await response.json();

    // ❌ error filter
    const text = JSON.stringify(data).toLowerCase();

    if (
      text.includes("limit") ||
      text.includes("admin") ||
      text.includes("backend") ||
      text.includes("error") ||
      text.includes("contact") ||
      text.includes("failed")
    ) {
      return res.status(200).json({
        status: false,
        message: "api down"
      });
    }

    // 🧹 clean unwanted fields
    delete data.BUY_API;
    delete data.SUPPORT;
    delete data.buy_api;
    delete data.support;
    delete data._powered_by;

    // ✏️ custom branding
    data.buy_api = "@mynk_mynk_mynk";
    data.support = "@mynk_mynk_mynk";
    data._powered_by = "mynk";

    return res.status(200).json(data);

  } catch (error) {
    return res.status(200).json({
      status: false,
      message: "api down"
    });
  }
}
